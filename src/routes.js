const routes = {

    // for Feedback Management
    feedback_path: "/hotline.json",
    feedback_post: '/post/',



    // for Service Editing
    //      --- get ---
    services: process.env.REACT_APP_ADMIN_SERVICES_URL,
    service: process.env.REACT_APP_ADMIN_SERVICE_URL,
    service_edit: process.env.REACT_APP_ADMIN_SERVICE_EDIT_URL,


    // for Login
    get_list: process.env.REACT_APP_LOGIN_LIST_URL,
    login: process.env.REACT_APP_LOGIN_URL,


    // for Bulk Editing Services
    export_download: process.env.REACT_APP_ADMIN_EXPORT_SERVICES_URL,
    import_services: process.env.REACT_APP_ADMIN_IMPORT_SERVICES_URL,



    // for Service Binding
    //      --- post ---
    service_by_schedule_save: '/post/',
    service_by_schedule_remove: '/post/',


    // for Exception Event Settings
    //      --- get ----
    exceptional_events: process.env.REACT_APP_ADMIN_EV,
    set_tags: process.env.REACT_APP_ADMIN_EV_SET_TAGS,
    set_type: process.env.REACT_APP_ADMIN_EV_SET_TYPE,

    // for Service Binding
    //      --- get ---
    doctors_all: process.env.REACT_APP_ADMIN_DOCTORS_ALL,
    doctor: process.env.REACT_APP_ADMIN_DOCTOR_SERVICES_BINDINGS
}


export default routes
