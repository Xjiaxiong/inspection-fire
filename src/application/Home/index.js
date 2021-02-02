import React, { useEffect } from 'react';
import { renderRoutes } from 'react-router-config';

import TabBar from './../../components/TabBar/index';
import navigation from './../../components/NavigationBar/navigation';
// import { CSSTransition, TransitionGroup } from 'react-transition-group'
// import { Container } from "./style";
import setTitle from 'gdt-jsapi/setTitle'
import { plusBase } from '../../aplus'
import { GetQuery, getWrapParams } from '../../api/utils' 

const APP_UUID = 'xfdc'

function Home(props) {
    const { route, location} = props;
    const Querys = GetQuery(props.location.search)
    const pathname = location.pathname;
    useEffect(() => {
        let title = navigation[pathname]
        if(Querys._type && Querys._type === "update") {
            title = "单位修改"
        }
        setTitle({
            title: title
        }).then(res => {
            console.log(res)
        }).catch(err => {})
        //埋点数据发送
        let pageParams = {
            page_name: title,
            page_url: pathname,
            page_id: APP_UUID
        }
        plusBase(getWrapParams({
            ...Querys,
            ...pageParams
        }))
    },[pathname, Querys])
    return (
        <>
            {/* <Container>
                <TransitionGroup>
                    <CSSTransition 
                        timeout={300}
                        classNames={'fade'}
                        key={pathname}> */}
                        { renderRoutes(route.routes) }
                     {/* </CSSTransition>
                </TransitionGroup>
            </Container> */}
            <TabBar pathname={pathname} />
            
        </>
    )
}

export default React.memo(Home)