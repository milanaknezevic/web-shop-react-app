import React from 'react';
import { Card } from 'antd';
import classes from './Card.module.css'
const { Meta } = Card;
const CardComponent = () => (
    <Card
        hoverable
        className={classes.card}
        cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
    >
        <Meta title="Europe Street beat" description="www.instagram.com" />
    </Card>
);

export default CardComponent;
