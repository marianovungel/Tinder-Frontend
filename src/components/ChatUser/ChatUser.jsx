import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import './ChatUser.css'

export default function ChatUser() {
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const [users, setUsers] = useState([])

    useEffect(()=>{
        const getMatchs = async()=>{
            try{
                const allUsers = await axios.get(`http://localhost:8080/auth/${cookies.id}`)
                setUsers(allUsers.data.match)
            }catch(err){
                console.log("Algo deu errado!")
            }
        }
        getMatchs()
    }, [])

  return (
    <div className='MatchUserContent'>
        {users?.map((userValor)=>(
            <Link className="cardUserLink" to={`/chat/${userValor?.chat}`} key={userValor.chat}>
                <div className="cardUser" >
                    <div className="im" >
                        <img
                        src={userValor.profilePic} 
                        alt="" 
                        className="MatchImg" />
                        <i className="MatchName">{userValor.primnone}</i>
                    </div>
                    <i className="MatchDate">Tur 10/10</i>
                </div>
            </Link>
        ))}
    </div>
  )
}
