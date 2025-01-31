import type { PaymentMethod } from '../../domain/models/PaymentMethod';

export class PaymentService {
    async processPayment(amount: number, method: PaymentMethod): Promise<boolean> {
        // Simula delay de processamento
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Sempre retorna sucesso para demonstração
        return true;
    }
}