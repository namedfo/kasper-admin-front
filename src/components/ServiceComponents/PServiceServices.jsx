import { useState, memo } from "react"

const PServiceComponentServices = ({
    services
}) => {
    const [isShow, setIsShow] = useState(true)

    const covertServices = services ? Object.values(services) : undefined

    return (
        <div className="bg-white mt-[30px] relative  shadow-standart p-[18px] rounded-[10px]">
            <span className="px-[4px] leading-4 font-bold rounded-[2px] absolute left-[20px] top-[-10px] border text-white border-[#535353] bg-[#777] text-[11px]">
                УСЛУГИ
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
                    <div className="flex flex-col mt-[16px]">
                        {covertServices && covertServices.length > 0 && covertServices.map(service => (
                            <div key={service.name} className="flex">
                                <div className="flex w-auto">
                                    <input className="w-[20px] cursor-pointer h-[20px]" type="checkbox" />
                                    <span className="text-[14px] w-[260px] font-sans font-medium ml-[10px] text-[#0096e0]">
                                        {service.name}
                                    </span>
                                </div>
                                <div>
                                    <div className="text-[14px] w-[60px] text-[#444] px-[5px] font-bold flex items-center justify-center border border-[#e3e3e3] rounded-[4px] bg-[#efefef]">
                                        {service.price} &#8381;
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

export default memo(PServiceComponentServices)