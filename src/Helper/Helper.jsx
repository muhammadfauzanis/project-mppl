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
    
    return {
        isFixed,
        formatRupiah
    }
};