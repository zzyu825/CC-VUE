import Vue from 'vue';

// const mixin = {
//     beforeRouteLeave(to, from, next) {
//         const toParent = to.matched.length && to.matched[0];
//         const fromParent = from.matched.length && from.matched[0].meta.leaveAsk
//         if(from.matched[0] !== toParent && fromParent) {
//             const flag = window.confirm('确定要离开吗？');
//             flag ? next() : next(false);
//         } else {
//             next();
//         }
//     }
// }

Vue.mixin({
    beforeRouteLeave(to, from, next) {
        const toParent = to.matched[0];
        const fromParent = from.matched[0];
        const { nextFlag } = this.$options;
        if(!nextFlag && fromParent !== toParent && fromParent.meta.leaveAsk) {
            const flag = window.confirm('确定要离开吗？');
            flag ? next() : next(false);
        } else {
            next();
        }
    }
});