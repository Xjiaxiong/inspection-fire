import React, { useEffect, useState } from 'react'
import {
    ScrollContainer,
    Footer
} from './style'
import { 
    Button,
    List,
    TextareaItem,
    DatePicker,
    InputItem,
    WhiteSpace,
    ImagePicker
 } from 'antd-mobile'
import Scroll from '../../baseUI/scroll/index'
import { rescueRecordTypeInRequest, upImgRequest } from '../../api/request'
import { createForm } from 'rc-form';
import { getWrapParams, GetQuery } from '../../api/utils'
import { formatDate } from '../../api/constant'
import showLoading from 'gdt-jsapi/showLoading'
import hideLoading from 'gdt-jsapi/hideLoading'
import toast from 'gdt-jsapi/toast'
import Schema from 'async-validator';
import alert from 'gdt-jsapi/alert'

const Item = List.Item;
const descriptor = {
    date: {
        type: 'date',
        required: true,
        message: "救援日期必选!"
    },
    desc: {
        type: 'string',
        required: true,
        message: "备注必填!"
    }
};
const validator = new Schema(descriptor);
const RescueIn = (props) => {
    const { getFieldProps, getFieldsValue, setFieldsValue } = props.form
    const { fexc_uuid } = GetQuery(props.location.search)
    const [files, setFiles] = useState([])
    const onChangeFiles = (files, type) => {
        setFiles(files)
    }
    const verify = () => {
        const formRes = getFieldsValue()
        validator.validate(formRes, (errors, fields) => {
            if (errors) {
                console.log(errors[0].message)
              alert({
                  title: "提示",
                  message: errors[0].message
              })
              return;
            }
            // validation passed
            submit()
        });
    }
    const submit = async () => {
        showLoading({text:"提交中..."})
        const res = getFieldsValue()
        console.log("props.getFieldsValue()---", res)
        //处理图片
        let fattach_list = [];
        for(let i=0; i<files.length; i++) {
            let formData  = new FormData();
            formData.append("file", files[i].file);
            let resImg = await upImgRequest(formData)
            const data = resImg.data[0]
            let logoID = data.newFileName //获取上传以后的图片ID
            fattach_list.push({
                "fattach_index": i,
                "fattach_link": logoID,
                "fattach_name": logoID
            })
        }
        let params = {
            fexc_uuid,
            rescueperson_name: res.person,
            rescuerecord_time: formatDate(res.date,'YYYYMMDDHHmmss'),
            fdescription: res.desc,
            latitude: localStorage.getItem("latitude") || "0.000000",
            longitude: localStorage.getItem("longitude") || "0.000000",
            picture_list: fattach_list
        }
        console.log('params---',params)
        let re = await rescueRecordTypeInRequest(getWrapParams(params))
        hideLoading()
        if(re && re.code === '1') {
            toast({
                icon:"success",
                text: re.desc,
                duration: 2
            })
            setTimeout(() => {
                props.history.goBack()
            },2000)
        }

    }
    useEffect(() => {
        setFieldsValue({
            'person': localStorage.getItem('person_name') || ''
        })
        // eslint-disable-next-line
    },[])
    return (
        <div>
            <ScrollContainer>
                <Scroll>
                    <div>
                        <WhiteSpace/>
                        <List>
                            <InputItem
                                {...getFieldProps('person')}
                                editable={false}>
                                救援人员
                            </InputItem>
                            <DatePicker
                                {...getFieldProps('date')}>
                                <Item arrow="horizontal">救援时间</Item>
                                </DatePicker>
                            <TextareaItem
                                {...getFieldProps('desc')}
                                title="情况描述"
                                placeholder="情况描述"
                                autoHeight
                            />
                        </List>
                        <List renderHeader={() => '上传照片'} >
                            <div style={{padding:'5px'}}>
                                <ImagePicker
                                    files={files}
                                    onChange={(files, type) => onChangeFiles(files, type)}
                                    selectable={files.length < 3}
                                />
                            </div>
                        </List>
                    </div>
                </Scroll>    
            </ScrollContainer>    
            <Footer>
                <Button type="warning" onClick={() => verify()}>提交</Button>
            </Footer>    
        </div>
    )
}

export default React.memo(createForm()(RescueIn))