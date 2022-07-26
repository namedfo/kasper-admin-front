import axios from 'axios';



const api_host = axios.create({
    baseURL: 'https://yurganov.com/kasper'
});

const getIsShowPage = {
    'PMain': true,
    'PFeedbackManagement': true,
    'PServices': true,
    'PServiceEditing': true,
    'PExceptionalEvents': true
}

const config = {
    api_host,
    getIsShowPage
} 

export default config;