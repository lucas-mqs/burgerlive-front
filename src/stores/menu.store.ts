import { defineStore } from 'pinia';
import { MenuService } from '../api/menu.service';

export const useMenuStore = defineStore('menu', {
    state: () => ({
        categories: [],
        hamburgers: [],
        appetizers: [],
        desserts: [],
        beverages: [],
        paymentOptions: [],
        loading: false
    }),
    actions: {
        async fetchAll() {
            try {
                this.loading = true;
                const [categories, hamburgers, appetizers, desserts, beverages, paymentOptions] =
                    await Promise.all([
                        MenuService.getCategories(),
                        MenuService.getHamburgers(),
                        MenuService.getAppetizers(),
                        MenuService.getDesserts(),
                        MenuService.getBeverages(),
                        MenuService.getPaymentOptions(),
                    ]);

                this.categories = categories.data;
                this.hamburgers = hamburgers.data;
                this.appetizers = appetizers.data;
                this.desserts = desserts.data;
                this.beverages = beverages.data;
                this.paymentOptions = paymentOptions.data;
            } catch (error) {
                console.error('Error fetching menu:', error);
            } finally {
                this.loading = false;
            }
        }
    }
});