import React, { useContext } from 'react';
import { Switch } from 'antd';
import { ColContext } from '../App'
import 'antd/dist/antd.css';
import './common.css';


const Toggle = () => {
    const { setValue } = useContext(ColContext);
    function onChange(checked) {
        setValue(!!checked);
    }
    return (
        <div  className='flex_col'>
        <Switch
            className='switch_grid'
            checkedChildren="Grid ON" unCheckedChildren="Grid OFF" defaultChecked={false}
            onChange={onChange} />
            </div>
    )
};


export default Toggle;