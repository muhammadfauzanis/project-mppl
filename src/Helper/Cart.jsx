import { useState } from "react";

export const Cart = () => {

    const [cart,setCart]    = useState([]);

    const addCart = (id_menu, qty) => {
        id_menu     = parseInt(id_menu);
        
        let index    = cart.indexOf(getCart(id_menu));
        if(index < 0){
            cart.push({
                id_menu     : id_menu,
                qty         : qty
            })
        }else{
            cart[0].qty     = qty
        }
    }

    const removeCart = (id_menu) => {
        id_menu     = parseInt(id_menu);
        let index    = cart.indexOf(getCart(id_menu));
        if(index >= 0){
            cart.splice(index, 1);
        }
    }

    const listCart = () => {
        return cart;
    }

    const getCart = (id_menu) => {
        id_menu     = parseInt(id_menu);
        let obj = cart.find(o => parseInt(o.id_menu) === id_menu);
        return obj;
    }
    
    return {
        addCart,
        removeCart,
        listCart
    }
};