const routes = {

    // for Feedback Management
    feedback_path: "/hotline.json",
    feedback_post: '/post/',



    // for Service Editing
    //      --- get ---
    services: "/edit-services-copy.json",
    service: '/service1.json',
    //      --- post ---
    service_edit: '/post/',


    // for Login
    //      --- get ---
    get_list: '/auth.json',
    //      --- post ---
    login: '/login.php',


    // for Bulk Editing Services
    //      --- get ---
    export_download: "/services.csv",
    //      --- post ---
    import_services: '/post/',



    // for Service Binding
    //      --- post ---
    service_by_schedule_save: '/post/',
    service_by_schedule_remove: '/post/',


    // for Exception Event Settings
    //      --- get ----
    exceptional_events: '/exceptional-events.json',
    //      --- post ---
    set_tags: '/post/',
    set_type: '/post/',

    // for Service Binding
    //      --- get ---
    doctors_all: '/doctors-all.json',
    doctor: '/schedule-info.json'
}


export default routes
