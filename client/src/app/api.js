import axios from 'axios'
var url = 'http://localhost:3002/api/v1'

export const register = async (data) => {
   return await axios.post(`${url}/register`, data);
}

export const getAllUsers = async () => {
    return await axios.post(`${url}/get-all-users`)
}

export const createTask = async (data) => {
   return await axios.post(`${url}/task/create`, data)
}


export const getAllTasks = async () => {
    return await axios.post(`${url}/task/get-all-task`)
}