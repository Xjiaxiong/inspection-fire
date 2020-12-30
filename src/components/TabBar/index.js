import React from 'react'
import { Tabs } from './style'
import { NavLink } from 'react-router-dom'

function TabBar(props) {
    const { pathname } = props
    const tabs = ['/Main','/Around','/Myself'];

    if(tabs.includes(pathname)) {
        return (
            <Tabs>
                <NavLink to="/Main" activeClassName="selected">
                    <div className="tab-item">
                        <i className='iconfont'>&#xe655;</i>
                        <p>主页</p>
                    </div>
                </NavLink>
                <NavLink to="/Around" activeClassName="selected">
                    <div className="tab-item">
                        <i className='iconfont'>&#xe659;</i>
                        <p>周边</p>
                    </div>
                </NavLink>
                <NavLink to="/Myself" activeClassName="selected">
                    <div className="tab-item">
                        <i className='iconfont'>&#xe614;</i>
                        <p>我的</p>
                    </div>
                </NavLink>
            </Tabs>
        )
    } else {
        return null
    }

}

export default React.memo(TabBar)