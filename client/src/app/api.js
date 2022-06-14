import axios from 'axios'
var url = 'http://localhost:3002/api/v1'

const token = JSON.parse(localStorage.getItem('token'));

const headers =  {
   headers:{   
    'token' : token
  }
}

export const register = async (data) => {
   return await axios.post(`${url}/register`, data);
}

export const getAllUsers = async () => {
    return await axios.post(`${url}/get-all-users`)
}

export const createTask = async (data) => {
   return await axios.post(`${url}/task/create`, data, headers)
}


export const getAllTasks = async () => {
    return await axios.post(`${url}/task/get-all-task`)
}

export const getTasks = async (data) => {
    return await axios.post(`${url}/task/get-task`, data)
}

export const updateTask = async(data) => {
   return await axios.post(`${url}/task/update`, data, headers)
}