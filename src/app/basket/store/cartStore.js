import { create } from 'zustand';

const useCartStore = create((set) => ({
    items: [],

    // Функция инициализации данных из localStorage
    initializeCart: () => {
        const cart = typeof window !== 'undefined' ? localStorage.getItem('cart') : null;
        set(() => ({
            items: cart ? JSON.parse(cart) : [],
        }));
    },

    addItem: (item) => set((state) => {
        const updatedItems = [...state.items];
        const existingItemIndex = updatedItems.findIndex((i) => i.id === item.id);
        if (existingItemIndex >= 0) {
            updatedItems[existingItemIndex].quantity += item.quantity;
        } else {
            updatedItems.push(item);
        }
        localStorage.setItem('cart', JSON.stringify(updatedItems)); // Сохраняем в localStorage
        return { items: updatedItems };
    }),

    removeItem: (id) => set((state) => {
        const updatedItems = state.items.filter((item) => item.id !== id);
        localStorage.setItem('cart', JSON.stringify(updatedItems)); // Обновляем localStorage
        return { items: updatedItems };
    }),

    updateQuantity: (id, quantity) => set((state) => {
        const updatedItems = state.items.map((item) =>
            item.id === id ? { ...item, quantity } : item
        );
        localStorage.setItem('cart', JSON.stringify(updatedItems)); // Обновляем localStorage
        return { items: updatedItems };
    }),

    clearCart: () => {
        localStorage.removeItem('cart'); // Очищаем localStorage
        set({ items: [] });
    },
}));

export default useCartStore;
