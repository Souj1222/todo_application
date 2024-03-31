export const BASE_URL = (url)=>
    url ? `https://localhost:3000/api${url}` : 'https://localhost:3000/api';


export const AUTH_END_POINTS = {
    LOGIN: BASE_URL('/auth/login'),
    REGISTER:BASE_URL('/auth/register')
}

export const TODO_API = {
    GET_ALL_TODOS: BASE_URL("/todos"),
    CREATE_NEW_TODO : BASE_URL('/todos'),
    DELETE_TODO : (id)=>BASE_URL(`/todos/${id}`),
    UPDATE_TODO: (id)=>BASE_URL(`/todos/${id}`) 
}