import { useState, useEffect } from 'react';
import applyMiddleware from './applyMiddleware';
import { shallowEqual as isEqual, logError } from './utils';

export default function createStore(opts = {}) {
  const { initialState, reducer, actions, middlewares } = opts;
  let shareState = initialState;

  const subs = [];
  const listeners = [];

  function getShareState() {
    return shareState;
  }

  function subscribe(sub) {
    listeners.push(sub);

    function unSubscribe() {
      listeners.splice(listeners.indexOf(sub), 1);
    }

    return unSubscribe;
  }

  function isAction(type) {
    if (type.startsWith('A') || type in actions) {
      return true;
    }
  }

  /**
   * @params {selector} 用来获取指定state 同时会用来做性能优化
   * @params {isEqualState} 复本的更新策略函数
   */
  function useSelector(selector = state => state, isEqualState) {
    const trackState = selector(shareState);
    const [state, setState] = useState(trackState);
    const sub = {
      update: value => {
        const nextTrackState = selector(value);
        // 使用指定或者默认shallowEqual 决定copy版本是否需要更新
        const isEqualCopyState = isEqualState || isEqual;
        if (!isEqualCopyState(state, nextTrackState)) {
          return setState(nextTrackState);
        }
      },
    };
    useEffect(() => {
      subs.push(sub);
      return () => subs.splice(subs.indexOf(sub), 1);
    });

    return state;
  }

  function useDispatch(action) {
    const { type, params } = action;

    if (!actions) {
      logError(
        `actions is not defined, maybe you should use 'dispatch' or specify actions`
      );
    }

    if (isAction(type)) {
      actions[type](params)(dispatch);
    } else {
      dispatch(action);
    }
  }

  function plainDispatch(action) {
    const values = reducer(shareState, action);
    // 使用指定或者默认eaual 决定shareState是否需要更新
    const isEqualShareStore = opts.isEqual || isEqual;

    // 共享样本一致则无需通知副本变更
    if (!isEqualShareStore(shareState, values)) {
      subs.forEach(sub => {
        sub.update(values);
      });

      shareState = values;

      listeners.forEach(sub => {
        sub();
      });
    }
  }

  const dispatch = applyMiddleware(middlewares, {
    dispatch: plainDispatch,
    getShareState,
  });

  const store = {
    useSelector,
    useDispatch,
    dispatch,
    subscribe,
    getShareState,
  };

  return store;
}
