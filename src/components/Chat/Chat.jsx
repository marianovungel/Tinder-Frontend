import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import './Chat.css'

export default function Chat({ sms, path }) {
    const [user, setUser] = useState({})
    const [newSms, setNewSms] = useState()
    const [cookies, setCookie, removeCookie] = useCookies(['user'])
    const [newtext, setNewtext] = useState(" ")

    const sendSms = async ()=>{
        try{
            
            const message = await axios.post("http://localhost:8080/", {
                author: cookies.id,
                sms: newtext,
                chatId: path,
            })
            setNewtext(" ")
            setNewSms([...sms, message.data])
            console.log(message)
        }catch(err){
            alert(err)
        }
    }
    
    useEffect(()=>{
        const getUser = async()=>{
            setNewSms(sms)
            try{
                const res = await axios.get(`http://localhost:8080/auth/chat/${path}`)
                const idUser  = await res.data.users.find((idd)=> idd !== cookies.id)
                
                if(idUser){
                    try{
                        const newRes = await axios.get(`http://localhost:8080/auth/${idUser}`)
                        setUser(newRes.data)
                    }catch(err){
                        console.log(err)
                    }
                }
            }catch(err){
                console.log(err)
            }
        }
        getUser()
    }, [path, cookies.id, sms])


  return (
    <div className='fullContentChat'>
        <header className="headerChat">
            <img 
            src={user.profilePic}
            alt="" 
            className="imgChat" />
            <h3 className="nameChat">{user.username}</h3>
        </header>
        <section className='sectionMessage'>
            
            {newSms?.map((men)=>(
                <div className={men.author === cookies.id ? `authorsms` : `message` }key={men._id}>
                    <h6 className="textMessage">{men.sms}</h6>
                    <i className="date">{new  Date(men.createdAt).toDateString()}</i>
                </div>
            ))}
        </section>
        <footer className='footerChat'>
            <input type="text" className="textChatFooter" value={newtext} onChange={(e)=>setNewtext(e.target.value)} />
            <button className='buttonFooter' onClick={sendSms}>Enviar</button>
        </footer>
    </div>
  )
}
