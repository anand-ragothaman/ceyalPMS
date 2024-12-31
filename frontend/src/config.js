import { Bounce } from 'react-toastify';

const config = {
    apiUrl: 'https://ceyalpms.tryvom.tech/api/',
    toast: {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
    },
};

export default config;
