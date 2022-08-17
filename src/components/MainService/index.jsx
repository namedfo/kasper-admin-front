import { useState } from 'react'
//
import { BsQuestion } from 'react-icons/bs'
// hooks
import useOutside from '../../hooks/useOutside'
//
import ServiceHint from '../ServiceHint'
//
import './MainService.css'



const MainService = ({ service, handleMultiRecords, getService, isMultiRecords }) => {


    const [isHover, setIsHover] = useState(false)

    const onHandle = async () => {
        if (isMultiRecords) {
            await getService(service.code)
        }
    }
    


    return (
        <li
            onClick={onHandle}
            onContextMenu={e => handleMultiRecords(e, service.code)}
            className='main_service_element'
        >
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
                    <ServiceHint text={service.synonym} isOpen={isHover} />
                    <button className='main_service_element_btn'>
                        <BsQuestion size={18} />
                    </button>
                </div>
            )}
        </li>
    )
}

export default MainService