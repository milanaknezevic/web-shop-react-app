import React from "react";
import {Button, InputNumber, Select} from "antd";
import CategoryTree from "../CategoryTree/CategoryTree";
import {SearchOutlined} from "@ant-design/icons";

const SidebarComponent = () => {

    const onChangeValue = (value) => {
        console.log(`selected ${value}`);
    };
    const onSearch = (value) => {
        console.log('search:', value);
    };
    return (
        <div>

            <CategoryTree/>
            <div>
                <div style={{textAlign: 'left', marginBottom: '15px'}}>
                    <label style={{color: 'black', fontSize: '16px', fontWeight: 'bold'}}>Status</label>
                </div>
                <div style={{textAlign: 'left', marginLeft: '5px'}}>
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

            <div style={{textAlign: 'left', marginLeft: '5px'}}>

                <div style={{textAlign: 'left', marginBottom: '15px'}}>
                    <label style={{color: 'black', fontSize: '16px', fontWeight: 'bold'}}>Location</label>
                </div>
                <input placeholder={"Location"}/>
                <br/>
                <br/>

            </div>
            <div style={{textAlign: 'left', marginLeft: '5px'}}>

                <div style={{textAlign: 'left', marginBottom: '15px'}}>
                    <label style={{color: 'black', fontSize: '16px', fontWeight: 'bold'}}>Price</label>
                </div>

                <InputNumber min={0} style={{width: '50%'}} placeholder="Price from"/>
                <InputNumber style={{width: '50%'}} placeholder="Price to"/>
                <br/>
                <br/>

            </div>

            <Button type="primary" icon={<SearchOutlined/>}>
                Search
            </Button>



        </div>
    );
};
export default SidebarComponent;