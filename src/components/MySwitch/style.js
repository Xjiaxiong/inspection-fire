import styled from 'styled-components'

export const Switch = styled.div`
    display: inline-block;
    vertical-align: middle;
    box-sizing: border-box;
    position: relative;
    cursor: pointer;
    align-self: center;
    input[type="checkbox"] {
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
        width: 100%;
        height: 100%;
        z-index: 2;
        border: 0 none;
        -webkit-appearance: none;
        appearance: none;
    }
    input[type="checkbox"]:checked + .checkbox {
        background: #108ee9;
    }
    input[type="checkbox"]:checked + .checkbox:before {
        transform: scale(0);
    }
    input[type="checkbox"]:checked + .checkbox:after {
        transform: translateX(30px);
    }
    .checkbox:before {
        content: ' ';
        position: absolute;
        left: 2px;
        top: 2px;
        width: 57px;
        height: 27px;
        border-radius: 27px;
        box-sizing: border-box;
        background: #f0873a;
        z-index: 1;
        transition: all 200ms;
        transform: scale(1);
    }
    .checkbox:after {
        content: ' ';
        width: 27px;
        height: 27px;
        border-radius: 27px;
        background: #fff;
        position: absolute;
        z-index: 2;
        top: 2px;
        left: 2px;
        transform: translateX(0);
        transition: all 200ms;
        box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.2), 0 2px 11.5px 0 rgba(0, 0, 0, 0.08), -1px 2px 2px 0 rgba(0, 0, 0, 0.1);
    }
    .checkbox {
        width: 61px;
        height: 31px;
        border-radius: 31px;
        box-sizing: border-box;
        background: #e5e5e5; 
        z-index: 0;
        margin: 0;
        padding: 0;
        -webkit-appearance: none;
        appearance: none;
        border: 0;
        cursor: pointer;
        position: relative;
        transition: all 300ms;
    }
    .inner {
        position:absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        .left {
            margin-right: auto;
            margin-left: 4px;
        }
        .right {
            margin-left: auto;
            margin-right: 4px;
        }
    }
    .inner > span {
        color: #fff;
        font-size: 12px;
        z-index: 2;
    }
`