import { useState } from "react"



const PServiceExceptionalEvents = () => {
    const [isShow, setIsShow] = useState(true)


    return (
        <div className="bg-white mt-[30px] relative  shadow-standart p-[18px] rounded-[10px]">
            <span className="px-[4px] leading-4 font-bold rounded-[2px] absolute left-[20px] top-[-10px] border text-white border-[#535353] bg-[#777] text-[11px]">
                ИСКЛЮЧИТЕЛЬНЫЕ СОБЫТИЯ
            </span>
            <span onClick={() => setIsShow(prev => !prev)} className="text-[11px] leading-4 bg-[#f5f5f5] rounded-[2px] px-[4px] text-[#aaa] border border-[#e0e0e0] font-bold absolute cursor-pointer hover:bg-white right-[20px] top-[-10px]">
                {!isShow ? 'РАЗВЕРНУТЬ' : 'СВЕРНУТЬ'}
            </span>


            {isShow && (
                <>
                    <div className="w-full flex">
                        <button className="border hover:bg-[#FF6B6B] hover:rounded-[5px] hover:text-white cursor-pointer outline-none bg-[#fff2f2] border-[#e0e0e0] w-[50%]">
                            Убрать все
                        </button>
                        <button className="border hover:text-white hover:bg-[#29B8FF] hover:rounded-[5px] hover:text-whiteccc cursor-pointer outline-none border-[#e0e0e0 w-[50%]">
                            Поставить все
                        </button>
                    </div>

                    <div className="flex flex-col mt-[15px]">
                        <div className="pb-[10px] flex items-center" >
                            <input className="w-[20px] cursor-pointer h-[20px]" type="checkbox" />
                            <span className="text-[16px] font-sans font-medium  ml-[10px] text-[#0096e0]">
                               ОМС
                            </span>
                        </div>
                        <div className="border-t flex items-center pt-[10px] border-[#e0e0e0]">
                            <input className="w-[20px] cursor-pointer h-[20px]" type="checkbox" />
                            <span className="text-[16px] font-sans font-medium  ml-[10px] text-[#0096e0]">
                                ПМУ
                            </span>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default PServiceExceptionalEvents