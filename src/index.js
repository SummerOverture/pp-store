import React, { useState, useEffect } from 'react';

import _ from 'lodash';
import createStore from './createStore';

// 默认比较函数
const YsStore = {
	stores: {},
	config(opts) {
		YsStore = {
			...YsStore,
			opts,
		};
	},
	middlewares: ['logger'],
	create(opts) {
		const { stores } = YsStore;
		const { reducer, initialState, name } = opts;

		if (!reducer || !initialState || !name) {
			throw new Error('propertie [reducer 、 initialState 、 name] is required');
		}

		if (stores[name]) {
			throw new Error(`store ${name} exist, please check the store name`);
		}

		if (!opts.middlewares) {
			opts.middlewares = YsStore.middlewares;
		}

		const thisStore = createStore(opts);

		stores[name] = thisStore;
		return thisStore;
	},
	getStore(name) {
		if (!name) {
			return YsStore.stores;
		}
		return YsStore.stores[name];
	},
};

export default YsStore;
