import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
// components
import PServiceAdditionalSchedules from '../../components/ServiceComponents/PServiceAdditionalSchedules'
import PServiceExceptionalEvents from '../../components/ServiceComponents/PServiceExceptionalEvents'
import PServiceSchedulesTitle from '../../components/ServiceComponents/PServiceSchedulesTitle'
import PServiceServices from '../../components/ServiceComponents/PServiceServices'
import PServiceSpecialists from '../../components/ServiceComponents/PServiceSpecialists'
//
import config from '../../config'
import routes from '../../routes'



const PService = () => {
    const [service, setService] = useState(null)
    const [status, setStatus] = useState('idle')

    const params = useParams()

    useEffect(() => {
        
        (async () => {
            setStatus('loading')
            try {
                const res = await config.api_host.post(`${routes.get_service_info}/${params?.code}`, {age: 18})
                console.log(res)
                setStatus('success')
            } catch (error) {
                setStatus('error')
            }
        })()

    }, [params?.code])


    return (
        <div className='h-full w-full flex justify-between p-[25px] relative'>
            <div className='w-[390px] flex flex-col'>
                <PServiceSpecialists />
                <PServiceServices />
                <PServiceExceptionalEvents />
                <PServiceAdditionalSchedules />
            </div>
            <div 
                style={{
                    width: 'calc(100% - 420px)'
                }} 
                className=''
            >
                <PServiceSchedulesTitle />
            </div>



            <div className='absolute bottom-[10px] left-[20px]'>
                <span className='text-[16px] font-semibold'>
                    ID оператора:
                </span>
                <span className="ml-[10px] leading-4 cursor-pointer hover:bg-[gray] hover:text-white text-[12px] font-bold px-[5px] text-[#555] bg-[#ccc] rounded-[4px]">
                    ВЫХОД
                </span>
            </div>
        </div>
    )
}

export default PService