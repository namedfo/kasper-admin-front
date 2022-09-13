import { BsQuestion } from 'react-icons/bs'
import { useNavigate } from 'react-router'
//
import './MainService.css'



const MainService = ({
    service,
    handleMultiRecords,
    handlePopupHint,
    getService,
    isMultiRecords
}) => {

    const navigate = useNavigate()


    const onHandle = async () => {
        if (isMultiRecords) {
            await getService(service.code)
        } else {
            navigate(`/service/${service.code}`)
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
                    onMouseLeave={(e) => handlePopupHint(false)}
                    onMouseEnter={(e) => handlePopupHint(true, e, service.synonym)}
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
                    {/* <ServiceHint text={service.synonym} isOpen={isHover} /> */}
                    <button className='main_service_element_btn'>
                        <BsQuestion size={18} />
                    </button>
                </div>
            )}
        </li>
    )
}

export default MainService