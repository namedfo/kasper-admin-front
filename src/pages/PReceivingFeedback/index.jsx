import { useEffect, useState } from 'react'
//
import { useParams } from 'react-router'
// components
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import ReceivingFeedback from '../../components/ReceivingFeedback'
// layouts
import PageContainer from '../../Layouts/PageContainer'
//
import config from '../../config'
import routes from '../../routes'
//
import './PReceivingFeedback.css'


const PReceivingFeedback = () => {
    const [patient, setPatient] = useState(null)

    const params = useParams()

    useEffect(() => {
        if (params.id) {
            config.api_host.get(`${routes.get_patient_info}?id=${params.id}`).then(r => {
                setPatient(r.data)
            })
        }
    }, [])



    return (
        <div className='p_receiving_feedback'>
            <Navbar />
            <Sidebar />
            <PageContainer>
                {patient && (
                    <ReceivingFeedback patient={patient} />
                )}
            </PageContainer>
        </div>
    )
}

export default PReceivingFeedback