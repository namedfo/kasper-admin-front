const routes = {

    // for Feedback Management
    //      --- get ---
    feedback_path: process.env.REACT_APP_ADMIN_GET_FEEDBACK,
    //      --- post ---
    feedback_post: process.env.REACT_APP_ADMIN_EDIT_FEEDBACK,



    // for Service Editing
    //      --- get ---
    services: process.env.REACT_APP_ADMIN_SERVICES_URL,
    service: process.env.REACT_APP_ADMIN_SERVICE_URL,
    //      --- post ---
    service_edit: process.env.REACT_APP_ADMIN_SERVICE_EDIT_URL,


    // for Login
    //      --- get ---
    get_list: process.env.REACT_APP_LOGIN_LIST_URL,
    //      --- post ---
    login: process.env.REACT_APP_LOGIN_URL,


    // for Bulk Editing Services
    //      --- get ---
    export_download: process.env.REACT_APP_ADMIN_EXPORT_SERVICES_URL,
    //      --- post ---
    import_services: process.env.REACT_APP_ADMIN_IMPORT_SERVICES_URL,


    // for Exception Event Settings
    //      --- get ----
    exceptional_events: process.env.REACT_APP_ADMIN_EV,
    //      --- post ---
    set_tags: process.env.REACT_APP_ADMIN_EV_SET_TAGS,
    set_type: process.env.REACT_APP_ADMIN_EV_SET_TYPE,


    // for Service Binding
    //      --- get ---
    doctors_all: process.env.REACT_APP_ADMIN_DOCTORS_ALL,
    doctor: process.env.REACT_APP_ADMIN_DOCTOR_SERVICES_BINDINGS,
    //      --- post ---
    service_by_schedule_save: '/post/',
    service_by_schedule_remove: '/post/',


    // for Receiving Feedback
    //      --- get ---
    get_patient_info: process.env.REACT_APP_GET_PATIENT_INFO,
    //      --- post ---
    feedback_create: process.env.REACT_APP_ADMIN_FEEDBACK_CREATE,

    
    // for Feedback Print
    //      --- get ---
    get_feedback_print: process.env.REACT_APP_ADMIN_GET_FEEDBACK_PRINT,
}


export default routes
