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
import defaultImg from './img/ico_user.png'
import about from './img/about.png'
import lock from './img/lock.png'
import draft from './img/draft.png'
import dd from 'gdt-jsapi'
const Item = List.Item;


function Myself(props) {
    const doAbout = () => {
        dd.alert({
            message: "消防督查 Version 1.0"
        });
    }
    const doOut = () => {
        // dd.closePage().then(res => {
        //     console.log(res)
        // }).catch(err => {})
        props.history.push('/Login')
    }
    const toChangePassWord = () => {
        props.history.push('/PswUpdate')
    }
    const renderUser = () => {
        const name = localStorage.getItem('person_name');
        const depart = localStorage.getItem('depart_name');
        const avatar =  localStorage.getItem('avatar_img');
        const avTarUrl = avatar ? `/api/zwDing/getAvatar?media_id=${avatar}` : ''
        let img =  avTarUrl ? <img src={avTarUrl} alt="avatar"/> : <img src={defaultImg} alt="avatar"/>
        return (
            <div className='inner'>
                {img}
                <p className='title'>{name}</p>
                <p>{depart}</p>
            </div>
        )
    }
    return (
        <ContainerBottom>
             <Top>{ renderUser()}</Top>
             <List>
                <Item
                    thumb={lock}
                    arrow="horizontal"
                    onClick={() => toChangePassWord()}
                    >修改密码
                </Item>
                <Item
                    thumb={draft}
                    onClick={() => {}}
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