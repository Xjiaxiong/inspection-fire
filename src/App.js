import React, { useState, useEffect } from 'react'
//全局默认样式, 图标处理
import { GlobalStyle } from './style';
import { IconStyle } from './assets/iconfont/iconfont';
import { _config, storeUserInfo, doAuthConfig } from './api/config'
//路由处理
import {
  routes0, 
  routes1,
  routes2,
  routes3
} from './routes/index.js';
import { HashRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';//renderRoutes 读取路由配置转化为 Route 标签
//状态管理
import store from './store/index'
import { Provider } from 'react-redux'

import dd from 'gdt-jsapi';
import { 
  getUserByAuthCode,
  getUserListByOpenId,
  LoginRequest, 
} from './api/request'
import { plusUser } from './aplus'

let curUser = {};

function App() {
  const [routes, setRoutes] = useState(routes0)
  const checkUser = async () => {
    const testRes = await getUserByAuthCode(2020)
    console.log(testRes)
    try {
      const { code } =  await dd.getAuthCode({corpId: _config.corpId})
      localStorage.setItem('authCode',code);
      const userRes = await getUserByAuthCode(code)
      const { avatar, openid, accountId, nickNameCn }  = userRes.data;
      //用户信息埋点
      plusUser(accountId, nickNameCn)  
      localStorage.setItem('avatar_img', avatar);
      const params = new URLSearchParams();
      params.append('openid',openid)
      let res = await getUserListByOpenId(params)
      //拿到人员的账户信息,一个人员可能有多个账户或者没有账户
      if(res.code === "1") {
        let accounts = res.data;
        if(accounts.length === 0) {
            //无权限,去登陆界面
            setRoutes(routes1)   
        }
        if(accounts.length === 1) {
            //直接登陆
            curUser = accounts[0];
            let { fuser_uuid, ftoken } = curUser;
            let paramsUser = new URLSearchParams();
            paramsUser.append('fuser_uuid',fuser_uuid)
            paramsUser.append('ftoken',ftoken)
            let loginStatus = await LoginRequest(paramsUser)
            if(loginStatus.code === "1") {
              doAuthConfig() //JSAPI鉴权处理
              storeUserInfo(curUser) //缓存用户数据
              setRoutes(routes2)
            } else {
              dd.alert({
                title:'登陆失败'
              })
            }
        }
        if(accounts.length > 1) {
            //选择后登陆
            localStorage.setItem('accounts',JSON.stringify(accounts));
            setRoutes(routes3)
        }
      }
    } catch(e) {
      console.log('初始化时，发生了一些请求错误, 及时排查',e)
    }
  }
 
  useEffect(() => {
    checkUser()
    //eslint-disable-next-line
  },[])

  return (
    <Provider store={store}>
      <HashRouter>
              <GlobalStyle></GlobalStyle>
              <IconStyle></IconStyle>
              { renderRoutes(routes) }
      </HashRouter>
    </Provider>  
  );
}

export default App;
