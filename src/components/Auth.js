import React from 'react'
import PropTypes from 'prop-types'
import ErrorWindow from './Error'
import '../css/Auth.css'

const Auth = ({error, onAuth=f=>f, onExitError=f=>f}) => {
    let _login, _password
    const submit = (e) => {
        e.preventDefault()
        if(_login.value && _password.value){
            onAuth(_login.value, _password.value)
            _login.value = ""
            _password.value = ""
        }
    }
    
    return(
        <div>
            {(error) ? (<ErrorWindow message={error} onClick={onExitError}/>) : null }                 
            <div className="auth-form">
                <form onSubmit={submit}>
                    <input ref={input => _login = input} type="text" className="item-form input-form" placeholder="Логин:" required/>
                    <input ref={input => _password = input} type="password" className="item-form input-form" placeholder="Пароль:" required/>
                    <button className="item-form btn-form">Войти</button>               
                </form>
            </div>
        </div>
    )
}

Auth.propTypes = {
    onAuth: PropTypes.func,
    onExitError: PropTypes.func
}

export default Auth
