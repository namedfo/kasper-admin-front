import { useState } from "react"


const PServiceSpecialists = () => {
    const [isShow, setIsShow] = useState(true)


    return (
        <div className="bg-white flex flex-col relative  shadow-standart p-[18px] rounded-[10px]">
            <span className="px-[4px] leading-4 font-bold rounded-[2px] absolute left-[20px] top-[-10px] border text-white border-[#535353] bg-[#777] text-[11px]">
                СПЕЦИАЛИСТЫ
            </span>
            <span onClick={() => setIsShow(prev => !prev)} className="text-[11px] leading-4 bg-[#f5f5f5] rounded-[2px] px-[4px] text-[#aaa] border border-[#e0e0e0] font-bold absolute cursor-pointer hover:bg-white right-[20px] top-[-10px]">
                {!isShow ? 'РАЗВЕРНУТЬ' : 'СВЕРНУТЬ'}
            </span>
            {isShow && (
                <>
                    <div className="flex">
                        <span className="border w-full py-[3px] px-[8px] border-[#e0e0e0] rounded-[5px] bg-[#f4ffb8]">
                            Точный возраст:
                        </span>
                        <input className="border-[#e0e0e0] outline-none px-[8px] border w-[60px] ml-[20px] rounded-[5px]" type="text" />
                    </div>
                    <div className="w-full mt-[15px] flex">
                        <button className="border hover:bg-[#FF6B6B] hover:rounded-[5px] hover:text-white cursor-pointer outline-none bg-[#fff2f2] border-[#e0e0e0] w-[50%]">
                            Убрать все
                        </button>
                        <button className="border hover:text-white hover:bg-[#29B8FF] hover:rounded-[5px] hover:text-whiteccc cursor-pointer outline-none border-[#e0e0e0 w-[50%]">
                            Поставить все
                        </button>
                    </div>
                    <div className="flex justify-between mt-[16px]">
                        <div className="flex">
                            <input className="w-[20px] cursor-pointer h-[20px]" type="checkbox" />
                            <span className="text-[14px] font-sans font-medium  ml-[10px] text-[#0096e0]">
                                Агафонова Марина Валерьевна
                            </span>
                        </div>
                        <span>
                            ?
                        </span>
                    </div>
                </>
            )}
        </div>
    )
}


export default PServiceSpecialists