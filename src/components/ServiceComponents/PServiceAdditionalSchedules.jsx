import { useState } from "react"


const PServiceAdditionalSchedules = () => {
    const [isShow, setIsShow] = useState(true)



    return (
        <div className="bg-white mt-[30px] relative  shadow-standart p-[20px] rounded-[10px]">
            <span className="px-[4px] leading-4 font-bold rounded-[2px] absolute left-[20px] top-[-10px] border text-white border-[#535353] bg-[#777] text-[11px]">
                ДОПОЛНИТЕЛЬНЫЕ РАСПИСАНИЯ
            </span>
            <span onClick={() => setIsShow(prev => !prev)} className="text-[11px] leading-4 bg-[#f5f5f5] rounded-[2px] px-[4px] text-[#aaa] border border-[#e0e0e0] font-bold absolute cursor-pointer hover:bg-white right-[20px] top-[-10px]">
                {!isShow ? 'РАЗВЕРНУТЬ' : 'СВЕРНУТЬ'}
            </span>


            {isShow && (
                <>
                    <div className="w-full mt-[15px] flex">
                        <button className="border hover:bg-[#FF6B6B] hover:rounded-[5px] hover:text-white cursor-pointer outline-none bg-[#fff2f2] border-[#e0e0e0] w-[50%]">
                            Убрать все
                        </button>
                        <button className="border hover:text-white hover:bg-[#29B8FF] hover:rounded-[5px] hover:text-whiteccc cursor-pointer outline-none border-[#e0e0e0 w-[50%]">
                            Поставить все
                        </button>
                    </div>

                    <button className="w-full rounded-[5px] py-[5px] mt-[15px] outline-none border border-[#e0e0e0]">
                        Применить
                    </button>
                </>
            )}
        </div>
    )
}

export default PServiceAdditionalSchedules