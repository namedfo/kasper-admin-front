//
import { useEffect } from 'react'
//
import { useLocation } from 'react-router'
// components
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import ReceivingAppeal from '../../components/ReceivingAppeal'
// layouts
import PageContainer from '../../Layouts/PageContainer'
//
import './PReceivingAppeal.css'


const PReceivingAppeal = () => {

    const location = useLocation()

    useEffect(() => {

    }, [])



    return (
        <div className='p_receiving_appeal'>
            <Navbar />
            <Sidebar />
            <PageContainer>
                <ReceivingAppeal />
            </PageContainer>
        </div>
    )
}

export default PReceivingAppeal