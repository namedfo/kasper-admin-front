import { useFormik } from 'formik';
//
import Select from 'react-select';
//
import { toast } from 'react-toastify';
//
import config from '../../config'
import routes from '../../routes';
//
import './ReceivingAppeal.css'



const options = [
    { value: 1, label: 'Пенсионер' },
    { value: 2, label: 'Инвалид' },
    { value: 3, label: 'Семьи с детьми-инвалидами' },
    { value: 4, label: 'Житель блокадного Ленинграда' },
    { value: 5, label: 'Ветеран ВОВ' },
    { value: 6, label: 'Беженец' },
    { value: 7, label: 'Многодетная семья' },
    { value: 8, label: 'Одинокая мать (отец)' }
]

const ReceivingAppeal = () => {
    const formik = useFormik({
        initialValues: { },
        onSubmit: values => {
            config.api_host.post(routes.patient_create, {
                ...values,
                person_status: values.person_status.label
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
                        <input
                            id="gender"
                            value={formik.values.gender}
                            onChange={formik.handleChange}
                            placeholder='Пол'
                            className='receiving_appeal_content_form_element_input'
                            type="text"
                        />
                    </div>
                    <div className='reveiving_appeal_content_form_element'>
                        <span className='receiving_appeal_content_form_element_name'>
                            Дата рождения заявителя
                        </span>
                        <input
                            id="dob"
                            value={formik.values.dob}
                            onChange={formik.handleChange}
                            placeholder='Дата рождения'
                            className='receiving_appeal_content_form_element_input' type="text"
                        />
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
                            options={options}
                        />
                    </div>
                    <div className='reveiving_appeal_content_form_element'>
                        <span className='receiving_appeal_content_form_element_name'>
                            Содержание обращения
                        </span>
                        <textarea 
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

export default ReceivingAppeal