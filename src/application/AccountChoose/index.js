import React, { useEffect, useState } from 'react'
import { List } from './style'
import { 
    WingBlank, 
    Button,
    SwipeAction,
    Modal,
    Toast
} from 'antd-mobile'
import { LoginRequest } from '../../api/request'
import { storeUserInfo } from '../../api/config'
import dd from 'gdt-jsapi'


const alert = Modal.alert

function AccountChoose (props) {
    const [selectIndex, setSelectIndex] = useState(0);
    const [accounts, setAccount] = useState([]);

    useEffect(() => {
        let accountsStr = localStorage.getItem('accounts')
        accountsStr && setAccount(JSON.parse(accountsStr))
    },[])

    const login = async () => {
        dd.showLoading({text:'登陆中...'})
        let curUser = accounts[selectIndex];
        let { fuser_uuid, ftoken } = accounts[selectIndex];
        let paramsUser = new URLSearchParams();
        paramsUser.append('fuser_uuid',fuser_uuid)
        paramsUser.append('ftoken',ftoken)
        //登陆中,来点状态...
        let loginStatus = await LoginRequest(paramsUser)
        //登陆结束...
        dd.hideLoading()
        if(loginStatus.code === "1") {
          //缓存用户数据
          storeUserInfo(curUser)
          //localStorage.setItem('selectIndex', selectIndex);
          //登陆成功
          props.history.push("/Main");
        } else {
          //登陆失败
        }
        
    }
    const onItem = (index) => {
        setSelectIndex(index)
    }
    const deleteAccount = async (index,fuser_uuid) => {

        dd.showLoading({text:'删除中...'})

        let openid = localStorage.getItem('openid');

        let paramsUser = new URLSearchParams();
        paramsUser.append('fuser_uuid',fuser_uuid)
        paramsUser.append('openid',openid)

        let deleteStatus = await LoginRequest(paramsUser)

        dd.hideLoading()
        if(deleteStatus.code === "1") {
            
            var temp = [...accounts]
            temp.splice(index,1)
            setAccount(temp)

            Toast.success('删除成功!', 1);
        } else {
            Toast.fail('删除失败!', 1);
        }
    }
    return (
        <div>
            <List>
                {
                    accounts.map(( item, index) => {
                        return (
                            <SwipeAction
                                autoClose
                                right={[
                                    {
                                        text: '删除',
                                        onPress: () =>  alert('删除职位', '确定删除该职位吗?', [
                                            { text: '取消', onPress: () => console.log("那算了") },
                                            { text: '是的', onPress: () => deleteAccount(index,item.fuser_uuid)},
                                        ]),
                                        style: { backgroundColor: '#F4333C', color: 'white',padding: '0 20px' },
                                    }
                                ]}
                                key={item.fuser_uuid}
                                >
                                <div 
                                    className="list-item" 
                                    onClick={() => onItem(index)} 
                                    key={item.fuser_uuid}>
                                    <i className="iconfont list-icon">&#xe666;</i>
                                    <div className="list-p list-p-1">{item.fperson_name}</div>
                                    <div className="list-p list-p-2">{item.fpermaint_name}</div>
                                    {selectIndex === index ? <i className="iconfont list-select">&#xe6cf;</i> : null}
                                </div>
                            </SwipeAction>
                        )
                    })
                }
            </List>
            <WingBlank>
                <Button type="primary" size="large" onClick={() => login()}>登陆</Button>
            </WingBlank>
        </div>
        
    )
}

export default React.memo(AccountChoose)
