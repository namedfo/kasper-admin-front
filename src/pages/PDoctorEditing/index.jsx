// components
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import DoctorEditing from '../../components/DoctorEditing'
// layouts
import PageContainer from '../../Layouts/PageContainer'
//
import './PDoctorEditing.css'


const PDoctorEditing = () => {
    return (
        <div className='p_doctor_editing'>
            <Navbar />
            <Sidebar />
            <PageContainer>
                <DoctorEditing />
            </PageContainer>
        </div>
    )
}


export default PDoctorEditing