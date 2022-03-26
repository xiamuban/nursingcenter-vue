import Vue from 'vue'
import Router from 'vue-router'
import Store from '../store'
import Login from "@/views/login/Login";
import Main from "@/components/main/Main";

import CheckInList from "@/views/customer/checkIn/CheckInList";
import CheckIn from "@/views/customer/checkIn/CheckIn";
import CheckInUpdate from "@/views/customer/checkIn/CheckInUpdate";
import WithdrawList from "@/views/customer/withdraw/WithdrawList";
import LevelList from "@/views/nursing/level/LevelList";
import NursingInfo from "@/views/nursing/level/NursingInfo";
import LevelContent from "@/views/nursing/level/LevelContent";
import RecordsAdd from "@/views/nursing/records/RecordsAdd";
import RecordsList from "@/views/nursing/records/RecordsList";
import FoodList from "@/views/food/FoodList";
import MealCalendar from "@/views/food/MealCalendar";
import VerifyDetail from "@/views/verify/VerifyDetail";

import Home from "@/views/home/Home";
Vue.use(Router);
//创建路由对象
const router = new Router({
    routes: [
        {
            path:'/',
            component: Login
        },
        {
            path:'/login',
            component: Login
        },
        {
            path: '/main',
            component: Main,
            children: [
                {
                    path: '/',
                    component: Home
                },
                {
                    path: 'checkIn_list',
                    component: CheckInList
                },
                {
                    path: 'check_in',
                    component: CheckIn
                },
                {
                    path: 'checkIn_update/:id',
                    component: CheckInUpdate
                },
                {
                    path: 'withdraw_list',
                    component: WithdrawList
                },
                {
                    path: 'verify_detail/:id',
                    component: VerifyDetail
                },

                {
                    path: 'level_list',
                    component: LevelList
                },
                {
                    path: 'nursingInfo/:id',
                    component: NursingInfo
                },
                {
                  path: 'level_content/:id',
                  component: LevelContent
                },
                {
                    path: 'record_add',
                    component: RecordsAdd
                },
                {
                    path: 'record_list',
                    component: RecordsList
                },
                {
                    path: 'food_list',
                    component: FoodList
                },
                {
                    path: 'meal_calendar',
                    component: MealCalendar
                },

            ]
        },
    ]
});

//路由守卫
router.beforeEach((to,from,next) => {
    let user = Store.getters.user;
    if(to.path.indexOf("main") === -1){
        next();
    }else {
        if (JSON.stringify(user) !== '{}') {
            next();
        } else {
            next({
                path: "/login"
            })
        }
    }
});

const VueRouterPush = Router.prototype.push;
Router.prototype.push = function push (to) {
    return VueRouterPush.call(this, to).catch(err => err)
};
export default router;

