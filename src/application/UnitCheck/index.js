import React, { useState, useEffect } from 'react'
import {
    Container,
    Top,
    CheckList,
    ListItem,
    Footer
} from './style'
import Scroll from '../../baseUI/scroll/index'
import MySwitch from '../../components/MySwitch/index'
import {
    List,
    InputItem,
    ImagePicker,
    Button
} from 'antd-mobile'
import { getCheckTempRequest, submitGridRecordDtl, upImgRequest } from '../../api/request'
import { getWrapParams, GetQuery } from '../../api/utils'
import showLoading from 'gdt-jsapi/showLoading'
import hideLoading from 'gdt-jsapi/hideLoading'
import toast from 'gdt-jsapi/toast'

function UnitCheck(props) {
    const querys = GetQuery(props.location.search)
    const [checksSubmit, setChecksSubmit] = useState([])
    const [partInfo, setPartInfo] = useState(null)

    //通过异步函数拿到当前页面的数据

    useEffect(() => {
        if(!partInfo) {
            getCheckTemp()
        }
        // eslint-disable-next-line
    },[partInfo])

    const getCheckTemp = async () => {
        showLoading({text:'数据查询中...'})
        try {
            let res = await getCheckTempRequest(getWrapParams({
                "fsocial_id": querys.fsocial_id,
                "fgridmodelmain_uuid": querys.fgridmodelmain_uuid
            }))
            hideLoading()
            //拿到数据进行处理
            if(res.code === "1") {
                setPartInfo(res.data[0])
                let temps = res.data[0].data;
                let handleTemps = temps.map((item) => {
                    let obj = {
                        uuid: item.fgridmodeldtl_uuid, 
                        text: item.fstandard_name,
                        desc: item.fcheck_standard,
                        total_score: item.ftotal_score,
                        fis_vote: item.fis_vote,
                        isNormal: 1,
                        score: '',
                        checkPlace: '',
                        imgs: []
                    }
                    return obj
                })
                setChecksSubmit(handleTemps)
            }
        } catch(e) {
            console.log('error',e)
        }

    }

    const onChangeSwitch = (index) => {
        const list = checksSubmit.map( item => {
            if(item.uuid === index) {
                if(item.isNormal === 1) {
                    item.isNormal = 0
                } else{
                    item.isNormal = 1
                }
            }
            return item
        })
        setChecksSubmit(list)

    }
    const onChangeScore = (val, index) => {
        const list = checksSubmit.map( item => {
            if(item.uuid === index) {
                item.score = val
            }
            return item
        })
        setChecksSubmit(list)
    }
    const onChangePlace = (val, index) => {
        const list = checksSubmit.map( item => {
            if(item.uuid === index) {
                item.checkPlace = val
            }
            return item
        })
        setChecksSubmit(list)
    }
    const onChangeFiles = (files, type, index) => {
        const list = checksSubmit.map( item => {
            if(item.uuid === index) {
                item.imgs = files
            }
            return item
        })
        setChecksSubmit(list)
    }
    const submit = async ()=> {
        showLoading({text:'提交中...'})
        let flist = [];
        //处理图片上传
        for(let i=0;i<checksSubmit.length;i++) {
            let item = checksSubmit[i]
            let obj = {
                fgridmodeldtl_uuid: item.uuid,
                fcheck_standard: item.text,
                fstandard_name: item.desc,
                fdescription: item.checkPlace,
                fis_vote: item.fis_vote,
                ftotal_score: item.total_score,
                fdscore: item.score,
            }
            let fattach_list = [];
            for(let j=0; j<item.imgs.length;j++) {
                let img = item.imgs[j];
                let formData  = new FormData();
                formData.append("file", img.file);
                let resImg = await upImgRequest(formData)
                const data = resImg.data[0]
                let logoID = data && data.newFileName //获取上传以后的图片ID
                fattach_list.push({
                    "fattach_index": j,
                    "fattach_link": logoID,
                    "fattach_name": logoID
                })
            }
            obj.fattach_list = fattach_list
            flist.push(obj)
        }
        let params = {
            fgridmodelmain_uuid: querys.fgridmodelmain_uuid, 
            fsocial_uuid: querys.fsocial_id,
            isneed: '1',
            flist,
        }
        let res = await submitGridRecordDtl(getWrapParams(params))
        hideLoading()
        if(res && res.code === '1') {
            toast({
                duration: 1.5,
                icon: "success",
                text: "提交成功"
            }).then(res => {
                props.history.goBack()
            })
        } else {
            toast({
                duration: 1.5,
                icon: "error",
                text: "提交失败"
            })
        }
        
    }

    
    const renderCheckList = () => {
        if(checksSubmit.length === 0) {
            return null
        }
        return (
            <CheckList>
                {
                    checksSubmit.map(item => (
                        <ListItem key={item.uuid}>
                            <div className='content'>
                                <div className='text'>
                                    {item.text}
                                </div>
                                <div className='desc'>
                                    {item.desc}
                                </div>
                                <div className='btn'>
                                    <MySwitch
                                        checked={item.isNormal === 1 ? true : false}
                                        onChange={() => onChangeSwitch(item.uuid)}
                                    />
                                </div>
                            </div>
                            {
                                item.isNormal === 1 ? null : (
                                    <div>
                                        <List>
                                            <InputItem
                                                clear
                                                placeholder="请输入所扣分数"
                                                type="digit"
                                                value={item.score}
                                                onChange = {(val) => onChangeScore(val,item.uuid)}
                                                >所扣分数
                                            </InputItem>
                                            <InputItem
                                                clear 
                                                placeholder="请输入检查部位"
                                                type="text"
                                                value={item.checkPlace}
                                                onChange = {(val) => onChangePlace(val,item.uuid)}
                                                >检查部位
                                            </InputItem>
                                        </List>
                                        <div className='camera-box'>
                                            <div className='camera-box-title'>图片</div>
                                            <ImagePicker
                                                files={item.imgs}
                                                onChange={(files, type) => onChangeFiles(files, type, item.uuid)}
                                                onImageClick={(index, fs) => console.log(index, fs)}
                                                selectable={item.imgs.length < 3}
                                            />
                                        </div> 
                                    </div>
                                )
                            }
                        </ListItem> 
                    ))
                }     
        </CheckList> 
        )
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
                        { renderCheckList()}       
                    </div>
                </Scroll>    
            </Container>
            <Footer>
                <Button type="primary" onClick={() => submit()}>提交</Button>
            </Footer>   
        </>
    )
}

export default React.memo(UnitCheck)