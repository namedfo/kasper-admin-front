import { useEffect, useState } from 'react'
// components
import Navbar from '../../components/Navbar'
import Services from '../../components/Services'
import Sidebar from '../../components/Sidebar'
// layouts
import PageContainer from '../../Layouts/PageContainer'
//
import routes from '../../routes'
import config from '../../config'
//
import './PServices.css'



const PServices = () => {
    const [defaultData, setDefaultData] = useState([]) 

    useEffect(() => {
        config.api_host.get(routes.edit_services).then(r => {
            setDefaultData(r.data)
        })
    }, [])

    return (
        <div className='p_services'>
            <Navbar />
            <Sidebar />
            <PageContainer>
                <Services defaultData={defaultData} />
            </PageContainer>
        </div>
    )
}

export default PServices