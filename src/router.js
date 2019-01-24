import Router from "vue-router";
import Vue from "vue";
import Goods from "./components/Goods.vue";
import Ratings from "./components/Ratings.vue";
import Seller from "./components/Seller.vue";

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            redirect: '/goods'
        },
        {
            path: '/goods',
            component: Goods,
        },
        {
            path: '/ratings',
            component: Ratings,
        },
        {
            path: '/seller',
            component: Seller,
        }
    ]
})