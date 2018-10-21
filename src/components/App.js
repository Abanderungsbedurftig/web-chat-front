import React, {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {AuthPage, ChatPage} from './containers'
import E404 from './E404'

class App extends Component{

  constructor(props){
    super(props)
  }

  render(){
    const {login} = this.props.store.getState()

    return (
        <Switch>
            <Route exact path="/" component={AuthPage} />
            <Route path="/chat" component={(login) ? ChatPage : (<Redirect to="/"/>)} /> 
            <Route component={E404}/>
        </Switch>
    )
  }
}

export default App
