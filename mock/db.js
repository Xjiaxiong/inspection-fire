// import * as API from './api/constant'
//import Mock from 'mockjs'

var express = require("express")
const Mock = require("mockjs")
var router = express.Router();

router.use(`/getlist`,function (req,res) {
    //调用mock方法模拟数据
    var data = Mock.mock({
            'list|1-10': [{
                // 属性 id 是一个自增数，起始值为 1，每次增 1
                'id|+1': 1
            }]
        }
    );
    return res.json(data);
})
router.use(`/getlist2`,function (req,res) {
    //调用mock方法模拟数据
    var data = Mock.mock({
            'list2|1-10': [{
                // 属性 id 是一个自增数，起始值为 1，每次增 1
                'id|+1': 1
            }]
        }
    );
    return res.json(data);
})

router.use(`/getExceptionMsg`,function (req,res) {
    console.log('入参',req)
    //调用mock方法模拟数据
    var data = Mock.mock({
            'code': '1',
             data:[
                {
                    "fexc_uuid":"A31E2C70D0794410B06A65565EF8EA91",
                    "fexc_name":"2020-12-23 13:48:45警告：【崔福记黄焖鸡米饭】1幢1层台洛一路6号区营业厅NB无线烟感_574189火警请速度前往处理！",
                    "fstate":"02",
                    "fstate_name":"误报",
                    "fcome_time":"20201223134845",
                    "fproject_uuid":"69B6D8F5F8284E468EAC4E5A720AA455"
                }
            ]
        }
    );
    return res.json(data);
})

module.exports = router;