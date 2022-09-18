import { BsQuestion } from 'react-icons/bs'
//
import { useState } from "react"


const PServiceSpecialists = ({
    setSpecialists,
    specialists,
    initAge,
}) => {
    const [age, setAge] = useState(initAge)
    const [isShow, setIsShow] = useState(true)



    const onChangeIsCheckSpecialist = (isCheck, id) => {
        let newSpecialists = [...specialists]
        if (newSpecialists.length) {
            newSpecialists = newSpecialists.map(specialist => {
                if (specialist.id === id) {
                    return {
                        ...specialist,
                        isCheck: isCheck
                    }
                }

                return specialist
            })

            setSpecialists(newSpecialists)
        }
    }


    const onChangeAllIsCheckSpecialists = isCheck => {
        let newSpecialists = [...specialists]

        if (newSpecialists.length) {
            setSpecialists(newSpecialists.map(specialist => ({ ...specialist, isCheck: isCheck })))
        }
    }




    return (
        <div className="bg-white flex flex-col relative  shadow-standart p-[15px] rounded-[10px]">
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
                        <input
                            value={age}
                            onChange={e => setAge(e.target.value)}
                            className="border-[#e0e0e0] outline-none px-[8px] border w-[60px] ml-[20px] rounded-[5px]"
                            type="text"
                        />
                    </div>
                    <div className="w-full mt-[15px] flex">
                        <button
                            onClick={() => onChangeAllIsCheckSpecialists(false)}
                            className="border hover:bg-[#FF6B6B] hover:rounded-[5px] hover:text-white cursor-pointer outline-none bg-[#fff2f2] border-[#e0e0e0] w-[50%]"
                        >
                            Убрать все
                        </button>
                        <button
                            onClick={() => onChangeAllIsCheckSpecialists(true)}
                            className="border hover:text-white hover:bg-[#29B8FF] hover:rounded-[5px] hover:text-whiteccc cursor-pointer outline-none border-[#e0e0e0 w-[50%]"
                        >
                            Поставить все
                        </button>
                    </div>
                    <div className="grid grid-cols-1 gap-[5px] divide-y mt-[10px]">
                        {specialists?.length && specialists.map(specialist => (
                            <Specialist
                                key={specialist.id}
                                specialist={specialist}
                                onChangeIsCheckSpecialist={onChangeIsCheckSpecialist}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    )

}


const Specialist = ({ specialist, onChangeIsCheckSpecialist }) => {
    const [isHover, setIsHover] = useState(false)



    return (
        <div className="flex pt-[5px] justify-between">
            <label htmlFor={`specialist_check_${specialist.id}`} className="flex cursor-pointer items-center">
                <input
                    id={`specialist_check_${specialist.id}`}
                    checked={specialist.isCheck}
                    onChange={(e) => onChangeIsCheckSpecialist(e.target.checked, specialist.id)}
                    className="w-[20px] cursor-pointer h-[20px]"
                    type="checkbox"
                />
                <span className="text-[14px] leading-none  font-sans font-medium  ml-[10px] text-[#0096e0]">
                    {specialist.name}
                </span>
            </label>
            <div className='relative'>
                {isHover && (
                    <div className='absolute break-words whitespace-pre-line h-auto w-[350px] z-10 rounded-[10px] shadow-md top-[-10px] left-[30px] border bg-[white] p-[10px]'>
                        dssadasd asd sadas dsasadasddsasadasddsasadasddsasadasddsasadasddsasadasddsasadasddsasadasddsasadasddsasadasddsasadasddsasadasddsasadasddsasadasddsasadasddsasadasd
                    </div>
                )}
                <button 
                       onMouseEnter={() => setIsHover(true)}
                       onMouseLeave={() => setIsHover(false)}
                       style={{
                        backgroundColor: isHover && 'gray',
                        color: isHover ? 'white' : '#B3B3B3',
                       }}
                    
                    className='flex rounded-[5px] border items-center justify-center'>
                    <BsQuestion size={20} />
                </button>
            </div>
        </div>
    )
}


export default PServiceSpecialists