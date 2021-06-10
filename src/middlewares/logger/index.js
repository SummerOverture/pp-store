import printBuffer from './core';
import { timer } from './helpers';
import defaults from './defaults';
/* eslint max-len: ["error", 110, { "ignoreComments": true }] */
/**
 * Creates logger with following options
 *
 * @namespace
 * @param {object} options - options for logger
 * @param {string | function | object} options.level - console[level]
 * @param {boolean} options.duration - print duration of each action?
 * @param {boolean} options.timestamp - print timestamp with each action?
 * @param {object} options.colors - custom colors
 * @param {object} options.logger - implementation of the `console` API
 * @param {boolean} options.logErrors - should errors in action execution be caught, logged, and re-thrown?
 * @param {boolean} options.collapsed - is group collapsed?
 * @param {boolean} options.predicate - condition which resolves logger behavior
 * @param {function} options.stateTransformer - transform state before print
 * @param {function} options.actionTransformer - transform action before print
 * @param {function} options.errorTransformer - transform error before print
 *
 * @returns {function} logger middleware
 */
function createLogger(options = {}) {
  const loggerOptions = Object.assign({}, defaults, options);

  const {
    logger,
    stateTransformer,
    errorTransformer,
    predicate,
    logErrors,
    diffPredicate,
  } = loggerOptions;

  // Return if 'console' object is not defined
  if (typeof logger === 'undefined') {
    return () => next => action => next(action);
  }

  // Detect if 'createLogger' was passed directly to 'applyMiddleware'.
  if (options.getShareState && options.dispatch) {
    return () => next => action => next(action);
  }

  const logBuffer = [];

  return (store) => next => (action) => {
    const { getShareState, name } = store;
    // Exit early if predicate function returns 'false'
    if (typeof predicate === 'function' && !predicate(getShareState, action)) {
      return next(action);
    }

    const logEntry = {};

    logBuffer.push(logEntry);

    logEntry.started = timer.now();
    logEntry.startedTime = new Date();
    logEntry.prevState = stateTransformer(getShareState());
    logEntry.name = name;
    logEntry.action = action;

    let returnedValue;
    if (logErrors) {
      try {
        returnedValue = next(action);
      } catch (e) {
        logEntry.error = errorTransformer(e);
      }
    } else {
      returnedValue = next(action);
    }

    logEntry.took = timer.now() - logEntry.started;
    logEntry.nextState = stateTransformer(getShareState());

    const diff = loggerOptions.diff && typeof diffPredicate === 'function'
      ? diffPredicate(getShareState, action)
      : loggerOptions.diff;

    printBuffer(logBuffer, Object.assign({}, loggerOptions, { diff }));
    logBuffer.length = 0;

    if (logEntry.error) throw logEntry.error;
    return returnedValue;
  };
}

// eslint-disable-next-line consistent-return
const defaultLogger = (store = {}) => {
  const { dispatch, getShareState, name } = store;
  if (typeof dispatch === 'function' || typeof getShareState === 'function') {
    return createLogger()({ dispatch, getShareState, name });
  }
};

export { defaults, createLogger, defaultLogger as logger };

export default defaultLogger;
