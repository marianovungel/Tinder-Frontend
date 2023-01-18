import React, { useEffect, useState } from 'react'
import Chat from '../../components/Chat/Chat'
import ChatUser from '../../components/ChatUser/ChatUser'
import Match from '../../components/Match/Match'
import MatchUser from '../../components/MatchUser/MatchUser'
import { useCookies } from 'react-cookie'
import './Principal.css'
import axios from 'axios'

export default function Principal() {
    const [show, setShow] = useState(true)
    const [chatMatch, setChatMatch] = useState(true)
    const [objectUser, setObjectUser] = useState({ })
    const [add, setAdd] = useState("border")
    const [addd, setAddd] = useState(" ")
    const [control, setControl] = useState(false)
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const [db, setDb] = useState([])


    

    const setMatch = ()=>{
        setShow(true)
        setAdd("border")
        setAddd(" ")
        setChatMatch(true)
    }
    const setChat = ()=>{
        setShow(false)
        setAdd(" ")
        setAddd("border")
    }
    const logout = ()=>{
        removeCookie('username', cookies.username)
        removeCookie('id', cookies.id)
        removeCookie('imagem', cookies.imagem)
        removeCookie('like', cookies.like)
        removeCookie('match', cookies.match)
    }

    useEffect(()=>{
        const getData = async ()=>{
          try{
            const prefUser = await axios.get(`http://localhost:8080/auth/${cookies.id}`)
            
            if(prefUser.data.prefgenero){
              try{
                const myData = await axios.get("http://localhost:8080/auth/", {
                  headers: {preferenca: prefUser.data.prefgenero}
                })
    
                setDb(myData.data)
              }catch(err){
                console.log(err)
              }
            }
          }catch(err){
            console.log(err)
          }
        }
        setControl(false)
        getData()
      }, [cookies.id, control])

  return (
    <div className='fullPrincipal'>
        <section className='sectMenu'>
            <menu className='menuImgSeta'>
                <div className="imgName">
                    <img src={cookies.imagem} alt="" className="PhotoProfile" />
                    <h4 className='userAmaral'>{cookies.username}</h4>
                </div>
                <img src="./image/seta.png" alt="" className="seta" onClick={logout} />
            </menu>
            <div className="matchAndChat">
                <div className={`match ${add}`} onClick={setMatch}>Match</div>
                <div className={`chat ${addd}`} onClick={setChat}>Chat</div>
            </div>
            {show && (<MatchUser  />)}
            {!show && (<ChatUser setChatMatch={setChatMatch} setObjectUser={setObjectUser} />)}
        </section>
        <fieldset className='fieldBody'>
            {!chatMatch && (<Chat  objectUser={objectUser} />)}
            { chatMatch && (
            <div className="matchSection">
                <Match db={db} setControl={setControl} />
            </div>
            )}
        </fieldset>
    </div>
  )
}
