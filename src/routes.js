const routes = {

    // for Feedback Management
    feedback_path: "/hotline.json",
    feedback_post: '/post/',



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


    // for Receiving Appeal
    //      --- get ---
    get_patient_info: '/patient.json'
    //      --- post ---
}


export default routes
