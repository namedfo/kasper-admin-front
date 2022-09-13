import { useEffect, useState } from 'react'
//
import useOutside from '../../hooks/useOutside'
// components
import MainServices from '../../components/MainServices'
import NavbarMain from '../../components/NavbarMain'
import MultiRecords from '../../components/MultiRecords'
//
import config from '../../config'
import routes from '../../routes'
//
import './PMain.css'



const PMain = () => {

    const [services, setServices] = useState([])
    const [multiRecords, setMultiRecords] = useState([])


    const [btnMultiRecords, setBtnMultiRecords] = useState(null)
    const [popupHintComponent, setPopupHintComponent] = useState(null)


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

    const getMultiRecord = async code => {
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
                                    code: code,

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
                                code: code,

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


    const getService = async code => {
        setBtnMultiRecords(null)

        const isRepeat = multiRecords.some(el => el.code === code)

        if (!isRepeat) getMultiRecord(code)
    }


    useEffect(() => {
        getServices()
    }, [])







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

    const popupHint = (top, text) => {
        return (
            <div style={{
                top,
                left: 0,
                zIndex: 102,

                position: 'absolute',
                background: 'white',
                border: '1px solid #e6e6e6',
                width: '100%',
                padding: '20px',
                borderRadius: '15px',
                boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'
            }}>
                <p>
                    {text}
                </p>
            </div>
        )
    }

    const handlePopupHint = (isOpen, e, text) => {
        console.log(isOpen, e, text)
        if (isOpen) {
            e.preventDefault()

            const top = e.pageY - 300 + 'px'
            setPopupHintComponent(popupHint(top, text))
        } else {
            setPopupHintComponent(null)
        }

    }

    const handleMultiRecords = (e, code) => {
        e.preventDefault()
        if (e.type === 'contextmenu') {
            const top = e.pageY - 90 + 'px'
            const left = e.pageX - 10 + 'px'
            setBtnMultiRecords(btnMultiRecord(top, left, code))
        }
    }

    const isMultiRecords = multiRecords && multiRecords.length > 0






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
                            handlePopupHint={handlePopupHint}
                            isMultiRecords={isMultiRecords}
                            searchByAge={searchByAge}
                        />
                    ))}
                    {btnMultiRecords}
                    {popupHintComponent}
                </div>
            </div>
            {multiRecords?.length > 0 && (
                <MultiRecords
                    multiRecords={multiRecords}
                    setMultiRecords={setMultiRecords}
                    searchByAge={searchByAge}
                />
            )}
        </div>
    )
}





export default PMain