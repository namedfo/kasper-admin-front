import axios from 'axios';



const api_host = axios.create({
    baseURL: 'https://yurganov.com/kasper',
    headers: {
        // for test
        Authorization: 'Bearer ' + window.localStorage.getItem('token')
    }
});

const getIsShowPage = {
    PMain: true,
    PFeedbackManagement: true,
    PServicesEditing: true,
    PServiceEditingBulk: true,
    PExceptionalEvents: true,
    PServiceBinding: true,
    PLogin: true
}

const logo_login = 'https://i.imgur.com/0Nb0zvj.png'

const config = {
    api_host,
    getIsShowPage,
    logo_login
} 

export default config;