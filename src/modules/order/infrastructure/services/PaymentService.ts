export class PaymentService {
    async processPayment(): Promise<boolean> {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return true;
    }
}