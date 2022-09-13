import { useState, memo } from 'react'
import { useNavigate } from 'react-router'
//
import config from '../../config'




const PServiceSchedulesTitle = ({
    title,
    description,
    moreDescription,
    getTimeDuree
}) => {
    const [isMoreDescShow, setIsMoreDescShow] = useState(false)

    const navigate = useNavigate()




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
                </div>
            </div>
        </div>
    )
}

export default memo(PServiceSchedulesTitle)