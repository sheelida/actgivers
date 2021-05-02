import React  from 'react';
import { DonateForm } from './DonateForm'
import '../styles/donate.css'

export const Donate = (data) => {
  const { props } = data.location
  return (
    <div className="mainContainer">
      <h2>Become an active <b>giver</b> and make people's lives better by <em className="emphasis">acting</em>.</h2>
      <div className="row"> 
        <div className="col">
          <h3>Your details</h3>
          <DonateForm  props={props} />
        </div>
        <div className="col">
          <h3>Charity details</h3>
          <p>{ props }</p>
        </div>

      </div>
    </div>
  )
}
