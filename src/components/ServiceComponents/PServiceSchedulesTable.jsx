import { useEffect, memo, useState, useCallback } from "react"
//
import ModalTimeTable from "../ModalTimeTable"
// hooks
import { useTypedSelector, useActions } from '../../hooks'
//
import config from "../../config"
import routes from "../../routes"



const PServiceSchedulesTable = ({
    paramsSchedule,
    age,
    specialists,
    timeSchedule,
    setTimeSchedule
}) => {
    // gettes
    const {
        // init
        statusSchedule,
        schedule,

        // slots
        initSlots,
    } = useTypedSelector(state => state.service)


    // setters
    const {
        // init
        setSchedule,
        setStatusSchedule,

        // slots,
        setInitSlots
    } = useActions()



    const [modalTimeParams, setModalTimeParams] = useState(null)
    const [modalTimeIsOpen, setModalTimeIsOpen] = useState(false)


    const getParams = useCallback(() => {
        let params = []
        if (paramsSchedule) {
            paramsSchedule.forEach(schedule => {
                specialists.forEach(specialist => {
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
    }, [age, paramsSchedule, specialists])



    const fetchSchedule = useCallback(async () => {
        setStatusSchedule('loading')

        try {

            const res = await config.api_host.post(routes.post_timetable, { doctors: getParams() })


            if (res.status === 200) {
                const convertEvents = Object.values(res.data?.events)
                const convertSlots = Object.values(Object.values(res.data.slots)[0]).map(slot => Object.values(slot))

  
                setSchedule({
                    dates: res.data?.dates,
                    events: convertEvents,
                    slots: convertSlots
                })
                // for first upload page
                if (!initSlots?.length) {
                    setInitSlots(convertSlots)
                }
                setStatusSchedule('success')
            }

        } catch (error) {
            setStatusSchedule('error')
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



    useEffect(() => {

        if (timeSchedule === null) {
            fetchSchedule()
            setTimeSchedule([0, 7])
        }

    }, [fetchSchedule, setTimeSchedule, timeSchedule])

    // if (schedule?.slots && !Array.isArray(schedule?.slots)) {
    //     const convertSlots = Object.values(Object.values(schedule.slots)[0]).map(slot => Object.values(slot))


    //     setSchedule(prev => ({
    //         ...prev,
    //         slots: convertSlots
    //     }))
    // }

    const onOpenModal = (index) => {
        if (timeSchedule) {
            const newSchedule = schedule?.dates?.slice(timeSchedule[0], timeSchedule[1])[index]


            setModalTimeIsOpen(true)

            const newDate = (+new Date(newSchedule.dateRaw) / 1000) + 3600 * 6

            setModalTimeParams({
                doctors: getParams().map(el => +el.id),
                date: newDate
            })
        }
    }



    // const shortDayWeek = {
    //     0: 'ВС',
    //     1: 'ПН',
    //     2: 'ВТ',
    //     3: 'СР',
    //     4: 'ЧТ',
    //     5: 'ПТ',
    //     6: 'СБ'
    // }

    // const shortMonth = {
    //     0: 'Янв',
    //     1: 'Фев',
    //     2: 'Март',
    //     3: 'Апр',
    //     4: 'Май',
    //     5: 'Июн',
    //     6: 'Июл',
    //     7: 'Авг',
    //     8: 'Сен',
    //     9: 'Окт',
    //     10: 'Ноя',
    //     11: 'Дек',
    // }




    console.log(schedule)

    return (
        <div className="w-full mt-[40px] relative bg-white shadow-standart p-[10px] rounded-[10px]">
            <ModalTimeTable
                modalIsOpen={modalTimeIsOpen}
                modalTimeParams={modalTimeParams}
                closeModal={() => setModalTimeIsOpen(false)}
            />
            <div className="absolute cursor-pointer px-[6px] rounded-[5px] font-bold text-[13px] bg-[#6095e4] border border-[#494444] text-white left-0 top-[-20px]">
                <span>
                    РАСПИСАНИЕ (МЕДИЦИНСКИЙ ЦЕНТР)
                </span>
            </div>
            {statusSchedule === 'loading' && (
                <span>
                    Загрузка...
                </span>
            )}
            {statusSchedule === 'success' && (
                <table className="w-full rounded-[10px] border border-[#e0e0e0]">
                    <thead>
                        <tr>
                            <th className="border border-[#e0e0e0]">

                            </th>
                            {schedule && schedule?.dates?.slice(timeSchedule[0], timeSchedule[1]).map(el => (
                                <th key={el.date_text} className="border text-[15px] text-center border-[#e0e0e0]">
                                    <div className="flex items-center justify-center flex-wrap py-[6px] px-[10px]">
                                        <span className="leading-0">
                                            {el.date_text}
                                        </span>
                                        <div>
                                            <span className="bg-[#efefef] ml-[5px] text-[#444] px-[4px] rounded-[5px] border border-[#e3e3e3]">
                                                {el.day}
                                            </span>
                                        </div>
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    {schedule?.slots && (
                        <TBody
                            slots={schedule.slots}
                            initSlots={initSlots}
                            timeSchedule={timeSchedule}
                            onOpenModal={onOpenModal}
                        />
                    )}
                </table>
            )}
        </div>
    )
}


const TBody = ({ 
    slots, 
    timeSchedule, 
    onOpenModal, 
    initSlots 
}) => {


    const newInitSlots = initSlots.slice(timeSchedule[0], timeSchedule[1])


    return (
        <tbody>
            <tr>
                <td className="border leading-0 p-[5px] text-center font-bold border-[#e0e0e0]">
                    00-12
                </td>
                {slots.slice(timeSchedule[0], timeSchedule[1])?.map((el, index) => (
                    <td
                        className="cursor-pointer h-[28px] text-center font-bold"
                        onClick={() => onOpenModal(index)}
                        key={`${el[0]}_${index}`}
                    >
                        <div
                            className="flex h-full w-full">
                            <div style={{
                                background: el[0] === 0 ? '#f8cbac' : '#aad48c',
                                color: el[0] === 0 ? '#bf5c38' : '#358e11'
                            }} className="w-[60%] hover:shadow-schedule_elem h-full leading-0 flex items-center justify-center">
                                {el[0]}
                            </div>
                            <div style={{
                                background: el[0] === 0 ? '#f8cbac' : '#ffe699',
                                color: el[0] === 0 ? '#bf5c38' : '#7a5c00'
                            }} className="w-[40%] hover:shadow-schedule_elem h-full leading-0 flex items-center justify-center">
                                {newInitSlots[index][0]}
                            </div>
                        </div>
                    </td>
                ))}
            </tr>
            <tr>
                <td className="border leading-0 p-[5px] text-center font-bold border-[#e0e0e0]">
                    12-15
                </td>
                {slots.slice(timeSchedule[0], timeSchedule[1])?.map((el, index) => (
                    <td
                        className="cursor-pointer h-[28px] text-center font-bold "
                        onClick={() => onOpenModal(index)}
                        key={`${el[1]}_${index}`}
                    >
                        <div
                            className="flex h-full w-full">
                            <div style={{
                                background: el[1] === 0 ? '#f8cbac' : '#aad48c',
                                color: el[1] === 0 ? '#bf5c38' : '#358e11'
                            }} className="w-[60%] h-full hover:shadow-schedule_elem  leading-0 flex items-center justify-center">
                                {el[1]}
                            </div>
                            <div style={{
                                background: el[1] === 0 ? '#f8cbac' : '#ffe699',
                                color: el[1] === 0 ? '#bf5c38' : '#7a5c00'
                            }} className="w-[40%] h-full hover:shadow-schedule_elem  leading-0 flex items-center justify-center">
                                {newInitSlots[index][1]}
                            </div>
                        </div>
                    </td>
                ))}
            </tr>
            <tr>
                <td className="border leading-0 p-[5px] text-center font-bold border-[#e0e0e0]">
                    15-18
                </td>
                {slots.slice(timeSchedule[0], timeSchedule[1])?.map((el, index) => (
                    <td
                        className="cursor-pointer h-[28px] text-center font-bold"
                        onClick={() => onOpenModal(index)}
                        key={`${el[2]}_${index}`}
                    >
                        <div
                            className="flex h-full w-full">
                            <div style={{
                                background: el[2] === 0 ? '#f8cbac' : '#aad48c',
                                color: el[2] === 0 ? '#bf5c38' : '#358e11'
                            }} className="w-[60%] h-full hover:shadow-schedule_elem  leading-0 flex items-center justify-center">
                                {el[2]}
                            </div>
                            <div style={{
                                background: el[2] === 0 ? '#f8cbac' : '#ffe699',
                                color: el[2] === 0 ? '#bf5c38' : '#7a5c00'
                            }} className="w-[40%] h-full hover:shadow-schedule_elem  leading-0 flex items-center justify-center">
                                {newInitSlots[index][2]}
                            </div>
                        </div>
                    </td>
                ))}
            </tr>
            <tr>
                <td className="border leading-0 p-[5px] text-center font-bold border-[#e0e0e0]">
                    18-24
                </td>
                {slots.slice(timeSchedule[0], timeSchedule[1])?.map((el, index) => (
                    <td
                        className="cursor-pointer h-[28px] text-center font-bold"
                        onClick={() => onOpenModal(index)}
                        key={`${el[3]}_${index}`}
                    >
                        <div
                            className="flex h-full w-full">
                            <div style={{
                                background: el[3] === 0 ? '#f8cbac' : '#aad48c',
                                color: el[3] === 0 ? '#bf5c38' : '#358e11'
                            }} className="w-[60%] h-full hover:shadow-schedule_elem  leading-0 flex items-center justify-center">
                                {el[3]}
                            </div>
                            <div style={{
                                background: el[3] === 0 ? '#f8cbac' : '#ffe699',
                                color: el[3] === 0 ? '#bf5c38' : '#7a5c00'
                            }} className="w-[40%] h-full hover:shadow-schedule_elem  leading-0 flex items-center justify-center">
                                {newInitSlots[index][3]}
                            </div>
                        </div>
                    </td>
                ))}
            </tr>
        </tbody>
    )
}


export default memo(PServiceSchedulesTable)