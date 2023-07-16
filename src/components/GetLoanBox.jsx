import React, { useState } from "react";
import "../assets/styles/components/GetLoanBox.scss";
import { parseEther } from 'viem'
import { writeContract } from 'wagmi/actions'
import { LoanAddress, LoanAbi, PnftAddress, PnftAbi} from '../constants'

const GetLoanBox = ({ loanId, entries, image, handleClose }) => {
  const tokenId = loanId.slice(42);
  const defaultInputState = {
    amount: "",
    interest: "",
    duration: "",
  }
  const [input, setInput] = useState(defaultInputState);
  const handleInput = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
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
  const handlePost = async () => {
    try{
      let amount = parseFloat(input.amount);
      const interest = parseFloat(input.interest);
      const _data = input.amount+', '+input.duration
      let duration = input.duration.split(' ');
      if(duration[1] === 'wks'){
        duration = duration[0]/4;
        duration = duration/12;
      }
      else if(duration[1] === 'days'){
        duration = duration[0]/30;
        duration = duration/12;
      }
      else if(duration[1] === 'months'){
        duration = duration[0]/12;
      }
      else {
        return;
      }
      const durationInSec = parseInt(duration * 365 * 24 * 60 * 60);
      duration = duration.toFixed(4);
      amount += (amount * interest * duration)/100;
      amount = parseEther(amount.toString())
      const response = await writeContract({
        address: PnftAddress,
        abi: PnftAbi,
        functionName: 'approve',
        args: [LoanAddress, tokenId],
      })
      const {hash} = await writeContract({
        address: LoanAddress,
        abi: LoanAbi,
        functionName: 'getLoan',
        args: [tokenId, amount, interest*100, durationInSec, _data],
      })

      setInput(defaultInputState);
    }
    catch(err){ console.log(err)}
  };
  return (
    <>
      <div className="get_loan_box_container">
        <div className="get_loan_box_container__left">
          <div className="get_loan_box_container__left__image_container">
            <img
              src={image}
              alt="property"
              className="get_loan_box_container__left__image_container__image"
            ></img>
          </div>
        </div>
        <div className="get_loan_box_container__right">
          <div className="get_loan_box_container__right__info">
            <div className="get_loan_box_container__right__info__table">
              <div className="get_loan_box_container__right__info__table__rows">
                    <div className="get_loan_box_container__right__info__table__rows__entry">
                      {entries[0][0]}
                    </div>
                    <div className="get_loan_box_container__right__info__table__rows__entry">
                      {entries[6][0]}
                    </div>
                    <div className="get_loan_box_container__right__info__table__rows__entry">
                      {entries[4][0]}
                    </div>
                    <div className="get_loan_box_container__right__info__table__rows__entry">
                      {entries[7][0]}
                    </div>
              </div>
              <div className="get_loan_box_container__right__info__table__cols">
                    <div className="get_loan_box_container__right__info__table__cols__entry">
                    {entries[0][1]}
                    </div>
                    <div className="get_loan_box_container__right__info__table__cols__entry">
                    {entries[6][1]}
                    </div>
                    <div className="get_loan_box_container__right__info__table__cols__entry">
                    {entries[4][1]}
                    </div>
                    <div className="get_loan_box_container__right__info__table__cols__entry">
                    {entries[7][1]}
                    </div>
              </div>
            </div>
          </div>
          <div className="get_loan_box_container__right__payment">
            <input className="get_loan_box_container__right__payment__input" placeholder="Loan Amount (MATIC)" type = "text" value={input.amount} name='amount' onChange={handleInput}/>
            <input className="get_loan_box_container__right__payment__input" placeholder="APR (%)" type = "text" value={input.interest} name='interest' onChange={handleInput}/>
            <input className="get_loan_box_container__right__payment__input" placeholder="Loan Duration (wks/months/yrs)" type = "text" value={input.duration} name='duration' onChange={handleInput}/>
            <div className="get_loan_box_container__right__payment__button_container">
              <button className="get_loan_box_container__right__payment__button" onClick={handlePost}>Request</button>
              <button className="get_loan_box_container__right__payment__button" onClick={handleClose}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GetLoanBox;
