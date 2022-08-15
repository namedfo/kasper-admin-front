import { useState } from 'react'
// components
import MainService from '../MainService'
//
import './MainServices.css'



const MainServices = ({ service, getService, handleMultiRecords }) => {

    const [isShow, setIsShow] = useState(true)

    console.log(service)

    return (
        <div className='main_services'>
            <div className='main_services_header' onClick={() => setIsShow(prev => !prev)}>
                <h4 className='main_services_header_title'>
                    {service.name}
                </h4>
            </div>
            <ul style={{ display: isShow ? 'block' : 'none' }} className='main_services_content'>
                {service?.services?.map(item => (
                    <MainService 
                        getService={getService} 
                        key={item.id} 
                        service={item} 
                        handleMultiRecords={handleMultiRecords}
                    />
                ))}
            </ul>
        </div>
    )
}



export default MainServices