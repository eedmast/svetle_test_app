import axios from "axios";

const DB_ADDRESS = 'http://localhost:3001/users'

export function fetchUserData() {
    return new Promise((resolve, reject) => {
        axios.get(DB_ADDRESS)
            .then((response) => {
                resolve(response.data[0]);
            })
            .catch(errorHandler.bind(null, reject));
    })
}

export function sendCreateUserRequest(data) {
    return new Promise( (resolve, reject) => {
        axios.post(DB_ADDRESS, data)
            .then((response) => {
                resolve(response.data);
            })
            .catch(errorHandler.bind(null, reject));
    });
}

export function sendDeleteUserRequest() {
    return new Promise( (resolve, reject) => {
        axios.delete(`${DB_ADDRESS}/1`)
            .then((response) => {
                resolve({});
            })
            .catch(errorHandler.bind(null, reject));
    })
}

function errorHandler(...args) {
    const error = args.filter(arg => typeof(arg) === 'object')[0];
    const callback = args.filter(arg => typeof(arg) === 'function')[0];
    callback(error);
}