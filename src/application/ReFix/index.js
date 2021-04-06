import React, { useState } from "react";
import styled from 'styled-components'
import { 
    WhiteSpace,
    List,
    TextareaItem,
    ImagePicker,
    Button
 } from "antd-mobile";
 import { RestartRectsRequest, upImgRequest } from '../../api/request'
 import { GetQuery, getWrapParams, compress, dataURItoBlob } from '../../api/utils'
 import showLoading from 'gdt-jsapi/showLoading'
 import hideLoading from 'gdt-jsapi/hideLoading'
 import toast from "gdt-jsapi/toast";

const Item = List.Item; 

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
`
export const BottomBtn = styled.div`
    position: fixed;
    bottom: 5px;
    left: 0;
    display: flex;
    height: 44px;
    width: 100%;
    .btn {
        width: 100%;
    }
`

const PassFix = (props) => {
    let fattachList = [];
    const querys = GetQuery(props.location.search)
    const [notes, setNotes] = useState('')
    const [files, setFiles] = useState([])
    const onChangeFiles = (files, type) => {
        setFiles(files)
    }
    const upload = async (dataURL) => {
        let fd = new FormData();
        let blob = dataURItoBlob(dataURL);
        fd.append('file', blob);
        let resImg = await upImgRequest(fd)
        const data = resImg.data[0]
        let logoID = data && data.newFileName
        fattachList.push({
            "fattach_index": 1,
            "fattach_link": logoID,
            "fattach_name": logoID
        })
    }
    const submit = async () => {
        //提交
        showLoading({text:'提交中...'})

        //上传图片
        for(let i=0; i<files.length; i++) {
            let reader = new FileReader();
            reader.readAsDataURL(files[i].file);
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
        }

        //等待图片压缩上传后，再提交数据
        setTimeout(() => {
            doSubmit()
        },3000)
    }
    const doSubmit = async () => {
        let params = {
            f_attach: fattachList,
            fhdcorrectmain_uuid: querys.fhdcorrectmain_uuid,
            f_desc: notes
        }
        let res =  await RestartRectsRequest(getWrapParams(params))
        hideLoading()
        if(res.code === '1') {
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
    return(
        <Container>
            <WhiteSpace/>
            <List>
                <TextareaItem
                    title="备注"
                    placeholder="请备注点什么..."
                    autoHeight
                    onChange={value => setNotes(value)}
                />
            </List>
            <WhiteSpace/>
            <List>
                <Item extra="最多上传3张图片">图片</Item>
            </List>
            <ImagePicker
                files={files}
                onChange={(files, type) => onChangeFiles(files, type)}
                selectable={files.length < 3}
            />
            <BottomBtn>
                <div className='btn'>
                    <Button type="primary" onClick={() => submit()} size="large">提交</Button>
                </div>
            </BottomBtn>
        </Container>
    )
}

export default React.memo(PassFix)
