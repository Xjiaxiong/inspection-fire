import React from 'react'
import PropTypes from 'prop-types'
import {Switch} from './style'

const MySwitch = (props) =>{

    const { checked, onChange} = props
    return (
        <Switch>
            <input type="checkbox" checked={checked} onChange={() => onChange()}/>
            <div className='checkbox'>
                <div className='inner'>
                    {
                        checked === true ?  <span className='left'>正常</span> :<span className='right'>异常</span>
                    }
                </div>
            </div>
        </Switch>
    )

}
Switch.protoTypes = {
    checked: PropTypes.bool,
    onChange: PropTypes.func,
}
Switch.defaultProps = {
    checked: true,
    onChange: null,
};

export default MySwitch