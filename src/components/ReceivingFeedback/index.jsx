import { useFormik } from 'formik';
//
import Select from 'react-select';
//
import { toast } from 'react-toastify';
//
import DatePicker from "react-datepicker";
//
import config from '../../config'
import routes from '../../routes';
//
import './ReceivingFeedback.css'


const optionsGender = [
    { value: 1, label: 'Мужчина' },
    { value: 0, label: 'Женщина' }
]

const optionsPersonStatus = [
    { value: 1, label: 'Пенсионер' },
    { value: 2, label: 'Инвалид' },
    { value: 3, label: 'Семьи с детьми-инвалидами' },
    { value: 4, label: 'Житель блокадного Ленинграда' },
    { value: 5, label: 'Ветеран ВОВ' },
    { value: 6, label: 'Беженец' },
    { value: 7, label: 'Многодетная семья' },
    { value: 8, label: 'Одинокая мать (отец)' }
]

const ReceivingFeedback = ({ patient, phone }) => {
    console.log(patient)

    const getGender = gender => {
        if (gender === 0) {
            return {
                value: 0,
                label: 'Женщина',
                short_label: 'Ж'
            }
        }
        if (gender === 1) {
            return {
                value: 1,
                label: 'Мужчина',
                short_label: 'М'
            }
        }
    }

    const formik = useFormik({
        initialValues: {
            full_name: patient.fio,
            gender: getGender(patient.gender),
            dob: new Date(patient.dob),
            address: patient.addr,
            phone: phone,
            person_status: '',
            feedback: patient.comment
        },
        onSubmit: values => {
            config.api_host.post(routes.feedback_create, {
                ...values,
                person_status: values.person_status.label,
                gender: values.gender.short_label,
                dob: +new Date(values.dob)
            }).then(r => {
                if (r.status === 200) {
                    toast.success('Успешно', {
                        position: "top-right",
                        autoClose: 300,
                    });
                } else {
                    toast.error('Ошибка', {
                        position: "top-right",
                        autoClose: 300,
                    });
                }
            })
        },
    });


    return (
        <div className='receiving_appeal'>
            <div className='receiving_appeal_header'>
                <h4 className='receiving_appeal_header_title'>
                    Прием Обращения
                </h4>
            </div>
            <div className='receiving_appeal_content'>
                <form
                    className='receiving_appeal_content_form'
                    onSubmit={formik.handleSubmit}
                >
                    <div className='reveiving_appeal_content_form_element'>
                        <span className='receiving_appeal_content_form_element_name'>
                            ФИО заявителя
                        </span>
                        <input
                            id="full_name"
                            value={formik.values.full_name}
                            onChange={formik.handleChange}
                            placeholder='ФИО'
                            className='receiving_appeal_content_form_element_input'
                            type="text"
                        />
                    </div>
                    <div className='reveiving_appeal_content_form_element'>
                        <span className='receiving_appeal_content_form_element_name'>
                            Пол заявителя
                        </span>
                        <Select
                            id="gender"
                            defaultValue={formik.values.gender}
                            onChange={selectedOption =>
                                formik.setFieldValue("gender", {
                                    value: selectedOption.value,
                                    label: selectedOption.label
                                })
                            }
                            placeholder='Выберите пол'
                            className='receiving_appeal_content_form_element_select'
                            type="text"
                            options={optionsGender}
                        />
                    </div>
                    <div className='reveiving_appeal_content_form_element'>
                        <span className='receiving_appeal_content_form_element_name'>
                            Дата рождения заявителя
                        </span>
                        {/* <input
                            id="dob"
                            value={formik.values.dob}
                            onChange={formik.handleChange}
                            placeholder='Дата рождения'
                            className='receiving_appeal_content_form_element_input' type="text"
                        /> */}
                       <div style={{ width: '60%' }}>
                        <DatePicker 
                            id="dob"
                            placeholder='Дата рождения'
                            selected={formik.values.dob}
                            onChange={selectedOption => {
                                console.log(selectedOption)
                                formik.setFieldValue("dob", selectedOption)
                            }}
                            className='receiving_appeal_content_form_element_picker'
                        />
                       </div>
                    </div>
                    <div className='reveiving_appeal_content_form_element'>
                        <span className='receiving_appeal_content_form_element_name'>
                            Адрес заявителя
                        </span>
                        <input
                            id="address"
                            value={formik.values.address}
                            onChange={formik.handleChange}
                            placeholder='Адрес'
                            className='receiving_appeal_content_form_element_input'
                            type="text"
                        />
                    </div>
                    <div className='reveiving_appeal_content_form_element'>
                        <span className='receiving_appeal_content_form_element_name'>
                            Телефон (с которого звонит сейчас заявитель)
                        </span>
                        <input
                            id="phone"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            placeholder='Номер'
                            className='receiving_appeal_content_form_element_input'
                            type="text"
                        />
                    </div>
                    <div className='reveiving_appeal_content_form_element'>
                        <span className='receiving_appeal_content_form_element_name'>
                            Социальный статус
                        </span>
                        <Select
                            id="person_status"
                            defaultValue={formik.values.person_status}
                            onChange={selectedOption =>
                                formik.setFieldValue("person_status", {
                                    value: selectedOption.value,
                                    label: selectedOption.label
                                })
                            }
                            placeholder='Выберите статус'
                            className='receiving_appeal_content_form_element_select'
                            type="text"
                            options={optionsPersonStatus}
                        />
                    </div>
                    <div className='reveiving_appeal_content_form_element'>
                        <span className='receiving_appeal_content_form_element_name'>
                            Содержание обращения
                        </span>
                        <textarea
                            rows="10"
                            id="feedback"
                            value={formik.values.feedback}
                            onChange={formik.handleChange}
                            placeholder='Содержание обращения' className='receiving_appeal_content_form_element_input' />
                    </div>
                    <button className='reveiving_appeal_content_form_submit' type="submit">
                        Save
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ReceivingFeedback