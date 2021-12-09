import React from 'react';
import {
    ContainerBottom,
    Top
} from './style'
import { 
    List,
    WhiteSpace,
    Button
} from 'antd-mobile';
import { getWrapParams, clearLocStore } from '../../api/utils'
import defaultImg from './img/ico_user.png'
import about from './img/about.png'
import lock from './img/lock.png'
import draft from './img/draft.png'
import work from './img/work.png'
import dd from 'gdt-jsapi'
const Item = List.Item;


function Myself(props) {
    const doAbout = () => {
        dd.alert({
            message: "Version 1.1",
            title: "消消了",
            button: "确定"
        }).then(res => {
            console.log(res)
        }).catch(err => {})
    }
    const viewUserInfo = () => {
        dd.alert({
            message: JSON.stringify(getWrapParams()),
            title: "用户数据",
            button: "确定"
        }).then(res => {
            console.log(res)
        }).catch(err => {})
    }
    const clearStore = () => {
        dd.confirm({
            title: "温馨提示",
            message: "您是否想清除缓存,然后重启应用",
            buttonLabels: [
                "确定",
                "取消"
            ],
        }).then(res => {
            if(res.buttonIndex === 0) {
                clearLocStore()
                dd.closePage().then(res => {
                    console.log(res)
                }).catch(err => {})
            }

        }).catch(err => {})
        
    }
    const doOut = () => {
        dd.confirm({
            title: "温馨提示",
            message: "您是否确定注销",
            buttonLabels: [
                "确定",
                "取消"
            ],
        }).then(res => {
            if(res.buttonIndex === 0) {
                clearLocStore()
                props.history.push('/MainTourist')
            }

        }).catch(err => {})
        
    }
    const toChangePassWord = () => {
        props.history.push('/PswUpdate')
    }
    const renderUser = () => {
        const name = localStorage.getItem('person_name');
        const depart = localStorage.getItem('depart_name');
        // const avatar =  localStorage.getItem('avatar_img');
        // const avTarUrl = avatar ? `/api/zwDing/getAvatar?media_id=${avatar}` : ''
        // let img =  avTarUrl ? <img src={avTarUrl} alt="userPic"/> : <img src={defaultImg} alt="avatar"/>
        return (
            <div className='inner'>
                <img src={defaultImg} alt="avatar" onClick={() => viewUserInfo()}/>
                <p className='title'>{name}</p>
                <p>{depart}</p>
            </div>
        )
    }
    const CheckMyWork = () => {
        props.history.push('/MyWork')
    }
    return (
        <ContainerBottom>
             <Top>{ renderUser()}</Top>
             <List>
                <Item
                    thumb={work}
                    arrow="horizontal"
                    onClick={() => CheckMyWork()}
                    >我的工作情况
                </Item>
                <Item
                    thumb={lock}
                    arrow="horizontal"
                    onClick={() => toChangePassWord()}
                    >修改密码
                </Item>
                <Item
                    thumb={draft}
                    onClick={() => clearStore()}
                    arrow="horizontal"
                    >清除缓存
                </Item>
                <Item
                    thumb={about}
                    onClick={() => doAbout()}
                    arrow="horizontal"
                    >关于
                </Item>  
            </List>
            <WhiteSpace/>
            <Button onClick={() => doOut()}>注销</Button>    
        </ContainerBottom>
    )
}

export default React.memo(Myself)