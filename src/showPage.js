import PExceptionalEvents from "./pages/PExceptionalEvents";
import PFeedbackManagement from "./pages/PFeedbackManagement";
import PMain from "./pages/PMain";
import PServiceBinding from './pages/PServiceBinding'
import PServicesEditing from "./pages/PServicesEditing";
import PServiceEditingBulk from "./pages/PServiceEditingBulk";
import PReceivingFeedback from "./pages/PReceivingFeedback";
import PLogin from "./pages/PLogin";
//
import config from './config'


const showPage =  [
    { 
        name: 'PMain', 
        component: <PMain />, 
        path: '/', 
        title: 'Главная', 
        isShow: config.getIsShowPage.PMain 
    },

    { name: 'PFeedbackManagement', component: <PFeedbackManagement />, path: '/feedback-management', title: 'Управление обращениями граждан', isShow: config.getIsShowPage.PFeedbackManagement },

    { name: 'PServicesEditing', component: <PServicesEditing />, path: '/services-editing', title: 'Редактирование услуг', isShow: config.getIsShowPage.PServicesEditing },
    
    { name: 'PServiceEditingBulk', component: <PServiceEditingBulk /> , path: '/export-services', title: 'Массовое редактирование услуг', isShow: config.getIsShowPage.PServiceEditingBulk },

    { name: 'PExceptionalEvents', component: <PExceptionalEvents />, path: '/exceptional-events', title: 'Настройки исключительных событий', isShow: config.getIsShowPage.PExceptionalEvents },

    { 
        name: 'PServiceBinding', 
        component: <PServiceBinding />,
        path: '/service-binding',
        title: 'Привязка услуг',
        isShow: config.getIsShowPage.PServiceBinding
    },

    {
        name: 'PReceivingFeedback',
        component: <PReceivingFeedback />,
        path: '/receiving-feedback/:id/:phone',
        title: 'Прием обращения',
        isShow: config.getIsShowPage.PReceivingFeedback
    },

    {
        name: 'PLogin',
        component: <PLogin />,
        path: '/login',
        title: 'Войти',
        isShow: config.getIsShowPage.PLogin
    }
]

export default showPage