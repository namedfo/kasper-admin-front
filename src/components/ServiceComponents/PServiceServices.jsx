import { useState, memo } from "react"
import { useParams } from "react-router"
import _ from 'lodash'
// 
import config from "../../config"
import { useActions, useTypedSelector } from "../../hooks"
import routes from "../../routes"


const PServiceServices = ({
    setServices
}) => {
    const { age, service } = useTypedSelector(state => state.service)

    const { setSpecialists } = useActions()

    const param = useParams()

    const [isShow, setIsShow] = useState(true)

    const fetchService = async (newServices) => {
        try {
            const res = await config.api_host.post(`${routes.get_service_info}`, {
                age,
                services: newServices.filter(el => el.isCheck).map(el => +el.id),
                service_code: param?.code
            })
            // console.log(res.data)
            const newSpecialists = service?.specialists.map(specialist => specialist.id)
            // console.log(newSpecialists)
            const newSchedules = _.uniqBy(Object.values(res.data?.schedules).map(el => +el.medecinsID))
            // console.log(newSchedules)

            const arrNotMatches = newSchedules.filter(e => newSpecialists.includes(e))
            // console.log(arrNotMatches)
            setSpecialists(service.specialists.map(specialist => {
                
                let noMatch = arrNotMatches.some(el => el === specialist.id)
                if (!noMatch) {
                    return {
                        ...specialist,
                        isCheck: false
                    }
                } else {
                    return {
                        ...specialist,
                        isCheck: true
                    }
                }
            }))
        } catch (error) {

        }
    }



    const onChangeIsCheckServices = async (isCheck, id) => {
        let newServices = [...service?.services]
        if (newServices.length) {
            newServices = newServices.map(service => {
                if (service.id === id) {
                    return {
                        ...service,
                        isCheck: isCheck
                    }
                }

                return service
            })

            setServices(newServices)
        }


        await fetchService(newServices)
    }


    const onChangeAllIsCheckServices = isCheck => {
        let newServices = [...service?.services]
        setServices(newServices.length ? newServices.map(service => ({ ...service, isCheck: isCheck })) : newServices)
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
                        {service?.services?.map(service => (
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

export default memo(PServiceServices)