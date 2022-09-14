import { useState, memo } from "react"

const PServiceComponentServices = ({
    services,
    setServices
}) => {
    const [isShow, setIsShow] = useState(true)



    const onChangeIsCheckServices = (isCheck, id) => {
        setServices(prev => {
            if (prev) {
                return prev.map(service => {
                    if (service.id === id) {
                        return {
                            ...service,
                            isCheck: isCheck
                        }
                    }

                    return service
                })
            }
            return prev
        })
    }


    const onChangeAllIsCheckServices = isCheck => {
        setServices(prev => prev ? prev.map(service => ({ ...service, isCheck: isCheck })) : prev)
    }




    return (
        <div className="bg-white mt-[30px] relative  shadow-standart p-[15px] rounded-[10px]">
            <span className="px-[4px] leading-4 font-bold rounded-[2px] absolute left-[20px] top-[-10px] border text-white border-[#535353] bg-[#777] text-[11px]">
                УСЛУГИ
            </span>
            <span onClick={() => setIsShow(prev => !prev)} className="text-[11px] leading-4 bg-[#f5f5f5] rounded-[2px] px-[4px] text-[#aaa] border border-[#e0e0e0] font-bold absolute cursor-pointer hover:bg-white right-[20px] top-[-10px]">
                {!isShow ? 'РАЗВЕРНУТЬ' : 'СВЕРНУТЬ'}
            </span>


            {isShow && (
                <>
                    <div className="w-full flex">
                        <button
                            onClick={() => onChangeAllIsCheckServices(false)}
                            className="border hover:bg-[#FF6B6B] hover:rounded-[5px] hover:text-white cursor-pointer outline-none bg-[#fff2f2] border-[#e0e0e0] w-[50%]"
                        >
                            Убрать все
                        </button>
                        <button
                            onClick={() => onChangeAllIsCheckServices(true)}
                            className="border hover:text-white hover:bg-[#29B8FF] hover:rounded-[5px] hover:text-whiteccc cursor-pointer outline-none border-[#e0e0e0 w-[50%]"
                        >
                            Поставить все
                        </button>
                    </div>
                    <div className="grid grid-cols-1 gap-[6px] divide-y mt-[10px]">
                        {services?.map(service => (
                            <div key={service.name} className="flex pt-[6px] justify-between">
                                <label htmlFor={`service_check_${service.id}`} className="flex cursor-pointer items-center w-auto">
                                    <input 
                                        id={`service_check_${service.id}`}
                                        checked={service.isCheck}
                                        onChange={(e) => onChangeIsCheckServices(e.target.checked, service.id)}
                                        className="w-[20px] leading-none cursor-pointer h-[20px]" type="checkbox" />
                                    <span className="text-[14px] w-[265px] font-sans font-medium ml-[10px] text-[#0096e0]">
                                        {service.name}
                                    </span>
                                </label>
                                <div>
                                    <div className="text-[12px] w-[55px] text-[#444] py-[4px] px-[5px] font-sans font-[800] flex items-center justify-center border border-[#e3e3e3] rounded-[4px] bg-[#efefef]">
                                        <span className=" leading-none">
                                            {service.price} &#8381;
                                        </span>
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