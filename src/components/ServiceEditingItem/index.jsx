//
import { useEffect, useState } from 'react'
//
import ServiceEditingItemDetail from '../ServiceEditingItemDetail'
//
import routes from '../../routes'
import config from '../../config'
//
import './ServiceEditingItem.css'



const ServiceEditingItem = ({ code, id, name }) => {

    const [isDetailInfo, setIsDetailInfo] = useState(false)
    const [detailInfo, setDetailInfo] = useState(null)

    useEffect(() => {
        if (isDetailInfo) {
            config.api_host.get(`${routes.service}?id=${id}`).then(r => {
                setDetailInfo(r.data)
            })
        }
    }, [isDetailInfo, id])

    return (
        <div className="service_editing_item">
            <div className='service_editing_item_short_info'>
                <span className='service_editing_item_short_info_code'>
                    {code}
                </span>
                <button 
                    onClick={() => setIsDetailInfo(prev => !prev)}
                    className='service_editing_item_short_info_name'
                >
                    {name}
                </button>
            </div>
            {isDetailInfo && detailInfo && (
                <ServiceEditingItemDetail setDetailInfo={setDetailInfo} detailInfo={detailInfo} />
            )}
        </div>
    )
}

export default ServiceEditingItem