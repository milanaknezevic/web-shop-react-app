import React from "react";
import {Select} from "antd";

const SelectComponent = (props) => {

    const {onChangeValue, options} = props;

    const onSearch = (value) => {
        console.log('search:', value);
    };
    return (
        <div>


            <br/>
            <div style={{textAlign: 'left', marginLeft: '5px'}}>
                <Select
                    style={{backgroundColor: '#c5c5c5'}}
                    placeholder="Select a option"
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