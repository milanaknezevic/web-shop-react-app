import React from "react";
import {Input, InputNumber} from "antd";
import CategoryTree from "../CategoryTree/CategoryTree";
import classes from './SideBar.module.css'
import Select from "../Select/Select";
import {useSelector} from "react-redux";

const SidebarComponent = ({
                              onSelect,
                              setSelectedCategoryTemp,
                              handleSelect,
                              location,
                              handleLocationChange,
                              handlePriceFromChange,
                              handlePriceToChange,
                              priceTo,
                              priceFrom
                          }) => {

    return (
        <div>
            <div className={classes.container}>

                <CategoryTree onSelect={onSelect} setSelectedCategoryTemp={setSelectedCategoryTemp}/>
                <br/>
                <div>
                    <div style={{textAlign: 'left',}}>
                        <label style={{color: 'black', fontSize: '16px', fontWeight: 'bold'}}>Status</label>
                    </div>
                    <div style={{textAlign: 'left', marginLeft: '5px'}}>
                        <Select onChangeValue={handleSelect}></Select>
                    </div>

                </div>

                <div style={{textAlign: 'left', marginLeft: '5px', width: '90%'}}>

                    <div style={{textAlign: 'left', marginBottom: '15px'}}>
                        <label style={{color: 'black', fontSize: '16px', fontWeight: 'bold'}}>Location</label>
                    </div>
                    <Input placeholder="Location" value={location} onChange={handleLocationChange}/>
                    <br/>
                    <br/>

                </div>
                <div style={{textAlign: 'left', marginLeft: '5px'}}>

                    <div style={{textAlign: 'left', marginBottom: '15px'}}>
                        <label style={{color: 'black', fontSize: '16px', fontWeight: 'bold'}}>Price</label>
                    </div>
                    <InputNumber min={0} value={priceFrom} onChange={handlePriceFromChange}
                                 style={{width: '45%', marginRight: '2%'}} placeholder="Price from"/>
                    <InputNumber min={priceFrom} value={priceTo} onChange={handlePriceToChange} style={{width: '45%'}}
                                 placeholder="Price to"/>
                    <br/>
                    <br/>
                </div>


            </div>


        </div>
    );
};

export default SidebarComponent;
