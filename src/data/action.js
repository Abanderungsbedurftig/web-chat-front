export const C = {
    ACTION_CHANGE_ACCOUNT: 'ACTION_CHANGE_ACCOUNT',
    ACTION_ADD_MESSAGE: 'ACTION_ADD_MESSAGE',
    ACTION_DELETE_ACCOUNT: 'ACTION_DELETE_ACCOUNT',
    ACTION_ADD_ERROR: 'ACTION_ADD_ERROR',
    ACTION_DELETE_ERROR: 'ACTION_DELETE_ERROR',
    ACTION_EDIT_CLIENTS: 'ACTION_EDIT_CLIENTS',
    ACTION_ADD_IP: 'ACTION_ADD_IP',
    ACTION_AUTH: 'ACTION_AUTH'
}

export const actionChangeAccount = (login) => 
    ({
        type: C.ACTION_CHANGE_ACCOUNT,
        login
    })

export const actionAddMessage = (username, message) =>
    ({
        type: C.ACTION_ADD_MESSAGE,
        username: username,
        message: message,
        date: new Date()
    })

export const actionDeleteAccount = () =>
    ({
        type: C.ACTION_DELETE_ACCOUNT
    })

export const actionAddError = (message) =>
    ({
        type: C.ACTION_ADD_ERROR,
        message: message
    })
export const actionDeleteError = () =>
    ({
        type: C.ACTION_DELETE_ERROR 
    })
export const actionEditClients = (clients) =>
    ({
        type: C.ACTION_EDIT_CLIENTS,
        clients: clients
    })

export const actionAddIp = (ip) => 
    ({
        type: C.ACTION_ADD_IP,
        ip_address: ip
    })
export const actionAuth = (auth) =>
    ({
        type: C.ACTION_AUTH,
        auth: auth
    })
