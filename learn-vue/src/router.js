import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './views/Home';
import Login from './utils/login';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    { 
        path: '/home', 
        // alias: '/',
        component: Home 
    },
    { 
        path: '/learn', 
        // component: () => import('./views/Learn'),
        components: {
            default: () => import('./views/Learn'),
            student: () => import('./views/Student')
        }
    },
    { path: '/student', component: () => import('./views/Student') },
    { 
        path: '/about', 
        component: () => import('./views/About'),
        beforeEnter(to, from, next) {
            // console.log('beforeEnter');
            next();
        },
        meta: {
            requireLogin: true,
            leaveAsk: true
        }
    },
    { 
        path: '/activity', 
        component: () => import(/* webpackChunkName: 'academic' */'./views/Activity'),
        redirect(to) {
            // console.log(to);
            const { path } = to;
            // return {
            //     name: 'academic'
            // }
            return `${path}/academic`
        },
        meta: {
            requireLogin: true,
            leaveAsk: true
        },
        children: [
            // { path: '', component: () => import('./views/Academic') },
            { 
                path: 'academic', 
                name: 'academic',
                component: () => import(/* webpackChunkName: 'academic' */'./views/Academic') 
            },
            { 
                path: 'personal', 
                name: 'personal',
                component: () => import('./views/Personal') 
            },
            { 
                path: 'download', 
                name: 'download',
                component: () => import('./views/Download') 
            },
        ]
    },
    // {
    //     path: '/course/:id',
    //     component: () => import('./views/About.vue')
    // },
    {
        path: '/question/:id',
        // props: true,
        // props: {
        //     id: '90878976'
        // },
        props: route => ({ // route === $route
            id: route.params.id,
            name: route.name
        }),
        name: 'question',
        component: () => import('./views/Question')
    },
    {
        path: '/login',
        component: () => import('./views/Login')
    }
];

const router = new VueRouter({
    routes,
    linkExactActiveClass: 'abc',
    mode: 'history'
});

router.beforeEach((to, from, next) => {
    // forEach、map、filter、reduce、some、every
    const isRequireLogin = to.matched.some(item => item.meta.requireLogin);
    if (isRequireLogin) {
        const isLogin = Login.isLogin();
        if (isLogin) {
            next();
        } else {
            console.log(1);
            const flag = window.confirm('要登录后才可以浏览，现在要去登录吗？');
            flag ? next('/login') : next(false);
        }
    } else {
        next();
    }
});

export default router;