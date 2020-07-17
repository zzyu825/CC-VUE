import Vue from 'vue';
import Vuex from 'vuex';
import { ADD, CHANGE_OBJ, UPDATE_MSG } from './mutation-types';

Vue.use(Vuex);

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    state: {
      count: 0,
      a: 1,
      b: 2,
      studentList: [],
      obj: {a: 1},
      arr: [],
      msg: 'hello vue'
    },
    getters: {
        // countDouble(state) {
        //     return state.count * 2;
        // }
        // countDouble: state => state.count * 2
        // countDouble(state) {
        //     return function (num) {
        //         return state.count * num;
        //     }
        // }
        countDouble: state => num => state.count * num,
        studentCount: state => state.studentList.length,
        studentFilter: state => state.studentList.filter(stu => stu.age < 18)
    },
    mutations: {
        [ADD](state, { num }) {
            // state.count++;
            state.count += num;
            // setTimeout(() => {
            //     state.count += num;
            // }, 1000);
        },
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
    },
    actions: {
        increment({ commit }, payload) {
            // console.log(context);
            // setTimeout(() => {
            //     commit(ADD, payload);
            // }, 1000);
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    commit(ADD, payload);
                    resolve();
                }, 1000);
            })
        }
    }
});