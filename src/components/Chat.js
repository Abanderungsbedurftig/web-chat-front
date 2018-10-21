import React, {Component} from 'react'
import Logout from './Logout'
import Clients from './Clients'
import ErrorWindow from './Error'
import openSocket from 'socket.io-client'
import '../css/Chat.css'

class Chat extends Component{

    constructor(props){
        super(props)
        this.text = React.createRef()
        this.chatField = React.createRef()
        this.submit = this.submit.bind(this)
        this.getTime = this.getTime.bind(this)
        this.toLogout = this.toLogout.bind(this)
        this.reconnect = this.reconnect.bind(this)
    }

    componentWillMount(){ 
        this.socket = openSocket(this.props.ip_address)

        this.socket
        .on('message', (username, message) => {
            this.props.onMessage(username, message)
            this.chatField.current.scrollTop = this.chatField.current.scrollHeight
        })
        .on('connect', () => {
            this.props.onExitError()
            this.text.current.disabled = false
        })
        .on('get_clients', (data) => {
            let cl = JSON.parse(data).clients
            this.props.onEditClients(cl)
        })
        .on('leave', (username) => {
            this.props.onMessage('app', `${username} вышел из чата`)
            this.chatField.current.scrollTop = this.chatField.current.scrollHeight 
        })
        .on('join', (username) => {
            this.props.onMessage('app', `${username} вошел в чат`)
            this.chatField.current.scrollTop = this.chatField.current.scrollHeight 
        })
        .on('disconnect', () => {
            this.props.onAddError('Соединение разорвано')
            this.text.current.disabled = true
            setTimeout(this.reconnect, 500)
        })
        .on('logout', () => {
            window.location.href = "/"
        })
        .on('error', (reason) => {
            if(reason === "handshake unauthorized"){
                this.props.onAddError('Ошибка авторизации')
            }else{
                this.props.onAddError('Отсутствует соединение')
                setTimeout(function(){
                    this.socket.socket.connect()
                }, 500)
            }
        });
    }

    componentWillUpdate(nextProps){
        if(!nextProps.login) window.location.href = "/"
    }

    reconnect(){
        this.socket.once('error', () => {
          setTimeout(this.reconnect, 500);
        });
        this.socket.socket.connect();
    }

    submit(e){
        e.preventDefault()
        let txt = this.text.current.value
        if(txt){       
            this.socket.emit('message', this.props.login, txt, () => {
                this.props.onMessage(this.props.login, txt)  
                this.chatField.current.scrollTop = this.chatField.current.scrollHeight 
            }); 
            this.text.current.value = ''      
        }
    }

    getTime(date){
        let hours = date.getHours()
        let minutes = date.getMinutes() 
        if(hours < 10) hours = '0' + hours
        if(minutes < 10) minutes = '0' + minutes
        return `${hours}:${minutes}`  
    }

    toLogout(){ 
        this.props.onLogout()
        this.socket.emit('logout')
        window.location.href = '/'
    }

    render(){
        const {login, messages, clients, error, onExitError} = this.props
        const {submit, toLogout, getTime, text, chatField} = this 

        return(
            <div className="chat-container">
                <Logout login={login} onClick={toLogout}/>
                <Clients clients={clients}/>                
                {(error) ? (<ErrorWindow message={error} onExitError={() => onExitError()}/>) : <div></div>}
                <div className="chat-field" ref={chatField}>
                    <ul>
                        {(messages) ? messages.map((user, i) => (user.username === 'app') ? (<li key={i} className="info-message">{user.message}</li>) : (
                                <li key={i} className={(user.username === login) ? "message" : "other-messages"}><span className={(user.username === login) ? "username" : "other-usernames"}>{(user.username === login) ? "etoya" : user.username}:</span> {user.message}<span className={(user.username === login) ? "date date-right" : "date date-left"}>{getTime(user.date)}</span></li>
                        )) : <li></li>
                        }
                    </ul>
                </div>
                <div className="chat-in">
                    <form onSubmit={submit}>
                        <textarea ref={text} placeholder="Введите сообщение..."></textarea>
                        <button></button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Chat