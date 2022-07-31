import { useEffect, useState } from 'react'
// components
import Navbar from '../../components/Navbar'
import ServiceBinding from '../../components/ServiceBinding'
import Sidebar from '../../components/Sidebar'
// layouts
import PageContainer from '../../Layouts/PageContainer'
// utils
import routes from '../../routes'
import config from '../../config'
//
import './PServiceBinding.css'



const PServiceBinding = () => {
    const [defaultData, setDefaultData] = useState([])

    useEffect(() => {
        config.api_host.get(routes.doctors_all).then(r => {
            setDefaultData(r.data)
        })
    }, [])


    return (
        <div className='p_service_binding'>
            <Navbar />
            <Sidebar />
            <PageContainer>
                <ServiceBinding defaultData={defaultData} />
            </PageContainer>
        </div>
    )
}

export default PServiceBinding