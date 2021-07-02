import { formatTime, timer } from './helpers';

const logger = console;

const getHeadInfo = function (logEntry, options) {
  const { mode } = options;
  const { startedTime, action, name } = logEntry;

  const actionType = String(action.type || action.name || '');
  const formattedTime = formatTime(startedTime);
  const isStrictMode = mode === 'strict';

  const headLines = [
    {
      content: `%c store  %c${name}`,
      styles: [
        'color: gray; font-weight: lighter;',
        `color: ${colors.title()};`,
      ],
    },
    {
      content: `%c action %c${actionType}`,
      styles: [
        'color: gray; font-weight: lighter;',
        `color: ${colors.title()};`,
      ],
      show: isStrictMode,
    },
    {
      content: `%c time   %c${formattedTime}`,
      styles: [
        'color: gray; font-weight: lighter;',
        `color: ${colors.title()};`,
      ],
    },
  ];

  const headerContent = [];
  const headerCSS = [];
  for (let i = 0; i < headLines.length; i++) {
    const line = headLines[i];
    const { content, styles = [], show = true } = line;
    if (show) {
      headerContent.push(content);
      headerCSS.push(...styles);
    }
  }
  const header = headerContent.join('\n');
  return {
    header,
    headerCSS,
  };
};

const printBuffer = function (buffer, options) {
  const { mode } = options;

  buffer.forEach((logEntry, key) => {
    const { action, prevState, error } = logEntry;
    let { nextState } = logEntry;
    const nextEntry = buffer[key + 1];

    if (nextEntry) {
      nextState = nextEntry.prevState;
    }

    const { header, headerCSS } = getHeadInfo(logEntry, options);
    logger.group(`${header}`, ...headerCSS);

    const prevStateStyle = `color: ${colors.prevState()}; font-weight: bold`;
    logger.log(`%c prev state`, prevStateStyle, prevState);

    const isStrictMode = mode === 'strict';
    if (isStrictMode) {
      const actionStyles = `color: ${colors.action()}; font-weight: bold`;
      logger.log('%c action    ', actionStyles, action);
    }

    if (error) {
      const styles = `color: ${colors.error()}; font-weight: bold;`;
      logger.log('%c error     ', styles, error);
    }

    const nextStateStyles = `color: ${colors.nextState()}; font-weight: bold`;
    logger.log('%c next state', nextStateStyles, nextState);

    logger.groupEnd();
  });
};

const loggerMiddleware = store => next => action => {
  const { name, mode, getShareState } = store;
  const loggerOptions = {
    mode,
  };
  const logBuffer = [];
  const logEntry = {};

  logBuffer.push(logEntry);

  logEntry.started = timer.now();
  logEntry.startedTime = new Date();
  logEntry.prevState = getShareState();
  logEntry.name = name;
  logEntry.action = action;

  let returnedValue;
  try {
    returnedValue = next(action);
  } catch (e) {
    logEntry.error = e;
  }

  logEntry.took = timer.now() - logEntry.started;
  logEntry.nextState = getShareState();

  printBuffer(logBuffer, loggerOptions);

  logBuffer.length = 0;
  return returnedValue;
};

const colors = {
  title: () => 'inherit',
  prevState: () => '#9E9E9E',
  action: () => '#03A9F4',
  nextState: () => '#4CAF50',
  error: () => '#F20404',
};

export default loggerMiddleware;
