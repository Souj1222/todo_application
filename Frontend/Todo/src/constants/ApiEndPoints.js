export const BASE_URL = (url)=>
    url ? `https://localhost:3000/api${url}` : 'https://localhost:3000/api';


export const AUTH_END_POINTS = {
    LOGIN: BASE_URL('auth/login'),
    REGISTER:BASE_URL('auth/register')
}