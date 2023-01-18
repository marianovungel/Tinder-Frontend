import axios from 'axios';
import React, { useState } from 'react'
import { useCookies } from 'react-cookie';
import './Login.css'

export default function Login({setHome, setLogin, setRegistrar}) {

  const [username, setUsername] = useState(null)
  const [password, setPassword] = useState(null)
  const [cookies, setCookie] = useCookies(['user']);

    const homeClick = ()=>{
        setHome(true)
        setLogin(false)
        setRegistrar(false)
    }

    const CreateUser = async (e)=>{
      e.preventDefault()
      try {
        const user = await axios.post("http://localhost:8080/auth/login", {
          username,
          password
        })
        setCookie('username', user.data.username)
        setCookie('id', user.data._id)
        setCookie('imagem', user.data.profilePic)
        setCookie('like', user.data.like)
        setCookie('match', user.data.match)

        console.log(cookies)
        
        homeClick()

      } catch (error) {
        alert("algo deu errado!")
      }
    }
  return (
    <div className='RegistrarComponent'>
        <form className='FormCreate' onSubmit={CreateUser}>
            <h2 className="titleForm">LOGIN APP</h2>
            <p className="textForm">
            By clicking Log In, you agree to our terms. 
            Learn how we process your data in 
            our Privacy Policy and Cookie Policy.
            </p>
            <input type="text" className="username" placeholder='Username' onChange={(e)=>setUsername(e.target.value)}/>
            <input type="password" className="username" placeholder='Password' onChange={(e)=>setPassword(e.target.value)}/>
            <button className='criar username'type='onsubmit' >LOGIN</button>
            <div className="barra"></div>
            <h2 className="getApp titleForm">GET THE APP</h2>
            <img src="./image/x.png" onClick={homeClick} alt="" className="imgIcom" />
        </form>
    </div>
  )
}
