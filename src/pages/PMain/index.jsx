import { useEffect, useState } from 'react'
// components
import MainServices from '../../components/MainServices'
import NavbarMain from '../../components/NavbarMain'
// test
import servicesJson from '../../services_json'
//
import './PMain.css'



const PMain = () => {

    const [services, setServices] = useState([])


    const getServices = () => {
        setServices(servicesJson)
    }


    useEffect(() => {
        // request
        getServices()
    }, [])


    return (
        <div className="p_main">
            <NavbarMain getServices={getServices} />
            <div className='p_main_content'>
                {services?.map(service => (
                    <MainServices key={service.name} service={service} />
                ))}
            </div>
        </div>
    )
}

export default PMain