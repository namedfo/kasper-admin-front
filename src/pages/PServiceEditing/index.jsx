// components
import Navbar from '../../components/Navbar'
import ServiceEditing from '../../components/ServiceEditing'
import Sidebar from '../../components/Sidebar'
import PageContainer from '../../Layouts/PageContainer'
//
import './PServiceEditing.css'


const PServiceEditing = () => {
    return (
        <div className='p_service_editing'>
            <Navbar />
            <Sidebar />
            <PageContainer>
                <ServiceEditing />
            </PageContainer>
        </div>
    )
}

export default PServiceEditing