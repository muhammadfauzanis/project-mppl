import { useState } from "react";

export const Helper = () => {
    
    const [isFixed, setIsFixed] = useState(false);
    const handleScroll = () => {
        if (window.scrollY > 225) {
          setIsFixed(true);
        } else {
          setIsFixed(false);
        }
    };
    window.addEventListener("scroll", handleScroll);

    const formatRupiah = (amount) => {
        const formatter = new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        });
        return formatter.format(amount);
    };

    const baseURLAPI = (url = '') => {
        url     = url.replace(/^[/]/g,'');
        // const baseURL   = 'http://127.0.0.1:8000/api/';
        const baseURL   = 'https://jaba-coffee.000webhostapp.com/api/';
        return baseURL + url;
    }

    const descriptionShort = (description = '') => {
        if(description.length > 80){
            description     = description.slice(0,80) + '...';
        }
        return description;
    }
    
    return {
        isFixed,
        formatRupiah,
        baseURLAPI,
        descriptionShort
    }
};