import React, { useEffect, useState } from 'react'
import { 
    Container,
    Row,
    TotalBox,
    NumberItem,
    NumberGroup,
    DeviceTotal,
    SearchBox,
    Mymenu,
    MenuItem
} from './style'
import Scroll from '../../baseUI/scroll/index'
import iconRight from './img/right.png'
import userDefault from './img/ico_user.png'

import { getMainTargets } from '../../api/request'

const blankText = '***';

function MainTourist(props) {
    const [nullText, setNullText] = useState('-')
    const [targets, setTargets] = useState(null)

    const doLink = path => {
        if(!path) return
        props.history.push(path);
    }
    const renderUser = () => {
        return (
            <Row>
                <img src={userDefault} alt="defaultImg"/>
                <div className='person-info'>
                    <p className='title'>请登录</p>
                </div>
            </Row>
        )
    }
    useEffect(() => {
        const getTargets = async () => {
            let res = await getMainTargets({})
            console.log(res)
            setTargets(res) 
        }
        getTargets();
        
    },[])
    return (
        <div>
            <Container>
                <Scroll>
                    <div>
                        <Row>
                            <div className='row-left'>
                                { renderUser() }
                            </div>
                            <img onClick={() => doLink('/Login')} src={iconRight} alt=""/>  
                        </Row>
                        <TotalBox>
                            <div className='f-col-5 left'>
                                <div>
                                    <p className='important'>{targets ? targets.lwdwnum : nullText}</p>
                                    <p className="label">单位总数</p>
                                </div>
                                <div>
                                    <NumberItem onClick={() => doLink('/Login')}>
                                        <span className="label">火警告警</span>
                                        <span className="value">{nullText}</span>
                                    </NumberItem>
                                    <NumberItem onClick={() => doLink('/Login')}>
                                        <span className="label">设备告警</span>
                                        <span className="value">{nullText}</span>
                                    </NumberItem>
                                    <NumberItem>
                                        <span className="label">隐患</span>
                                        <span className="value">{nullText}</span>
                                    </NumberItem>
                                </div>
                            </div>
                            <div className='f-col-5 right'>
                                <NumberGroup>
                                    <div>
                                        <p className='value' onClick={() => doLink('/Login')}>{blankText}</p>
                                        <p className="label">生产企业</p>
                                    </div>
                                    <div >
                                        <p className='value' onClick={() => doLink('/Login')}>{blankText}</p>
                                        <p className="label">九小场所</p>
                                    </div>
                                    <div>
                                        <p className='value' onClick={() => doLink('/Login')}>{blankText}</p>
                                        <p className="label">高层建筑</p>
                                    </div>
                                    <div>
                                        <p className='value' onClick={() => doLink('/Login')}>{blankText}</p>
                                        <p className="label">人密场所</p>
                                    </div>
                                    <div>
                                        <p className='value' onClick={() => doLink('/Login')}>{blankText}</p>
                                        <p className="label">出租私房</p>
                                    </div>
                                </NumberGroup>
                            </div>
                        </TotalBox>
                        <DeviceTotal>
                            <div>
                                <p className='value' onClick={() => doLink('/Login')}>{blankText}</p>
                                <p className='label'>远程联网</p>
                            </div>
                            <div>
                                <p className='value' onClick={() => doLink('/Login')}>{blankText}</p>
                                <p className='label'>微型消防站</p>
                            </div>
                            <div>
                                <p className='value' onClick={() => doLink('/Login')}>{blankText}</p>
                                <p className='label'>充电桩</p>
                            </div>
                            <div>
                                <p className='value' onClick={() => doLink('/Login')}>{blankText}</p>
                                <p className='label'>公共视频</p>
                            </div>
                            <div>
                                <p className='value' onClick={() => doLink('/Login')}>{blankText}</p>
                                <p className='label'>高空瞭望</p>
                            </div>
                            <div>
                                <p className='value' onClick={() => doLink('/Login')}>{blankText}</p>
                                <p className='label'>室外消火栓</p>
                            </div>
                        </DeviceTotal>
                        <SearchBox >
                            <p onClick={() => doLink('/Login')}>单位搜索检查</p>
                            <i className='iconfont scan' onClick={() => doLink('/Login')}>&#xe715;</i>
                        </SearchBox>
                        <Mymenu>
                            <MenuItem onClick={() => doLink('/Login')}>
                                <div className='icon search'></div>
                                <p>日常巡查</p>
                            </MenuItem>
                            <MenuItem onClick={() => doLink('/Login')}>
                                <div className='icon query'></div>
                                <p>巡查记录</p>
                            </MenuItem>
                            <MenuItem onClick={() => doLink('/Login')}>
                                <div className='icon fireRecord'></div>
                                <p>出警记录录入</p>
                            </MenuItem>
                            <MenuItem onClick={() => doLink('/Login')}>
                                <div className='icon hiddenQuery'></div>
                                <p>隐患整改</p>
                            </MenuItem>
                            <MenuItem onClick={() => doLink('/Login')}>
                                <div className='icon partAdd'></div>
                                <p>单位维护</p>
                            </MenuItem>
                        </Mymenu>
                    </div>    
                </Scroll>
            </Container>
       </div>
    )
}

export default React.memo(MainTourist)