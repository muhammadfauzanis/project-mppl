import { useEffect } from "react";

export const Cart = () => {

    useEffect(() => {
        countQty()
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
        const count_qty_el     = document.getElementById("count_qty");
        if(count_qty_el !== null){

            if(count > 0){
                count_qty_el.classList.remove("hidden");
                count_qty_el.innerHTML = count;
            }else{
                count_qty_el.classList.add("hidden");
                count_qty_el.innerHTML = '';
            }
        }
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