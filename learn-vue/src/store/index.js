import Vue from 'vue';
import Vuex from 'vuex';
import { CHANGE_OBJ, UPDATE_MSG } from './mutation-types';

import count from './modules/count';
import student from './modules/student';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        count,
        student
    },
    strict: process.env.NODE_ENV !== 'production',
    state: {
      a: 1,
      b: 2,
      obj: {a: 1},
      arr: [],
      msg: 'hello vue'
    },
    mutations: {
        [CHANGE_OBJ](state) {
            // state.obj.b = 2;
            Vue.set(state.obj, 'b', 2);
            // state.arr[0] = 1;
            // state.arr.splice(0, 0, 1);
            Vue.set(state.arr, 0, 1);
            
        },
        [UPDATE_MSG](state, { value }) {
            state.msg = value;
        }
    }
});