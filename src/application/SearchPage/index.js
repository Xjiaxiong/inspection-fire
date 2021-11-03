import React, { useEffect, useState, useCallback} from 'react'
import { SearchBar, List } from 'antd-mobile'
import NoDataTip from '../../components/NoDataTip/index'
import { Top, ScrollContainer, SubBox } from './style'
import { debounce } from '../../api/utils'
import { getPartbriefByKeyRequest } from '../../api/request'
import { getWrapParams } from '../../api/utils'
import Scroll from '../../baseUI/scroll/index'

const Item = List.Item;
const Brief = Item.Brief;

function SearchPage (props) {
    const pageSize = 10;
    const [curPage, setCurPage] = useState(0)
    const [searchVal, setSearchVal] = useState('');
    const [list, setList] = useState([]);
    let autoFocusInst = null;
    useEffect(() => {
        autoFocusInst.focus()
        // eslint-disable-next-line
    },[])
    useEffect(() => {
        if(searchVal) {
            getSearchList()
        }
        // eslint-disable-next-line
    },[searchVal])
    useEffect(() => {
        if(curPage > 0) {
            getMoreSearchList();
        }
        // eslint-disable-next-line
    },[curPage])

    // eslint-disable-next-line 
    const debouncedSave = useCallback(
		debounce(nextValue => setSearchVal(nextValue), 1000),
        []
    );
    
    const onChange = (val) => {
        debouncedSave(val)
    }
    const goCheck = uuid => {
        let path = '/UnitCheckTypes'
        props.history.push(`${path}?fsocial_id=${uuid}`)
    }
    const getSearchList = async () => {
        if(!searchVal) return
        let params = {
            "keywords": searchVal,
            "pageflag": 0,
            "pagesize": pageSize,
        }
        let res = await getPartbriefByKeyRequest(getWrapParams(params)).catch((e) => {
            console.log('搜索失败了')
        })
        if(res && res.code === '1') {
            if(res.data) {
                setList(res.data)
            }
        }
    }
    const getMoreSearchList = async () => {
        let params = {
            "keywords": searchVal,
            "pageflag": curPage,
            "pagesize": pageSize,

        }
        let res = await getPartbriefByKeyRequest(getWrapParams(params)).catch((e) => {
            console.log('搜索失败了')
        })
        if(res && res.code === '1') {
            let moreList = res.data;
            if(moreList) {
                setList([...list,...moreList])
            }
        }
    }
    const renderSubBox = (name,type,address) => {
        return (
            <SubBox>
                <div>
                    <i className='iconfont'>&#xe614;</i>
                    <span>{name}</span>
                </div>
                <div>
                    <i className='iconfont'>&#xe639;</i>
                    <span>{type}</span>
                </div>
                <div>
                    <i className='iconfont'>&#xe603;</i>
                    <span>{address}</span>
                </div>
            </SubBox> 
        )
    }
    const goBack = () => {
        props.history.goBack();
    }
    const pullUpFun = () => {
        setCurPage(curPage+1)
    }
    const pullDownFun = () => {
        setCurPage(0)
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
                onChange={(val) => onChange(val)}/>
            </Top>
            <ScrollContainer>
                <Scroll
                    pullUp={()=> pullUpFun() }
                    pullDown={()=> pullDownFun() }
                    pullUpLoading={false}
                    pullDownLoading={false} 
                    refresh>
                    <div>
                        <List>
                            {
                                list.map(item => (
                                    <Item
                                        onClick={() => goCheck(item.fsocial_id)}
                                        key={item.fsocial_id} 
                                        arrow="horizontal">
                                        {item.fsocial_name}
                                        <Brief>
                                            {renderSubBox(item.flink_man,item.funit_name,item.faddress)}   
                                        </Brief>
                                    </Item>))
                            }
                        </List>
                        { list.length === 0 ? <NoDataTip>请搜索点什么...</NoDataTip> : '' }
                     </div>
                </Scroll>         
            </ScrollContainer>
       </>     
    )
}

export default React.memo(SearchPage)