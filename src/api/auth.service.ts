import api from './api';

interface LoginData {
    login: string;
    password: string;
}

export const AuthService = {
    login: async (data: LoginData) => {
        const response = await api.post('/user/login', data);
        return response.data;
    },
};