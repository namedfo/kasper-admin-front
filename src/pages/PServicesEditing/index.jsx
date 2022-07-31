import { useEffect, useState } from 'react'
// components
import Navbar from '../../components/Navbar'
import ServicesEditing from '../../components/ServicesEditing'
import Sidebar from '../../components/Sidebar'
// layouts
import PageContainer from '../../Layouts/PageContainer'
//
import routes from '../../routes'
import config from '../../config'
//
import './PServicesEditing.css'



const PServicesEditing = () => {
    const [defaultData, setDefaultData] = useState([]) 

    useEffect(() => {
        config.api_host.get(routes.services).then(r => {
            setDefaultData(r.data)
        })
    }, [])

    return (
        <div className='p_services_editing'>
            <Navbar />
            <Sidebar />
            <PageContainer>
                <ServicesEditing defaultData={defaultData} />
            </PageContainer>
        </div>
    )
}

export default PServicesEditing