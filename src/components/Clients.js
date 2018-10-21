import React from 'react'
import '../css/Clients.css'

const Clients = ({clients}) => {

    return(
        <div  className="clients-list">
            <ul>
                <li className="list-title">&nbsp;В чате находятся:</li>
                {(clients.length) ? clients.map((client, i) => 
                    <li key={i}>&nbsp;{client.username}<span className="connected"></span></li>
                ) : <li></li>
                }
            </ul>
        </div>
    )
}

export default Clients