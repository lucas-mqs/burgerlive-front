import { defineStore } from 'pinia';

interface MenuItem {
    id: string;
    name: string;
    title: string;
    description: string;
    image: string[];
    value: {
        single: number;
        combo: number;
    }
}

export const useMenuStore = defineStore('menu', {
    state: () => ({
        categories: [] as string[],
        hamburgers: [] as MenuItem[],
        appetizers: [] as MenuItem[], 
        desserts: [] as MenuItem[],
        beverages: [] as MenuItem[], 
        paymentOptions: [] as string[],
        loading: false
    }),
    actions: {
        async fetchAll() {
            this.loading = true;
            try {

                // const [categories, hamburgers, appetizers, desserts, beverages, paymentOptions] =
                //     await Promise.all([
                //         MenuService.getCategories(),
                //         MenuService.getHamburgers(),
                //         MenuService.getAppetizers(),
                //         MenuService.getDesserts(),
                //         MenuService.getBeverages(),
                //         MenuService.getPaymentOptions(),
                //     ]);

                // this.categories = categories.data;
                // this.hamburgers = hamburgers.data;
                // this.appetizers = appetizers.data;
                // this.desserts = desserts.data;
                // this.beverages = beverages.data;
                // this.paymentOptions = paymentOptions.data;
                const response = await fetch('/api/menu');
                const data = await response.json();
                this.hamburgers = data.hamburgers;
                this.appetizers = data.appetizers;
                this.desserts = data.desserts;
                this.beverages = data.beverages;
            } catch (error) {
                console.error('Falha ao buscar o menu:', error);
            } finally {
                this.loading = false;
            }
        }
    }
});