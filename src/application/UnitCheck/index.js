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
let imgTemps = []
function UnitCheck(props) {
    const querys = GetQuery(props.location.search)
    const [checksSubmit, setChecksSubmit] = useState([])
    // const [imgTemps, setImgTemps] = useState([])
    const [partInfo, setPartInfo] = useState(null)

    //通过异步函数拿到当前页面的数据

    useEffect(() => {
        if(!partInfo) {
            imgTemps = [];
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
    const upload = async (dataURL,index) => {
        let fd = new FormData();
        let blob = dataURItoBlob(dataURL);
        fd.append('file', blob);
        let resImg = await upImgRequest(fd)
        const data = resImg.data[0]
        let logoID = data && data.newFileName
        // let imgsPre = [...imgTemps];
        imgTemps.push({
            "uuid": index,
            "fattach_index": 1,
            "fattach_link": logoID,
            "fattach_name": logoID
        })
        // console.log("upload",data)
        // setImgTemps(imgsPre)
    }
    const compress = (img) =>  {
          // 用于压缩图片的canvas
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext('2d');

        // 瓦片canvas
        var tCanvas = document.createElement("canvas");
        var tctx = tCanvas.getContext("2d");

        var initSize = img.src.length;
        var width = img.width;
        var height = img.height;

        //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
        var ratio;
        if ((ratio = width * height / 4000000)>1) {
            ratio = Math.sqrt(ratio);
            width /= ratio;
            height /= ratio;
        }else {
            ratio = 1;
        }

        canvas.width = width;
        canvas.height = height;

        //铺底色
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        //如果图片像素大于100万则使用瓦片绘制
        var count;
        if ((count = width * height / 1000000) > 1) {
            count = ~~(Math.sqrt(count)+1); //计算要分成多少块瓦片

        //计算每块瓦片的宽和高
            var nw = ~~(width / count);
            var nh = ~~(height / count);

            tCanvas.width = nw;
            tCanvas.height = nh;

            for (var i = 0; i < count; i++) {
                for (var j = 0; j < count; j++) {
                    tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);

                    ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
                }
            }
        } else {
            ctx.drawImage(img, 0, 0, width, height);
        }

        //进行最小压缩
        var ndata = canvas.toDataURL('image/jpeg', 0.1);

        console.log('压缩前：' + initSize);
        console.log('压缩后：' + ndata.length);
        console.log('压缩率：' + ~~(100 * (initSize - ndata.length) / initSize) + "%");

        tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;

        return ndata;
    }
    const dataURItoBlob = (dataURI) => {
        var byteString = atob(dataURI.split(',')[1])
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
        var ab = new ArrayBuffer(byteString.length)
        var ia = new Uint8Array(ab)
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i)
        }
        return new Blob([ab], {type: mimeString})
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
                fattach_list:[]
            }
            let uuid = item.uuid;
            if(item.imgs.length > 0) {
                //图片压缩上传
                item.imgs.forEach(imgObj => {
                    // if(item.file.type)
                    let reader = new FileReader();
                    reader.readAsDataURL(imgObj.file);
                    reader.onloadend = function () {
                        var result = this.result;
                        var img = new Image();
                        img.src = result;
                        //如果图片大小小于200kb，则直接上传
                        if (result.length <= 200*1024) {
                            img = null;
                            upload(result,uuid);
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
                            upload(data,uuid);
                            img = null;
                        }
                    };
                })

            }
            flist.push(obj)
        }
        setTimeout(() => {
            doSubmit(flist)
        },3000)

    }

    const doSubmit = async (flist) => {
        console.log('imgTemps-----',imgTemps)
        flist.forEach(item => {
            for(let j=0; j<imgTemps.length;j++) {
                let img = imgTemps[j];
                if(img.uuid === item.fgridmodeldtl_uuid) {
                    item.fattach_list.push(img)
                }
            }
        })

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
                                                selectable={item.imgs.length < 2}
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