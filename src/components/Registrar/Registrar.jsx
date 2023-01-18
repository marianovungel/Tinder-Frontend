import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import Swal from 'sweetalert2'
import './Registrar.css'

export default function Registrar({setHome, setLogin, setRegistrar}) {

  const [username, setUsername] = useState(null)
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const navegar = useNavigate()


    const homeClick = ()=>{
        setHome(true)
        setLogin(false)
        setRegistrar(false)
    }

    const CreateUser = async (e)=>{
      e.preventDefault()
      try {
        const user = await axios.post("http://localhost:8080/auth", {
          username,
          email,
          password
        })

        // Swal.fire({
        //   position: 'center',
        //   icon: 'success',
        //   title: 'Conta criada com Sucesso!',
        //   showConfirmButton: false,
        //   timer: 1500
        // })
        navegar(`/set/${user.data._id}`)

      } catch (error) {
        alert("algo deu errado!")
      }
    }

  return (
    <div className='RegistrarComponent'>
        <form className='FormCreate' onSubmit={CreateUser}>
            <h2 className="titleForm">CREATE ACCOUNT</h2>
            <p className="textForm">
            By clicking Log In, you agree to our terms. 
            Learn how we process your data in 
            our Privacy Policy and Cookie Policy.
            </p>
            <input type="text" className="username" onChange={(e)=> setUsername(e.target.value)} />
            <input type="email" className="username" onChange={(e)=>setEmail(e.target.value)} />
            <input type="password" className="username" onChange={(e)=>setPassword(e.target.value)} />
            <button className='criar username' type='submit'>CRIAR</button>
            <div className="barra"></div>
            <h2 className="getApp titleForm">GET THE APP</h2>
            <img src="./image/x.png" onClick={homeClick} alt="" className="imgIcom" />
        </form>
    </div>
  )
}
