//
import { useEffect, useState } from 'react'
//
import ServicesItemDetail from '../ServicesItemDetail'
//
import routes from '../../routes'
import config from '../../config'
//
import './ServicesItem.css'



const ServicesItem = ({ code, id, name }) => {

    const [isDetailInfo, setIsDetailInfo] = useState(false)
    const [detailInfo, setDetailInfo] = useState(null)

    useEffect(() => {
        if (isDetailInfo) {
            config.api_host.get(`${routes.service}?id=${id}`).then(r => {
                setDetailInfo(r.data)
            })
        }
    }, [isDetailInfo])

    return (
        <div className="services_item">
            <div className='services_item_short_info'>
                <span className='services_item_short_info_code'>
                    {code}
                </span>
                <button 
                    onClick={() => setIsDetailInfo(prev => !prev)}
                    className='services_item_short_info_name'
                >
                    {name}
                </button>
            </div>
            {isDetailInfo && detailInfo && (
                <ServicesItemDetail setDetailInfo={setDetailInfo} detailInfo={detailInfo} />
            )}
        </div>
    )
}

export default ServicesItem