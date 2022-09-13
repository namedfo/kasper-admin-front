import { useState } from 'react'
//
import config from '../../config'




const PServiceSchedulesTitle = () => {
    const [isMoreDescShow, setIsMoreDescShow] = useState(false)

    return (
        <div className="bg-white relative w-full shadow-standart p-[20px] rounded-[10px]">
            <div className="flex justify-between">
                <div className="flex flex-col">
                    {/* <h1 className='text-[#ff9b00] font-bold text-[17px]'>Установлен фильтр по исключительному событию: ОМС</h1> */}
                    <h1 className='font-bold text-[17px]'>
                        Консультация психолога, первичная – 30 минут
                    </h1>
                    <span className='text-[#585858]'>
                        Тестовое описание
                    </span>
                    {isMoreDescShow && (
                        <span className='text-[#585858] mt-[5px]'>
                            Тестовое описание
                        </span>
                    )}
                </div>
                <img className='object-contain h-[30px]' src={config.logo_login} alt="logo" />
            </div>
            <div className='absolute w-full flex items-center justify-between bottom-[-10px] left-0 px-[20px]'>
                <span className='text-[12px] leading-4 bg-white rounded-[2px] px-[5px] text-[#777] border border-[#e0e0e0] font-bold cursor-pointer hover:bg-[#f5f5f5]'>
                    ПОДБОР ВРЕМЕНИ
                </span>
                <span onClick={() => setIsMoreDescShow(prev => !prev)} className='text-[12px] leading-4 bg-white rounded-[2px] px-[5px] text-[#777] border border-[#e0e0e0] font-bold cursor-pointer hover:bg-[#f5f5f5]'>
                    ПОДРОБНЕЕ
                </span>
                <div>
                    <span className='text-[12px] leading-4 bg-white rounded-[2px] px-[5px] text-[#777] border border-[#e0e0e0] font-bold cursor-pointer hover:bg-[#f5f5f5]'>
                        -7
                    </span>
                    <span className='text-[12px] ml-[5px] leading-4 bg-white rounded-[2px] px-[5px] text-[#777] border border-[#e0e0e0] font-bold cursor-pointer hover:bg-[#f5f5f5]'>
                        -1
                    </span>
                    <span className='text-[12px] ml-[5px] leading-4 bg-white rounded-[2px] px-[5px] text-[#777] border border-[#e0e0e0] font-bold cursor-pointer hover:bg-[#f5f5f5]'>
                        СЕГОДНЯ
                    </span>
                    <span className='text-[12px] ml-[5px] leading-4 bg-white rounded-[2px] px-[5px] text-[#777] border border-[#e0e0e0] font-bold cursor-pointer hover:bg-[#f5f5f5]'>
                        +1
                    </span>
                    <span className='text-[12px] ml-[5px] leading-4 bg-white rounded-[2px] px-[5px] text-[#777] border border-[#e0e0e0] font-bold cursor-pointer hover:bg-[#f5f5f5]'>
                        +7
                    </span>
                    <span className='text-[12px] ml-[5px] leading-4 bg-[#ffb562] rounded-[2px] px-[5px] text-[#777] border border-[#e0e0e0] font-bold cursor-pointer'>
                        +30
                    </span>
                    <span className='text-[12px] ml-[5px] leading-4 bg-[#ffb562] rounded-[2px] px-[5px] text-[#777] border border-[#e0e0e0] font-bold cursor-pointer'>
                        -30
                    </span>
                </div>
            </div>
        </div>
    )
}

export default PServiceSchedulesTitle