import React from "react";
import styled from "styled-components"
import { createForm } from 'rc-form'
import { List, InputItem, Button, WhiteSpace } from "antd-mobile";
import { plusUser } from '../../aplus'
import { _config, storeUserInfo, doAuthConfig } from '../../api/config'
import dd from 'gdt-jsapi';
import { 
  getUserByAuthCode,
  LoginRequest
} from '../../api/request'
import md5 from 'md5'


const Content = styled.div`
    position: relative;
    padding: 90px 16px;
`
const Title = styled.div`
    font-size: 24px;
    font-weight: 700;
    color: #101010;
    text-align: center;
    line-height: 48px;
`


const Login = (props) => {
    const { getFieldProps } = props.form;
    const submit = async () => {
        console.log('提交...',props)
        let userName = getFieldProps('userName')
        let psd = getFieldProps('password')

        if(!userName.value || !psd.value) {
            dd.alert({
                title:'登录失败',
                message: '用户名或者密码必填!',
                button: '收到'
            })
            return
        }
        dd.showLoading({text:'登录中...'})
        const { code } =  await dd.getAuthCode({corpId: _config.corpId})
        const userRes = await getUserByAuthCode(code)
        const { avatar, openid, accountId, employeeCode, realmId, clientId }  = userRes.data;
        const { tenantUserId, nickNameCn} = userRes.data;
        plusUser(accountId, nickNameCn)  //用户埋点
        localStorage.setItem('avatar_img', avatar);

        //登录请求
        let paramsUser = new URLSearchParams();
        paramsUser.append('clientId', clientId)
        paramsUser.append('accountId', accountId)
        paramsUser.append('employeeCode', employeeCode)
        paramsUser.append('realmId', realmId)

        paramsUser.append('tenantUserId', tenantUserId)
        paramsUser.append('openid',openid)
        paramsUser.append('flogin_name', userName.value)
        paramsUser.append('flogin_pwd', md5(psd.value))
        
        let loginStatus = await LoginRequest(paramsUser)
        dd.hideLoading()
        if(loginStatus.code === "1") {


          let curUser = loginStatus.data;
          //JSAPI鉴权处理
          doAuthConfig()
          //缓存用户数据
          storeUserInfo(curUser)
          //路由首页
          props.history.push('/Main')
        } else {
          dd.alert({
            title:'登录失败'
          })
        }
    }  
    return (
        <Content>
            <List renderHeader={() => <Title>登录</Title>}>
                <InputItem
                    {...getFieldProps('userName')}
                    type="text"
                    placeholder="请输入用户名"
                >用户名</InputItem>
                <InputItem
                    {...getFieldProps('password')}
                    type="password"
                    placeholder="请输入密码"
                >密码</InputItem>
            </List>
            <WhiteSpace size='lg'/>
            <WhiteSpace size='lg'/>
            <Button type='primary' onClick={() => submit()}>登录</Button>
        </Content>
    )
}

const LoginWrapper = createForm()(Login);

export default LoginWrapper