import React, { useEffect } from 'react'
import styled from 'styled-components'

import { List } from 'antd-mobile'
import Scroll from  '../../baseUI/scroll/index'
import Loading from '../../baseUI/loading/index'
import NoDataTip from '../../components/NoDataTip/index'
import icon from './zhangcheng.png'
import { connect } from "react-redux";
import { getWrapParams } from '../../api/utils'
import * as actionTypes from './store/actionCreators'

const ScrollContainer = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
`
const ListItem = List.Item;

const CheckTypes = (props)=> {

    const { checkTypeList, enterLoading } = props
    const { getCheckTypesDispatch } = props

    useEffect(() => {
        if(!checkTypeList.size) {
            getCheckTypesDispatch(getWrapParams({}))
        }
    },[checkTypeList,getCheckTypesDispatch])

    const checkTypeListJS = checkTypeList ? checkTypeList.toJS() : [];

    const handleClick = (uuid,type) => {
        props.history.push(`/SearchAround?fgridmodelmain_uuid=${uuid}&fsocialtype=${type}`)
    }

    return (
        <ScrollContainer>
            <Scroll
            pullDown={()=> {console.log('下拉')}} 
            pullUp={()=> {console.log('上拉')}} 
            refresh>
                <div>
                    <List>
                        {
                            checkTypeListJS.map(item => (
                                <ListItem
                                    key={item.fgridmodelmain_uuid}
                                    thumb={<img src={icon} alt="" width='32' height='32'/>}
                                    multipleLine
                                    wrap 
                                    arrow='horizontal' 
                                    onClick={() => handleClick(item.fgridmodelmain_uuid,item.fsocialtype,item.fquesiontype)}>
                                        {item.fmodename}
                                </ListItem>
                            ))
                        }
                    </List>
                    {checkTypeListJS.length ===0 ? <NoDataTip></NoDataTip> : null }   
                    { enterLoading ? <Loading></Loading> : null}
                </div>
            </Scroll>    
        </ScrollContainer>
    )
}
const mapStateToProps = state => ({
    checkTypeList: state.getIn (['checktypes', 'checkTypeList']),
    enterLoading: state.getIn (['checktypes', 'enterLoading'])
});
const mapDispatchToProps = dispatch => {
    return {
      getCheckTypesDispatch(params) {
        dispatch(actionTypes.getCheckTypes(params));
      }
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(React.memo(CheckTypes)) 
