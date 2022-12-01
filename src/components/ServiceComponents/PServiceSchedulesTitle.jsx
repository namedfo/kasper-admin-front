import { useState, memo } from 'react'
import { useNavigate } from 'react-router'
//
import config from '../../config'




const PServiceSchedulesTitle = ({
    title,
    description,
    moreDescription,
    getTimeDuree,

    timeSchedule,
    setTimeSchedule
}) => {
    const [isMoreDescShow, setIsMoreDescShow] = useState(false)

    const navigate = useNavigate()



    const onChangeTimeSchedule = (operator, value) => {
        let prewTimeSchedule = [...timeSchedule]
        let newTimeSchedule = [...timeSchedule]

        if (operator === '+') {
            if (value === 1 && timeSchedule[1] <= 30) {
                newTimeSchedule = [prewTimeSchedule[0] + value, prewTimeSchedule[1] + value]
            }

            if (value === 7 && timeSchedule[1] <= 24) {
                newTimeSchedule = [prewTimeSchedule[0] + value, prewTimeSchedule[1] + value]
            }
        }
        if (operator === '-') {
            if (value === 1 && timeSchedule[0] >= 1) {
                newTimeSchedule = [prewTimeSchedule[0] - value, prewTimeSchedule[1] - value]
            } 

            if (value === 7 && timeSchedule[0] >= 6) {
                newTimeSchedule = [prewTimeSchedule[0] - value, prewTimeSchedule[1] - value]
            }
        }

        setTimeSchedule(newTimeSchedule)

    }


    return (
        <div className="bg-white relative w-full shadow-standart p-[20px] rounded-[10px]">
            <div className="flex justify-between">
                <div className="flex flex-col">
                    {/* <h1 className='text-[#ff9b00] font-bold text-[17px]'>Установлен фильтр по исключительному событию: ОМС</h1> */}
                    <h1 className='font-bold text-[17px]'>
                        {title} – {getTimeDuree()}
                    </h1>
                    <div
                        dangerouslySetInnerHTML={{ __html: description }}
                        className='text-[#585858]'
                    />
                    {isMoreDescShow && (
                        <div
                            dangerouslySetInnerHTML={{ __html: moreDescription }}
                            className='text-[#585858] mt-[5px]'
                        />
                    )}
                </div>
                <img
                    onClick={() => navigate('/')}
                    className='object-contain cursor-pointer h-[30px]'
                    src={config.logo_login}
                    alt="logo"
                />
            </div>
            <div className='absolute w-full flex items-center justify-between bottom-[-10px] left-0 px-[20px]'>
                <span className='text-[12px] leading-4 bg-white rounded-[2px] px-[5px] text-[#777] border border-[#e0e0e0] font-bold cursor-pointer hover:bg-[#f5f5f5]'>
                    ПОДБОР ВРЕМЕНИ
                </span>
                <span onClick={() => setIsMoreDescShow(prev => !prev)} className='text-[12px] leading-4 bg-white rounded-[2px] px-[5px] text-[#777] border border-[#e0e0e0] font-bold cursor-pointer hover:bg-[#f5f5f5]'>
                    ПОДРОБНЕЕ
                </span>
                <div>
                    <button
                        onClick={() => onChangeTimeSchedule('-', 7)}
                        className='text-[12px] leading-4 bg-white rounded-[2px] px-[5px] text-[#777] border border-[#e0e0e0] font-bold cursor-pointer hover:bg-[#f5f5f5]'>
                        -7
                    </button>
                    <button

                        onClick={() => onChangeTimeSchedule('-', 1)}
                        className='text-[12px] ml-[5px] leading-4 bg-white rounded-[2px] px-[5px] text-[#777] border border-[#e0e0e0] font-bold cursor-pointer hover:bg-[#f5f5f5]'>
                        -1
                    </button>
                    <button
                        onClick={() => setTimeSchedule([0, 7])}
                        className='text-[12px] ml-[5px] leading-4 bg-white rounded-[2px] px-[5px] text-[#777] border border-[#e0e0e0] font-bold cursor-pointer hover:bg-[#f5f5f5]'>
                        СЕГОДНЯ
                    </button>
                    <button
                        onClick={() => onChangeTimeSchedule('+', 1)}
                        className='text-[12px] ml-[5px] leading-4 bg-white rounded-[2px] px-[5px] text-[#777] border border-[#e0e0e0] font-bold cursor-pointer hover:bg-[#f5f5f5]'>
                        +1
                    </button>
                    <button
                        onClick={() => onChangeTimeSchedule('+', 7)}
                        className='text-[12px] ml-[5px] leading-4 bg-white rounded-[2px] px-[5px] text-[#777] border border-[#e0e0e0] font-bold cursor-pointer hover:bg-[#f5f5f5]'>
                        +7
                    </button>
                </div>
            </div>
        </div>
    )
}

export default memo(PServiceSchedulesTitle)