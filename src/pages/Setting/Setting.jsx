import axios from 'axios'
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import './Setting.css'

export default function Setting() {
    const [foto, setFoto] = useState("https://static.vecteezy.com/ti/vetor-gratis/t2/550980-de-icone-de-usuario-gratis-vetor.jpg")
    const [primnone, setPrimnone] = useState(null)
    const [idade, setIdade] = useState(null)
    const [genero, setGenero] = useState("Masculino")
    const [prefgenero, setPrefgenero] = useState("Masculino")
    const [sobre, setSobre] = useState(null)
    const location = useLocation();
    const navegar = useNavigate()

    const path = location.pathname.split("/")[2]

    const setUserData = async ()=>{
        try{
            await axios.put(`http://localhost:8080/auth/${path}`, {
                profilePic: foto,
                primnone,
                idade,
                genero,
                prefgenero,
                userId: path,
                sobre
            })

            Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Conta criada com Sucesso!',
            showConfirmButton: false,
            timer: 1500
            })


            navegar("/")
            
        }catch(err){console.log(err)}
    }
    return (
    <div className='settingFull'>
        <menu className='settingMenu'>
            <img src="./image/cor.png" alt="" className="imgLogoPreta" />
        </menu>
        <fieldset className='createField'>
            <h3>SETTING YOU ACCOUNT</h3>
        </fieldset>
        <section className='sectionSetUser'>
            <div className="dataUser">
                <div className="fastName">
                    <label htmlFor="">First Name</label>
                    <input type="text" className='idade' onChange={(e)=>setPrimnone(e.target.value)}/>
                </div>
                <div className="fastName">
                    <label htmlFor="">Idade</label>
                    <input type="number" className='idade' onChange={(e)=>setIdade(e.target.value)}/>
                </div>
                <div className="show-me fastName">
                    <label htmlFor="">Genero</label>
                    <div className="showme">
                        <select className='selectInput' onChange={(e)=>setGenero(e.target.value)}>
                            <option value="Masculino">Masculino</option>
                            <option value="Femenino">Femenino</option>
                        </select>
                    </div>
                </div>
                <div className="fastName">
                    <label htmlFor="">Preferença</label>
                    <div className="showme">
                        <select className='selectInput' onChange={(e)=>setPrefgenero(e.target.value)}>
                            <option value="Masculino">Masculino</option>
                            <option value="Femenino">Femenino</option>
                        </select>
                    </div>
                </div>
                <div className="fastName">
                    <label htmlFor="">About me</label>
                    <input type="text" className='idade' onChange={(e)=>setSobre(e.target.value)}/>
                </div>
                <div className="fastName">
                    <button className='idade' onClick={setUserData}>Submit</button>
                </div>

            </div>
            <div className="fotoUser">
                <div className="fastName">
                    <label htmlFor="">Phofile</label>
                    <input type="text" 
                        onChange={(e)=> setFoto(e.target.value)}
                        className='submit-button inputBottum'/>
                </div>
                <img className='imgObject' src={foto} alt='' />
            </div>
        </section>
    </div>
  )
}
