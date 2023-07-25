import React, {useState} from "react";
import { readContract, writeContract } from "wagmi/actions";
import { DAOaddress, DAOabi } from '../constants'
// import { db_metadata } from '../dao_database'
import "../assets/styles/components/ProposalForm.scss";
import { Polybase } from "@polybase/client";

const db = new Polybase({
  defaultNamespace: "pk/0x1a57dc69d2e8e6938a05bdefbebd62622ddbb64038f7347bd4fe8beb37b9bf40d5e8b62eaf9de36cbff52904b7f81bff22b29716021aaa8c11ee552112143259/DAO_metadata",
});
const db_metadata = db.collection("DaoMetadata")

const DAOForm = () => {
  const defaultFormState = {
    Name: "",
    Description: "",
    Goal: "",
    Started: "",
    MembershipFee: "",
  }
  const [formState, setFormState] = useState(defaultFormState);

  const inputHandler = (e) => {
      setFormState({
          ...formState,
          [e.target.name]: e.target.value
      })
  }

  const createHandler = async ()=>{
      const daoId = await readContract({
        address: DAOaddress,
        abi: DAOabi,
        functionName: 'createDAO',
        args: ['uri'],
      }); 
      const recordId = DAOaddress+'/'+(parseInt(daoId)-1).toString()
      try{
      const recordData = await db_metadata.create([
        recordId,
        formState.Name,
        formState.Description,
        formState.Goal,
        formState.Started,
        formState.MembershipFee.toString()
      ])
    } catch(e){ console.log(e)}

      const { hash } = await writeContract({
        address: DAOaddress,
        abi: DAOabi,
        functionName: "createDAO",
        args: ['uri'],
      })
     
      setFormState(defaultFormState)
    
    
  }

  return (
    <>
      <div className="proposal_form_container">
        <div className="proposal_form_container__title">Create DAO</div>
        <div className="proposal_form_container__form">
          <div className="proposal_form_container__form__input_container">
            <div className="proposal_form_container__form__input_container__title">
              Name
            </div>
            <input
              className="proposal_form_container__form__input_container__input"
              type="text"
              placeholder="DAO Name"
              name="Name"
              onChange={inputHandler}
            ></input>
          </div>
          <div className="proposal_form_container__form__input_container">
            <div className="proposal_form_container__form__input_container__title">
              Description
            </div>
            <textarea
              className="proposal_form_container__form__input_container__input"
              placeholder="DAO Description"
              name="Description"
              onChange={inputHandler}
            ></textarea>
          </div>
          <div className="proposal_form_container__form__input_container">
            <div className="proposal_form_container__form__input_container__title">
              Goal
            </div>
            <textarea
              className="proposal_form_container__form__input_container__input"
              placeholder="DAO Goal"
              name="Goal"
              onChange={inputHandler}
            ></textarea>
          </div>
          <div className="proposal_form_container__form__input_container">
            <div className="proposal_form_container__form__input_container__title">
              Started 
            </div>
            <input
              className="proposal_form_container__form__input_container__input"
              type="date"
              placeholder="Proposal start date"
              name="Started"
              onChange={inputHandler}
            ></input>
          </div>
          <div className="proposal_form_container__form__input_container">
            <div className="proposal_form_container__form__input_container__title">
            Membership Fee
            </div>
            <input
              className="proposal_form_container__form__input_container__input"
              type="number"
              placeholder="MATIC/month"
              name="MembershipFee"
              onChange={inputHandler}
            ></input>
          </div>
        </div>
        <div className="proposal_form_container__button_container">
            <button className="proposal_form_container__button_container__button" onClick={createHandler}>
                Create
            </button>
        </div>
      </div>
    </>
  );
};

export default DAOForm;
