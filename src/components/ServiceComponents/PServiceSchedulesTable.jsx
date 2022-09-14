import { useEffect } from "react"
import { useState } from "react"
import { memo } from "react"
import config from "../../config"
import routes from "../../routes"
import ModalTimeTable from "../ModalTimeTable"

const staticSchedule = {
    dates: [{ date: "14.09.2022", date_text: "14 Сен", day: "Ср", dateRaw: "2022-09-14" }, { date: "15.09.2022", date_text: "15 Сен", day: "Чт", dateRaw: "2022-09-15" }, { date: "16.09.2022", date_text: "16 Сен", day: "Пт", dateRaw: "2022-09-16" }, { date: "17.09.2022", date_text: "17 Сен", day: "Сб", dateRaw: "2022-09-17" }, { date: "18.09.2022", date_text: "18 Сен", day: "Вс", dateRaw: "2022-09-18" }, { date: "19.09.2022", date_text: "19 Сен", day: "Пн", dateRaw: "2022-09-19" }, { date: "20.09.2022", date_text: "20 Сен", day: "Вт", dateRaw: "2022-09-20" }, { date: "21.09.2022", date_text: "21 Сен", day: "Ср", dateRaw: "2022-09-21" }, { date: "22.09.2022", date_text: "22 Сен", day: "Чт", dateRaw: "2022-09-22" }, { date: "23.09.2022", date_text: "23 Сен", day: "Пт", dateRaw: "2022-09-23" }, { date: "24.09.2022", date_text: "24 Сен", day: "Сб", dateRaw: "2022-09-24" }, { date: "25.09.2022", date_text: "25 Сен", day: "Вс", dateRaw: "2022-09-25" }, { date: "26.09.2022", date_text: "26 Сен", day: "Пн", dateRaw: "2022-09-26" }, { date: "27.09.2022", date_text: "27 Сен", day: "Вт", dateRaw: "2022-09-27" }, { date: "28.09.2022", date_text: "28 Сен", day: "Ср", dateRaw: "2022-09-28" }, { date: "29.09.2022", date_text: "29 Сен", day: "Чт", dateRaw: "2022-09-29" }, { date: "30.09.2022", date_text: "30 Сен", day: "Пт", dateRaw: "2022-09-30" }, { date: "01.10.2022", date_text: "1 Окт", day: "Сб", dateRaw: "2022-10-01" }, { date: "02.10.2022", date_text: "2 Окт", day: "Вс", dateRaw: "2022-10-02" }, { date: "03.10.2022", date_text: "3 Окт", day: "Пн", dateRaw: "2022-10-03" }, { date: "04.10.2022", date_text: "4 Окт", day: "Вт", dateRaw: "2022-10-04" }, { date: "05.10.2022", date_text: "5 Окт", day: "Ср", dateRaw: "2022-10-05" }, { date: "06.10.2022", date_text: "6 Окт", day: "Чт", dateRaw: "2022-10-06" }, { date: "07.10.2022", date_text: "7 Окт", day: "Пт", dateRaw: "2022-10-07" }, { date: "08.10.2022", date_text: "8 Окт", day: "Сб", dateRaw: "2022-10-08" }, { date: "09.10.2022", date_text: "9 Окт", day: "Вс", dateRaw: "2022-10-09" }, { date: "10.10.2022", date_text: "10 Окт", day: "Пн", dateRaw: "2022-10-10" }, { date: "11.10.2022", date_text: "11 Окт", day: "Вт", dateRaw: "2022-10-11" }, { date: "12.10.2022", date_text: "12 Окт", day: "Ср", dateRaw: "2022-10-12" }, { date: "13.10.2022", date_text: "13 Окт", day: "Чт", dateRaw: "2022-10-13" }, { date: "14.10.2022", date_text: "14 Окт", day: "Пт", dateRaw: "2022-10-14" }],
    events: {
        9: "OMS",
        10: "PMY",
        13: "perfvichniy"
    },
    slots: {
        1: {
            0: { 0: 0, 1: 2, 2: 1, 3: 1 },
            1: { 0: 2, 1: 1, 2: 3, 3: 2 },
            2: { 0: 1, 1: 2, 2: 1, 3: 0 },
            3: { 0: 0, 1: 0, 2: 0, 3: 0 },
            4: { 0: 0, 1: 0, 2: 0, 3: 0 },
            5: { 0: 3, 1: 4, 2: 4, 3: 0 },
            6: { 0: 2, 1: 10, 2: 10, 3: 3 },
            7: { 0: 0, 1: 3, 2: 5, 3: 4 },
            8: { 0: 9, 1: 1, 2: 2, 3: 4 },
            9: { 0: 7, 1: 5, 2: 2, 3: 0 },
            10: { 0: 0, 1: 0, 2: 0, 3: 0 },
            11: { 0: 0, 1: 0, 2: 0, 3: 0 },
            12: { 0: 19, 1: 13, 2: 8, 3: 0 },
            13: { 0: 11, 1: 19, 2: 12, 3: 6 },
            14: { 0: 9, 1: 5, 2: 17, 3: 7 },
            15: { 0: 16, 1: 17, 2: 11, 3: 4 },
            16: { 0: 14, 1: 7, 2: 6, 3: 0 },
            17: { 0: 0, 1: 0, 2: 0, 3: 0 },
            18: { 0: 0, 1: 0, 2: 0, 3: 0 },
            19: { 0: 31, 1: 19, 2: 10, 3: 0 },
            20: { 0: 13, 1: 23, 2: 16, 3: 6 },
            21: { 0: 10, 1: 5, 2: 22, 3: 8 },
            22: { 0: 16, 1: 17, 2: 19, 3: 6 },
            23: { 0: 23, 1: 15, 2: 6, 3: 0 },
            24: { 0: 0, 1: 0, 2: 0, 3: 0 },
            25: { 0: 0, 1: 0, 2: 0, 3: 0 },
            26: { 0: 33, 1: 22, 2: 10, 3: 0 },
            27: { 0: 15, 1: 25, 2: 20, 3: 5 },
            28: { 0: 13, 1: 5, 2: 22, 3: 9 },
            29: { 0: 17, 1: 22, 2: 22, 3: 5 },
            30: { 0: 25, 1: 15, 2: 7, 3: 0 }
        }
    }
}


const PServiceSchedulesTable = ({
    initSchedule,
    age,
    specialists,
    timeSchedule,
}) => {
    const [schedule, setSchedule] = useState(staticSchedule)
    const [statusReq, setStatusReq] = useState('idle')



    const [modalTimeParams, setModalTimeParams] = useState(null)
    const [modalTimeIsOpen, setModalTimeIsOpen] = useState(false)

    console.log(modalTimeParams)


    useEffect(() => {
        let params = {}
        if (initSchedule) {
            initSchedule.forEach(schedule => {
                specialists.forEach(specialist => {
                    if (specialist.isCheck && schedule.medecinsID === specialist.id && (schedule.age[0] >= age || schedule.age[1] <= age)) {
                        params = {
                            ...params,
                            [schedule.id]: schedule.duree
                        }
                    }
                })
            })
        }
        (async () => {
            setStatusReq('loading')

            setModalTimeParams({
                doctors: Object.keys(params).map(el => +el),
                date: 1663135200
            })
            try {

                const res = await config.api_host.post(routes.post_timetable, { d: params })

            } catch (error) {
                setStatusReq('error')
            }
        })()
    }, [age, initSchedule, specialists])


    useEffect(() => {
        if (!Array.isArray(schedule?.slots)) {
            const convertSlots = Object.values(Object.values(schedule.slots)[0]).map(slot => Object.values(slot))


            setSchedule(prev => ({
                ...prev,
                slots: convertSlots
            }))
        }

    }, [schedule, schedule.dates, schedule.slots, timeSchedule])

    const onOpenModal = () => {
        setModalTimeIsOpen(true)
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
                <tbody>
                    <tr>
                        <td className="border text-center font-bold border-[#e0e0e0]">
                            00-12
                        </td>
                        {Array.isArray(schedule?.slots) && schedule?.slots?.slice(timeSchedule[0], timeSchedule[1])?.map((el, index) => (
                            <td
                                className="border cursor-pointer text-center font-bold border-[#e0e0e0]"
                                onClick={onOpenModal}
                                key={`${el[0]}_${index}`}
                            >
                                {el[0]}
                            </td>
                        ))}
                    </tr>
                    <tr>
                        <td className="border text-center font-bold border-[#e0e0e0]">
                            12-15
                        </td>
                        {Array.isArray(schedule?.slots) && schedule?.slots?.slice(timeSchedule[0], timeSchedule[1])?.map((el, index) => (
                            <td
                                className="border cursor-pointer text-center font-bold border-[#e0e0e0]"
                                onClick={onOpenModal}
                                key={`${el[1]}_${index}`}
                            >
                                {el[1]}
                            </td>
                        ))}
                    </tr>
                    <tr>
                        <td className="border text-center font-bold border-[#e0e0e0]">
                            15-18
                        </td>
                        {Array.isArray(schedule?.slots) && schedule?.slots?.slice(timeSchedule[0], timeSchedule[1])?.map((el, index) => (
                            <td
                                className="border cursor-pointer text-center font-bold border-[#e0e0e0]"
                                onClick={onOpenModal}
                                key={`${el[2]}_${index}`}
                            >
                                {el[2]}
                            </td>
                        ))}
                    </tr>
                    <tr>
                        <td className="border text-center font-bold border-[#e0e0e0]">
                            18-24
                        </td>
                        {Array.isArray(schedule?.slots) && schedule?.slots?.slice(timeSchedule[0], timeSchedule[1])?.map((el, index) => (
                            <td
                                className="border cursor-pointer text-center font-bold border-[#e0e0e0]"
                                onClick={onOpenModal}
                                key={`${el[3]}_${index}`}
                            >
                                {el[3]}
                            </td>
                        ))}
                    </tr>
                </tbody>
            </table>
        </div>
    )
}


export default memo(PServiceSchedulesTable)