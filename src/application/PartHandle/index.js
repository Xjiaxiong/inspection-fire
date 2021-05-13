import React, { useEffect, useState,useCallback } from 'react'
import {
    ScrollContainer,
    SelectPanel,
    Footer
} from './style'
import { 
    List,
    Picker, 
    InputItem,
    TextareaItem, 
    Button,
    Checkbox,
    ImagePicker 
} from 'antd-mobile';
import { createForm } from 'rc-form';
import Scroll from '../../baseUI/scroll/index'
import { 
    upImgRequest,
    getAppTypeRequest,
    getPartUnitTypes,
    addPartRequest,
    getPartInfoRequest,
    updatePartInfoRequest
 } from '../../api/request'
import { 
    GetQuery, 
    getWrapParams, 
    debounce, 
    compress, 
    dataURItoBlob 
} from '../../api/utils'
import showLoading from 'gdt-jsapi/showLoading';
import hideLoading from 'gdt-jsapi/hideLoading';
import toast from 'gdt-jsapi/toast';
import Schema from 'async-validator';
import alert from 'gdt-jsapi/alert';
import scan from 'gdt-jsapi/scan';
import locateOnMap from 'gdt-jsapi/locateOnMap';
import previewImage from 'gdt-jsapi/previewImage'
import setTitle from 'gdt-jsapi/setTitle'

const Item = List.Item;
const CheckboxItem = Checkbox.CheckboxItem;
const notificationInit = [
    { value: 'A', label: '火情创建提醒', ischeck: 0 },
    { value: 'B', label: '火情确认提醒', ischeck: 0 },
    { value: 'D', label: '电力故障提醒', ischeck: 0 },
]
const isMsgSendOption = [
    {value: "1", label: '是'},
    {value: "0", label: '否'},
]
const socialUnitsInit = []
const descriptor = {
    partName:{
        type: 'string',
        required: true,
        message: "单位名称必填!" 
    },
    partShortName: {
        type: 'string',
        required: true,
        message: "简称必填!"
    },
    address: {
        type: 'string',
        required: true,
        message: "地址必填!"
    },
    lng: {
        type: 'string',
        required: true,
        message: "经度必填!"
      },
    lat: {
        type: 'string',
        required: true,
        message: "纬度必填!"
    },
    linkman: {
        type: 'string',
        required: true,
        message: "联系人必填!"
    },
    tel: {
        type: 'string',
        required: true,
        message: "电话非法!"
    },
    unit: {
        type: 'array',
        required: true,
        message: "地址必填!"
    },
    isMsgSend: {
        type: 'array',
        required: true,
        message: "是否短信必选!"
    },
    apptype: {
        type: 'array',
        required: true,
        message: "app类型必选!"
    }
  };
  const validator = new Schema(descriptor);
  const MAX_LEV = 2;
//根据参数改变决定该界面是 “修改单位update” 还是 “新增单位add”
const PartHandle = (props) => {
    /*
     _type 的值 ['add','update']
     fsocial_uuid 的值可选
    */

    const { _type, fsocial_uuid } = GetQuery(props.location.search)
    const [notification, setNotification] = useState(notificationInit)
    const [socialUnits, setSocialUnits] = useState(socialUnitsInit)
    const [appTypes, setAppTypes] = useState([])
    const [villageName, setVillageName] = useState('请选择村')
    const [villageCode, setVillageCode] = useState('')
    //行政区划筛选
    const [areaSelectors, setAreaSelectors] = useState([])
    const [areaTop, setAreaTop] = useState(false)
    const [areaList, setAreaList] = useState([]);
    const [areaCode, setAreaCode] = useState('');
    const [curName, setCurName] = useState('')
    const [curLev, setCurLev] = useState(2)

    const [files, setFiles] = useState([])
    const [attachId, setAttachId] = useState('')
    const [submitIndex, setSubmitIndex] = useState(0)

    const { getFieldProps, setFieldsValue, getFieldsValue } = props.form

    const onChangeFiles = (files, type) => {
        setFiles(files)
        setAttachId('');
    }
    useEffect(() => {
        setTitle({
            title: _type === 'add' ? '单位新增' : '单位修改'
        }).then(res => {
            console.log(res)
        }).catch(err => {})
        // eslint-disable-next-line
    },[])
    useEffect(() => {
        if(appTypes.length === 0) {
             initPage()
        }
        // eslint-disable-next-line
    },[])
    useEffect(() => {
        if(submitIndex > 0) {
            submitAction()
        }

    },[submitIndex])
    const initPage = async () => {

        //app类型options
        let resAppTypes =  await getAppTypeRequest(getWrapParams())
        if(resAppTypes && resAppTypes.code === '1') {
            let arr = resAppTypes.data.map(item => {
                return {
                    label: item.text,
                    value: item.id
                }
            })
            setAppTypes(arr)
        }
        //单位性质options
        let resUnits = await getPartUnitTypes(getWrapParams({flag:"F_06"}))
        if(resUnits && resUnits.code === '1') {
            let arr = resUnits.data.map(item => {
                return {
                    label: item.text,
                    value: item.id
                }
            })
            setSocialUnits(arr)
        }
        //省份code
        const proviceCode = localStorage.getItem('province_code') || '330000'
        let resArea = await getPartUnitTypes(getWrapParams({
            flag: 'F_02',
            fparent_long_code: proviceCode,
            fsocial_name: ''
        }))
        if(resArea && resArea.code === '1') {
            setAreaList(resArea.data)
        }
        if(_type === 'add') {
            //滞空所有输入项
            // setFieldsValue({
            //     'lng': '',
            //     'lat': ''
            // })
        }
        if(_type === 'update') {
            //请求该单位的信息
            initInfo()
        }
    }   
    const initInfo = async () => {
        showLoading({text: "数据加载中..."})
        let res = await getPartInfoRequest(getWrapParams({fsocial_uuid,}))
        hideLoading()
        if(res && res.code === '1') {

            let data = res.data[0];
            // alert({
            //     message: JSON.stringify(data),
            //     title: "查看图片失败",
            //     button: "确定"
            // })
            setFieldsValue({
                'partName': data.fsocial_name,
                'partShortName': data.fsp_name,
                'address': data.faddress,
                'lng': data.flongitude,
                'lat': data.flatitude,
                'linkman': data.flink_man,
                'tel': data.ftel_no,
                'qrNumber': data.fcode,
                'unit': [data.funit_type],
                'isMsgSend': [data.fis_sendmsg],
                'apptype': [data.fapp_type]
            })
            if(data.fattach_link) {
                //要调整
                setFiles([{
                    url: data.fattach_link
                }])
                setAttachId(data.fattach_id)
            }
            if(data.fvillage_code) {
                setVillageName(data.farea_name4)
                setVillageCode(data.fvillage_code)
            }

            let notifycations = data.phonecall_mode;
            let notifyCopy =  [...notificationInit]
            if(notifycations && notifycations.length > 0) {
                for(let i=0; i<notifycations.length; i++){
                    notifyCopy.map(item => {
                        if(item.value === notifycations[i]){
                            item.ischeck = 1;
                        }
                        return 1
                    })
                }
                setNotification(notifyCopy)
            }

            //设置行政区划
            if(data.fvillage_code) {
                setAreaSelectors([data.fcity_code, data.fcounty_code, data.ftown_code, data.fvillage_code])
                getAreaList(data.ftown_code)
                setCurLev(5)
                setAreaCode(data.fvillage_code)
            }
        } 
    }
    const debouncedSave = useCallback(
		debounce(() => submit(), 1500),
        []
    );
    const submit = async () => {
        console.log('getFieldsValue()-----', getFieldsValue())
        const formRes = getFieldsValue()
        // alert({
        //     message: JSON.stringify(formRes),
        //     title: "验证失败",
        //     button: "确定"
        // })
        // return
        validator.validate(formRes, (errors, fields) => {
            if (errors) {
              console.log(errors[0].message)
              alert({
                message: errors[0].message,
                title: "验证失败",
                button: "确定"
              })
              return;
            }
            // validation passed
            setSubmitIndex(submitIndex+1)
        });
    }
    const upload = async (dataURL) => {
        let fd = new FormData();
        let blob = dataURItoBlob(dataURL);
        fd.append('file', blob);
        let resImg = await upImgRequest(fd)
        const data = resImg.data[0]
        let logoID = data && data.newFileName

        doSubmit(logoID)

    }
    const submitAction = async () => {
        //如果有图片先上传图片
        showLoading({text:'提交中...'})
        //上传图片
        if(files[0] && files[0].file) {
            //压缩上传
            let file = files[0].file
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = function () {
                var result = this.result;
                var img = new Image();
                img.src = result;
                //如果图片大小小于200kb，则直接上传
                if (result.length <= 200*1024) {
                    img = null;
                    upload(result);
                    return;
                }
                //图片加载完毕之后进行压缩，然后上传
                if (img.complete) {
                    callback();
                } else {
                    img.onload = callback;
                }
                function callback() {
                    var data = compress(img);
                    upload(data);
                    img = null;
                }
            };
        } else {
            doSubmit()
        }
    }
    const doSubmit = async (logoID) => {
        const formRes = getFieldsValue()
        if(attachId) {
            logoID = attachId
        }
        //通知模式
        let checkResults = [];
        notification.map(item => {
            if(item.ischeck === 1) {
                checkResults.push(item.value)
            }
            return 1
        })
        let notifications = checkResults.join('');
        let resTel = formRes.tel
        let params = {
            fsocial_name: formRes.partName,
            fsocial_sp_name: formRes.partShortName,
            funit_type: formRes.unit[0],
            faddress: formRes.address,
            flongitude: formRes.lng,
            flatitude: formRes.lat,
            flink_man: formRes.linkman,
            ftel_no: resTel.replace(/ /g,''),
            fcode: formRes.qrNumber,
            fis_sendmsg: formRes.isMsgSend[0],
            fapp_type: formRes.apptype[0],
            fattach_link: logoID,
            fprovinceid: localStorage.getItem("province_code") || '331000',
            fcity_code: areaSelectors[0] ? areaSelectors[0] :'',
            fcounty_code: areaSelectors[1] ? areaSelectors[1] :'',
            ftown_code: areaSelectors[2] ? areaSelectors[2] :'',
            fvillage_code: areaSelectors[3] ? areaSelectors[3] : villageCode,
            phonecall_mode: notifications, //电话拨打情况
            saveflag: formRes.unit[0] === '01' ? '2' : '1'
        }
        console.log('params---', params)
        if(_type === 'add') {
            // alert({
            //     message: JSON.stringify(params),
            //     title: "验证失败",
            //     button: "确定"
            // })
            // return
            let res = await addPartRequest(getWrapParams(params)).catch(e => {
                toast({icon:"error",text:"提交失败!"})
            })
            hideLoading()
            if(res && res.code === '1') {
                toast({
                    icon:"success",
                    text:"新增成功!",
                    duration: 1.5
                })
                setTimeout(() => {
                    props.history.goBack();
                },1500)
            } else {
                toast({
                    icon:"fail",
                    text:"新增失败!",
                })
            }
        } else {
            let updateParams = {
                ...params,
                fsocial_uuid
            } 
            let res = await updatePartInfoRequest(getWrapParams(updateParams)).catch(e => {
                toast({icon:"error",text:"修改失败!"})
            })
            hideLoading()
            if(res && res.code === '1') {
                toast({
                    icon:"success",
                    text:"修改成功!",
                    duration: 1
                })
                setTimeout(() => {
                    props.history.goBack();
                },2000)
            } else {
                toast({
                    icon:"fail",
                    text:"修改失败!",
                })
            }
        }
    }
    const getPos = () => {
        //调用钉钉的采点能力
        locateOnMap({
            // latitude: 39.903578, // 纬度，非必须
            // longitude: 116.473565, // 经度，非必须
        }).then(res => {
            setFieldsValue({
                'lng': res.longitude+"",
                'lat': res.latitude+""
            })
        }).catch(err => {})
    }
    const doScan = () => {
        scan({type:"all"}).then(res => {
            const params = GetQuery(res.text)
            setFieldsValue({
                'qrNumber': params.r,
            })
        }).catch(e => {
            alert({message:`扫描失败:${e}`})
        })
    }
    const onChangeCheck = (checkedValue) => {
        let checks = [...notification]
        for(let i=0; i<notification.length; i++) {
            if(notification[i].value === checkedValue) {
                if(checks[i].ischeck === 1) {
                    checks[i].ischeck = 0;
                } else {
                    checks[i].ischeck = 1;
                }
            }
        }
        setNotification(checks)
    }
    const chooseOne = (areaCode,name) => {
        const areaSelects = [...areaSelectors]//选择的结果
        setCurName(name)
        setAreaCode(areaCode)
        const len = areaSelects.length;
        if( len < 3) {
            areaSelects.push(areaCode)
            getAreaList(areaCode)
            setCurLev(areaSelects.length+2)
            setAreaSelectors(areaSelects)
        } else {
            areaSelects.length = 3;
            areaSelects.push(areaCode)
            setCurLev(5)
            setAreaSelectors(areaSelects)
        }
    }
    const getAreaList = async (areaCode) => {
        let resArea = await getPartUnitTypes(getWrapParams({
            flag: 'F_02',
            fparent_long_code: areaCode,
        }))
        if(resArea && resArea.code === '1') {
            setAreaList(resArea.data)
        }
    }
    const resetArea = (lev) => {
        const proviceCode = localStorage.getItem('province_code') || '330000'
        let areaCode = '';
        let d = [...areaSelectors]
        let l = d.length;
        if(lev === 2) {
            d.length = 0;
            areaCode = proviceCode
        }
        if(lev === 3 ) {
            if(l < 1) {
                alert({
                    message: "请选择上一级行政区划!",
                    title: "提示",
                })
                return
            } 
            areaCode = d[0]
            d.length = 1;
        }
        if(lev === 4) {
            if(l < 2) {
                alert({
                    message: "请选择上一级行政区划!",
                    title: "提示",
                })
                return
            } 
            areaCode = d[1]
            d.length = 2;
        }
        if(lev === 5) {
            if(l < 3) {
                alert({
                    message: "请选择上一级行政区划!",
                    title: "提示",
                })
                return
            } 
            areaCode = d[2]
            d.length = 3;
        }
        setCurLev(lev)
        getAreaList(areaCode)
        setAreaSelectors(d)
        
    }
    const hidePanel = () => {
        setAreaTop(false)
    }
    const doComfirm = () => {
        if(areaSelectors.length === 4) {
            setVillageName(curName)
        }
        setAreaTop(false)
        console.log("areaSelectors---",areaSelectors)
    }
    const viewPic = (index, files) => {
        let url = files[0].url;
        previewImage({
            current: url,
            urls: [url],
        }).then(res => {
            console.log('查看图片成功')
        }).catch(err => {
            alert({
                message: err,
                title: "查看图片失败",
                button: "确定"
            })
        })
    }
    return (
        <>
            <SelectPanel style={ areaTop ? {visibility:'visible',opacity:1} : {visibility: 'hidden',opacity:0}}>
                <div className="top">
                    <div className="left">
                        <Button type="primary" size="small" onClick={() => hidePanel()}>取消</Button>
                    </div>
                    <div className="center">请选择村</div>
                    <div className="right">
                        <Button type="primary" size="small" onClick={() => doComfirm()}>确定</Button>
                    </div>
                </div>
                <div className='condition-row'>
                    <div 
                        className='area-type'
                        onClick={() => resetArea(MAX_LEV)} 
                        style={curLev === MAX_LEV ? {color:'#3296FA'}:{}}>
                        选择市
                        <i className='caret'></i>
                    </div>
                    <div 
                        className='area-type'
                        onClick={() => resetArea(3)}  
                        style={curLev === 3 ? {color:'#3296FA'}:{}}>
                        选择区县
                        <i className='caret'></i>
                    </div>
                    <div 
                        className='area-type'
                        onClick={() => resetArea(4)}  
                        style={curLev === 4 ? {color:'#3296FA'}:{}}>
                        选择街道
                        <i className='caret'></i>
                    </div>
                    <div 
                        className='area-type'
                        onClick={() => resetArea(5)}  
                        style={curLev === 5 ? {color:'#3296FA'}:{}}>
                        选择村
                        <i className='caret'></i>
                    </div>
                </div>
                <ul className='area-list-body'>
                    <Scroll refresh>
                        <div>
                            { areaList.map((item, index) => (
                                <li 
                                    key={item.farea_code} 
                                    onClick={() => chooseOne(item.farea_code,item.farea_name)}>
                                        {item.farea_name}
                                    {areaCode === item.farea_code ? <i className='iconfont right'>&#xe6cf;</i> : null}
                                </li>
                            )) }
                        </div>
                    </Scroll>
                </ul>
            </SelectPanel>
            <ScrollContainer>
                <Scroll refresh>
                    <div>
                        <List renderHeader={() => '基础信息'}>
                            <InputItem
                                {...getFieldProps('partName')}
                                placeholder="请输入单位名称">
                                单位名称
                            </InputItem>
                            <InputItem
                                {...getFieldProps('partShortName')}
                                placeholder="请输入简称">
                                简称
                            </InputItem>
                            <Picker data={socialUnits} cols={1} {...getFieldProps('unit')}>
                                <Item arrow="horizontal">性质</Item>
                             </Picker>
                             <Item
                                onClick={() => setAreaTop(true)} 
                                arrow="horizontal"
                                extra={villageName}>请选择村</Item>
                             <TextareaItem
                                {...getFieldProps('address')}
                                placeholder="请输入地址"
                                title="地址"
                                autoHeight/>
                            <Item>
                                <div style={{display:'flex',justifyContent: 'flex-end'}}>
                                    <Button type="primary" size="small" onClick={() => getPos()}>点击采点</Button>
                                </div>
                            </Item>
                            <InputItem
                                {...getFieldProps('lng')}
                                placeholder="采集经度"
                                editable={false}>
                                经度
                            </InputItem>
                            <InputItem
                                {...getFieldProps('lat')}
                                placeholder="采集纬度"
                                editable={false}>
                                纬度
                            </InputItem>
                             <InputItem
                                {...getFieldProps('linkman')}
                                placeholder="请输入联系人">
                                联系人
                            </InputItem>
                            <InputItem
                                {...getFieldProps('tel')}
                                type="phone"
                                placeholder="请输入电话">
                                电话
                            </InputItem>
                            <InputItem
                                {...getFieldProps('qrNumber')}
                                placeholder="扫描二维码获取"
                                extra={<i className='iconfont scan' style={{fontSize:'20px'}}>&#xe715;</i>}
                                onExtraClick={() => doScan()}
                                editable={false}>
                                二维码门牌
                            </InputItem>
                        </List>
                        <List renderHeader={() => '通知'}>
                            <Picker data={isMsgSendOption} cols={1} {...getFieldProps('isMsgSend')}>
                                <Item arrow="horizontal">短信通知</Item>
                            </Picker>
                            <Picker data={appTypes} cols={1} {...getFieldProps('apptype')}>
                                <Item arrow="horizontal">App类型</Item>
                            </Picker> 
                            {
                                notification.map(i => (
                                    <CheckboxItem 
                                        key={i.value} 
                                        onChange={() => onChangeCheck(i.value)}
                                        checked={i.ischeck === 1}>
                                        {i.label}
                                    </CheckboxItem>
                                ))
                            }      
                        </List>
                        <List renderHeader={() => '上传照片'} >
                            <div style={{padding:'5px'}}>
                                <ImagePicker
                                    files={files}
                                    onChange={(files, type) => onChangeFiles(files, type)}
                                    onImageClick={(index,files) => viewPic(index,files)}
                                    selectable={files.length < 1}/>
                            </div>
                        </List>                
                    </div>
                </Scroll>    
            </ScrollContainer>
            <Footer>
                <Button type="primary" onClick={() => debouncedSave()}>提交</Button>
            </Footer>
        </>
        
    )
}

const PartHandleWrapper = createForm()(PartHandle)

export default React.memo(PartHandleWrapper)