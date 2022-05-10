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
import ProjectDetail from '../application/ProjectDetail'
import ScorePart from '../application/ScorePart'
import RankPart from '../application/RankPart'
import HistoryInfo from '../application/HistoryInfo'
import WirelessAlarmList from '../application/WirelessAlarmList'
import GridManPatrols from '../application/GridManPatrols'
import DeviceSetupInfo from '../application/DeviceSetupInfo'
import DeviceDetail from '../application/DeviceDetail'
import Parts from '../application/Parts'
import PartHandle from '../application/PartHandle'
import RecordFire from '../application/RecordFire'
import FireDetail from '../application/FireDetail'
import RescueIn from '../application/RescueIn'
import AreaFilter from '../application/AreaFilter'
import EntityDetail from '../application/EntityDetail'
import PartPatrolRecrod from '../application/PartPatrolRecrod'
import PartElecsys from '../application/PartElecsys'
import ElecStatusList from '../application/ElecStatusList'
import SysPatrolDayDetail from '../application/SysPatrolDayDetail'
import MyWork from '../application/MyWork'
import MyChecks from '../application/MyChecks'
import MyHiddenTroubles from '../application/MyHiddenTroubles'
import PatrolDetailSelf from '../application/PatrolDetailSelf'
import CheckNo from '../application/CheckNo'
import MainTourist from '../application/MainTourist'
import Demo from '../application/Demo'

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
    },
    {
        path: '/ProjectDetail',
        component: ProjectDetail  
    },
    {
        path: '/ScorePart',
        component: ScorePart
    },
    {
        path: '/RankPart',
        component: RankPart  
    },
    {
        path: '/HistoryInfo',
        component: HistoryInfo
    },
    {
        path: '/WirelessAlarmList',
        component: WirelessAlarmList
    },
    {
        path: '/GridManPatrols',
        component: GridManPatrols
    },
    {
        path: '/DeviceSetupInfo',
        component: DeviceSetupInfo
    },
    {
        path: '/DeviceDetail',
        component: DeviceDetail
    },
    {
        path: '/Parts',
        component: Parts
    },
    {
        path: '/PartHandle',
        component: PartHandle
    },
    {
        path: '/RecordFire',
        component: RecordFire
    },
    {
        path: '/FireDetail',
        component: FireDetail
    },
    {
        path: '/RescueIn',
        component: RescueIn
    },
    {
        path: '/AreaFilter',
        component: AreaFilter
    },
    {
        path: '/EntityDetail',
        component: EntityDetail
    },
    {
        path: '/PartPatrolRecrod',
        component: PartPatrolRecrod
    },
    {
        path: '/PartElecsys',
        component: PartElecsys
    },
    {
        path: '/ElecStatusList',
        component: ElecStatusList
    },
    {
        path: '/SysPatrolDayDetail',
        component: SysPatrolDayDetail
    },
    {
        path: '/MyWork',
        component: MyWork
    },
    {
        path: '/MyChecks',
        component: MyChecks
    },
    {
        path: '/MyHiddenTroubles',
        component: MyHiddenTroubles
    },
    {
        path: '/PatrolDetailSelf',
        component: PatrolDetailSelf
    },
    {
        path: '/CheckNo',
        component: CheckNo
    },
    {
        path: '/MainTourist',
        component: MainTourist,
    },]
//过度路由
export const routes0 = [{
    path: '/',
    component: Demo,
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
                    <Redirect to={"/MainTourist"} />
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



