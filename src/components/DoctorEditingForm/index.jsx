import { memo } from "react"
//
import { useFormik } from 'formik'
//
import Switch from "react-switch";
//
import DatePicker from "react-datepicker";
//
import { toast } from "react-toastify";
//
import routes from '../../routes';
import config from '../../config';
//
import './DoctorEditingForm.css'




const DoctorEditingForm = ({ selectedDoctor }) => {

    const formik = useFormik({
        initialValues: {
            doctor_photo: selectedDoctor?.doctor_photo ?? '',
            doctor_spec: selectedDoctor?.doctor_spec ?? '',
            is_locked:  selectedDoctor?.is_locked ?? false,
            description: selectedDoctor?.description ?? '',
            priority_until: new Date(selectedDoctor?.priority_until) ?? +new Date()
        },
        onSubmit: values => {
            config.api_host.post(routes.update_doctor, {
                ...values,
                priority_until: +new Date(values.priority_until) / 1000
            }).then(r => {
                if (r.status === 200) {
                    toast.success('Сохранено', {
                        autoClose: 1500,
                    })
                }
            })
        }
    })


    return (
        <form
            onSubmit={formik.handleSubmit}
            className="doctor_editing_form"
        >
            <div className="doctor_editing_form_element">
                <span className="doctor_editing_form_element_name">
                    Ссылка на фото
                </span>
                <input
                    id="doctor_photo"
                    value={formik.values.doctor_photo}
                    onChange={formik.handleChange}
                    placeholder='Ссылка на фото'
                    className="doctor_editing_form_element_input"
                    type="text"
                />
            </div>
            <div className="doctor_editing_form_element">
                <span className="doctor_editing_form_element_name">
                    Специализация
                </span>
                <textarea
                    id="doctor_spec"
                    value={formik.values.doctor_spec}
                    onChange={formik.handleChange}
                    className="doctor_editing_form_element_textarea"
                    rows={5}
                    type="text"
                    placeholder='Специализация'
                />
            </div>
            <div className="doctor_editing_form_element">
                <span className="doctor_editing_form_element_name">
                    Заблокирован
                </span>
                <div className="doctor_editing_form_element_switch">
                    <Switch
                        id="is_locked"
                        checked={formik.values.is_locked === 1}
                        onChange={selectedOption => {
                            formik.setFieldValue('is_locked', selectedOption ? 1 : 0)
                        }}
                    />
                </div>
            </div>
            <div className="doctor_editing_form_element">
                <span className="doctor_editing_form_element_name">
                    Описание
                </span>
                <textarea
                    id="description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    className="doctor_editing_form_element_textarea"
                    rows={5}
                    type="text"
                    placeholder='Описание'
                />
            </div>
            <div className="doctor_editing_form_element">
                <span className="doctor_editing_form_element_name">
                    Приоритет до
                </span>
                <div style={{ width: '60%' }}>
                    <DatePicker
                        id="priority_until"
                        selected={formik.values.priority_until}
                        onChange={selectedOption => {
                            formik.setFieldValue('priority_until', selectedOption)
                        }}
                        placeholder='Приоритет до'
                        className='doctor_editing_form_element_picker'
                    />
                </div>
            </div>
            <button className='doctor_editing_form_submit' type="submit">
                Сохранить
            </button>
        </form>
    )
}

export default memo(DoctorEditingForm)