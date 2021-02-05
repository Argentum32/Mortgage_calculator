import React, { useState, useMemo } from 'react';
import {useParams} from "react-router-dom";
import firebase from "firebase/app";
import "firebase/database";

function Loan () {
    const {id} = useParams()
    // const [banks, setBanks] = useState([])
    const [bankParams, setBankParams] = useState({})
    // const getData = useMemo(() => firebase.database().ref('banks/').once('value').then(data => setBanks(data.val())), [])
    const getSelectedBankData = useMemo(() => firebase.database().ref('banks/').once('value').then(data => setBankParams(data.val().find(bank => bank.id == id))), [])
        
    console.log(bankParams)

    const [loanData, setLoanData] = useState({})
        

        function loanInfo({id, name, rate, maximumLoan, minDownPayment, term}){
            const lSubmit = (e) => {
                e.preventDefault()
            
                setLoanData({
                    bLoan: document.getElementById("loan").value,
                    bDownPayment: document.getElementById("downPayment").value,
                })
                document.querySelector('.payment').classList.remove('hidden')
            }
            const payment = ((((loanData.bLoan-loanData.bDownPayment)*(rate/100/12))*((1+(rate/100/12))**term))/(((1+(rate/100/12))**term)-1)).toFixed(2)

            return(
                <div>
                    <form onSubmit={e => lSubmit(e)}>
                        <h2>{name}</h2>
                        <input className="field" type="number" required min="1000" max={maximumLoan} id="loan" placeholder={`Maximum loan is: ${maximumLoan}`}></input>
                        <input className="field" type="number" required min={minDownPayment} max={maximumLoan/2} id="downPayment" placeholder={`Minimum down payment is: ${minDownPayment}`}></input>
                        <input className='field input-btn' type="submit" value='Send'></input>
                    </form>
                    <h3 className='payment hidden'>Monthly payment: {payment}$</h3>
                </div>
            )
        }
        
        let rendered = loanInfo(bankParams)
        

  return(
    <div>{rendered}</div>
  )

}

export default Loan