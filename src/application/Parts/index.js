import React, { useEffect, useState, useCallback} from 'react'
import { SearchBar, List, Button, SwipeAction } from 'antd-mobile'
import { 
    Top, 
    ScrollContainer,
    SubBox,
    Warning,
    Footer
 } from './style'
import { debounce } from '../../api/utils'
import { formatDate } from '../../api/constant'
import { getWrapParams } from '../../api/utils'
import Scroll from '../../baseUI/scroll/index'
import { getParts, DelPartbyId } from '../../api/request'
import showLoading from 'gdt-jsapi/showLoading'
import hideLoading from 'gdt-jsapi/hideLoading'
import toast from 'gdt-jsapi/toast'

const Item = List.Item;
const Brief = Item.Brief;

const PAGE_SIZE = 20;
const Parts = (props) => {
    let autoFocusInst = null;
    const [searchVal, setSearchVal] = useState('');
    const [partList, setPartList] = useState([]);
    const [pageNum, setPageNum] = useState(0)
    useEffect(() => {
        autoFocusInst.focus()
    })
    useEffect(() => {
        getPartList()
        // eslint-disable-next-line
    },[])
    useEffect(() => {
        if(searchVal) {
            getPartListSearch()
        }
        // eslint-disable-next-line
    },[searchVal])
    useEffect(() => {
        if( pageNum > 0 ) {
            getMorePartList()
        }
        // eslint-disable-next-line
    },[pageNum])
    const getPartList = async () => {
        showLoading({text:'数据加载中...'})
        let res = await getParts(getWrapParams({
            page_size: PAGE_SIZE,
            page_num: 0,
            fsocial_name: searchVal,
        }))
        hideLoading()
        if(res && res.code === '1') {
            setPartList(res.data)
        }
    }
    const getPartListSearch = async () => {
        let res = await getParts(getWrapParams({
            page_size: PAGE_SIZE,
            page_num: 0,
            fsocial_name: searchVal,
        }))
        if(res && res.code === '1') {
            setPartList(res.data)
        }
    }
    const getMorePartList = async () => {
        showLoading({text:'加载更多...'})
        let res = await getParts(getWrapParams({
            page_size: PAGE_SIZE,
            page_num: pageNum,
            fsocial_name: searchVal,
        }))
        hideLoading()
        if(res && res.code === '1') {
            let arr = res.data;
            setPartList([...partList,...arr])
        }
    }
    const debouncedSave = useCallback(
		debounce(nextValue => setSearchVal(nextValue), 1000),
        []
    );
    const goBack = () => {
        props.history.goBack();
    }
    const renderSubBox = (address,type,man,time) => {
        return (
            <SubBox>
                <div>
                    <span>单位地址:</span>
                    <p>{address}</p>
                </div>
                <div>
                    <span>单位性质:</span>
                    <p>{type}</p>
                </div>
                <div>
                    <span>创建人:</span>
                    <p>{man}</p>
                </div>
                <div>
                    <span>创建时间:</span>
                    <p>{formatDate(time)}</p>
                </div>
            </SubBox> 
        )
    }
    const renderExtra = (checkOk) => {
        if(checkOk === '1') {
            return null
        }
        return (
            <Warning>
                <i className="iconfont">&#xe857;</i>
                信息不全
            </Warning>
        )
    }
    const deleteRow = async (uuid) => {

        showLoading({text:'删除中...'})
        let res = await DelPartbyId(getWrapParams({
            fsocial_uuid:uuid 	
        }))
        hideLoading()
        if(res && res.code === '1') {
            //停用成功
            let list = partList.filter(item => {
                return item.fsocial_uuid !== uuid
            })
            setPartList(list)
        } else {
            toast({icon:"error",text:"删除失败"})
        }

    }
    const toUpdate = (fsocial_uuid) => {
        const type = 'update';
        props.history.push(`/PartHandle?_type=${type}&fsocial_uuid=${fsocial_uuid}`)
    }
    const addPart = () => {
        const type = 'add';
        props.history.push(`/PartHandle?_type=${type}&fsocial_uuid=${999}`)
    }
    return (
        <>
            <Top>
                <SearchBar 
                ref={ref => autoFocusInst = ref}
                placeholder="请输入单位名称..."
                onSubmit={value => console.log(value, 'onSubmit')}
                onClear={value => console.log(value, 'onClear')}
                onFocus={() => console.log('onFocus')}
                onBlur={() => console.log('onBlur')}
                onCancel={() => goBack()}
                showCancelButton
                onChange={(val) => debouncedSave(val)}/>
            </Top>
            <ScrollContainer>
                <Scroll
                    pullUp={() => setPageNum(pageNum+1)} 
                    refresh>
                    <div>
                        <List>
                            {
                                partList.map(item => (
                                    <SwipeAction 
                                        autoClose
                                        right={[
                                            {
                                                text: '删除',
                                                onPress: () => deleteRow(item.fsocial_uuid),
                                                style: { background: '#fa483a', color: '#fff', width:'100px'}
                                            }
                                        ]}
                                        key={item.fsocial_uuid}>
                                        <Item
                                            onClick={() => toUpdate(item.fsocial_uuid)}
                                            extra={renderExtra(item.msgtype)}>
                                            {item.fsocial_name}
                                            <Brief>
                                                {
                                                    renderSubBox(item.faddress,item.funit_name,item.fcreator_name,item.fcreat_time)
                                                }   
                                            </Brief>
                                        </Item>
                                    </SwipeAction>
                                ))
                            }
                        </List>
                    </div>
                </Scroll>    
            </ScrollContainer>
            <Footer>
                <Button type="primary" onClick={() => addPart()}>+新增单位</Button>
            </Footer>        
        </>
    )
}

export default React.memo(Parts)