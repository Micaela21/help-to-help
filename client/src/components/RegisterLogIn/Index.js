import React from 'react';
import './RegisterLogIn.css'
import {Link} from 'react-router-dom'

import UserForm from './UserForm';
import LogInForm from './LogInForm';

function Index() {


    function myFunction(){
        if (document.getElementById('foo').getAttribute('class') === 'myClass') {
            document.getElementById('foo').setAttribute("class", "over");
            document.getElementById('change').innerText = 'INICIA SESIÓN';
            document.getElementById('h1').innerText = '¿Ya tienes cuenta?';

        } else {
            document.getElementById('foo').setAttribute("class", "myClass");
            document.getElementById('change').innerText = 'REGISTRATE';
            document.getElementById('h1').innerText = '¿Todavía no tienes cuenta?';
        }
    }   

    return (
        
        <div className='all'>
            <img className='background' src='./img/wallpaperRegistro.png' />
            <Link to='/'><img className='back' src='../img/log-in.png'/></Link>
            
            <div className='logContainer'>
                <div className='logContainer2'>
                    <LogInForm />
                    <UserForm />
                </div>
                <div className='over' id='foo'>
                    <h1 id='h1'>¿Ya tienes cuenta?</h1>
                    <button id='change' onClick={myFunction} className='montserrat bold'>INICIA SESIÓN</button>
                </div>
            </div>
        </div>
    )
}

export default Index