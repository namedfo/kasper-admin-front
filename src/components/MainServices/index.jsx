import { useState } from 'react'
// components
import MainService from '../MainService'
//
import './MainServices.css'



const MainServices = ({ service }) => {

    const [isShow, setIsShow] = useState(true)

    return (
        <div className='main_services'>
            <div className='main_services_header' onClick={() => setIsShow(prev => !prev)}>
                <h4 className='main_services_header_title'>
                    {service.name}
                </h4>
            </div>
            <ul style={{ display: isShow ? 'block' : 'none' }} className='main_services_content'>
                {service?.services?.map(item => (
                    <MainService key={item.id} service={item} />
                ))}
            </ul>
        </div>
    )
}



export default MainServices