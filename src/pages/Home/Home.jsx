import React, { useEffect, useState } from 'react'
import Login from '../../components/Login/Login'
import Registrar from '../../components/Registrar/Registrar'
import'./Home.css'

export default function Home() {
    const [registrar, setRegistrar] = useState(false)
    const [home, setHome] = useState(false)
    const [login, setLogin] = useState(true)
    useEffect(()=>{
        setRegistrar(false)
        setHome(true)
        setLogin(false)
    }, [])

    const registrarForm = ()=>{
        setRegistrar(true)
        setHome(false)
        setLogin(false)
    }
    const LoginForm = ()=>{
        setRegistrar(false)
        setHome(false)
        setLogin(true)
    }
  return (
    <div className='fullHome'>
        <menu className='menuHome'>
                <img src="./image/bra.png" alt="" className="logoBranca" />
                <button className='loginButton' onClick={LoginForm}>Login</button>
        </menu>
        <section className='fullSectionHome'>
            {home && (
            <div className="contentCreateAccount">
                <h1 className="fastTest">Swipe Right</h1>
                <button className='buttonCreate' onClick={registrarForm}>CREATE ACCOUNT</button>
            </div>
            )}
            {registrar && <Registrar setHome={setHome} setLogin={setLogin} setRegistrar={setRegistrar} />}
            {login && <Login setHome={setHome} setLogin={setLogin} setRegistrar={setRegistrar}/>}
        </section>
    </div>
  )
}
