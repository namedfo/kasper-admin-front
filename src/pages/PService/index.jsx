/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
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

        // schedule table
        statusSchedule,
        schedule,

        initSlots,
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
        setSchedule,
        setStatusSchedule,

        setInitSlots,
        setTimeSchedule,
    } = useActions()





    const params = useParams()

    const location = useLocation()
    const linkReturn = new URLSearchParams(location.search)

    const age = linkReturn.get('age') ?? ''


    const getScheduleParams = () => {


        let params = []
        if (service?.schedule) {
            service?.schedule.forEach(schedule => {
                service?.specialists.forEach(specialist => {
                    if (specialist.isCheck && schedule.medecinsID === specialist.id) {
                        if (+schedule.age[0] <= +age && +schedule.age[1] >= +age) {
                            params = [
                                ...params,
                                {
                                    id: schedule.id,
                                    duration: schedule.duree
                                }
                            ]
                        }
                    }
                })
            })
        }

        return params
    }



    const fetchSchedule = async (localScheduleParams) => {
        setStatusSchedule('loading')

        console.log(localScheduleParams)
        try {

            const res = await config.api_host.post(routes.post_timetable, { doctors: localScheduleParams })


            if (res.status === 200) {
                const convertEvents = Object.values(res.data?.events)
                const convertSlots = Object.values(Object.values(res.data.slots)[0]).map(slot => Object.values(slot))

                setSchedule({
                    dates: res.data?.dates,
                    events: convertEvents,
                    slots: convertSlots
                })

                setStatusSchedule('success')


                if (!initSlots) {
                    setInitSlots(convertSlots)
                }
            }

        } catch (error) {
            setStatusSchedule('error')
        }

    }

    useEffect(() => {
        if (service && service?.schedule && service?.specialists) {
            fetchSchedule(getScheduleParams())
        }
        
    }, [service && service?.schedule && service?.specialists])


    useEffect(() => {

        (async () => {
            setStatusService('loading')
            try {
                const res = await config.api_host.post(`${routes.get_service_info}${params?.code}`, { age: 18 })


                if (res.status === 200) {
                    console.log('update')
                    // convert object(array) to array
                    const convertServices = Object.values(res.data.services)?.map(service => ({
                        ...service,
                        isCheck: false
                    }))
                    const convertSpecialists = Object.values(res?.data?.medecins)?.map(specialist => ({
                        ...specialist,
                        isCheck: true
                    }))
                    const convertSchedule = Object.values(res?.data?.doctors)


                    setService({
                        ...res.data,
                        services: convertServices,
                        specialists: convertSpecialists,
                        schedule: convertSchedule
                    })


                    setStatusService('success')
                }
            } catch (error) {
                setStatusService('error')
            }
        })()
        return () => {
            console.log('un')
            setInitSlots(null)
            setService(null)
        }
    }, [])


    const getTimeDuree = () => {

        if (service?.schedule?.length) {
            const durees = service.schedule?.map(doctor => doctor.duree)

            const minDuree = durees && Math.min(...durees)
            const maxDuree = durees && Math.max(...durees)


            return minDuree === maxDuree ? `${minDuree} минут` : `от ${minDuree} до ${maxDuree} минут`
        }
    }



    return (
        <div className='h-full w-full flex justify-between p-[25px] relative'>
            {statusService === 'success' && (
                <>
                    <div className='w-[390px] flex flex-col'>
                        <PServiceSpecialists
                            initAge={age}
                            specialists={service?.specialists}
                            setSpecialists={setSpecialists}

                            fetchSchedule={fetchSchedule}
                            getScheduleParams={getScheduleParams}
                        />
                        {service?.services?.length > 0 && (
                            <PServiceServices
                                services={service?.services}
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
                        {service?.schedule && (
                            <PServiceSchedulesTable
                                specialists={service?.specialists}
                                timeSchedule={timeSchedule}

                                getScheduleParams={getScheduleParams}
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