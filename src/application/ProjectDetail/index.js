import React, { useEffect, useState } from 'react'
import { 
    Container,
    Title,
    Base,
    Rank,
    Alarm,
    SystemMenu
} from './style'
import Scroll from '../../baseUI/scroll/index'
import { getWrapParams, GetQuery } from '../../api/utils'
import { getProjectInfor } from '../../api/request'
import NoDataTip from '../../components/NoDataTip/index'
import showLoading from 'gdt-jsapi/showLoading'
import hideLoading from 'gdt-jsapi/hideLoading'

//各个系统的图标
import wxbjIcon from './imgs/pro_ico_parameter.png'
import deviceSetupIcon from './imgs/pro_ico_equipment.png'
import gridIcon from './imgs/pro_ico_gridrec.png'
import czwIcon from './imgs/pro_ico_let.png'
import sprayIcon from './imgs/pro_ico_spray.png'
import hydrantIcon from './imgs/pro_ico_hydrant.png'
import videoIcon from './imgs/pro_ico_video.png'
import electricalIcon from './imgs/pro_ico_electrical.png'
import patrolRecordIcon from './imgs/pro_ico_input.png'
import dangerIcon from './imgs/pro_ico_danger.png'
import fireIcon from './imgs/pro_ico_fire.png'
const _iconMap = {
    "1": patrolRecordIcon,
    "22": sprayIcon,
    "23": hydrantIcon,
    "24": fireIcon,
    "25": videoIcon,
    "26": electricalIcon,
    "36": wxbjIcon,
    "99": deviceSetupIcon,
    "100": czwIcon,
    "101": dangerIcon,
    "102": gridIcon
}


const ProjectDetail = (props) => {
    // querys.fproject_uuid
    const querys = GetQuery(props.location.search)
    const [projectData, setProjectData] = useState(null)
    const [menulist, setMenulist] = useState([])
    useEffect(() => {
        if(!projectData) {
            getProjectData()
        }
        // eslint-disable-next-line
    },[])

    const getProjectData = async () => {
        showLoading({text: "加载中..."})
        let res = await getProjectInfor(getWrapParams({
            fproject_uuid: querys.fproject_uuid
        }))
        hideLoading()
        if(res && res.code === '1') {
            let data = res.data[0]
            setProjectData(data)
            setMenulist(data.menulist)
        }
    }
    const renderMenuList = () => {
        if(menulist.length === 0) { 
            return null
        }
        let lis = null;
        lis = menulist.map(item => (
            <li onClick={() => toSysterm(item.menu_index)} key={item.menu_index}>
                <img src={_iconMap[item.menu_index]} alt={item.menu_index}/>
                <p>{item.menu_name}</p>
            </li>
        ))
        return(
            <SystemMenu>
                {lis}
            </SystemMenu> 
        )
    }
    const toSysterm = index => {
        if(index === "1") {
            props.history.push(`/PartPatrolRecrod?fproject_uuid=${querys.fproject_uuid}`)
        }
        if(index === "26") {
            props.history.push(`/PartElecsys?fproject_uuid=${querys.fproject_uuid}`)
        }
        if(index === "36") {
            props.history.push(`/WirelessAlarmList?fproject_uuid=${querys.fproject_uuid}`)
        }
        if(index === "99") {
            props.history.push(`/DeviceSetupInfo?fproject_uuid=${querys.fproject_uuid}`)
        }
        if(index === "101") {
            props.history.push(`/TroubleFix?fsocial_uuid=${projectData.fsocial_uuid}`)
        }
        if(index === "102") {
            props.history.push(`/GridManPatrols?fsocial_uuid=${projectData.fsocial_uuid}`)
        }
    }
    const navMap = () => {
        //flatitude
        //flongitude
    }
    const doRank = () => {
        props.history.push(`/RankPart?fsocial_uuid=${projectData.fsocial_uuid}`)
    }
    const doScore = () => {
        let score = 0;
        if(projectData) {
            score = projectData.fcurrent_score
        }
        props.history.push(`/ScorePart?score=${score}&fsocial_uuid=${projectData.fsocial_uuid}`)
    }
    const viewHistory = () => {
        props.history.push(`/HistoryInfo?fsocial_uuid=${projectData.fsocial_uuid}`)
    }
    const renderAlarmList = () => {
        if(projectData && projectData.msglist.length > 0) {
            return(
                <div>
                    {
                        projectData.msglist.map(item => (
                            <p key={item.fexe_uuid}>{item.fmsg_content}</p>
                        ))
                    }
                    <div className="link-text" onClick={()=>viewHistory()}>查看历史记录<i className="iconfont">&#xe600;</i></div>
                </div>
            )
        }
        return (
            <div className="full">
                <NoDataTip>近两个小时无告警消息</NoDataTip>
            </div>
        )
    }
    return(
        <Container>
            <Scroll refresh>
                <div>
                    <Title>
                        出租屋林昭峰
                        <span onClick={() => navMap()}>
                            <i className="iconfont icon">&#xe603;</i>
                            一键导航
                        </span>
                    </Title>
                    <Base>
                        <div className="f-row">
                            <i className="iconfont icon">&#xe614;</i>
                            <p className="txt">{projectData && projectData.flink_man}</p>
                        </div>
                        <div className="f-row">
                            <i className="iconfont icon tel">&#xe6a8;</i>
                            <p className="txt">{projectData && projectData.ftel_no}</p>
                        </div>
                        <div className="f-row">
                            <i className="iconfont icon">&#xe603;</i>
                            <p className="txt">{projectData && projectData.faddress}</p>
                        </div>
                    </Base>
                    <Rank>
                        <div className="item" onClick={() => doRank()}>
                            <div className="icon">
                                <i className="iconfont">&#xe606;</i>
                            </div>
                            <p>单位排名</p>
                            <span>{projectData && projectData.rank_num}</span>
                        </div>
                        <div className="gap-line"></div>
                        <div className="item" onClick={() => doScore()}>
                            <div className="icon">
                                <i className="iconfont">&#xe605;</i>
                            </div>
                            <p>单位得分</p>
                            <span>{projectData && projectData.fcurrent_score}</span>
                        </div> 
                    </Rank>
                    <Alarm>
                        { renderAlarmList() }
                    </Alarm>
                    { renderMenuList() }   
                </div>
             </Scroll>   
        </Container>
    )
}

export default React.memo(ProjectDetail)