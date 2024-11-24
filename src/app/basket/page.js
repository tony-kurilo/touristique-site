'use client'
// components/Cart.js
import React, {useEffect, useRef, useState} from 'react';
import useCartStore from './store/cartStore';
import Image from "next/image";

const Cart = () => {
    const { items, initializeCart, removeItem, updateQuantity, clearCart } = useCartStore();
    const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const [activeMenu, setActiveMenu] = useState(null); // Хранит ID элемента, у которого открыто меню
    const menuRef = useRef(null); // Ссылка на меню

    useEffect(() => {
        initializeCart(); // Загружаем корзину на клиенте
    }, []);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setActiveMenu(null); // Закрыть меню, если клик вне него
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    if (!items) return <div>Загрузка...</div>; // Показать состояние загрузки

    const toggleMenu = (id) => {
        setActiveMenu((prev) => (prev === id ? null : id)); // Переключение меню
    };

    return (
        <div>
            <div className="w-full bg-neutral-900 object-cover" style={{
                backgroundImage: `url('/images/search-background.png')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}>
                <div className="absolute inset-0 h-[151px] bg-black opacity-30"></div>
                <nav className="relative flex items-center justify-between z-10">
                    <div className="flex items-center m-10 px-6">
                        <a href="/">
                            <Image className="" src={"/icons/promo1.png"} alt={"Earth icon"} width={"150"}
                                   height={"150"}></Image>
                        </a>
                    </div>
                    <div className="flex items-center">
                        <a className={"m-4 pb-1 text-xl navbar-a-animation geologica-200"} href={"/search"}>Пункти
                            призначення</a>
                        <a className={"m-4 pb-1 text-xl navbar-a-animation geologica-200"} href={"/blog"}>Блог</a>
                        <a className={"m-4 pb-1 text-xl navbar-a-animation geologica-200"} href={"/about-us"}>Про
                            нас</a>
                        <a className={"m-4 pb-1 text-xl navbar-a-animation geologica-200"}
                           href={"/contact-us"}>Зв&apos;яжіться з нами</a>
                    </div>
                    <div className="flex items-center m-10 pr-10">
                        <Image className={"mr-2"} src={"/icons/heart_white.png"} alt={"Whishlist icon"} width={"33"}
                               height={"33"}></Image>
                        <a href="/my-profile">
                            <Image className={"mr-2"} src={"/icons/account_white.png"} alt={"Whishlist icon"}
                                   width={"37"}
                                   height={"37"}></Image>
                        </a>
                    </div>
                </nav>
            </div>
            {items.length === 0 ? (
                <h2 className="text-xl text-gray-500 font-bold relative text-center mt-10">Ваш кошик порожній :(</h2>
            ) : (
                <div className="w-full max-w-5xl bg-white shadow-md rounded-lg p-6 relative mt-10 left-1/4">
                    <div className="mt-6 flex justify-between items-center">
                        <h2 className="text-xl font-bold">Ваш Кошик</h2>
                        <button
                            onClick={clearCart}
                            className="bg-white text-red-500 px-4 py-2 rounded-md hover:text-red-700"
                        >
                            Очистити
                        </button>
                    </div>
                    {items.map((item) => (

                        <div
                            key={item.id}
                            className="flex items-center justify-between border-b py-4"
                        >
                            <div className="flex items-center">
                                <Image
                                    src={item.image || '/placeholder.png'}
                                    alt={item.name}
                                    width={240}
                                    height={240}
                                    className="rounded-lg mr-4"
                                />
                                <div>
                                    <h3 className="text-lg font-medium">{item.name}</h3>
                                    <h3 className="text-lg font-medium">{item.address}</h3>
                                    <h3 className="text-lg font-medium ">{item.room}</h3>
                                </div>
                            </div>
                            <div className="relative flex flex-col">
                                <button
                                    onClick={() => toggleMenu(item.id)}
                                    className="text-red-500 hover:text-red-900 text-2xl mb-10 ml-20"
                                >
                                    ⋮
                                </button>
                                {activeMenu === item.id && (
                                    <div className="absolute right-12 bg-white shadow-md rounded-lg">
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="px-4 py-2 text-red-500 hover:text-red-700 w-full text-left"
                                        >
                                            Видалити
                                        </button>
                                    </div>
                                )}
                                <div className={"flex"}>
                                    <input
                                        type="number"
                                        value={item.quantity}
                                        onChange={(e) => updateQuantity(item.id, +e.target.value)}
                                        min="1"
                                        className="w-12 text-center border rounded-md mr-10"
                                    />
                                    <p className="text-gray-900 font-bold text-xl">{item.price} грн.</p>
                                </div>
                            </div>

                        </div>

                    ))}
                    <div className={"mt-6 flex justify-between items-center"}>
                        <h2 className="text-xl font-bold">Орієнтовна сума: {totalPrice} грн.</h2>
                        <button
                            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
                        >
                            Підтвердити
                        </button>
                    </div>

                </div>
            )}
        </div>
    );
};

export default Cart;
