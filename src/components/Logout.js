import React from 'react'
import PropTypes from 'prop-types'
import '../css/Logout.css'

const Logout = ({login, onClick=f=>f}) => {

    return(
        <div className="account">
            <span className="login-data">{login} | </span><span className="logout" onClick={() => onClick()}>Выйти</span>
        </div>
    )
}

Logout.propTypes = {
    onClick: PropTypes.func
}

export default Logout