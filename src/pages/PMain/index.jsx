import { useEffect, useState } from 'react'
// components
import MainServices from '../../components/MainServices'
import NavbarMain from '../../components/NavbarMain'
import config from '../../config'
import routes from '../../routes'
//
import './PMain.css'



const PMain = () => {

    const [services, setServices] = useState([])


    const getServices = async (body = {}) => {
        await config.api_host.post(routes.get_services_main, body).then(r => {
            if (r.status === 200) {
                let newServices = []
                for (let [, value] of Object.entries(r.data)) {
                    newServices = [ ...newServices, value ]
                }
                setServices(newServices)
            }
        })
    }


    useEffect(() => {
        getServices()
    }, [])


    return (
        <div className="p_main">
            <NavbarMain getServices={getServices} />
            <div className='p_main_content'>
                {services.length > 0 && services.map(service => (
                    <MainServices key={service.name} service={service} />
                ))}
            </div>
        </div>
    )
}

export default PMain