import { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router'
// components
import PServiceAdditionalSchedules from '../../components/ServiceComponents/PServiceAdditionalSchedules'
import PServiceExceptionalEvents from '../../components/ServiceComponents/PServiceExceptionalEvents'
import PServiceSchedulesTable from '../../components/ServiceComponents/PServiceSchedulesTable'
import PServiceSchedulesTitle from '../../components/ServiceComponents/PServiceSchedulesTitle'
import PServiceServices from '../../components/ServiceComponents/PServiceServices'
import PServiceSpecialists from '../../components/ServiceComponents/PServiceSpecialists'
//
import config from '../../config'
import routes from '../../routes'



const PService = () => {
    const [service, setService] = useState(null)
    const [status, setStatus] = useState('idle')

    //
    const [specialists, setSpecialists] = useState([])
    const [services, setServices] = useState([])

    const [timeSchedule, setTimeSchedule] = useState(null)



    const params = useParams()

    const location = useLocation()
    const linkReturn = new URLSearchParams(location.search)

    useEffect(() => {

        (async () => {
            setStatus('loading')
            try {
                const res = await config.api_host.post(`${routes.get_service_info}${params?.code}`, { age: 18 })

                if (res.status === 200) {
                    setService(res.data)

                    const convertMedecins = Object.values(res?.data?.medecins)
                    setSpecialists(convertMedecins?.map(specialist => ({
                        ...specialist,
                        isCheck: true
                    })))

                    const convertServices = Object.values(res.data.services)
                    setServices(convertServices?.map(service => ({
                        ...service,
                        isCheck: false
                    })))

                    setStatus('success')
                }
            } catch (error) {
                setStatus('error')
            }
        })()

    }, [params?.code])


    const getTimeDuree = () => {
        const convertDoctors = Object.values(service.doctors)

        if (convertDoctors) {
            const durees = convertDoctors?.map(doctor => doctor.duree)

            const minDuree = durees && Math.min(...durees)
            const maxDuree = durees && Math.max(...durees)


            return minDuree === maxDuree ? `${minDuree} минут` : `от ${minDuree} до ${maxDuree} минут`
        }
    }

    const age = linkReturn.get('age') ?? ''



    return (
        <div className='h-full w-full flex justify-between p-[25px] relative'>
            {status === 'success' && (
                <>
                    <div className='w-[390px] flex flex-col'>
                        <PServiceSpecialists
                            initAge={age}
                            specialists={specialists}
                            setSpecialists={setSpecialists}
                        />
                        {services?.length > 0 && (
                            <PServiceServices
                                services={services}
                                setServices={setServices}
                            />
                        )}
                        <PServiceExceptionalEvents />
                        <PServiceAdditionalSchedules />
                    </div>
                    <div
                        style={{
                            width: 'calc(100% - 420px)'
                        }}
                    >
                        <PServiceSchedulesTitle
                            title={service?.serv_name}
                            description={service?.descr}
                            moreDescription={service?.more_descr}
                            getTimeDuree={getTimeDuree}
                            setTimeSchedule={setTimeSchedule}
                        />
                        {service.doctors && (
                            <PServiceSchedulesTable
                                age={age}
                                specialists={specialists}
                                initSchedule={Object.values(service.doctors)}
                                timeSchedule={timeSchedule}
                                setTimeSchedule={setTimeSchedule}
                            />
                        )}
                    </div>
                </>
            )}
            {status === 'loading' && (
                <span>
                    Загрузка...
                </span>
            )}
        </div>
    )
}

export default PService