import axios from 'axios';


const { token } = window.localStorage.getItem('token')
const api_host = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
        // for test
        Authorization: 'Bearer ' + window.localStorage.getItem('token')
    }
});

const getIsShowPage = {
    PMain: process.env.REACT_APP_SHOW_MAIN ?? true,
    PFeedbackManagement: process.env.REACT_APP_SHOW_FEEDBACK ?? false,
    PServicesEditing: process.env.REACT_APP_SHOW_SERVICE_EDIT ?? true,
    PServiceEditingBulk: process.env.REACT_APP_SHOW_SERVICE_EDIT_BULK ?? true,
    PExceptionalEvents: process.env.REACT_APP_SHOW_EXCEPTIONAL_EVENTS ?? true,
    PServiceBinding: process.env.REACT_APP_SHOW_SERVICE_BINDING ?? true,
    PLogin: process.env.REACT_APP_SHOW_LOGIN ?? true
}

const logo_login = process.env.REACT_APP_LOGO_SRC

const config = {
    api_host,
    getIsShowPage,
    logo_login
} 

export default config;
