const routes = {

    // for Feedback Management
    //      --- get ---
    feedback_path: process.env.REACT_APP_ADMIN_GET_FEEDBACKS,
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
    get_services_binding: process.env.REACT_APP_ADMIN_SERVICE_BINDING_SERVICES,
    doctors_all: process.env.REACT_APP_ADMIN_DOCTORS_ALL,
    doctor: process.env.REACT_APP_ADMIN_SERVICES_BINDINGS_DOCTOR,
    //      --- post ---
    service_by_schedule_save: process.env.REACT_APP_ADMIN_SERVICES_BINDINGS_EDIT,
    service_by_schedule_remove: process.env.REACT_APP_ADMIN_SERVICES_BINDINGS_DELETE,


    // for Receiving Feedback
    //      --- get ---
    get_patient_info: process.env.REACT_APP_GET_PATIENT_INFO,
    //      --- post ---
    feedback_create: process.env.REACT_APP_ADMIN_FEEDBACK_CREATE,

    
    // for Feedback Print
    //      --- get ---
    get_feedback_print: process.env.REACT_APP_ADMIN_GET_FEEDBACK,


    // for Doctor Editing
    //      --- get ---
    get_doctor: process.env.REACT_APP_ADMIN_DOCTOR,
    //      --- post ---
    update_doctor: process.env.REACT_APP_ADMIN_UPDATE_DOCTOR,


    // for Main
    get_services_main: process.env.REACT_APP_GET_SERVICES_MAIN,
    post_feedback_main: process.env.REACT_APP_EDIT_FEEDBACK_MAIN,
    get_patients_main: process.env.REACT_APP_GET_PATIENTS_MAIN,
    get_service_info: process.env.REACT_APP_GET_SERVICE_INFO,
    post_multislots: process.env.REACT_APP_POST_MULTISLOTS,
}


export default routes
