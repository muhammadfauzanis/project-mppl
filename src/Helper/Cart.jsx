import { useEffect, useState } from "react";

export const Cart = () => {
    const ls    = JSON.parse(localStorage.getItem("cart")) ? JSON.parse(localStorage.getItem("cart")) : [];
    const [cart,setCart]    = useState(ls);

    const addCart = (id_menu, qty) => {
        id_menu     = parseInt(id_menu);
        
        let index    = cart.indexOf(getCart(id_menu));
        if(qty < 1){
            return removeCart(id_menu);
        }
        if(index < 0){
            cart.push({
                id_menu     : id_menu,
                qty         : qty
            })
        }else{
            cart[index].qty     = qty
        }

        setCart(cart);
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    const removeCart = (id_menu) => {
        id_menu     = parseInt(id_menu);
        let index    = cart.indexOf(getCart(id_menu));
        if(index >= 0){
            cart.splice(index, 1);
        }
        setCart(cart);
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    const resetCart = () => {
        setCart([]);
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    const listCart = () => {
        return cart;
    }
    const countCart = () => {
        return cart.length;
    }

    const countQty = () => {
        let count   = 0;
        listCart().map((item) => {
            count += parseInt(item.qty)
        })

        return count;
    }

    const getCart = (id_menu) => {
        id_menu     = parseInt(id_menu);
        let obj = cart.find(o => parseInt(o.id_menu) === id_menu);
        return obj;
    }

    const getQty    = (id_menu) => {
        let obj     = getCart(id_menu);
        if(obj != undefined){
            return obj.qty;
        }else{
            return 0;
        }
    }
    
    return {
        addCart,
        removeCart,
        listCart,
        countCart,
        getCart,
        resetCart,
        getQty,
        countQty
    }
};