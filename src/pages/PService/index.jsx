import { useEffect } from 'react'
import { useLocation, useParams } from 'react-router'
// components
import PServiceAdditionalSchedules from '../../components/ServiceComponents/PServiceAdditionalSchedules'
import PServiceExceptionalEvents from '../../components/ServiceComponents/PServiceExceptionalEvents'
import PServiceSchedulesTable from '../../components/ServiceComponents/PServiceSchedulesTable'
import PServiceSchedulesTitle from '../../components/ServiceComponents/PServiceSchedulesTitle'
import PServiceServices from '../../components/ServiceComponents/PServiceServices'
import PServiceSpecialists from '../../components/ServiceComponents/PServiceSpecialists'
// hooks
import { useTypedSelector, useActions } from '../../hooks'
//
import config from '../../config'
import routes from '../../routes'



const PService = () => {
    
    // getters
    const { 
        // init
        statusService,
        service, 

        // specialists
        specialists, 

        // services
        services,

        // schedule table
        timeSchedule,
    } = useTypedSelector(state => state.service)


    // setters
    const { 
        // init
        setStatusService,
        setService,
        
        // specialists
        setSpecialists,
        
        // services
        setServices,
        
        // schedule table
        setTimeSchedule,
    } = useActions()




    const params = useParams()

    const location = useLocation()
    const linkReturn = new URLSearchParams(location.search)

    useEffect(() => {

        (async () => {
            setStatusService('loading')
            try {
                const res = await config.api_host.post(`${routes.get_service_info}${params?.code}`, { age: 18 })


                if (res.status === 200) {
                    // convert object(array) to array
                    const convertServices = Object.values(res.data.services)
                    const convertMedecins = Object.values(res?.data?.medecins)
                    const convertSchedule = Object.values(res?.data?.doctors)


                    setService({
                        ...res.data,
                        services: services,
                        medecins: convertMedecins,
                        schedule: convertSchedule
                    })

                    
                    setSpecialists(convertMedecins?.map(specialist => ({
                        ...specialist,
                        isCheck: true
                    })))

                    setServices(convertServices?.map(service => ({
                        ...service,
                        isCheck: false
                    })))

                    setStatusService('success')
                }
            } catch (error) {
                setStatusService('error')
            }
        })()

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params?.code])


    const getTimeDuree = () => {

        if (service?.schedule?.length) {
            const durees = service.schedule?.map(doctor => doctor.duree)

            const minDuree = durees && Math.min(...durees)
            const maxDuree = durees && Math.max(...durees)


            return minDuree === maxDuree ? `${minDuree} минут` : `от ${minDuree} до ${maxDuree} минут`
        }
    }

    const age = linkReturn.get('age') ?? ''



    return (
        <div className='h-full w-full flex justify-between p-[25px] relative'>
            {statusService === 'success' && (
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

                            timeSchedule={timeSchedule}
                            setTimeSchedule={setTimeSchedule}
                        />
                        {service.doctors && (
                            <PServiceSchedulesTable
                                age={age}
                                specialists={specialists}
                                paramsSchedule={service.schedule}
                                timeSchedule={timeSchedule}
                                setTimeSchedule={setTimeSchedule}
                            />
                        )}
                    </div>
                </>
            )}
            {statusService === 'loading' && (
                <span>
                    Загрузка...
                </span>
            )}
        </div>
    )
}

export default PService