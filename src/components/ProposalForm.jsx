import React, {useState} from "react";
import "../assets/styles/components/ProposalForm.scss";
import { readContract, writeContract,getAccount } from "wagmi/actions";
import { DAOaddress, DAOabi } from "../constants";
import { db_proposals } from "../dao_database";
import { parseGwei } from "viem";

const ProposalForm = ({daoId}) => {
  const account = getAccount();
  const defaultFormState = {
    title: "",
    description: "",
    reference: "",
    startDate: "",
    endDate: "",
    estimatedCost: "",
  }
  const [formState, setFormState] = useState(defaultFormState);

  const handleInput = (e) => {
    const {name, value} = e.target;
    setFormState({
      ...formState,
      [name]: value
    })
  }

  const handleCreate = async () => {
    try{
      const propId = await readContract({
        address: DAOaddress,
        abi: DAOabi,
        functionName: 'createProposal',
        args: [daoId, 'uri'],
      }); 
      const recordId = DAOaddress+'/'+daoId+'/'+(parseInt(propId)-1).toString()
      
      const recordData = await db_proposals.create([
        recordId,
        formState.title,
        formState.description,
        formState.reference,
        formState.startDate,
        formState.endDate,
        formState.estimatedCost.toString(),
        account.address,
        '', ''
      ])

      const { hash } = await writeContract({
        address: DAOaddress,
        abi: DAOabi,
        functionName: "createProposal",
        args: [daoId, 'uri'],
        gasPrice: parseGwei('20')
      })

      setFormState(defaultFormState);

    }
    catch(err){
      console.log(err);
    }
  }

  return (
    <>
      <div className="proposal_form_container">
        <div className="proposal_form_container__title">Create Proposal</div>
        <div className="proposal_form_container__form">
          <div className="proposal_form_container__form__input_container">
            <div className="proposal_form_container__form__input_container__title">
              Title
            </div>
            <input
              className="proposal_form_container__form__input_container__input"
              type="text"
              placeholder="Proposal Title"
              name="title"
              onChange={handleInput}
            ></input>
          </div>
          <div className="proposal_form_container__form__input_container">
            <div className="proposal_form_container__form__input_container__title">
              Description
            </div>
            <textarea
              className="proposal_form_container__form__input_container__input"
              placeholder="Proposal Description"
              name="description"
              onChange={handleInput}
            ></textarea>
          </div>
          <div className="proposal_form_container__form__input_container">
            <div className="proposal_form_container__form__input_container__title">
              Reference
            </div>
            <input
              className="proposal_form_container__form__input_container__input"
              type="text"
              placeholder="Link"
              name="reference"
              onChange={handleInput}
            ></input>
          </div>
          <div className="proposal_form_container__form__input_container">
            <div className="proposal_form_container__form__input_container__title">
              Start Date
            </div>
            <input
              className="proposal_form_container__form__input_container__input"
              type="date"
              placeholder="Proposal start date"
              name="startDate"
              onChange={handleInput}
            ></input>
          </div>
          <div className="proposal_form_container__form__input_container">
            <div className="proposal_form_container__form__input_container__title">
              End Date
            </div>
            <input
              className="proposal_form_container__form__input_container__input"
              type="date"
              placeholder="Proposal end date"
              name="endDate"
              onChange={handleInput}
            ></input>
          </div>
          <div className="proposal_form_container__form__input_container">
            <div className="proposal_form_container__form__input_container__title">
              Estimated cost
            </div>
            <input
              className="proposal_form_container__form__input_container__input"
              type="number"
              placeholder="MATIC"
              name="estimatedCost"
              onChange={handleInput}
            ></input>
          </div>
        </div>
        <div className="proposal_form_container__button_container">
            <button className="proposal_form_container__button_container__button" onClick={handleCreate}>
                Create
            </button>
        </div>
      </div>
    </>
  );
};

export default ProposalForm;
