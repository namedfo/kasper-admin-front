import { useEffect, memo, useState, useCallback } from "react"
//
import ModalTimeTable from "../ModalTimeTable"
//
import config from "../../config"
import routes from "../../routes"



const PServiceSchedulesTable = ({
    initSchedule,
    age,
    specialists,
    timeSchedule,
    setTimeSchedule
}) => {
    const [schedule, setSchedule] = useState(null)
    const [statusTableReq, setStatusTableReq] = useState('idle')


    const [modalTimeParams, setModalTimeParams] = useState(null)
    const [modalTimeIsOpen, setModalTimeIsOpen] = useState(false)


    const getParams = useCallback(() => {
        let params = []
        if (initSchedule) {
            initSchedule.forEach(schedule => {
                specialists.forEach(specialist => {
                    if (specialist.isCheck && schedule.medecinsID === specialist.id && (schedule.age[0] >= age || schedule.age[1] <= age)) {
                        params = [
                            ...params,
                            // [schedule.id]: schedule.duree
                            {
                                id: schedule.id,
                                duration: schedule.duree
                            }
                        ]
                    }
                })
            })
        }

        return params
    }, [age, initSchedule, specialists])



    const getSchedule = useCallback(async () => {
        setStatusTableReq('loading')

        try {

            const res = await config.api_host.post(routes.post_timetable, { doctors: getParams() })

            setSchedule(res.data)
            setStatusTableReq('success')

        } catch (error) {
            setStatusTableReq('error')
        }
    }, [getParams])



    useEffect(() => {

        if (timeSchedule === null) {
            getSchedule()
            setTimeSchedule([0, 7])
        }

    }, [getSchedule, setTimeSchedule, timeSchedule])

    if (schedule?.slots && !Array.isArray(schedule?.slots)) {
        const convertSlots = Object.values(Object.values(schedule.slots)[0]).map(slot => Object.values(slot))


        setSchedule(prev => ({
            ...prev,
            slots: convertSlots
        }))
    }

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
            {statusTableReq === 'loading' && (
                <span>
                    Загрузка...
                </span>
            )}
            {statusTableReq === 'success' && (
                <table className="w-full rounded-[10px] border border-[#e0e0e0]">
                    <thead>
                        <tr>
                            <th className="border border-[#e0e0e0]">

                            </th>
                            {schedule && schedule?.dates?.slice(timeSchedule[0], timeSchedule[1]).map(el => (
                                <th key={el.date_text} className="border text-[15px] text-center border-[#e0e0e0]">
                                    <div className="flex flex-col py-[4px]">
                                        <span className="leading-0">
                                            {el.date_text}
                                        </span>
                                        <div>
                                            <span className="bg-[#efefef] text-[#444] px-[4px] rounded-[5px] border border-[#e3e3e3]">
                                                {el.day}
                                            </span>
                                        </div>
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    {Array.isArray(schedule?.slots) && schedule?.slots && (
                        <TBody
                            slots={schedule.slots}
                            timeSchedule={timeSchedule}
                            onOpenModal={onOpenModal}
                        />
                    )}
                </table>
            )}
        </div>
    )
}


const TBody = ({ slots, timeSchedule, onOpenModal }) => {



    return (
        <tbody>
            <tr>
                <td className="border text-center font-bold border-[#e0e0e0]">
                    00-12
                </td>
                {slots.slice(timeSchedule[0], timeSchedule[1])?.map((el, index) => (
                    <td
                        className="border cursor-pointer text-center font-bold border-[#e0e0e0]"
                        onClick={() => onOpenModal(index)}
                        key={`${el[0]}_${index}`}
                    >
                        <div
                            className="flex">
                            <div style={{
                                background: el[0] === 0 ? '#f8cbac' : '#aad48c'
                            }} className="w-[70%]">
                                {el[0]}
                            </div>
                            <div style={{
                                background: el[0] === 0 ? '#f8cbac' : '#ffe699'
                            }} className="w-[30%]">
                                {el[0]}
                            </div>
                        </div>
                    </td>
                ))}
            </tr>
            <tr>
                <td className="border text-center font-bold border-[#e0e0e0]">
                    12-15
                </td>
                {slots.slice(timeSchedule[0], timeSchedule[1])?.map((el, index) => (
                    <td
                        className="border cursor-pointer text-center font-bold border-[#e0e0e0]"
                        onClick={() => onOpenModal(index)}
                        key={`${el[1]}_${index}`}
                    >
                        <div
                            className="flex">
                            <div style={{
                                background: el[1] === 0 ? '#f8cbac' : '#aad48c'
                            }} className="w-[70%]">
                                {el[1]}
                            </div>
                            <div style={{
                                background: el[1] === 0 ? '#f8cbac' : '#ffe699'
                            }} className="w-[30%]">
                                {el[1]}
                            </div>
                        </div>
                    </td>
                ))}
            </tr>
            <tr>
                <td className="border text-center font-bold border-[#e0e0e0]">
                    15-18
                </td>
                {slots.slice(timeSchedule[0], timeSchedule[1])?.map((el, index) => (
                    <td
                        className="border cursor-pointer text-center font-bold border-[#e0e0e0]"
                        onClick={() => onOpenModal(index)}
                        key={`${el[2]}_${index}`}
                    >
                        <div
                            className="flex">
                            <div style={{
                                background: el[2] === 0 ? '#f8cbac' : '#aad48c'
                            }} className="w-[70%]">
                                {el[2]}
                            </div>
                            <div style={{
                                background: el[2] === 0 ? '#f8cbac' : '#ffe699'
                            }} className="w-[30%]">
                                {el[2]}
                            </div>
                        </div>
                    </td>
                ))}
            </tr>
            <tr>
                <td className="border text-center font-bold border-[#e0e0e0]">
                    18-24
                </td>
                {slots.slice(timeSchedule[0], timeSchedule[1])?.map((el, index) => (
                    <td
                        className="border cursor-pointer text-center font-bold border-[#e0e0e0]"
                        onClick={() => onOpenModal(index)}
                        key={`${el[3]}_${index}`}
                    >
                       <div
                            className="flex">
                            <div style={{
                                background: el[3] === 0 ? '#f8cbac' : '#aad48c'
                            }} className="w-[70%]">
                                {el[3]}
                            </div>
                            <div style={{
                                background: el[3] === 0 ? '#f8cbac' : '#ffe699'
                            }} className="w-[30%]">
                                {el[3]}
                            </div>
                        </div>
                    </td>
                ))}
            </tr>
        </tbody>
    )
}


export default memo(PServiceSchedulesTable)