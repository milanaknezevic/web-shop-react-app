import React from "react";
import {Select} from "antd";

const SelectComponent = () => {

    const onChangeValue = (value) => {
        console.log(`selected ${value}`);
    };
    const onSearch = (value) => {
        console.log('search:', value);
    };
    return (
        <div>


            <div  style={{textAlign:'left',marginBottom:'15px' }}>
                <label style={{ color: 'black',fontSize:'16px',fontWeight:'bold' }}>Status</label>
            </div>
            <div style={{textAlign: 'left',marginLeft:'5px'}}>
                <Select
                    style={{backgroundColor: '#c5c5c5'}}
                    placeholder="Select a status"
                    onChange={onChangeValue}
                    onSearch={onSearch}
                    filterOption={(input, option) =>
                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    options={[
                        {
                            value: '0',
                            label: 'New',
                        },
                        {
                            value: '1',
                            label: 'Used',
                        },
                    ]}/>
            </div>
            <br/>

        </div>
    );
};
export default SelectComponent;