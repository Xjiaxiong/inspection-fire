import React, {
    forwardRef,
    useState,
    useEffect,
    useRef,
    useImperativeHandle,
    useMemo
} from 'react'
import PropTypes from 'prop-types'
import BScroll from 'better-scroll'
import styled from 'styled-components'
import { debounce } from "../../api/utils";

import Loading from '../../baseUI/loading/index'
import LoadingV2 from '../../baseUI/loading-v2/index'

const ScrollContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`
const PullUpLoading = styled.div`
  position: absolute;
  left:0; right:0;
  bottom: 5px;
  height: 30px;
  margin: auto;
  z-index: -1;
`;

const PullDownLoading = styled.div`
  position: absolute;
  left:0; right:0;
  top: 0px;
  height: 30px;
  margin: auto;
  z-index: 99;
`;

const Scroll = forwardRef((props, ref) => {
    const [bScroll, setBScroll] = useState();

    const scrollContaninerRef = useRef();

    const { direction, click, refresh,  bounceTop, bounceBottom } = props;

    const { pullUp, pullDown, onScroll, pullUpLoading, pullDownLoading} = props;

    let pullUpDebounce = useMemo(() => {
        return debounce(pullUp, 300)
    }, [pullUp]);
    
    let pullDownDebounce = useMemo(() => {
    return debounce(pullDown, 300)
    }, [pullDown]);

    useEffect(() => {
        const scroll = new BScroll(scrollContaninerRef.current,{
            scrollX: direction === "horizental",
            scrollY: direction === "vertical",
            probeType: 3,
            click: click,
            bounce:{
                top: bounceTop,
                bottom: bounceBottom
            }
        })
        setBScroll(scroll)
        return () => {
            setBScroll(null);
        }
    },[direction,click,bounceTop,bounceBottom])

    //滚动事件
    useEffect(() => {
        if(!bScroll || !onScroll) return;
        bScroll.on('scroll', scroll => {
            onScroll(scroll);
        })
        return () => {
            bScroll.off('scroll');
        }
    },[onScroll, bScroll])

    //往上拉刷新事件
    useEffect(() => {
        if(!bScroll || !pullUp) return;
        bScroll.on('scrollEnd', () => {
            console.log("bScroll", bScroll)
            //判断是否滑动到了底部
            if(bScroll.y <= bScroll.maxScrollY){
                pullUpDebounce();
            }
        })
        return () => {
            bScroll.off('scrollEnd')
        }
    },[pullUpDebounce,pullUp,bScroll])

    //往下拉刷新事件
    useEffect(() => {
        if(!bScroll || !pullDown) return;
        bScroll.on('touchEnd', pos => {
            if(pos.y > 60) {
                pullDownDebounce()
            }
        })
        return () => {
            bScroll.off('touchEnd')
        }
    },[pullDownDebounce, pullDown, bScroll])

    

    //刷新实例
    useEffect(() => {
        if(refresh && bScroll) {
            bScroll.refresh();
        }
    })

    useImperativeHandle(ref, () => ({
        refresh() {
          if(bScroll) {
            bScroll.refresh();
            bScroll.scrollTo(0, 0);
          }
        },
        getBScroll() {
          if(bScroll) {
            return bScroll;
          }
        }
    }));

    const PullUpdisplayStyle = pullUpLoading ? {display: ''} : {display: 'none'};
    const PullDowndisplayStyle = pullDownLoading ? {display: ''} : {display: 'none'};

    return (
        <ScrollContainer ref={scrollContaninerRef}>
            {props.children}
            {/* 滑到底部加载动画 */}
            <PullUpLoading style={ PullUpdisplayStyle }><LoadingV2></LoadingV2></PullUpLoading>
            {/* 顶部下拉刷新动画 */}
            <PullDownLoading style={ PullDowndisplayStyle }><Loading></Loading></PullDownLoading>
        </ScrollContainer>
    );
})



Scroll.protoTypes = {
    direction: PropTypes.oneOf(['vertical','horizental']),
    refresh: PropTypes.bool,
    onScroll: PropTypes.func,
    pullUp: PropTypes.func,
    pullDown: PropTypes.func,
    pullDownLoading: PropTypes.bool,
    pullUpLoading: PropTypes.bool,
    bounceBottom: PropTypes.bool, //是否支持向下吸底
    bounceTop: PropTypes.bool //是否支持向上吸顶
}

Scroll.defaultProps = {
    direction: "vertical",
    click: true,
    refresh: true,
    onScroll:null,
    pullUpLoading: false,
    pullDownLoading: false,
    pullUp: null,
    pullDown: null,
    bounceTop: true,
    bounceBottom: true
};
export default Scroll;