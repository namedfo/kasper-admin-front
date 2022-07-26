import PExceptionalEvents from "./pages/PExceptionalEvents";
import PFeedbackManagement from "./pages/PFeedbackManagement";
import PMain from "./pages/PMain";
import PServiceEditing from "./pages/PServiceEditing";
import PServices from "./pages/PServices";
//
import config from './config'


const showPage =  [
    { name: 'PMain', component: <PMain />, path: '/', title: 'Главная', isShowSidebar: false, isShow: config.getIsShowPage.PMain },

    { name: 'PFeedbackManagement', component: <PFeedbackManagement />, path: '/feedback-management', title: 'Управление обращениями граждан', isShow: config.getIsShowPage.PFeedbackManagement },

    { name: 'PServices', component: <PServices />, path: '/services', title: 'Редактирование услуг', isShow: config.getIsShowPage.PServices },
    
    { name: 'PServiceEditing', component: <PServiceEditing /> , path: '/export-services', title: 'Массовое редактирование услуг', isShow: config.getIsShowPage.PServiceEditing },

    { name: 'PExceptionalEvents', component: <PExceptionalEvents />, path: '/exceptional-events', title: 'Настройки исключительных событий', isShow: config.getIsShowPage.PExceptionalEvents }
]

export default showPage