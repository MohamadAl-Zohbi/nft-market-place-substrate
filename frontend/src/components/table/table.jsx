import React from 'react'
import Image from '../image'
import ethereu from '@img/icon-ethereu.png'

import "./table.css";
const Table = ({ colomn, row }) => {

    return (
        <div className="table-parent">
            <div className="table">
                <div className="flex row-head">
                    {
                        colomn.map((item, i) => {
                            return <div key={i} className="data" style={{ flex: item.flex }}>{item.name}</div>
                        })
                    }
                </div>
                {
                    row && row.map((item, i) => {
                        let highestPrice = Math.max(...item.nfts.map(o => o.currentPrice))

                        return (
                            <div key={item} className="flex row">
                                <div className="data" style={{ flex: colomn[0].flex }}>
                                    {i + ' '}
                                    <Image src={`${item.frontImage2?.path}/${item.frontImage2?.uuid}`} style={{ height: '55px', width: '70px', objectFit: 'cover' }} />
                                    {item.name}
                                </div>
                                <div className="data flex-col" style={{ flex: colomn[1].flex, alignItems: 'flex-start', justifyContent: 'center' }}>
                                    <div className="number">
                                        <img src={ethereu} alt="" />
                                        {highestPrice ?? '0'}
                                    </div>
                                    <span className="percentage" style={{
                                        color: i % 2 === 0 ? '#19cd40' : '#ac2626'
                                    }}>+11.67%</span>
                                </div>

                                <div className="data" style={{ flex: colomn[2].flex }}>
                                    <div className="number">
                                        {item.wallet.user?.firstName} {item.wallet.user?.lastName}
                                    </div>
                                </div>
                                <div className="data" style={{ flex: colomn[3].flex }}>
                                    <div className="number">
                                        {item?.nfts.length}
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Table