let fetch = require('node-fetch');

function ServerException(message) {
    this.message = message;
    if ("captureStackTrace" in Error) {
        Error.captureStackTrace(this, ServerException);
    }
    else {
        this.stack = (new Error()).stack;
    }
}
ServerException.prototype = Object.create(Error.prototype);
ServerException.prototype.name = "ServerException";
ServerException.prototype.constructor = ServerException;

const serverUrl = 'http://localhost:8081';
const OK = 200;
const ERROR = 500;

async function register(name, email, password, addDefaultGames=true) {
    let response = await fetch(serverUrl + '/api/register', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            email: email.toLowerCase(),
            password: password,
            addDefaultGames: addDefaultGames
        })
    });
    let content = await response.json();
    if (response.status === OK) {
        return content.id;
    } else if (response.status === ERROR) {
        throw new ServerException(content.error);
    } else {
        throw new Error("Unknown error.");
    }
}

async function login(email, password) {
    let response = await fetch(serverUrl + '/api/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email.toLowerCase(),
            password: password
        })
    });
    let content = await response.json();
    if (response.status === OK) {
        return content.id;
    } else if (response.status === ERROR) {
        throw new ServerException(content.error);
    } else {
        throw new Error("Unknown error.");
    }
}

async function getUserAttributes(userId) {
    let response = await fetch(serverUrl + '/api/user/' + userId, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    let content = await response.json();
    if (response.status === OK) {
        return {
            name: content.name,
            email: content.email,
            games: content.games
        }
    } else if (response.status === ERROR) {
        throw new ServerException(content.error);
    } else {
        throw new Error("Unknown error.");
    }
}

async function updateUser(userId, name, email) {
    let response = await fetch(serverUrl + '/api/updateUser', {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: userId,
            email: email.toLowerCase(),
            name: name,
        })
    });
    if (response.status === OK) {
        return true;
    } else if (response.status === ERROR) {
        let content = await response.json();
        throw new ServerException(content.error);
    } else {
        throw new Error("Unknown error.");
    }
}

module.exports = {
    register,
    login,
    getUserAttributes,
    updateUser,
};
