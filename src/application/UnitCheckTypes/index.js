import React, { useState, useEffect } from 'react'
import {
    Container,
    Top
} from './style'
import Scroll from '../../baseUI/scroll/index'
import {
    List,
    Toast
} from 'antd-mobile'
import NoDataTip from '../../components/NoDataTip/index'
import { getPartChecksRela, getPartChecksByRfid} from '../../api/request'
import { getWrapParams, GetQuery } from '../../api/utils'
import dd from 'gdt-jsapi'

const ListItem = List.Item;

function UnitCheckTypes(props) {
    const querys = GetQuery(props.location.search)
    const [checkTypeList, setCheckTypeList] = useState([])
    const [partInfo, setPartInfo] = useState(null)

    //通过异步函数拿到当前页面的数据
    useEffect(() => {
        if(checkTypeList.length === 0) {
            getPageData()
        }
        // eslint-disable-next-line
    },[])

    const getPageData = async () => {
        dd.showLoading({text: "加载中"})
        try {
            let params = {}
            let res = null;
            if(querys.fsocial_id) {
                params = {
                    "fsocial_uuid": querys.fsocial_id,
                }
                res = await getPartChecksRela(getWrapParams(params)).catch(e => {
                    Toast.fail('请求失败!', e)
                })
            } else {
                params = {
                    "frfid_uuid": querys.frfid_uuid,
                }
                res = await getPartChecksByRfid(getWrapParams(params)).catch(e => {
                    Toast.fail('请求失败!', e)
                }) 
            }
            dd.hideLoading()
            //console.log('getPartChecksRela',res)
            //拿到数据进行处理
            if(res && res.code === "1") {
                setPartInfo(res.data[0])
                setCheckTypeList(res.data[0].modelist)
            }
        } catch(e) {
            console.log('error',e)
        }
    }
    const handleClick = fgridmodelmain_uuid => {
        let fsocial_id = partInfo.fsocial_uuid
        props.history.push(`/UnitCheck?fgridmodelmain_uuid=${fgridmodelmain_uuid}&fsocial_id=${fsocial_id}`)
    }
    return (
        <>
            <Container>
                <Scroll refresh>
                    <div>
                        <Top>
                            <div className='block'>
                                <div className='label'>被检查单位(场所)</div>
                                <div className='value'>{partInfo?partInfo.fsocial_name:'暂无'}</div>
                            </div>
                            <div className='block'>
                                <div className='label'>单位性质</div>
                                <div className='value'>{partInfo?partInfo.funit_name:'暂无'}</div>
                            </div>
                            <div className='block'>
                                <div className='label'>地址</div>
                                <div className='value'>{partInfo?partInfo.faddress:'暂无'}</div>
                            </div>
                            <div className='row'>
                                <div className='f-col-6'>
                                    <div className='label'>经营者</div>
                                    <div className='value'>{partInfo?partInfo.flink_man:'暂无'}</div>
                                </div>
                                <div className='f-col-6'>
                                    <div className='label'>联系电话</div>
                                    <div className='value'>{partInfo?partInfo.ftel_no:'暂无'}</div>
                                </div>
                            </div>
                        </Top>
                        <List>
                            {
                                checkTypeList.map(item => (
                                    <ListItem
                                        key={item.fgridmodelmain_uuid}
                                        multipleLine
                                        wrap 
                                        arrow='horizontal' 
                                        onClick={() => handleClick(item.fgridmodelmain_uuid)}>
                                        {item.fmodename}
                                    </ListItem>
                                ))
                            }
                        </List>
                        { checkTypeList.length === 0 ? <NoDataTip>无检查模板数据</NoDataTip> : null }    
                    </div>
                </Scroll>    
            </Container>
        </>
    )
}

export default React.memo(UnitCheckTypes)