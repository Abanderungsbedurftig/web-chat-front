import React from 'react'
import '../css/Error.css'
import PropTypes from 'prop-types'

const ErrorWindow = ({message, onClick=f=>f}) => {
    return (
        <div className="error-window">
            <span>{message}</span>
            <button className="error-btn" onClick={() => onClick()}>OK</button>
        </div>
    )
}

ErrorWindow.propTypes = {
    onClick: PropTypes.func
}

export default ErrorWindow