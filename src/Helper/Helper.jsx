import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Helper = () => {
    
    let navigate = useNavigate();
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
        const baseURL   = 'http://127.0.0.1:8000/api/';
        // const baseURL   = 'https://jaba-coffee.000webhostapp.com/api/';
        return baseURL + url;
    }

    const descriptionShort = (description = '') => {
        if(description.length > 80){
            description     = description.slice(0,80) + '...';
        }
        return description;
    }

    const currentDate = (customDate = '') => {
        const M_Date = new Date(customDate);
        let year = M_Date.getFullYear();
        let date = M_Date.getDate() > 9 ? M_Date.getDate() : '0' + M_Date.getDate();
        let monthIndex = M_Date.getMonth();
        let month = '';

        switch (monthIndex) {
        case 0:
            month = 'Januari';
            break;

        case 1:
            month = 'Februari';
            break;

        case 2:
            month = 'Maret';
            break;

        case 3:
            month = 'April';
            break;

        case 4:
            month = 'Mei';
            break;

        case 5:
            month = 'Juni';
            break;

        case 6:
            month = 'Juli';
            break;

        case 7:
            month = 'Agustus';
            break;

        case 8:
            month = 'September';
            break;

        case 9:
            month = 'Oktober';
            break;

        case 10:
            month = 'November';
            break;

        case 11:
            month = 'Desember';
            break;
        }
        return `${date} ${month} ${year}`;
    };

    return {
        isFixed,
        formatRupiah,
        baseURLAPI,
        descriptionShort,
        currentDate
    }
};