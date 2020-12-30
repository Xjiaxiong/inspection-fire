import React from 'react'
import { Redirect } from 'react-router-dom'
import Home from '../application/Home'
import Around from '../application/Around'
import Main from '../application/Main'
import Myself from '../application/Myself'
// import NoRight from '../application/NoRight'
import AccountChoose from '../application/AccountChoose'
import SearchAround from '../application/SearchAround'
import TroubleFix from '../application/TroubleFix'
import FixInfo from '../application/FixInfo'
import FixDetail from '../application/FixDetail'
import ChecksDetail from '../application/ChecksDetail'
import DemoList from '../application/DemoList'
import UnitCheck from '../application/UnitCheck'
import CheckTypes from '../application/CheckTypes'
import SearchPanel from '../application/SearchPanel'
import PatrolRecord from '../application/PatrolRecord'
import PatrolDetail from '../application/PatrolDetail'
import InitLoading from '../application//InitLoading'
import PswUpdate from '../application/PswUpdate'
import ReFix from '../application/ReFix'
import PassFix from "../application/PassFix";
import SearchPage from "../application/SearchPage"
import UnitCheckTypes from "../application/UnitCheckTypes"
import Login from '../application/Login'

const commomRoutes = [
    {
        path: '/Main',
        component: Main,
    },
    {
        path: '/SearchAround',
        component: SearchAround,
    },
    {
        path: '/TroubleFix',
        component: TroubleFix,
    },
    {
        path: '/FixInfo',
        component: FixInfo
    },
    {
        path: '/FixDetail',
        component: FixDetail
    },
    {
        path: '/ChecksDetail',
        component: ChecksDetail   
    },
    {
        path: '/UnitCheck',
        component: UnitCheck   
    },
    {
        path: '/CheckTypes',
        component: CheckTypes
    },
    {
        path: '/SearchPanel',
        component: SearchPanel
    },
    {
        path: '/PatrolRecord',
        component: PatrolRecord
    },
    {
        path: '/PatrolDetail',
        component: PatrolDetail
    },
    {
        path: '/Around',
        component: Around
    },
    {
        path: '/Myself',
        component: Myself,
    },
    {
        path: '/DemoList',
        component: DemoList,
    },
    {
        path: '/PswUpdate',
        component: PswUpdate,
    },
    {
        path: '/ReFix',
        component: ReFix,
    },
    {
        path: '/PassFix',
        component: PassFix,
    },
    {
        path: '/SearchPage',
        component: SearchPage
    },
    {
        path: '/UnitCheckTypes',
        component: UnitCheckTypes
    },
    {
        path: '/Login',
        component: Login
    },
    {
        path: '/AccountChoose',
        component: AccountChoose
    }]
//过度路由
export const routes0 = [{
    path: '/',
    component: InitLoading,
}]   
//无权限路由
export const routes1 = [    
    {
    component: Home,
    routes:[
            {
                path: '/',
                exact: true,
                render: () => (
                    <Redirect to={"/Login"} />
                )
            },
            ...commomRoutes
        ]
    }
]
//个人单个账号路由
export const routes2 =  [
    {
        component: Home,
        routes:[
            {
                path: '/',
                exact: true,
                render: () => (
                    <Redirect to={"/Main"} />
                )
            },
            ...commomRoutes
        ]
    }
]
//个人多个账号路由
export const routes3 =  [
    {
        component: Home,
        routes:[
            {
                path: '/',
                exact: true,
                render: () => (
                    <Redirect to={"/AccountChoose"} />
                )
            },
            ...commomRoutes
        ]
    }
]



