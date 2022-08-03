import axios from 'axios';
//
import { toast } from 'react-toastify';


const api_host = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
        // for test
        Authorization: 'Bearer ' + window.localStorage.getItem('token')
    }
});
api_host.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (401 === error.response.status || 403 === error.response.status) {
        return window.location.href = `/login?return=${window.location.pathname}`
    }

    if (error && error.response && error.response.status && error.response.data.message && error.response.data.message) {
        toast.error(error.response.data.message, {
            position: "top-right",
            autoClose: 5000,
        });
    }

    return Promise.reject(error)
});

const getIsShowPage = {
    PMain: process.env.REACT_APP_SHOW_MAIN ?? true,

    PFeedbackManagement: process.env.REACT_APP_SHOW_FEEDBACK ?? false,
    PFeedbackPrint: process.env.REACT_APP_SHOW_FEEDBACK_PRINT ?? true,

    PServicesEditing: process.env.REACT_APP_SHOW_SERVICE_EDIT ?? true,
    PServiceEditingBulk: process.env.REACT_APP_SHOW_SERVICE_EDIT_BULK ?? true,
    PExceptionalEvents: process.env.REACT_APP_SHOW_EXCEPTIONAL_EVENTS ?? true,
    PServiceBinding: process.env.REACT_APP_SHOW_SERVICE_BINDING ?? true,
    PLogin: process.env.REACT_APP_SHOW_LOGIN ?? true,
    PReceivingFeedback: process.env.REACT_APP_SHOW_RECEAVING_FEEDBACK ?? true,
    PDoctorEditing: process.env.REACT_APP_SHOW_DOCTOR_EDITING ?? true
}

const logo_login = process.env.REACT_APP_LOGO_SRC

const config = {
    api_host,
    getIsShowPage,
    logo_login
}

export default config;
