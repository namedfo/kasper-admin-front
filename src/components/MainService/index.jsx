import { useState } from 'react'
//
import { BsQuestion } from 'react-icons/bs'
import ServiceHint from '../ServiceHint'
//
import './MainService.css'



const MainService = ({ service }) => {


    const [isHover, setIsHover] = useState(false)


    return (
        <li className='main_service_element'>
            <span className='main_service_element_name'>
                {service?.name}
            </span>
            {service?.synonym?.length > 0 && (
                <div
                    onMouseLeave={() => setIsHover(false)} 
                    onMouseEnter={() => setIsHover(true)} 
                    style={{ 
                        display: 'flex', 
                        alignItems: 'center' 
                    }}
                >
                    {/* <div 
                        style={{ 
                            display: isHover ? 'block' : 'none' 
                        }} 
                        className='main_service_element_dropdown'
                    >
                        {service.synonym}
                    </div> */}
                    <ServiceHint text={service.synonym} isOpen={isHover}/>
                    <button className='main_service_element_btn'>
                        <BsQuestion size={18} />
                    </button>
                </div>
            )}
        </li>
    )
}

export default MainService