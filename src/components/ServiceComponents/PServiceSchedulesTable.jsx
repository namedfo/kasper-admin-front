import { useEffect } from "react"
import { useState } from "react"
import { memo } from "react"
import config from "../../config"
import routes from "../../routes"


const PServiceSchedulesTable = ({
    initSchedule,
    age,
    specialists
}) => {
    console.log(initSchedule)
    const [schedule, setSchedule] = useState(null)
    const [statusReq, setStatusReq] = useState('idle')


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
            try {


                const res = await config.api_host.post(routes.post_timetable, { d: params })

            } catch (error) {
                setStatusReq('error')
            }
        })()
    }, [age, initSchedule, specialists])


    const shortDayWeek = {
        0: 'ВС',
        1: 'ПН',
        2: 'ВТ',
        3: 'СР',
        4: 'ЧТ',
        5: 'ПТ',
        6: 'СБ'
    }

    const shortMonth = {
        0: '',
        1: ''
    }


    return (
        <div className="w-full mt-[40px] relative bg-white shadow-standart p-[10px] rounded-[10px]">
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
                        <th className="border text-[15px] text-center border-[#e0e0e0]">
                            <div className="flex flex-col py-[4px]">
                                <span className="leading-0">
                                    13 sent
                                </span>
                                <div>
                                    <span className="bg-[#efefef] text-[#444] px-[4px] rounded-[5px] border border-[#e3e3e3]">
                                        ds
                                    </span>
                                </div>
                            </div>
                        </th>
                        <th className="border text-[15px] text-center border-[#e0e0e0]">
                            <div className="flex flex-col py-[4px]">
                                <span>
                                    13 sent
                                </span>
                                <div>
                                    <span className="bg-[#efefef] text-[#444] px-[4px] rounded-[5px] border border-[#e3e3e3]">
                                        ds
                                    </span>
                                </div>
                            </div>
                        </th>
                        <th className="border text-[15px] text-center border-[#e0e0e0]">
                            <div className="flex flex-col py-[4px]">
                                <span>
                                    13 sent
                                </span>
                                <div>
                                    <span className="bg-[#efefef] text-[#444] px-[4px] rounded-[5px] border border-[#e3e3e3]">
                                        ds
                                    </span>
                                </div>
                            </div>
                        </th>
                        <th className="border text-[15px] text-center border-[#e0e0e0]">
                            <div className="flex flex-col py-[4px]">
                                <span>
                                    13 sent
                                </span>
                                <div>
                                    <span className="bg-[#efefef] text-[#444] px-[4px] rounded-[5px] border border-[#e3e3e3]">
                                        ds
                                    </span>
                                </div>
                            </div>
                        </th>
                        <th className="border text-[15px] text-center border-[#e0e0e0]">
                            <div className="flex flex-col py-[4px]">
                                <span>
                                    13 sent
                                </span>
                                <div>
                                    <span className="bg-[#efefef] text-[#444] px-[4px] rounded-[5px] border border-[#e3e3e3]">
                                        ds
                                    </span>
                                </div>
                            </div>
                        </th>
                        <th className="border text-[15px] text-center border-[#e0e0e0]">
                            <div className="flex flex-col py-[4px]">
                                <span>
                                    13 sent
                                </span>
                                <div>
                                    <span className="bg-[#efefef] text-[#444] px-[4px] rounded-[5px] border border-[#e3e3e3]">
                                        ds
                                    </span>
                                </div>
                            </div>
                        </th>
                        <th className="border text-[15px] text-center border-[#e0e0e0]">
                            <div className="flex flex-col py-[4px]">
                                <span>
                                    13 sent
                                </span>
                                <div>
                                    <span className="bg-[#efefef] text-[#444] px-[4px] rounded-[5px] border border-[#e3e3e3]">
                                        ds
                                    </span>
                                </div>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="border text-center font-bold border-[#e0e0e0]">
                            00-12
                        </td>
                    </tr>
                    <tr>
                        <td className="border text-center font-bold border-[#e0e0e0]">
                            12-15
                        </td>
                    </tr>
                    <tr>
                        <td className="border text-center font-bold border-[#e0e0e0]">
                            15-18
                        </td>
                    </tr>
                    <tr>
                        <td className="border text-center font-bold border-[#e0e0e0]">
                            18-24
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}


export default memo(PServiceSchedulesTable)