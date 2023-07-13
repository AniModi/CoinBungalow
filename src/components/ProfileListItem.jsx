import React from 'react';
import "../assets/styles/components/ProfileListItem.scss";


const ProfileListItem = ({props, index}) => {
    return (
        <>
            <div className={`profile_list_item_container` + ((index % 2)? "_odd":"")} style={{gridTemplateColumns: `1.25fr repeat(${props.length - 1}, 1fr)`}}>
                {props.map((item, index) => {
                    return (
                        <div className='profile_list_item_container__item' key={index}>
                            {item}
                        </div>
                    )
                })}
            </div>
        </>
    );
}

export default ProfileListItem;