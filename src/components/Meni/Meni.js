import React from 'react';
import { LogoutOutlined, PlusOutlined, QuestionCircleOutlined, UserOutlined } from '@ant-design/icons';
import {Dropdown, message, Space} from 'antd';
import classes from './Meni.module.css';
import { useDispatch } from 'react-redux';
import {NavLink, useNavigate} from "react-router-dom";
import { logout } from '../../redux/features/userSlice'; // Proučite ispravan put do vašeg userSlice-a

const items = [
    {
        label: 'My profile',
        key: '1',
        icon: <UserOutlined />,
    },
    {
        label: 'New offer',
        key: '2',
        icon: <PlusOutlined />,
    },
    {
        label: 'Customer support',
        key: '3',
        icon: <QuestionCircleOutlined />,
    },
    {
        label: 'Log out',
        key: '4',
        icon: <LogoutOutlined />,
    },
];

const Meni = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onClick = ({ key }) => {
        if (key === '4') {
            handleLogout(); // Pozovi handleLogout samo ako je pritisnuta stavka "Log out"
        } else {
            message.info(`Click on item ${key}`);
        }
    };

    const handleLogout = () => {
        dispatch(logout()); // Koristi Redux akciju logout iz userSlice
        navigate('/'); // Ako koristite useNavigate, ovdje bi trebali imati definiran navigate
    };

    return (
        <Dropdown menu={{ items, onClick }}>
            <a onClick={(e) => e.preventDefault()} className={classes.navLink}>
                Menu
            </a>
        </Dropdown>
    );
};

export default Meni;
