import { ADD } from '../mutation-types';

export default {
    namespaced: true,
    state: {
        count: 0
    },
    getters: {
        countDouble: (state, getters, rootState) => {
            console.log(getters, rootState);
            return (num) => {
                return state.count * num
            }
        }
    },
    mutations: {
        [ADD](state, { num }) {
            console.log(state);
            state.count += num;
        }
    },
    actions: {
        increment(context, payload) {
            console.log(context);
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    context.commit(ADD, payload);
                    resolve();
                }, 1000);
            })
        }
    }
}