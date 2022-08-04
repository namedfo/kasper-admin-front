import { useState } from 'react';
//
import { BsQuestion } from 'react-icons/bs'
//
import './ServiceBindingServicesAll.css'



const ServiceBindingServicesAll = ({ setSelectedDoctor, services }) => {

    const [filted, setFiltred] = useState('')

    const filtredServices = services.filter((item) => {
        return item.name.toLowerCase().includes(filted.toLowerCase())
    });

    const addService = service => {

    }


    console.log(services)

    return (
        <div className="service_binding_services_all">
            <div className='service_binding_services_all_header'>
                <h4 className='service_binding_services_all_header_title'>
                    Все услуги в клинике
                </h4>
                <input
                    value={filted}
                    onChange={e => setFiltred(e.target.value)}
                    placeholder='Поиск...'
                    className='service_binding_services_all_header_search'
                    type="text" 
                />
            </div>
            <div className='service_binding_services_all_divider' />
            <div className='service_binding_services_all_content'>
                {filtredServices.map(service => (
                    <div 
                        key={service.id} 
                        className='service_binding_services_all_content_element'
                    >
                        <span onClick={() => addService(service)} className='service_binding_services_all_content_element_name'>
                            {service.name}
                        </span>
                        <div className='service_binding_services_all_content_element_prompt'>
                            <BsQuestion size={22} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}


export default ServiceBindingServicesAll