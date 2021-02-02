import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Scroll from '../scroll/index'
import NoDataTip from '../../components/NoDataTip/index'
import { getExceptionMsg } from '../../api/request'
import { getWrapParams } from '../../api/utils'
import { formatDate } from '../../api/constant'
import fireImg from '../../assets/imgs/fire.png'
import elecImg from '../../assets/imgs/elec.png'
import faultImg from '../../assets/imgs/fault.png'
import PropTypes from 'prop-types'
const FullPage = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.3);
    top: 0;
    left: 0;
    z-index: 999;
    visibility: hidden;
    .list-wrap {
        position: absolute;
        width: 90%;
        height: 80%;
        top: 100%;
        left: 5%;
        background-color: #F6F6F6;
        transition: top .3s;
    }
    li {
        background-color: #fff;
        padding: 16px;
        display: flex;
        font-size: 16px;
        border-bottom: 1px solid  rgba(25,31,37,.04);
        .icon {
            width: 36px;
            height: 36px;
            margin-right: 8px;
        }
        .content {
            flex: 1;
            .title {
                font-weight: 400;
                font-size: 16px;
                color: #101010;
                margin-bottom: 15px;
            }
            .bottom {
                display: flex;
                font-size: 14px;
                color:#101010;
                .left {
                    margin-right: auto;
                    color:rgba(25, 31, 37, 0.40);
                }
                .right {
                    margin-left: auto;
                }
            }
        }
    }
`

const pageSize = 20;
const getIcon = type => {
    return type === 'M20' ? fireImg : type === 'M21' ? elecImg : faultImg
}

function PopList(props) {
    const { mtype, show } = props
    const { hidePop, toProject } = props
    const [list, setList] = useState([])
    const [pageNow, setPageNow] = useState(0)
    useEffect(() => {
        console.log("list---", list)
        if(list.length === 0) {
            getList()
        }
        // eslint-disable-next-line
    },[])
    useEffect(() => {
        if(pageNow > 0) {
            getMoreList()
        }
        // eslint-disable-next-line
    },[pageNow])
    const getList = async () => {
        let res = await getExceptionMsg(getWrapParams({
            mtype: mtype,
            pagenow: 0,
            pagesize:pageSize
        }))
        if(res && res.code === '1') {
            setList(res.data)
        }
    }
    const getMoreList = async () => {
        let res = await getExceptionMsg(getWrapParams({
            mtype: mtype,
            pagenow: pageNow,
            pagesize: pageSize
        }))
        if(res && res.code === '1') {
            setList([...list,...res.data])
        }
    }
    const isShowList = () => {
        if(show){
            return {
              top: '10%'
            }
        }
        return {
            top: '100%'
        }
    }
    return ( 
        <FullPage onClick={() => hidePop()} style={{
            visibility: show ? 'visible' : 'hidden'}}>
            <div className="list-wrap" style={isShowList()}>
                <Scroll
                pullDown = {() => getList()}
                pullUp={() => setPageNow(pageNow+1)} 
                refresh>
                    <ul>
                        {
                            list.map(item => (
                                <li onClick={() => toProject(item.fproject_uuid)} key={item.fproject_uuid}>
                                    <img className="icon" src={getIcon(mtype)} alt=""/>
                                    <div className="content">
                                        <div className="title">
                                            {item.fexc_name}
                                        </div>
                                        <div className="bottom">
                                            <div className="left">
                                                {formatDate(item.fcome_time)}
                                            </div>
                                            <div className="right">
                                                {item.fstate_name}
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </Scroll>
                { list.length === 0 ? <NoDataTip></NoDataTip> : null }
            </div>
        </FullPage>
    );
}

PopList.protoTypes = {
    mtype: PropTypes.oneOf(['M20','M21','M22']),
    show: PropTypes.bool,
    hidePop: PropTypes.func,
    toProject: PropTypes.func,
}
PopList.defaultProps = {
    mtype: 'M20',
    show: false,
    hidePop: () => {},
    toProject: () => {}
};

export default React.memo(PopList);