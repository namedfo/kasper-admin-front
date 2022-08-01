import { useEffect, useState } from 'react'
//
import { useParams } from 'react-router'
// components
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import ReceivingAppeal from '../../components/ReceivingAppeal'
// layouts
import PageContainer from '../../Layouts/PageContainer'
//
import config from '../../config'
import routes from '../../routes'
//
import './PReceivingAppeal.css'


const PReceivingAppeal = () => {
    const [patient, setPatient] = useState(null)

    const params = useParams()

    useEffect(() => {
        if (params.id) {
            config.api_host.get(routes.get_patient_info).then(r => {
                setPatient(r.data)
            })
        }
    }, [])



    return (
        <div className='p_receiving_appeal'>
            <Navbar />
            <Sidebar />
            <PageContainer>
                {patient && (
                    <ReceivingAppeal patient={patient} />
                )}
            </PageContainer>
        </div>
    )
}

export default PReceivingAppeal