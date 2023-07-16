import React from 'react';
import { useState,useEffect } from 'react';
import '../assets/styles/components/CardTable.scss';


const CardTable = ({ props }) => {
    const {rows, columns} = props;

    return (
        <>
            <div className="card_table_container">
                <div className="card_table_container__left">
                    {/* <div className="card_table_container__left__entry">Collateral type</div> */}
                    {rows.map((row, index) => {
                        return <div className="card_table_container__left__entry" key={row + " " + index}>{row}</div>
                    })}
                </div>
                {/* <div className="card_table_container__left"></div> */}
                <div className="card_table_container__right">
                    <div className="card_table_container__right__entry">{props.title}</div>
                    {columns.map((column, index) => {
                        return <div className="card_table_container__right__entry" key={column  + " " + index}>{column}</div>
                    })}
                </div>
            </div>
        </>
    );
}


export default CardTable;