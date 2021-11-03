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
import imgScore from './img/i_score.png'
import imgRank from './img/i_rank.png'
import userDefault from './img/ico_user.png'
import * as actionTypes from './store/actionCreators'
import { connect } from "react-redux";
import { getWrapParams, GetQuery } from '../../api/utils'
import PopList from '../../baseUI/popList/index'
// import { zwTypeMap } from '../../api/constant'
import dd from 'gdt-jsapi'

function Main(props) {
    const { mainInfo,  rankInfo} = props
    const { getMainInfoDataDispatch, getRankInfoDataDispatch } = props
    const [alarmShow, setAlarmShow] = useState(false)
    const [mType, setMType] = useState('M20');
    const doLink = path => {
        if(!path) return
        props.history.push(path);
    }
    const doScan = () => {
        dd.scan({type:"all"}).then(res => {
             const params = GetQuery(res.text)
            let path = '/UnitCheckTypes'
            props.history.push(`${path}?frfid_uuid=${params.r}`)
        }).catch(e => {
            dd.alert({message:`扫描失败:${e}`})
        })
    }
    const showList = (flag) => {
        setMType(flag)
        setAlarmShow(true)
    }
    const hidePop = () => {
        setAlarmShow(false)
    }
    const viewAreaFilter = (mType) => {
        localStorage.setItem('mType',mType)
        props.history.push(`/AreaFilter`)
    }
    useEffect(() => {
        if(!mainInfo.size) {
            getMainInfoDataDispatch(getWrapParams({}));
        }
        if(rankInfo && !rankInfo.size) {
            getRankInfoDataDispatch(getWrapParams({}));
        }    
    },[getMainInfoDataDispatch, mainInfo, getRankInfoDataDispatch, rankInfo])

    const mainInfoJS = mainInfo ? mainInfo.toJS() : [];
    const rankInfoJS = rankInfo ? rankInfo.toJS() : [];
    let countInfos = {};
    if(mainInfoJS.length> 0) {
        // eslint-disable-next-line
        mainInfoJS.map( item => {
            countInfos[item.menucode] = item.item_num
        })
    }
    const renderUser = () => {
        const name = localStorage.getItem('person_name');
        const depart = localStorage.getItem('depart_name');
        //const avatar =  localStorage.getItem('avatar_img');
        //const avTarUrl = avatar ? `/api/zwDing/getAvatar?media_id=${avatar}` : ''
        return (
            <Row>
                <img src={userDefault} alt="defaultImg"/>
                {/* { avTarUrl ? <img src={avTarUrl} alt="userPic"/> : <img src={userDefault} alt="defaultImg"/>} */}
                <div className='person-info'>
                    <p className='title'>{ name ? name: '用户' }</p>
                    <p className='desc'>{depart ? depart: '管理员'}</p>
                </div>
            </Row>
        )
    }
    const toProject = (fproject_uuid) => {
        //跳转到项目详情页
        props.history.push(`/ProjectDetail?fproject_uuid=${fproject_uuid}`)
    }
    return (
        <div>
            <PopList 
                mtype={mType} 
                show={alarmShow} 
                hidePop={hidePop} 
                toProject={toProject}>
            </PopList>
            <Container>
                <Scroll>
                    <div>
                        <Row>
                            <div className='row-left'>
                                { renderUser() }
                            </div>  
                            <div className='row-right'>
                                <div className='bottom-info'>
                                    <div className="bottom-info-item bottom-info-first">
                                        <img src={imgScore} alt=""/>
                                        <span>积分</span>
                                        <span className='color-yellow'>{rankInfoJS.fcurrent_score}</span>
                                    </div>
                                    <div className='bottom-info-item'>
                                        <img src={imgRank} alt=""/>
                                        <span>排名</span>
                                        <span className='color-blue'>{rankInfoJS.ranking}</span>
                                    </div>
                                </div>    
                            </div>
                        </Row>
                        <TotalBox>
                            <div className='f-col-5 left'>
                                <div>
                                    <p className='important'>{countInfos?countInfos['M10']:0}</p>
                                    <p className="label">单位总数</p>
                                </div>
                                <div>
                                    <NumberItem onClick={() => showList('M20')}>
                                        <span className="label">火警告警</span>
                                        <span className="value">{countInfos?countInfos['M20']:0}</span>
                                    </NumberItem>
                                    <NumberItem onClick={() => showList('M22')}>
                                        <span className="label">设备告警</span>
                                        <span className="value">{countInfos?countInfos['M22']:0}</span>
                                    </NumberItem>
                                    <NumberItem>
                                        <span className="label">隐患</span>
                                        <span className="value">{countInfos?countInfos['M99']:0}</span>
                                    </NumberItem>
                                </div>
                            </div>
                            <div className='f-col-5 right'>
                                <NumberGroup>
                                    <div>
                                        <p className='value' onClick={() => viewAreaFilter('M11')}>{countInfos?countInfos['M11']:0}</p>
                                        <p className="label">生产企业</p>
                                    </div>
                                    <div >
                                        <p className='value' onClick={() => viewAreaFilter('M13')}>{countInfos?countInfos['M13']:0}</p>
                                        <p className="label">九小场所</p>
                                    </div>
                                    <div>
                                        <p className='value' onClick={() => viewAreaFilter('M14')}>{countInfos?countInfos['M14']:0}</p>
                                        <p className="label">高层建筑</p>
                                    </div>
                                    <div>
                                        <p className='value' onClick={() => viewAreaFilter('M15')}>{countInfos?countInfos['M15']:0}</p>
                                        <p className="label">人密场所</p>
                                    </div>
                                    <div>
                                        <p className='value' onClick={() => viewAreaFilter('M12')}>{countInfos?countInfos['M12']:0}</p>
                                        <p className="label">出租私房</p>
                                    </div>
                                </NumberGroup>
                            </div>
                        </TotalBox>
                        <DeviceTotal>
                            <div>
                                <p className='value' onClick={() => viewAreaFilter('M34')}>{countInfos?countInfos['M34']:0}</p>
                                <p className='label'>远程联网</p>
                            </div>
                            <div>
                                <p className='value' onClick={() => viewAreaFilter('M30')}>{countInfos?countInfos['M30']:0}</p>
                                <p className='label'>微型消防站</p>
                            </div>
                            <div>
                                <p className='value' onClick={() => viewAreaFilter('M33')}>{countInfos?countInfos['M33']:0}</p>
                                <p className='label'>充电桩</p>
                            </div>
                            <div>
                                <p className='value' onClick={() => viewAreaFilter('M32')}>{countInfos?countInfos['M32']:0}</p>
                                <p className='label'>公共视频</p>
                            </div>
                            <div>
                                <p className='value' onClick={() => viewAreaFilter('M36')}>{countInfos?countInfos['M36']:0}</p>
                                <p className='label'>高空瞭望</p>
                            </div>
                            <div>
                                <p className='value' onClick={() => viewAreaFilter('M31')}>{countInfos?countInfos['M31']:0}</p>
                                <p className='label'>室外消火栓</p>
                            </div>
                        </DeviceTotal>
                        <SearchBox >
                            <p onClick={() => doLink('/SearchPage')}>单位搜索检查</p>
                            <i className='iconfont scan' onClick={() => doScan()}>&#xe715;</i>
                        </SearchBox>
                        <Mymenu>
                            <MenuItem onClick={() => doLink('/CheckTypes')}>
                                <div className='icon search'></div>
                                <p>日常巡查</p>
                            </MenuItem>
                            <MenuItem onClick={() => doLink('/PatrolRecord')}>
                                <div className='icon query'></div>
                                <p>巡查记录</p>
                            </MenuItem>
                            <MenuItem onClick={() => doLink('/RecordFire')}>
                                <div className='icon fireRecord'></div>
                                <p>出警记录录入</p>
                            </MenuItem>
                            <MenuItem onClick={() => doLink('/TroubleFix')}>
                                <div className='icon hiddenQuery'></div>
                                <p>隐患整改</p>
                            </MenuItem>
                            <MenuItem onClick={() => doLink('/Parts')}>
                                <div className='icon partAdd'></div>
                                <p>单位维护</p>
                            </MenuItem>
                            {/* <MenuItem>
                                <div className='icon dayCheck'></div>
                                <p>隐患督办</p>
                            </MenuItem> */}
                        </Mymenu>
                    </div>    
                </Scroll>
            </Container>
       </div>
    )
}

// 映射 Redux 全局的 state 到组件的 props 上
const mapStateToProps = state => ({
    // 不要在这里将数据 toJS
    // 不然每次 diff 比对 props 的时候都是不一样的引用，还是导致不必要的重渲染，属于滥用 immutable
    mainInfo: state.getIn (['main', 'mainInfo']),
    rankInfo: state.getIn (['main', 'rankInfo']),
  });

// 映射 dispatch 到 props 上
const mapDispatchToProps = dispatch => {
    return {
      getMainInfoDataDispatch(params) {
        dispatch(actionTypes.getMainInfo(params));
      },
      getRankInfoDataDispatch(params) {
        dispatch(actionTypes.getRankInfo(params));
      }
    }
};

//用connect将UI组件包装成容器组件
export default connect(mapStateToProps,mapDispatchToProps)(React.memo(Main))