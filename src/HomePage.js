import React, { useState, useEffect, useMemo } from 'react';
import firebase from "firebase/app";
import "firebase/database";
import MarkupList from './MarkupList'
import FBConfig from './FBConfig'
  
    // Initialize Firebase  
    firebase.initializeApp(FBConfig);

function HomePage(){

    const [banksInfo, setBanksInfo] = useState([
        // {
        //     id: 21421,
        //     name: 'Google Bank ltd.',
        //     rating: 2,
        //     website: 'google.com',
        //     rate: 17,
        //     maximumLoan: 200000,
        //     minDownPayment: 35000,
        //     term: 60
        // },
        // {
        //     id: 78221,
        //     name: 'PrivatBank UA',
        //     rating: 4,
        //     website: 'privat.com',
        //     rate: 23,
        //     maximumLoan: 400000,
        //     minDownPayment: 135000,
        //     term: 42
        // }
        ])
    const updateFromDB = useMemo(() => firebase.database().ref('banks/').on('value', data => setBanksInfo(data.val())), [])

    const submit = (e) => {
        e.preventDefault()

        firebase.database().ref('banks/').set([{
          id: Date.now(),
          name: document.getElementById("name").value,
          rating: document.getElementById("rating").value,
          website: document.getElementById("website").value,
          rate: document.getElementById("rate").value,
          maximumLoan: document.getElementById("maximumLoan").value,
          minDownPayment: document.getElementById("minDownPayment").value,
          term: document.getElementById("term").value,
        }, ...banksInfo.filter(i => i.name!=document.getElementById("name").value)]
        )
        document.querySelector('.form').classList.add('hidden')
    }
    useEffect(() => document.querySelector('.form').reset(), [submit])
    
    
    function editing (id) { 
        function formMarkup ({id, name, rating, website, rate, maximumLoan, minDownPayment, term}) {
            document.querySelector('.form').classList.remove('hidden')
            document.getElementById("name").value=name
            document.getElementById("rating").value=rating
            document.getElementById("website").value=website
            document.getElementById("rate").value=rate
            document.getElementById("maximumLoan").value=maximumLoan
            document.getElementById("minDownPayment").value=minDownPayment
            document.getElementById("term").value=term
        }
        formMarkup(banksInfo.find(bank => bank.id == id))
    }  

    function deleting (id) {
        firebase.database().ref('banks/').set(banksInfo.filter(i => i.id!==id))
    }

    const listOfBanks = banksInfo.map(bank => MarkupList(bank, editing, deleting))

    return(
        <div className='homepage'>
            <div className='createBank' onClick={() => document.querySelector('.form').classList.toggle('hidden')}>Create a new Bank</div>
            <form className="form hidden" onSubmit={e => submit(e)}>
                <div className='bankInfo'>
                    <input className="field" type="text" required minlength="3" id="name" placeholder="Bank name"></input>
                    <input className="field" type="number" required min="1" max='99' id="rating" placeholder="Place in rating of the NBU"></input>
                    <input className="field" type="text" required minlength="5" id="website" placeholder="Official page of Bank"></input> 
                </div>
                <div className='loanInfo'>
                    <input className="field" type="number" required min="0" id="rate" placeholder="Interest rate"></input>
                    <input className="field" type="number" required min="1000" max='100000000' id="maximumLoan" placeholder="Maximum loan"></input>
                    <input className="field" type="number" required min="0" max='50000000' id="minDownPayment" placeholder="Minimum down payment"></input>
                    <input className="field" type="number" required min="1" max='600' id="term" placeholder="Loan term"></input> 
                </div>
                <input className='field input-btn' type="submit" value='Send'></input>
            </form>
            <div>
                {listOfBanks}
            </div>
            
        </div>
    )
}

export default HomePage