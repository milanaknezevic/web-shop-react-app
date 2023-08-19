import React, { useState } from 'react';
import { Input, Tree } from 'antd';
import {useSelector} from "react-redux";

const { Search } = Input;

const CategoryTree = ({  onSelect,setSelectedCategoryTemp  }) => {
    const {categories} = useSelector((state)=>state.categories);
    const [expandedKeys, setExpandedKeys] = useState([]);
    const [selectedKeys, setSelectedKeys] = useState([]);

    const onExpand = (newExpandedKeys) => {
        setExpandedKeys(newExpandedKeys);
    };

    const handleSelect = (selectedKeys, info) => {
        const clickedKey = selectedKeys[0];

        if (clickedKey === 'root') {
            return;
        }

        setSelectedKeys(selectedKeys);
        onSelect(selectedKeys);
        setSelectedCategoryTemp(clickedKey);
    };

    const treeData = [
        {
            title: 'Categories',
            key: 'root',
            children: categories.map((category) => ({
                title: category.naziv,
                key: category.id,
            })),
        },
    ];

    return (
        <div>
            <Tree
                style={{ backgroundColor: '#9caf88',fontWeight:'bold' }}
                onExpand={onExpand}
                expandedKeys={expandedKeys}
                onSelect={handleSelect}
                selectedKeys={selectedKeys}
                treeData={treeData}

            />
        </div>
    );
};

export default CategoryTree;