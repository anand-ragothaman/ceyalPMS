import { Bounce } from 'react-toastify';

const config = {
    apiUrl: 'http://127.0.0.1:8000/',
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
