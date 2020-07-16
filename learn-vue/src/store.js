import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
      count: 0,
      a: 1,
      b: 2,
      studentList: []
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
    }
});