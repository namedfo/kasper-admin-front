import { useEffect, useState, memo } from 'react';
//
import Modal from 'react-modal'
//
import { IoMdClose } from 'react-icons/io'
//
import padTo2Digits from '../../utils/padTo2Digits'
//
import config from '../../config'
import routes from '../../routes'
//
import './ModalTimeTable.css'
import { useCallback } from 'react';
import ModalTimeFree from './ModalTimeFree';

const timeTableRows = { "01:00": null, "01:05": null, "01:10": null, "01:15": null, "01:20": null, "01:25": null, "01:30": null, "01:35": null, "01:40": null, "01:45": null, "01:50": null, "01:55": null, "02:00": null, "02:05": null, "02:10": null, "02:15": null, "02:20": null, "02:25": null, "02:30": null, "02:35": null, "02:40": null, "02:45": null, "02:50": null, "02:55": null, "03:00": null, "03:05": null, "03:10": null, "03:15": null, "03:20": null, "03:25": null, "03:30": null, "03:35": null, "03:40": null, "03:45": null, "03:50": null, "03:55": null, "04:00": null, "04:05": null, "04:10": null, "04:15": null, "04:20": null, "04:25": null, "04:30": null, "04:35": null, "04:40": null, "04:45": null, "04:50": null, "04:55": null, "05:00": null, "05:05": null, "05:10": null, "05:15": null, "05:20": null, "05:25": null, "05:30": null, "05:35": null, "05:40": null, "05:45": null, "05:50": null, "05:55": null, "06:00": null, "06:05": null, "06:10": null, "06:15": null, "06:20": null, "06:25": null, "06:30": null, "06:35": null, "06:40": null, "06:45": null, "06:50": null, "06:55": null, "07:00": null, "07:05": null, "07:10": null, "07:15": null, "07:20": null, "07:25": null, "07:30": null, "07:35": null, "07:40": null, "07:45": null, "07:50": null, "07:55": null, "08:00": null, "08:05": null, "08:10": null, "08:15": null, "08:20": null, "08:25": null, "08:30": null, "08:35": null, "08:40": null, "08:45": null, "08:50": null, "08:55": null, "09:00": null, "09:05": null, "09:10": null, "09:15": null, "09:20": null, "09:25": null, "09:30": null, "09:35": null, "09:40": null, "09:45": null, "09:50": null, "09:55": null, "10:00": null, "10:05": null, "10:10": null, "10:15": null, "10:20": null, "10:25": null, "10:30": null, "10:35": null, "10:40": null, "10:45": null, "10:50": null, "10:55": null, "11:00": null, "11:05": null, "11:10": null, "11:15": null, "11:20": null, "11:25": null, "11:30": null, "11:35": null, "11:40": null, "11:45": null, "11:50": null, "11:55": null, "12:00": null, "12:05": null, "12:10": null, "12:15": null, "12:20": null, "12:25": null, "12:30": null, "12:35": null, "12:40": null, "12:45": null, "12:50": null, "12:55": null, "13:00": null, "13:05": null, "13:10": null, "13:15": null, "13:20": null, "13:25": null, "13:30": null, "13:35": null, "13:40": null, "13:45": null, "13:50": null, "13:55": null, "14:00": null, "14:05": null, "14:10": null, "14:15": null, "14:20": null, "14:25": null, "14:30": null, "14:35": null, "14:40": null, "14:45": null, "14:50": null, "14:55": null, "15:00": null, "15:05": null, "15:10": null, "15:15": null, "15:20": null, "15:25": null, "15:30": null, "15:35": null, "15:40": null, "15:45": null, "15:50": null, "15:55": null, "16:00": null, "16:05": null, "16:10": null, "16:15": null, "16:20": null, "16:25": null, "16:30": null, "16:35": null, "16:40": null, "16:45": null, "16:50": null, "16:55": null, "17:00": null, "17:05": null, "17:10": null, "17:15": null, "17:20": null, "17:25": null, "17:30": null, "17:35": null, "17:40": null, "17:45": null, "17:50": null, "17:55": null, "18:00": null, "18:05": null, "18:10": null, "18:15": null, "18:20": null, "18:25": null, "18:30": null, "18:35": null, "18:40": null, "18:45": null, "18:50": null, "18:55": null, "19:00": null, "19:05": null, "19:10": null, "19:15": null, "19:20": null, "19:25": null, "19:30": null, "19:35": null, "19:40": null, "19:45": null, "19:50": null, "19:55": null, "20:00": null, "20:05": null, "20:10": null, "20:15": null, "20:20": null, "20:25": null, "20:30": null, "20:35": null, "20:40": null, "20:45": null, "20:50": null, "20:55": null, "21:00": null, "21:05": null, "21:10": null, "21:15": null, "21:20": null, "21:25": null, "21:30": null, "21:35": null, "21:40": null, "21:45": null, "21:50": null, "21:55": null, "22:00": null, "22:05": null, "22:10": null, "22:15": null, "22:20": null, "22:25": null, "22:30": null, "22:35": null, "22:40": null, "22:45": null, "22:50": null, "22:55": null, "23:00": null, "23:05": null, "23:10": null, "23:15": null, "23:20": null, "23:25": null, "23:30": null, "23:35": null, "23:40": null, "23:45": null, "23:50": null, "23:55": null }


Modal.setAppElement('#root')

const customStyles = {
    overlay: {
        background: 'rgba(35, 35, 35, 0.5)'
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: '20px 25px 20px  25px',

        width: '96%',
        height: '96%',
        overflow: 'inherit'
    },
};


const ModalTimeTable = ({
    modalIsOpen,
    closeModal,
    modalTimeParams,
    timeReceptions
}) => {
    const [data, setData] = useState(null)

    // idle loading success error
    const [dataStatus, setDataStatus] = useState('idle')
    //
    const [selectedTime, setSelectedTime] = useState(null)
    const [modalIsOpenTimeFree, setIsOpenModalTimeFree] = useState(false)


    const fetchBuildTimeTable = async () => {
        setDataStatus('loading')
        try {
            console.log(modalTimeParams)
            await config.api_host.post(routes.post_build_time_table, modalTimeParams)
                .then(r => {
                    if (r.status === 200) {
                        if (r.data?.doctors) {
                            const newDoctors = r.data?.doctors?.map(doctor => {
                                let newSlots = {}
                                for (let [, value] of Object.entries(doctor.slots)) {
                                    newSlots = {
                                        ...newSlots, [value.time]: {
                                            ...value
                                        }
                                    }
                                }

                                return {
                                    ...doctor,
                                    slots: newSlots
                                }
                            })
                            setDataStatus('success')
                            setData({
                                ...r.data,
                                doctors: newDoctors
                            })
                        } else {
                            setDataStatus('idle')
                        }
                    }
                })
        } catch (error) {
            setDataStatus('error')
        }
    }

    useEffect(() => {
        if (modalIsOpen) {
            document.getElementById('root').style.overflow = 'hidden'
            fetchBuildTimeTable()
        }

        return () => {
            document.getElementById('root').style.overflow = 'auto'

        }
    }, [modalIsOpen])

    const fullDayWeek = {
        0: 'воскресенье',
        1: 'понедельник',
        2: 'вторник',
        3: 'среда',
        4: 'четверг',
        5: 'пятница',
        6: 'суббота'
    }

    const onHandleCloseModal = () => {
        setData(null)
        closeModal()
    }

    const getDateFormat = () => {
        if (data?.date) {
            const date = new Date(data?.date * 1000)

            const newDate = `${padTo2Digits(date.getDate())}.${padTo2Digits(date.getMonth() + 1)}.${date.getFullYear()}`
            const dayWeek = date.getDay()

            return `${newDate}, ${fullDayWeek[dayWeek]}`
        }

    }






    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={onHandleCloseModal}
            style={customStyles}
        >
            <ModalTimeFree
                modalIsOpen={modalIsOpenTimeFree}
                dateFormat={getDateFormat()}
                selectedTime={selectedTime}
                closeModal={() => setIsOpenModalTimeFree(false)}
            />
            <button onClick={onHandleCloseModal} className='modal_schedule_header_btn_close'>
                <IoMdClose size={30} />
            </button>
            {dataStatus === 'loading' && (
                <span style={{
                    fontFamily: 'Nunito',
                    fontWeight: 'bold',
                    fontSize: '18px',
                    color: '#232323'
                }}>
                    Загрузка...
                </span>
            )}
            {dataStatus === 'success' && (
                <div className="wrapper_modal_time">
                    <div onClick={fetchBuildTimeTable}
                        style={{
                            position: 'fixed',
                            left: '25px',
                            top: '80px',
                            background: 'white',
                            fontSize: '20px',
                            fontFamily: 'sans-serif',
                            fontWeight: 500,
                            padding: '3px 6px',
                            cursor: 'pointer',
                            boxShadow: '0 0 8px 0 rgb(0 0 0 / 20%)',
                            borderRadius: '5px'
                        }}
                    >
                        {getDateFormat()}
                    </div>
                    <table className='modal_time_content_table'>
                        <thead style={{ position: 'relative' }}>
                            <tr style={{ position: 'fixed', display: 'flex', left: '25px', top: '20px', width: 'calc(100% - 55px)', zIndex: 10 }}>
                                <th style={{
                                    minWidth: '47px',
                                    backgroundColor: '#bed3f0',
                                    color: "#36406f",
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    Часы
                                </th>
                                {data?.doctors?.map((doctor, index) => (
                                    <th style={{ backgroundColor: '#bed3f0', color: '#36406f', width: '100%' }} key={doctor.id}>
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <span>{doctor.name}</span>
                                            <span>{timeReceptions && `[${timeReceptions[doctor?.name]?.time} мин / ${timeReceptions[doctor?.name]?.slots} слота]`}</span>
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <TableBody
                            setSelectedTime={setSelectedTime}
                            setIsOpenModalTimeFree={setIsOpenModalTimeFree}
                            timeReceptions={timeReceptions}
                            doctors={data?.doctors}
                        />
                    </table>
                </div>
            )}
        </Modal>
    )
}



const TableBody = memo(({ setSelectedTime, setIsOpenModalTimeFree, doctors, timeReceptions }) => {
    const [hoverTimes, setHoverTimes] = useState(null)

    const getCols = useCallback((time, timeIndex) => {
        return doctors?.map((doctor, doctorIndex) => {
            const doctorsSlots = timeReceptions ? timeReceptions[doctor.name]?.slots : 5
            if (doctor.slots[time].status === 0) {
                return (
                    <BodyTdStatusZero
                        indexTd={timeIndex}
                        setSelectedTime={setSelectedTime}
                        setIsOpenModalTimeFree={setIsOpenModalTimeFree}
                        doctorsSlots={doctorsSlots}
                        key={doctor.id}
                        doctor={doctor}
                        doctorsSize={doctors?.length}
                        hoverTimes={hoverTimes}
                        setHoverTimes={setHoverTimes}
                        timeIndex={timeIndex}
                        currentTime={time}
                    />
                )
            }

            if (doctor.slots[time].status === 1) {
                return (
                    <BodyTdStatusOne
                        indexTd={timeIndex}
                        setSelectedTime={setSelectedTime}
                        setIsOpenModalTimeFree={setIsOpenModalTimeFree}
                        doctorsSlots={doctorsSlots}
                        key={doctor.id}
                        doctor={doctor}
                        doctorsSize={doctors?.length}
                        hoverTimes={hoverTimes}
                        setHoverTimes={setHoverTimes}
                        timeIndex={timeIndex}
                        currentTime={time}
                    />
                )
            }

            if (doctor.slots[time].status === 2) {
                return (
                    <BodyTdStatusTwo
                        indexTd={timeIndex}
                        setSelectedTime={setSelectedTime}
                        setIsOpenModalTimeFree={setIsOpenModalTimeFree}
                        doctorsSlots={doctorsSlots}
                        key={doctor.id}
                        doctor={doctor}
                        doctorsSize={doctors?.length}
                        hoverTimes={hoverTimes}
                        setHoverTimes={setHoverTimes}
                        timeIndex={timeIndex}
                        currentTime={time}
                    />
                )
            }

            if (doctor.slots[time].status === 3) {
                return (
                    <BodyTdStatusThree
                        indexTd={timeIndex}
                        setSelectedTime={setSelectedTime}
                        setIsOpenModalTimeFree={setIsOpenModalTimeFree}
                        doctorsSlots={doctorsSlots}
                        key={doctor.id}
                        doctor={doctor}
                        doctorsSize={doctors?.length}
                        hoverTimes={hoverTimes}
                        setHoverTimes={setHoverTimes}
                        timeIndex={timeIndex}
                        currentTime={time}
                    />
                )
            }

            if (doctor.slots[time].status === 4) {
                return (
                    <BodyTdStatusFour
                        indexTd={timeIndex}
                        setSelectedTime={setSelectedTime}
                        setIsOpenModalTimeFree={setIsOpenModalTimeFree}
                        doctorsSlots={doctorsSlots}
                        key={doctor.id}
                        doctor={doctor}
                        doctorsSize={doctors?.length}
                        hoverTimes={hoverTimes}
                        setHoverTimes={setHoverTimes}
                        timeIndex={timeIndex}
                        currentTime={time}
                    />
                )
            }

            if (doctor.slots[time].status === 5) {
                return (
                    <BodyTdStatusFive
                        indexTd={timeIndex}
                        setSelectedTime={setSelectedTime}
                        setIsOpenModalTimeFree={setIsOpenModalTimeFree}
                        doctorsSlots={doctorsSlots}
                        key={doctor.id}
                        doctor={doctor}
                        doctorsSize={doctors?.length}
                        hoverTimes={hoverTimes}
                        setHoverTimes={setHoverTimes}
                        timeIndex={timeIndex}
                        currentTime={time}
                    />
                )
            }


            return (
                <td>
                    Нет совпадений по статусам :(
                </td>
            )
        })
    }, [doctors, hoverTimes, setIsOpenModalTimeFree, setSelectedTime, timeReceptions])


    const tdBg = time => time.split('')[time.split('').length - 1] === '5' ? '#bed3f0' : '#d8e5f6'

    return (
        <tbody>
            {Object.entries(timeTableRows)?.map(([time, value], timeIndex) => (
                <tr key={time}>
                    <td
                        style={{
                            backgroundColor: hoverTimes ? Object.values(hoverTimes)[0][time] ? '#69f59e' : tdBg(time) : tdBg(time)
                        }}
                        className="modal_time_td"
                    >
                        {time}
                    </td>
                    {getCols(time, timeIndex)}
                </tr>
            ))}
        </tbody>
    )
})

const hoverRows = (doctor, timeIndex, setHoverTimes, slots = 5) => {

    let localHoverTimes = {}

    let localTimeIndex = timeIndex
    for (let i = 0; i < slots; i++) {
        const timeTableRowsObj = Object.entries(timeTableRows)

        localHoverTimes = {
            ...localHoverTimes,
            [timeTableRowsObj[localTimeIndex][0]]: {
                time: timeTableRowsObj[localTimeIndex][0],
                status: doctor.slots[timeTableRowsObj[localTimeIndex][0]]?.status
            }
        }

        localTimeIndex = localTimeIndex + 1

    }

    setHoverTimes(prev => ({
        ...prev,
        [doctor.id]: localHoverTimes
    }))

}

const checkFree = (hoverTimes, slots, doctorId, currentTime, callback, setSelectedTime) => {
    if (hoverTimes && hoverTimes[doctorId]) {
        let isOkey = false
        for (const [key, value] of Object.entries(hoverTimes[doctorId])) {
            if (value.status === 1 || value.status === 4) {
                isOkey = true
            } else {
                return isOkey = false
            }
        }

        if (isOkey) {
            // console.log('okey')
            callback()
            // console.log(Object.values(hoverTimes[doctorId])[0])
            setSelectedTime(Object.values(hoverTimes[doctorId])[0].time)
        }
    }
}



const BodyTdStatusZero = memo(({ indexTd, setSelectedTime, setIsOpenModalTimeFree, doctorsSlots, doctor, doctorsSize, hoverTimes, setHoverTimes, timeIndex, currentTime }) => {
    const [bg, setBg] = useState('#e5e5e5')


    useEffect(() => {
        if (hoverTimes && hoverTimes[doctor?.id] && hoverTimes[doctor?.id][currentTime]) return setBg('gray')

        setBg("#e5e5e5")
    }, [currentTime, doctor.id, hoverTimes])


    console.log(hoverTimes)
    return (
        <td
            style={{
                width: `calc(100% / ${doctorsSize})`,
                backgroundColor: bg,
                borderBottom: indexTd % doctorsSlots === 0 && '2px solid #FFCCCB'
            }}
            className='modal_time_content_table_td__status_zero'
            onClick={() => checkFree(hoverTimes, doctorsSlots, doctor?.id, currentTime, () => setIsOpenModalTimeFree(true), setSelectedTime)}
            onMouseEnter={() => hoverRows(doctor, timeIndex, setHoverTimes, doctorsSlots)}
            onMouseLeave={() => setHoverTimes(null)}
        >

        </td>
    )
})


const BodyTdStatusOne = memo(({ indexTd, setSelectedTime, setIsOpenModalTimeFree, doctorsSlots, doctor, doctorsSize, hoverTimes, setHoverTimes, timeIndex, currentTime }) => {

    const [bg, setBg] = useState('#e2ffed')


    useEffect(() => {
        if (hoverTimes && hoverTimes[doctor?.id] && hoverTimes[doctor?.id][currentTime]) return setBg('#69f59e')

        setBg("#e2ffed")
    }, [currentTime, doctor?.id, hoverTimes])
    return (
        <td
            style={{
                backgroundColor: bg,
                width: `calc(100% / ${doctorsSize})`,
                borderBottom: indexTd % doctorsSlots === 0 && '2px solid #FFCCCB'
            }}
            onClick={() => checkFree(hoverTimes, doctorsSlots, doctor?.id, currentTime, () => setIsOpenModalTimeFree(true), setSelectedTime)}
            onMouseEnter={() => hoverRows(doctor, timeIndex, setHoverTimes, doctorsSlots)}
            onMouseLeave={() => setHoverTimes(null)}
        >
            <span
                style={{
                    marginLeft: '15px',
                    color: '#A8A4A4'
                }}
            >
                {currentTime}
            </span>
        </td>
    )
})


const BodyTdStatusTwo = memo(({ indexTd, setSelectedTime, setIsOpenModalTimeFree, doctorsSlots, doctor, doctorsSize, hoverTimes, setHoverTimes, timeIndex, currentTime }) => {
    const [bg, setBg] = useState('white')


    useEffect(() => {
        if (hoverTimes && hoverTimes[doctor?.id] && hoverTimes[doctor?.id][currentTime]) return setBg('#ff97aa')

        setBg("white")
    }, [currentTime, doctor?.id, hoverTimes])


    return (
        <td
            style={{
                width: `calc(100% / ${doctorsSize})`,
                backgroundColor: bg,
                cursor: 'not-allowed',
                borderBottom: indexTd % doctorsSlots === 0 && '2px solid #FFCCCB'

            }}
            onClick={() => checkFree(hoverTimes, doctorsSlots, doctor?.id, currentTime, () => setIsOpenModalTimeFree(true), setSelectedTime)}
            onMouseEnter={() => hoverRows(doctor, timeIndex, setHoverTimes, doctorsSlots)}
            onMouseLeave={() => setHoverTimes(null)}
        >
            <div
                style={{
                    display: 'flex',
                    width: '100%'
                }}>
                <div
                    style={{
                        borderRadius: '50%',
                        backgroundColor: doctor.slots[currentTime].color,
                        height: '20px',
                        width: '20px'
                    }}
                />
                <span
                    style={{
                        fontWeight: 600,
                        marginLeft: '5px'
                    }}
                >
                    {doctor.slots[currentTime].text}
                </span>
            </div>
        </td>
    )
})


const BodyTdStatusThree = memo(({ indexTd, setSelectedTime, setIsOpenModalTimeFree, doctorsSlots, doctor, doctorsSize, hoverTimes, setHoverTimes, timeIndex, currentTime }) => {
    const [bg, setBg] = useState('white')
    useEffect(() => {
        if (hoverTimes && hoverTimes[doctor?.id] && hoverTimes[doctor?.id][currentTime]) return setBg('#ff97aa')

        setBg("white")
    }, [currentTime, doctor?.id, hoverTimes])
    return (
        <td
            style={{
                width: `calc(100% / ${doctorsSize})`,
                backgroundColor: bg,
                cursor: 'not-allowed',
                borderBottom: indexTd % doctorsSlots === 0 && '2px solid #FFCCCB'

            }}
            onClick={() => checkFree(hoverTimes, doctorsSlots, doctor?.id, currentTime, () => setIsOpenModalTimeFree(true), setSelectedTime)}
            onMouseEnter={() => hoverRows(doctor, timeIndex, setHoverTimes, doctorsSlots)}
            onMouseLeave={() => setHoverTimes(null)}
        >
            <div
                style={{
                    display: 'flex',
                    width: '100%'
                }}>
                <div
                    style={{
                        backgroundColor: doctor.slots[currentTime].color,
                        height: '20px',
                        width: '20px'
                    }}
                />
                <span
                    style={{
                        fontWeight: 600,
                        marginLeft: '5px'
                    }}
                >
                    {doctor.slots[currentTime].text}
                </span>
            </div>
        </td>
    )
})

const BodyTdStatusFour = memo(({ indexTd, setSelectedTime, setIsOpenModalTimeFree, doctorsSlots, doctor, doctorsSize, hoverTimes, setHoverTimes, timeIndex, currentTime }) => {
    const [bg, setBg] = useState('white')


    useEffect(() => {
        if (hoverTimes && hoverTimes[doctor?.id] && hoverTimes[doctor?.id][currentTime]) return setBg('#69f59e')

        setBg("white")
    }, [currentTime, doctor?.id, hoverTimes])
    return (
        <td
            style={{
                width: `calc(100% / ${doctorsSize})`,
                backgroundColor: bg,
                borderBottom: indexTd % doctorsSlots === 0 && '2px solid #FFCCCB'
            }}
            onClick={() => checkFree(hoverTimes, doctorsSlots, doctor?.id, currentTime, () => setIsOpenModalTimeFree(true), setSelectedTime)}
            onMouseEnter={() => hoverRows(doctor, timeIndex, setHoverTimes, doctorsSlots)}
            onMouseLeave={() => setHoverTimes(null)}
        >
            <div
                style={{
                    display: 'flex',
                    width: '100%'
                }}>
                <div
                    style={{
                        backgroundColor: doctor.slots[currentTime].color,
                        height: '20px',
                        width: '20px'
                    }}
                />
                <span
                    style={{
                        fontWeight: 600,
                        marginLeft: '5px'
                    }}
                >
                    {doctor.slots[currentTime].text}
                </span>
            </div>
        </td>
    )
})

const BodyTdStatusFive = memo(({ indexTd, setSelectedTime, setIsOpenModalTimeFree, doctorsSlots, doctor, doctorsSize, hoverTimes, setHoverTimes, timeIndex, currentTime }) => {
    const [bg, setBg] = useState('white')


    useEffect(() => {
        if (hoverTimes && hoverTimes[doctor?.id] && hoverTimes[doctor?.id][currentTime]) return setBg('#ff97aa')

        setBg("white")
    }, [currentTime, doctor?.id, hoverTimes])
    return (
        <td
            style={{
                width: `calc(100% / ${doctorsSize})`,
                backgroundColor: bg,
                cursor: 'not-allowed',
                borderBottom: indexTd % doctorsSlots === 0 && '2px solid #FFCCCB'
            }}
            onClick={() => checkFree(hoverTimes, doctorsSlots, doctor?.id, currentTime, () => setIsOpenModalTimeFree(true), setSelectedTime)}
            onMouseEnter={() => hoverRows(doctor, timeIndex, setHoverTimes, doctorsSlots)}
            onMouseLeave={() => setHoverTimes(null)}
        >
            <div className="flex">
                <div
                    style={{
                        backgroundColor: doctor.slots[currentTime].color1,
                        height: '20px',
                        width: '20px'

                    }}
                    className="flex items-center justify-center"
                >
                    <div style={{
                        borderRadius: '50%',
                        backgroundColor: doctor.slots[currentTime].color,
                        height: '16px',
                        width: '16px'
                    }} />
                </div>
                <span
                    style={{
                        fontWeight: 600,
                        marginLeft: '5px'
                    }}
                >
                    {doctor.slots[currentTime].text}
                </span>
            </div>
        </td>
    )
})





export default ModalTimeTable