import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
//
import config from '../../config'
import routes from '../../routes'
//
import FeedbackPrint from '../../components/FeedbackPrint'
//
import './PFeedbackPrint.css'


const PFeedbackPrint = () => {
    const [dataFeedbackPrint, setDataFeedbackPrint] = useState(null)


    const { id } = useParams()
 
    useEffect(() => {
        if (id) {
            config.api_host.get(`${routes.get_feedback_print}?id=${id}`).then(r => {
                if (r.status === 200) {
                    setDataFeedbackPrint(r.data)
                }
            })
        }
    }, [id])

    return (
        <div className="p_feedback_print">
            {dataFeedbackPrint && (
                <FeedbackPrint dataFeedbackPrint={dataFeedbackPrint} />
            )}
        </div>
    )
}

export default PFeedbackPrint