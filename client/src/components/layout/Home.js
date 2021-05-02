import React from 'react'
import '../styles/home.css'
import { InfoTable } from './InfoTable';

export const Home = () => {
  return (
    <div className="mainContainer">
      <h2>Become an active <b>giver</b> and make people's lives better by <em className="emphasis">acting</em>.</h2>
      <InfoTable />
    </div>
  )
}
