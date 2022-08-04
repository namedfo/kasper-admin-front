import { useEffect, useState } from 'react'
// components
import Navbar from '../../components/Navbar'
import ServiceBinding from '../../components/ServiceBinding'
import Sidebar from '../../components/Sidebar'
import ServiceBindingServicesAll from '../../components/ServiceBindingServicesAll'
// layouts
import PageContainer from '../../Layouts/PageContainer'
// utils
import routes from '../../routes'
import config from '../../config'
//
import './PServiceBinding.css'



const PServiceBinding = () => {
    const [defaultData, setDefaultData] = useState([])
    const [selectedDoctor, setSelectedDoctor] = useState(null)
    const [services, setServices] = useState([])

    useEffect(() => {
        config.api_host.get(routes.doctors_all).then(r => {
            setDefaultData(r.data)
        })

        config.api_host.get(routes.get_services_binding).then(r => {
            let newServices = []
            for (let [, value] of Object.entries(r.data)) {
                newServices = [ ...newServices, value ]
            }
            setServices(newServices)
        })
    }, [])


    return (
        <div className='p_service_binding'>
            <Navbar />
            <Sidebar />
            <PageContainer>
                <ServiceBinding 
                    selectedDoctor={selectedDoctor} 
                    setSelectedDoctor={setSelectedDoctor} 
                    defaultData={defaultData} 
                />
                {services && (

                    <ServiceBindingServicesAll setSelectedDoctor={setSelectedDoctor} services={services} />
                )}
            </PageContainer>
        </div>
    )
}

export default PServiceBinding