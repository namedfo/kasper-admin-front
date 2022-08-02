import { useFormik } from 'formik'
//
import Switch from "react-switch";
//
import DatePicker from "react-datepicker";
//
import routes from '../../routes';
import config from '../../config';
//
import './DoctorEditing.css'


const DoctorEditing = () => {

    const formik = useFormik({
        initialValues: {
            doctor_photo: '',
            doctor_spec: '',
            is_locked: false,
            description: '',
            priority_until: new Date
        },
        onSubmit: values => {
            config.api_host.post(routes.update_doctor, {
                values,
                priority_until: +new Date(values.priority_until) / 1000
            })
        }
    })

    return (
        <div className="doctor_editing">
            <div className='doctor_editing_header'>
                <h4 className='doctor_editing_header_title'>
                    Редактирования врача
                </h4>
            </div>
            <div className='doctor_editing_content'>
                <form
                    onSubmit={formik.handleSubmit}
                    className="doctor_editing_content_form"
                >
                    <div className="doctor_editing_content_form_element">
                        <span className="doctor_editing_content_form_element_name">
                            Ссылка на фото
                        </span>
                        <input
                            id="doctor_photo"
                            value={formik.values.doctor_photo}
                            onChange={formik.handleChange}
                            placeholder='Ссылка на фото'
                            className="doctor_editing_content_form_element_input"
                            type="text"
                        />
                    </div>
                    <div className="doctor_editing_content_form_element">
                        <span className="doctor_editing_content_form_element_name">
                            Специализация
                        </span>
                        <textarea
                            id="doctor_spec"
                            value={formik.values.doctor_spec}
                            onChange={formik.handleChange}
                            className="doctor_editing_content_form_element_textarea"
                            rows={5}
                            type="text"
                            placeholder='Специализация'
                        />
                    </div>
                    <div className="doctor_editing_content_form_element">
                        <span className="doctor_editing_content_form_element_name">
                            Заблокирован
                        </span>
                        <div className="doctor_editing_content_form_element_switch">
                            <Switch
                                id="is_locked"
                                checked={formik.values.is_locked}
                                onChange={selectedOption => {
                                    formik.setFieldValue('is_locked', selectedOption)
                                }}
                            />
                        </div>
                    </div>
                    <div className="doctor_editing_content_form_element">
                        <span className="doctor_editing_content_form_element_name">
                            Описание
                        </span>
                        <textarea
                            id="description"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            className="doctor_editing_content_form_element_textarea"
                            rows={5}
                            type="text"
                            placeholder='Описание'
                        />
                    </div>
                    <div className="doctor_editing_content_form_element">
                        <span className="doctor_editing_content_form_element_name">
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
                                className='doctor_editing_content_form_element_picker'
                            />
                        </div>
                    </div>
                    <button className='doctor_editing_content_form_submit' type="submit">
                        Сохранить
                    </button>
                </form>
            </div>
        </div>
    )
}

export default DoctorEditing