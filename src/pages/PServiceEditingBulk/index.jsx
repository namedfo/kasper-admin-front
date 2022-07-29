// components
import Navbar from '../../components/Navbar'
import ServiceEditingBulk from '../../components/ServiceEditingBulk'
import Sidebar from '../../components/Sidebar'
import PageContainer from '../../Layouts/PageContainer'
//
import './PServiceEditingBulk.css'


const PServiceEditingBulk = () => {
    return (
        <div className='p_service_editing_bulk'>
            <Navbar />
            <Sidebar />
            <PageContainer>
                <ServiceEditingBulk />
            </PageContainer>
        </div>
    )
}

export default PServiceEditingBulk