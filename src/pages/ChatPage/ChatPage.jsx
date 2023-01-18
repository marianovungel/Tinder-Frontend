import React, { useEffect, useState } from 'react'
import Chat from '../../components/Chat/Chat'
import ChatUser from '../../components/ChatUser/ChatUser'
import { useCookies } from 'react-cookie'
import './ChatPage.css'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function ChatPage() {
    const [chatMatch, setChatMatch] = useState(true)
    const [objectUser, setObjectUser] = useState({ })
    const [add, setAdd] = useState("border")
    const [addd, setAddd] = useState(" ")
    const [sms, setSms] = useState([])
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const navegar = useNavigate()

    const location = useLocation()
    const path = location.pathname.split("/")[2]

    useEffect(()=>{
        const getChat = async ()=>{
            try{
                const ChatObject = await axios.get(`http://localhost:8080/${path}`)
                setSms(ChatObject.data)
            }catch(err){
                console.log(err)
            }
        }
        getChat()
    }, [path])
    

    const setMatch = ()=>{
        navegar("/")
    }
    const setChat = ()=>{
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
  return (
    <div className='fullPrincipal'>
        <section className='sectMenu'>
            <menu className='menuImgSeta'>
                <div className="imgName">
                    <img src={cookies.imagem} alt="" className="PhotoProfile" />
                    <h4 className='userAmaral'>{cookies.username}</h4>
                </div>
                <img src="../image/seta.png" alt="" className="seta" onClick={logout} />
            </menu>
            <div className="matchAndChat">
                <div className={`match ${addd}`} onClick={setMatch}>Match</div>
                <div className={`chat ${add}`} onClick={setChat}>Chat</div>
            </div>
            <ChatUser setChatMatch={setChatMatch} setObjectUser={setObjectUser} />
        </section>
        <fieldset className='fieldBody'>
            {chatMatch && (<Chat  objectUser={objectUser} sms={sms}  path={path} />)}
            
        </fieldset>
    </div>
  )
}
