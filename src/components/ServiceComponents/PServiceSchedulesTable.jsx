import { useEffect, memo, useState, useCallback } from "react"
//
import ModalTimeTable from "../ModalTimeTable"
// hooks
import { useTypedSelector, useActions } from '../../hooks'




const PServiceSchedulesTable = ({
    fetchSchedule,
    getScheduleParams,
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
    // const {} = useActions()



    const [modalTimeParams, setModalTimeParams] = useState(null)
    const [modalTimeIsOpen, setModalTimeIsOpen] = useState(false)






    useEffect(() => {

        if (timeSchedule === null) {
            fetchSchedule()
            setTimeSchedule([0, 7])
        }


    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



    const onOpenModal = (index) => {
        if (timeSchedule) {
            const newSchedule = schedule?.dates?.slice(timeSchedule[0], timeSchedule[1])[index]


            setModalTimeIsOpen(true)

            const newDate = (+new Date(newSchedule.dateRaw) / 1000) + 3600 * 6

            setModalTimeParams({
                doctors: getScheduleParams().map(el => +el.id),
                date: newDate
            })
        }
    }



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


const TBody = memo(({ 
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
                        onClick={el[0] !== 0 ? () => onOpenModal(index) : undefined}
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
                        onClick={el[1] !== 0 ? () => onOpenModal(index) : undefined}
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
                        onClick={el[2] !== 0 ? () => onOpenModal(index) : undefined}
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
                        onClick={el[3] !== 0 ? () => onOpenModal(index) : undefined}
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
})


export default memo(PServiceSchedulesTable)