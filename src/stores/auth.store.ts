import { defineStore } from 'pinia';
import { AuthService } from '../api/auth.service';

interface AuthState {
    token: string | null;
}

export const useAuthStore = defineStore('auth', {
    state: (): AuthState => ({
        token: localStorage.getItem('token'),
    }),
    actions: {
        async login(credentials: { login: string; password: string }) {
            try {
                const response = await AuthService.login(credentials);
                this.token = response.token;
                localStorage.setItem('token', response.token);
            } catch (error) {
                throw new Error('Login falhou, verifique suas credenciais.');
            }
        },
        logout() {
            this.token = null;
            localStorage.removeItem('token');
        },
    },
    getters: {
        isAuthenticated: (state) => !!state.token,
    },
});
