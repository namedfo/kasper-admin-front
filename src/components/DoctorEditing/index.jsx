import { memo } from 'react'
//
import Select from 'react-select';
//
import DoctorEditingForm from '../DoctorEditingForm';
//
import './DoctorEditing.css'


const DoctorEditing = ({ listDoctors, selectedDoctor, selectedDoctorOption, onChangeSelectedDoctorOption }) => {
    return (
        <div className="doctor_editing">
            <div className='doctor_editing_header'>
                <h4 className='doctor_editing_header_title'>
                    Редактирования врача
                </h4>
            </div>
            <div className='doctor_editing_intermediate'>
                <Select
                    placeholder='Выберите врача'
                    selected={selectedDoctorOption}
                    onChange={onChangeSelectedDoctorOption}
                    options={listDoctors}
                />
            </div>
            {selectedDoctor && (
                <div className='doctor_editing_content'>
                    <DoctorEditingForm selectedDoctor={selectedDoctor} />
                </div>
            )}
        </div>
    )
}

export default memo(DoctorEditing)