import axios from 'axios';



const api_host = axios.create({
    baseURL: 'https://yurganov.com/kasper'
});

const getIsShowPage = {
    'PMain': true,
    'PFeedbackManagement': true,
    'PServicesEditing': true,
    'PServiceEditingBulk': true,
    'PExceptionalEvents': true,
    'PServiceBinding': true
}

const config = {
    api_host,
    getIsShowPage
} 

export default config;