import { useEffect, useState } from "react";

export const Cart = () => {

    useEffect(() => {
        console.log(countQty())
    })
    
    const addCart = (id_menu, qty) => {
        const cart  = listCart();
        id_menu     = parseInt(id_menu);
        
        let index   = cart.findIndex(menu => menu.id_menu == id_menu);

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

        localStorage.setItem("cart", JSON.stringify(cart));
    }

    const removeCart = (id_menu) => {
        const cart  = listCart();
        id_menu     = parseInt(id_menu);
        let index   = cart.findIndex(menu => menu.id_menu == id_menu);
        if(index >= 0){
            cart.splice(index, 1);
        }
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    const resetCart = () => {
        const cart  = [];
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    const listCart = () => {
        const cart = JSON.parse(localStorage.getItem("cart")) ? JSON.parse(localStorage.getItem("cart")) : [];
        return cart;
    }
    const countCart = () => {
        const cart  = listCart();
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
        const cart  = listCart();

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
        countQty,
    }
};