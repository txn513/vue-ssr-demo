// store.js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 假定我们有一个可以返回 Promise 的
// 通用 API（请忽略此 API 具体实现细节）
// import { fetchItem } from './api'

const fetchBar = function() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('bar 组件返回 ajax 数据');
      }, 1000);
    });
  };

export function createStore () {
  return new Vuex.Store({
    state: {
        bar: ''
    },
    actions: {
    fetchBar({ commit }) {
        return fetchBar().then((data) => {
        commit('SET_BAR', data);
        }).catch((err) => {
        console.error(err);
        })
    }
    },
    mutations: {
        'SET_BAR'(state, data) {
            state.bar = data;
        }
    },
  })
}