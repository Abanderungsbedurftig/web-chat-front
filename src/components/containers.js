import {connect} from 'react-redux'
import Auth from './Auth'
import Chat from './Chat'
import {actionChangeAccount, actionAddMessage, actionDeleteAccount, actionDeleteError, actionAddError, 
actionEditClients, actionAddIp, actionAuth} from '../data/action';
import fetch from 'isomorphic-fetch'

const logError = error => console.log(error)

const mapStateToPropsAuth = state =>
    ({
        error: state.error
    })

const mapStateToPropsChat = state =>
    ({
        login: state.login,
        messages: state.messages,
        clients: state.clients,
        ip_address: state.ip_address,
        error: state.error
    })

const mapDispatchToPropsAuth = dispatch =>
    ({
        onAuth(login, password){
            let body = JSON.stringify({login: login, password: password})
            let options = {
                method: 'POST',
                headers: new Headers({'Content-Type': 'application/json'}),
                body: body
            }
            fetch('/login', options)
                .then((responce) => {
                    if(responce.status === 200){
                        dispatch(actionChangeAccount(login))
                        dispatch(actionAuth(true))
                        responce.json().then(data => {
                            dispatch(actionAddIp(data.message))   
                            window.location.href = "#/chat"
                        })                 
                    }else{
                        responce.json().then(data => {
                            dispatch(actionAddError(data.message))
                        })                
                    }                  
                })
                .catch(logError)
        },
        onExitError(){
            dispatch(actionDeleteError())
        }
    })

const mapDispatchToPropsChat = dispatch =>
    ({
        onMessage(username, message){
            dispatch(actionAddMessage(username, message))
        },
        onLogout(){
            let options = {
                method: 'POST',
                headers: new Headers({'Content-Type': 'application/json'}),
                body: ''
            }
            fetch('/logout', options)
                .then((responce) => {
                    if(responce.status === 200){
                        dispatch(actionDeleteAccount())
                    }else{
                        responce.json().then(data => {
                            dispatch(actionAddError(data.message))
                        }) 
                    }
                })
                .catch(logError)
        },
        onAddError(message){
            dispatch(actionAddError(message))
        },
        onExitError(){
            dispatch(actionDeleteError())
        },
        onEditClients(clients){
            dispatch(actionEditClients(clients))
        }
    })

export const AuthPage = connect(mapStateToPropsAuth, mapDispatchToPropsAuth)(Auth)

export const ChatPage = connect(mapStateToPropsChat, mapDispatchToPropsChat)(Chat)

