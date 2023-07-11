import React from 'react';
import '../assets/styles/components/CardTable2.scss';


const CardTable2 = ({ props }) => {
    const {rows, columns} = props;
    return (
        <>
            <div className="card_table2_container">
                <div className="card_table2_container__left">
                    {rows.map((row) => {
                        return <div className="card_table2_container__left__entry">{row}</div>
                    })}
                </div>
                <div className="card_table2_container__right">
                    {columns.map((column) => {
                        return <div className="card_table2_container__right__entry">{column}</div>
                    })}
                </div>
            </div>
        </>
    );
}


export default CardTable2;