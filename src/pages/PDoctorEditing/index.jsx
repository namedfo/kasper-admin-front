import { useEffect, useState } from 'react'
// components
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import DoctorEditing from '../../components/DoctorEditing'
// layouts
import PageContainer from '../../Layouts/PageContainer'
//
import config from '../../config'
import routes from '../../routes'
//
import './PDoctorEditing.css'


const PDoctorEditing = () => {

    const [listDoctors, setListDoctors] = useState(null)

    const [selectedDoctor, setSelectedDoctor] = useState(null)

    const [selectedDoctorOption, setSelectedDoctorOption] = useState([{value: 1, label: 'Doctor first'}])


    useEffect(() => {
        config.api_host.get(routes.doctors_all).then(r => {
            if (r.status === 200) {
                const newListDoctors = r.data.map(doctor => ({
                    value: doctor.id,
                    label: doctor.name
                }))
                setListDoctors(newListDoctors)
            }
        })
    }, [])


    const getDoctor = id => {
        config.api_host.get(`${routes.get_doctor}?id=${id}`).then(r => {
            if (r.status === 200) {
                setSelectedDoctor(r.data)
            }
        })
    }


    const onChangeSelectedDoctorOption = selectedOption => {
        setSelectedDoctorOption(selectedDoctorOption)
        getDoctor(selectedOption.value)
    }

    

    return (
        <div className='p_doctor_editing'>
            <Navbar />
            <Sidebar />
            <PageContainer>
                <DoctorEditing 
                    listDoctors={listDoctors} 
                    selectedDoctor={selectedDoctor} 
                    selectedDoctorOption={selectedDoctorOption} 
                    onChangeSelectedDoctorOption={onChangeSelectedDoctorOption} 
                />
            </PageContainer>
        </div>
    )
}


export default PDoctorEditing