import React, {useEffect, useState} from "react";
import {Select} from "antd";

const SelectComponent = (props) => {

    const {onChangeValue, options,finished} = props;

    const onSearch = (value) => {

        console.log('search:', value);
    };
    const[defaultValue,setDefaultValue]=useState("");

    useEffect(()=>{
        if(options !== null && options !== undefined) {
            const labelTemp = options.find(e => e.value == finished);
            setDefaultValue(labelTemp.label);
        }

    },[finished]);

    return (
        <div>


            <br/>
            <div style={{textAlign: 'left', marginLeft: '5px'}}>
                <Select
                    style={{backgroundColor: '#c5c5c5',width:'90px'}}
                    placeholder="Select an option"
                    value={defaultValue}
                    onChange={onChangeValue}
                    onSearch={onSearch}
                    filterOption={(input, option) =>
                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    options={options}
                />
            </div>
            <br/>

        </div>
    );
};
export default SelectComponent;