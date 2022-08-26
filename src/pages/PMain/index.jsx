import { useEffect, useState } from 'react'
//
import { MdRemoveCircleOutline } from 'react-icons/md'
//
import useOutside from '../../hooks/useOutside'
// components
import MainServices from '../../components/MainServices'
import NavbarMain from '../../components/NavbarMain'
import ModalSchedule from '../../components/ModalSchedule'
import config from '../../config'
import routes from '../../routes'
//
import './PMain.css'



const PMain = () => {

    const [services, setServices] = useState([])
    const [multiRecords, setMultiRecords] = useState([])
    const [multiSlots, setMultiSlots] = useState([])

    const [isModalSchedule, setIsModalSchedule] = useState(false)


    const [btnMultiRecords, setBtnMultiRecords] = useState(null)


    const [searchByAge, setSearchByAge] = useState('')


    const getServices = async (body = {}) => {
        setServices([])
        try {
            await config.api_host.post(routes.get_services_main, body).then(r => {
                if (r.status === 200) {
                    let newServices = []
                    for (let [, value] of Object.entries(r.data)) {
                        newServices = [...newServices, value]
                    }
                    setServices(newServices)
                }
            })
        } catch (e) {

        }
    }


    const getService = async code => {
        setBtnMultiRecords(null)
        try {
            await config.api_host.post(`${routes.get_service_info}${code}`)
                .then(r => {
                    // console.log(r.data)
                    if (r.status === 200) {
                        let newServices = []
                        for (let [key, value] of Object.entries(r.data.services)) {
                            newServices = [...newServices, {
                                id: key,
                                ...value
                            }]
                        }

                        let newDoctors = []
                        for (let [key, value] of Object.entries(r.data.doctors)) {
                            newDoctors = [...newDoctors, {
                                id: key,
                                ...value
                            }]
                        }


                        let selectedDoctors = ''
                        if (searchByAge.length === 0) {
                            selectedDoctors = `${newDoctors.length} из ${newDoctors.length}`
                        } else {
                            let count = 0
                            newDoctors.forEach(doctor => {
                                if (+searchByAge >= +doctor.age[0] && +searchByAge <= +doctor.age[1]) {
                                    count = count + 1
                                }
                            })
                            selectedDoctors = `${count} из ${newDoctors.length}`
                        }


                        setMultiRecords(prev => {
                            if (prev.length === 0) {
                                return [{
                                    id: 0,
                                    serv_name: r.data.serv_name,
                                    doctors: newDoctors,
                                    services: newServices,

                                    minPrice: Math.min(...newServices.map(service => service.price)),
                                    maxPrice: Math.max(...newServices.map(service => service.price)),

                                    selectedDoctors: selectedDoctors
                                }]
                            }
                            return [...prev, {
                                id: prev[prev.length - 1].id + 1,
                                serv_name: r.data.serv_name,
                                doctors: newDoctors,
                                services: newServices,

                                minPrice: Math.min(...newServices.map(service => service.price)),
                                maxPrice: Math.max(...newServices.map(service => service.price)),

                                selectedDoctors: selectedDoctors
                            }]
                        })

                    }

                })
        } catch (e) {

        }
    }


    useEffect(() => {
        getServices()
    }, [])


    const onRemoveRecord = id => {
        setMultiRecords(prev => prev.filter(el => el.id !== id))
    }

    const resultPrice = () => {
        if (multiRecords.length === 0) {
            return '0₽'
        }


        const resultMinPrice = multiRecords.reduce((prev, next) => prev + next.minPrice, 0)
        const resultMaxPrice = multiRecords.reduce((prev, next) => prev + next.maxPrice, 0)

        if (resultMinPrice === resultMaxPrice) {
            return `${resultMinPrice}₽`
        }

        return `${resultMinPrice}₽ - ${resultMaxPrice}₽`
    }


    const onCloseModalSchedule = () => setIsModalSchedule(false)

    const onOpenModalSchedule = () => setIsModalSchedule(true)



    const fetchMultislots = async strict => {
        let newMultiRecords = []
        multiRecords.forEach(service => {
            let data = {}

            service.doctors.forEach(doctor => {
                if (+searchByAge >= +doctor.age[0] && +searchByAge <= +doctor.age[1]) {
                    data = {
                        ...data,
                        [doctor.id]: doctor.duree
                    }
                }
            })


            newMultiRecords = [...newMultiRecords, {
                name: service.serv_name,
                data
            }]
        })


        await config.api_host.post(`${routes.post_multislots}?strict=${strict}`, newMultiRecords)
            .then(r => {
                if (r.status === 200) {
                    setMultiSlots(r.data)
                    onOpenModalSchedule()
                }
            })
    }


    const ref = useOutside(() => setBtnMultiRecords(null))

    const btnMultiRecord = (top, left, code) => {


        const style = {
            top: top,
            left: left,
            zIndex: 101,
        }
        return (
            <button
                onClick={() => getService(code)}
                className='p_main_content_btn_multi_records'
                ref={ref}
                style={style}
            >
                Мультизапись
            </button>
        )
    }

    const handleMultiRecords = (e, code) => {
        e.preventDefault()
        if (e.type === 'contextmenu') {
            const top = e.pageY - 90 + 'px'
            const left = e.pageX - 10 + 'px'
            setBtnMultiRecords(btnMultiRecord(top, left, code))
        }
    }

    const isMultiRecords = multiRecords.length > 0






    return (
        <div className="p_main">
            <div className='p_main_services'>
                <NavbarMain
                    setSearchByAge={setSearchByAge}
                    searchByAge={searchByAge}
                    getServices={getServices}
                />
                <div className='p_main_content'>
                    {services.length > 0 && services.map(service => (
                        <MainServices
                            getService={getService}
                            key={service.name}
                            service={service}
                            handleMultiRecords={handleMultiRecords}
                            isMultiRecords={isMultiRecords}
                        />
                    ))}
                    {btnMultiRecords}
                </div>
            </div>
            {multiRecords.length > 0 && (
                <div className="p_main_multi_recording_wrapper">
                    <ModalSchedule 
                        multiSlots={multiSlots}
                        modalIsOpen={isModalSchedule} 
                        closeModal={onCloseModalSchedule} 
                    />
                    <div className="p_main_multi_recording">
                        <div className="p_main_multi_recording_header">
                            <h3 className="p_main_multi_recording_header_title">
                                Мультизапись
                            </h3>
                        </div>
                        <div className="p_main_multi_recording_content">
                            <button onClick={() => fetchMultislots(0)} className="p_main_multi_recording_content_btn">
                                В любом порядке
                            </button>
                            <button onClick={() => fetchMultislots(1)} className="p_main_multi_recording_content_btn">
                                В строгом порядке
                            </button>
                            <button className="p_main_multi_recording_content_btn">
                                В одно время
                            </button>
                            <button className="p_main_multi_recording_content_btn">
                                Пересекающиеся услуги
                            </button>
                        </div>
                        <div style={{ width: '100%', borderBottom: '1.5px solid gray', paddingBottom: '10px' }}>
                            <button className="p_main_multi_recording_content_btn">
                                Итого: {resultPrice()}
                            </button>
                        </div>
                        <div className="p_main_multi_recording_footer">
                            {multiRecords.map(service => {

                                const getPrice = () => {
                                    if (service.minPrice === service.maxPrice) {
                                        return `${service.minPrice}₽`
                                    }

                                    return `${service.minPrice}₽ - ${service.maxPrice}₽`
                                }
                                return (
                                    <div key={service.id} className="p_main_multi_recording_footer_element">
                                        <span>
                                            {service.serv_name}
                                        </span>
                                        <span className="p_main_multi_recording_footer_element_price">
                                            Стоимость: {getPrice()}
                                        </span>
                                        <div className='p_main_multi_recording_footer_element_footer'>
                                            <span>
                                                Выбрано врачей: {service.selectedDoctors}
                                            </span>
                                            <button onClick={() => onRemoveRecord(service.id)} className='p_main_multi_recording_footer_element_footer_remove'>
                                                <MdRemoveCircleOutline />
                                            </button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default PMain