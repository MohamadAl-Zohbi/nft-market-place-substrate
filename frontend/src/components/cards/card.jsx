import React from 'react'
import Image from '@/components/image'
import Divider from '@mui/material/Divider';

import "./card.css";

const Card = ({ color, backgroundColor1, backgroundColor2, image, title, data1, data2,label1,label2 }) => {
    return (
        <div className='card' style={{
            background: backgroundColor1,
            border: `2px solid ${color}`,
            boxShadow: `0px  1px 4px 2px #ed06c`,
        }}>
            <div className="card-body" style={{
                background: backgroundColor2,
            }}>
                <div className='card-image' style={{
                      boxShadow: `0px  1px 6px 2px #ed06c8`,
                      border: `2px solid var(--yellow-color)`
                }}>
                    <Image src={image} />
                </div>
                <div className="content">
                    <h6>{title}</h6>
                    <Divider sx={{
                        width: '100%',
                        height: '1px',
                        margin: '20px 0 10px',
                        background: color,
                    }} />
                    <div className="flex justify-between align-i-center">
                        <div className="column justify-between">
                            <label>{label1}</label>
                            <span>{data1}</span>
                        </div>
                        <div className="column justify-between align-i-end">
                            <label>{label2}</label>
                            <span>{data2}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
}

export default Card