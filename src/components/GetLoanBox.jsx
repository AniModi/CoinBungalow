import React, { useState } from "react";
import "../assets/styles/components/GetLoanBox.scss";

const GetLoanBox = ({ loanId, handleClose }) => {
  const [input, setInput] = useState({
    amount: "",
    interest: "",
    duration: "",
  });
  const handleInput = (e) => {
    setInput({
      ...input,
      [e.target.type]: e.target.value,
    });
  };
  const props = [
    {
      image:
        "https://img.freepik.com/free-photo/modern-residential-district-with-green-roof-balcony-generated-by-ai_188544-10276.jpg?w=1380&t=st=1688985038~exp=1688985638~hmac=e07c8fd49bea88bb8dd3df993178ec1c2b9c9c434df44392629f40e5dc2b4bb4",
      title: "House",
      address: "1234 Street",
      data: {
        rows: ["Bedrooms", "Bathrooms", "Area"],
        columns: ["3", "2", "2000 sqft"],
      },
    },
  ];
  const handlePost = () => {};
  return (
    <>
      <div className="get_loan_box_container">
        <div className="get_loan_box_container__left">
          <div className="get_loan_box_container__left__image_container">
            <img
              src={props[0].image}
              alt="property"
              className="get_loan_box_container__left__image_container__image"
            ></img>
          </div>
        </div>
        <div className="get_loan_box_container__right">
          <div className="get_loan_box_container__right__info">
            <div className="get_loan_box_container__right__info__table">
              <div className="get_loan_box_container__right__info__table__rows">
                {props[0].data.rows.map((row, index) => {
                  return (
                    <div
                      className="get_loan_box_container__right__info__table__rows__entry"
                      key={index}
                    >
                      {row}
                    </div>
                  );
                })}
              </div>
              <div className="get_loan_box_container__right__info__table__cols">
                {props[0].data.columns.map((col, index) => {
                  return (
                    <div
                      className="get_loan_box_container__right__info__table__cols__entry"
                      key={index}
                    >
                      {col}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="get_loan_box_container__right__payment">
            <input className="get_loan_box_container__right__payment__input" placeholder="Enter an amount" type = "text" value={input.amount} onChange={handleInput}/>
            <input className="get_loan_box_container__right__payment__input" placeholder="Enter interest" type = "text" value={input.interest} onChange={handleInput}/>
            <input className="get_loan_box_container__right__payment__input" placeholder="Enter duration" type = "text" value={input.duration} onChange={handleInput}/>
            <div className="get_loan_box_container__right__payment__button_container">
              <button className="get_loan_box_container__right__payment__button" onClick={handlePost}>Post</button>
              <button className="get_loan_box_container__right__payment__button" onClick={handleClose}>Close</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GetLoanBox;
