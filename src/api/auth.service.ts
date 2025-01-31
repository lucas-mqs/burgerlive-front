import api from './api';

interface LoginData {
    login: string;
    password: string;
}

export const AuthService = {
    login: async (data: LoginData) => {
        try {
            const response = await api.post('/user/login', data);
            return response.data; // Retorna o token esperado
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            throw new Error('Falha na autenticação');
        }
    },
};
