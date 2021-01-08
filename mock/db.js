// import * as API from './api/constant'
//import Mock from 'mockjs'

var express = require("express")
const Mock = require("mockjs")
var router = express.Router();

router.use(`/profile`,function (req,res) {
    //调用mock方法模拟数据
    var data = Mock.mock({
            'list|1-10': [{
                // 属性 id 是一个自增数，起始值为 1，每次增 1
                'id|+1': 1
            }]
        }
    );
    //延时200-600毫秒请求到数据
    Mock.setup({
        timeout: '200-600'
    })
    return res.json(data);
})

module.exports = router;

// //使用mockjs模拟数据
// Mock.mock(`${API.MOCK_TEST}`, {
//     "code":0,
//     "data":
//       {
//         "mtime": "@datetime",//随机生成日期时间
//         "score|1-800": 800,//随机生成1-800的数字
//         "rank|1-100":  100,//随机生成1-100的数字
//         "stars|1-5": 5,//随机生成1-5的数字
//         "nickname": "@cname",//随机生成中文名字
//       }
// });