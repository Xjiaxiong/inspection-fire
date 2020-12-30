import React, { useState } from 'react'
import styled from 'styled-components'
import globalStyle from '../../assets/global-style'
import {
    WhiteSpace,
    Button,
    Toast,
} from 'antd-mobile'


const Page = styled.div`
    padding-top: 0;
    .content {
        padding: 16px;
        .label {
            font-size: 18px;
            line-height: 32px;
            color: #6d6d6d;
        }
        input {
            box-sizing: border-box;
            width: 100%;
            height: 50px;
            padding: 8px;
            border-radius: 6px;
            font-size: 16px;
            outline: none;
            appearance: none;
            -webkit-appearance: none;
            border: 1px solid ${globalStyle['border-color0']};
        }
    }
`
const TEXT1 = '为保障您的账户安全,修改密码前请填写您的原密码';
const TEXT2 = '请输入新密码'

const PswUpdate = (props) => {

    const [oldPsw, setOldPsw] = useState('')
    const [newPsw, setNewPsw] = useState('')
    const [comfirmPsw, setComfirmPsw] = useState('')
    const [isNext, setIsNext] = useState(false)
    const doNext = () => {
        console.log('下一步',oldPsw)
        setIsNext(true)
    }
    const doOk = () => {
        console.log('新密码',newPsw)
        console.log('确认密码',comfirmPsw)

        if(newPsw !== comfirmPsw) {
            Toast.fail('两次密码必须一致')
        }
    }

    const renderInput = () => {
        let inputContent = null;
        if(isNext) {
            inputContent = (
                <div>
                    <input 
                        type="password" 
                        value={newPsw} 
                        onChange={e => setNewPsw(e.target.value)} 
                        placeholder='请输入新密码'/>
                    <WhiteSpace size='lg'/>
                    <input 
                        type="password" 
                        value={comfirmPsw} 
                        onChange={e => setComfirmPsw(e.target.value)} 
                        placeholder='确认新密码'/>
                </div>
            )
        } else {
            inputContent = (<input 
                type="password" 
                value={oldPsw} 
                onChange={e => setOldPsw(e.target.value)} 
                placeholder='请输入旧密码'/>)
        }

        return inputContent
    }

    const renderButton = () => {
        if(isNext) {
            return <Button onClick={() => doOk()} type='primary'>确定</Button>
        } else {
            return <Button onClick={() => doNext()} type='primary'>下一步</Button>
        }
    }

    return (
        <Page>
            <div className='content'>
                <p className='label'>{isNext ? TEXT2 : TEXT1}</p>
                <WhiteSpace size='lg'/>
                { renderInput() }
                <WhiteSpace size='lg'/>
                { renderButton() }
            </div>
        </Page>
    )
}

export default React.memo(PswUpdate)