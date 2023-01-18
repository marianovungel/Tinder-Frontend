import axios from 'axios'
import React, { useState } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import TinderCard from 'react-tinder-card'
// import Swal from 'sweetalert2'
import "./Match.css"



function Simple ({ db, setControl }) {
  const characters = db
  const [lastDirection, setLastDirection] = useState()
  const [cookies] = useCookies(['user']);
  const nav = useNavigate()

  const matchFunction = async (id)=>{
    try{
        const fiMatch = await axios.get(`http://localhost:8080/auth/match/${id}`, {
          headers: {userid: cookies.id}
        })
        nav("/")

        console.log(fiMatch)
        
    }catch(err){
      console.log(err.message)
    }
  }


  const CheckMatch = async (username, id, profilePic)=>{
    try{
      const getchat = await axios.get("http://localhost:8080/auth/getchat", {
        headers: {id: cookies.id, idd: id}
      })

      getchat.data && matchFunction(id)
      
      
    }catch(err){
      console.log(err.message)
    }
  }


  const swiped = (direction, nameToDelete, id, profilePic) => {
    setLastDirection(direction)
    if(direction === 'right' || direction === 'up'){
      CheckMatch(nameToDelete, id, profilePic)
    }
  }

  

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
    console.log(name)
  }

  return (
    <div className='fullContentCardTinder'>
      <link href='https://fonts.googleapis.com/css?family=Damion&display=swap' rel='stylesheet' />
      <link href='https://fonts.googleapis.com/css?family=Alatsi&display=swap' rel='stylesheet' />
      <h1>React Tinder Card</h1>
      <div className='cardContainer'>
        {characters.map((character) =>
          <TinderCard className='swipe' key={character.name} onSwipe={(dir) => swiped(dir, character.name, character._id, character.profilePic)} onCardLeftScreen={() => outOfFrame(character.name)}>
            <div style={{ backgroundImage: 'url(' + character.url + ')' }} className='card'>
              <h3>{character.name}</h3>
            </div>
          </TinderCard>
        )}
      </div>
      {lastDirection ? <h2 className='infoText'>You swiped {lastDirection}</h2> : <h2 className='infoText' />}
    </div>
  )
}

export default Simple