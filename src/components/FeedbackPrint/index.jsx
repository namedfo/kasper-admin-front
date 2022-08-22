import { useRef } from 'react';
//
import { BsPrinter } from 'react-icons/bs'
import { useNavigate } from 'react-router';
//
import { useReactToPrint } from 'react-to-print';
//
import './FeedbackPrint.css'



const FeedbackPrint = ({ dataFeedbackPrint }) => {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const navigate = useNavigate()

    function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
    }

    const date = new Date(dataFeedbackPrint.created_at * 1000)
    const newDateCreated = `${padTo2Digits(date.getDate())}.${padTo2Digits(date.getMonth() + 1)}.${date.getFullYear()}`
    const newTimeCreated = `${padTo2Digits(date.getHours())}:${padTo2Digits(date.getMinutes())}:${padTo2Digits(date.getSeconds())}`

    const newDate = new Date(dataFeedbackPrint.dob * 1000)
    const newDateBirth = `${padTo2Digits(newDate.getDate())}.${padTo2Digits(newDate.getMonth() + 1)}.${newDate.getFullYear()}`
    // const date = new Date(el.created_at * 1000)
    // const newDateBirth = `${padTo2Digits(date.getDate())}.${padTo2Digits(date.getMonth() + 1)}.${date.getFullYear()} ${padTo2Digits(date.getHours())}:${padTo2Digits(date.getMinutes())}:${padTo2Digits(date.getSeconds())}`
    // const newDateCreatedAt = ''

    const getGender = () => {
        if (dataFeedbackPrint.gender === 0) {
            return 'Жен'
        }
        if (dataFeedbackPrint.gender === 1) {
            return 'Муж'
        }
    }

    return (
        <div className='feedback_print'>
            <div className='feedback_print_header'>
                <h4 className='feedback_print_header_title'>
                    Регистрационная карта обращения
                </h4>
                <div style={{ display: 'flex' }}>
                    <button 
                        className='feedback_print_header_back'
                        onClick={() => navigate('/feedback-management')}
                    >
                        Назад
                    </button>
                    <button
                        className='feedback_print_header_print'
                        onClick={handlePrint}
                    >
                        <BsPrinter style={{ marginRight: '8px' }} />
                        Распечатать
                    </button>
                </div>
            </div>
            <div className='feedback_print_wrapper_content'>
                <div ref={componentRef}>
                    <div className='feedback_print_content'>
                        <div className='feedback_print_content_element'>
                            <span className='feedback_print_content_element_number'>
                                1
                            </span>
                            <span className='feedback_print_content_element_name'>
                                Регистрационный номер:
                            </span>
                            <span className='feedback_print_content_element_value'>

                            </span>
                        </div>
                        <div className='feedback_print_content_element'>
                            <span className='feedback_print_content_element_number'>
                                2
                            </span>
                            <span className='feedback_print_content_element_name'>
                                Дата регистрации:
                            </span>
                            <span className='feedback_print_content_element_value'>
                                {newDateCreated}
                            </span>
                        </div>
                        <div className='feedback_print_content_element'>
                            <span className='feedback_print_content_element_number'>
                                3
                            </span>
                            <span className='feedback_print_content_element_name'>
                                Время регистрации:
                            </span>
                            <span className='feedback_print_content_element_value'>
                                {newTimeCreated}
                            </span>
                        </div>
                        <div className='feedback_print_content_element'>
                            <span className='feedback_print_content_element_number'>
                                4
                            </span>
                            <span className='feedback_print_content_element_name'>
                                Способ обращения:
                            </span>
                            <span className='feedback_print_content_element_value'>
                                Устно. Горячая Линия.
                            </span>
                        </div>
                        <div className='feedback_print_content_element'>
                            <span className='feedback_print_content_element_title_empty'>
                                Личные сведения о заявителе
                            </span>
                        </div>
                        <div className='feedback_print_content_element'>
                            <span className='feedback_print_content_element_number'>
                                5
                            </span>
                            <span className='feedback_print_content_element_name'>
                                СНИЛС:
                            </span>
                            <span className='feedback_print_content_element_value'>

                            </span>
                        </div>
                        <div className='feedback_print_content_element'>
                            <span className='feedback_print_content_element_number'>
                                6
                            </span>
                            <span className='feedback_print_content_element_name'>
                                ФИО:
                            </span>
                            <span className='feedback_print_content_element_value'>
                                {dataFeedbackPrint.full_name}
                            </span>
                        </div>
                        <div className='feedback_print_content_element'>
                            <span className='feedback_print_content_element_number'>
                                7
                            </span>
                            <span className='feedback_print_content_element_name'>
                                Пол:
                            </span>
                            <span className='feedback_print_content_element_value'>
                                {dataFeedbackPrint.gender}
                            </span>
                        </div>
                        <div className='feedback_print_content_element'>
                            <span className='feedback_print_content_element_number'>
                                8
                            </span>
                            <span className='feedback_print_content_element_name'>
                                Застрахован:
                            </span>
                            <span className='feedback_print_content_element_value'>

                            </span>
                        </div>
                        <div className='feedback_print_content_element'>
                            <span className='feedback_print_content_element_number'>
                                9
                            </span>
                            <span className='feedback_print_content_element_name'>
                                Дата рождения:
                            </span>
                            <span className='feedback_print_content_element_value'>
                                {newDateBirth}
                            </span>
                        </div>
                        <div className='feedback_print_content_element'>
                            <span className='feedback_print_content_element_number'>
                                10
                            </span>
                            <span className='feedback_print_content_element_name'>
                                Район:
                            </span>
                            <span className='feedback_print_content_element_value'>

                            </span>
                        </div>
                        <div className='feedback_print_content_element'>
                            <span className='feedback_print_content_element_number'>
                                11
                            </span>
                            <span className='feedback_print_content_element_name'>
                                *Адрес:
                            </span>
                            <span className='feedback_print_content_element_value'>
                                {dataFeedbackPrint.address}
                            </span>
                        </div>
                        <div className='feedback_print_content_element'>
                            <span className='feedback_print_content_element_number'>
                                12
                            </span>
                            <span className='feedback_print_content_element_name'>
                                Телефон:
                            </span>
                            <span className='feedback_print_content_element_value'>
                                {dataFeedbackPrint.phone}
                            </span>
                        </div>
                        <div className='feedback_print_content_element'>
                            <span className='feedback_print_content_element_number'>
                                13
                            </span>
                            <span className='feedback_print_content_element_name'>
                                Социальный статус:
                            </span>
                            <span className='feedback_print_content_element_value'>
                                {dataFeedbackPrint.person_status}
                            </span>
                        </div>
                        <div className='feedback_print_content_element'>
                            <span className='feedback_print_content_element_title_empty'>
                                Проблемы и причины обращения граждан
                            </span>
                        </div>
                        <div className='feedback_print_content_element'>
                            <span className='feedback_print_content_element_number'>
                                14
                            </span>
                            <span className='feedback_print_content_element_title'>
                                1. Организация медицинской помощи
                            </span>
                        </div>
                        <div className='feedback_print_content_element'>
                            <span className='feedback_print_content_element_number'>
                                14.1
                            </span>
                            <span className='feedback_print_content_element_name'>
                                1.1 Организация первичной медицинской помощи в АПУ
                            </span>
                            <span className='feedback_print_content_element_value'>

                            </span>
                        </div>
                        <div className='feedback_print_content_element'>
                            <span className='feedback_print_content_element_number'>
                                14.2
                            </span>
                            <span className='feedback_print_content_element_name'>
                                1.2 Организация стационарной медицинской
                            </span>
                            <span className='feedback_print_content_element_value'>

                            </span>
                        </div>
                        <div className='feedback_print_content_element'>
                            <span className='feedback_print_content_element_number'>
                                14.3
                            </span>
                            <span className='feedback_print_content_element_name'>
                                1.3 Организация скорой медицинской помощи
                            </span>
                            <span className='feedback_print_content_element_value'>

                            </span>
                        </div>
                        <div className='feedback_print_content_element'>
                            <span className='feedback_print_content_element_number'>
                                14.4
                            </span>
                            <span className='feedback_print_content_element_name'>
                                1.4 Организация медицинской помощи матерям и детям
                            </span>
                            <span className='feedback_print_content_element_value'>

                            </span>
                        </div>
                        <div className='feedback_print_content_element'>
                            <span className='feedback_print_content_element_number'>
                                14.5
                            </span>
                            <span className='feedback_print_content_element_name'>
                                1.5 Качество медицинской помощи
                            </span>
                            <span className='feedback_print_content_element_value'>

                            </span>
                        </div>
                        <div className='feedback_print_content_element'>
                            <span className='feedback_print_content_element_number'>
                                14.6
                            </span>
                            <span className='feedback_print_content_element_name'>
                                1.6 Санитарное и техническое состояние лечебно-профилактического учреждения
                            </span>
                            <span className='feedback_print_content_element_value'>

                            </span>
                        </div>
                        <div className='feedback_print_content_element'>
                            <span className='feedback_print_content_element_number'>
                                14.7
                            </span>
                            <span className='feedback_print_content_element_name'>
                                1.7 Некачественное питание
                            </span>
                            <span className='feedback_print_content_element_value'>

                            </span>
                        </div>
                        <div className='feedback_print_content_element'>
                            <span className='feedback_print_content_element_number'>
                                14.8
                            </span>
                            <span className='feedback_print_content_element_name'>
                                1.8 Этика и деонтология медицинского
                            </span>
                            <span className='feedback_print_content_element_value'>

                            </span>
                        </div>
                        <div className='feedback_print_content_element'>
                            <span className='feedback_print_content_element_number'>
                                15
                            </span>
                            <span className='feedback_print_content_element_title'>
                                2. Взимание денежных средств
                            </span>
                        </div>
                        <div className='feedback_print_content_element'>
                            <span className='feedback_print_content_element_number'>
                                15.1
                            </span>
                            <span className='feedback_print_content_element_name'>
                                2.1 Взимание денежных средств за бесплатную медицинскую помощь, оказываемую в рамках
                            </span>
                            <span className='feedback_print_content_element_value'>

                            </span>
                        </div>
                        <div className='feedback_print_content_element'>
                            <span className='feedback_print_content_element_number'>
                                15.2
                            </span>
                            <span className='feedback_print_content_element_name'>
                                2.2 Нарушение порядка оказания платных услуг
                            </span>
                            <span className='feedback_print_content_element_value'>

                            </span>
                        </div>
                        <div className='feedback_print_content_element'>
                            <span className='feedback_print_content_element_number'>
                                15.3
                            </span>
                            <span className='feedback_print_content_element_name'>
                                2.3 Взимание денег без договора
                            </span>
                            <span className='feedback_print_content_element_value'>

                            </span>
                        </div>
                        <div className='feedback_print_content_element'>
                            <span className='feedback_print_content_element_number'>
                                16
                            </span>
                            <span className='feedback_print_content_element_title'>
                                3. Проблемы, связанные с лекарственным обеспечением
                            </span>
                        </div>
                        <div className='feedback_print_content_element'>
                            <span className='feedback_print_content_element_number'>
                                16.1
                            </span>
                            <span className='feedback_print_content_element_name'>
                                3.1 Проблемы связаны с работой ЛПУ
                            </span>
                            <span className='feedback_print_content_element_value'>

                            </span>
                        </div>
                        <div className='feedback_print_content_element'>
                            <span className='feedback_print_content_element_number'>
                                16.2
                            </span>
                            <span className='feedback_print_content_element_name'>
                                3.2 Проблемы связаны с работой аптеки
                            </span>
                            <span className='feedback_print_content_element_value'>

                            </span>
                        </div>
                        <div className='feedback_print_content_element'>
                            <span className='feedback_print_content_element_number'>
                                16.3
                            </span>
                            <span className='feedback_print_content_element_name'>
                                3.3 Проблемы связаны с регистром
                            </span>
                            <span className='feedback_print_content_element_value'>

                            </span>
                        </div>
                        <div className='feedback_print_content_element'>
                            <span className='feedback_print_content_element_number'>
                                17
                            </span>
                            <span className='feedback_print_content_element_title'>
                                4. Проблемы, связанные с доступностью медицинской помощи
                            </span>
                        </div>
                        <div className='feedback_print_content_element'>
                            <span className='feedback_print_content_element_number'>
                                17.1
                            </span>
                            <span className='feedback_print_content_element_name'>
                                4.1 Длительное ожидание оказания медицинской помощи
                            </span>
                            <span className='feedback_print_content_element_value'>

                            </span>
                        </div>
                        <div className='feedback_print_content_element'>
                            <span className='feedback_print_content_element_number'>
                                17.2
                            </span>
                            <span className='feedback_print_content_element_name'>
                                4.2 Отказ в оказании медицинской помощи
                            </span>
                            <span className='feedback_print_content_element_value'>

                            </span>
                        </div>
                        <div className='feedback_print_content_element'>
                            <span className='feedback_print_content_element_number'>
                                17.3
                            </span>
                            <span className='feedback_print_content_element_name'>
                                4.3 Отказ в госпитализации
                            </span>
                            <span className='feedback_print_content_element_value'>

                            </span>
                        </div>
                        <div className='feedback_print_content_element'>
                            <span className='feedback_print_content_element_number'>
                                17.4
                            </span>
                            <span className='feedback_print_content_element_name'>
                                4.4 Отказ в принятии вызовы бригады неотложной помощи
                            </span>
                            <span className='feedback_print_content_element_value'>

                            </span>
                        </div>
                        <div className='feedback_print_content_element'>
                            <span className='feedback_print_content_element_number'>
                                17.5
                            </span>
                            <span className='feedback_print_content_element_name'>
                                4.5 Невыполнение вызова врача на дом, выезда бригады скорой и неотложной помощи
                            </span>
                            <span className='feedback_print_content_element_value'>

                            </span>
                        </div>
                        <div className='feedback_print_content_element'>
                            <span className='feedback_print_content_element_number'>
                                17.6
                            </span>
                            <span className='feedback_print_content_element_name'>
                                4.6 Отсутствие талонов на прием к врачу
                            </span>
                            <span className='feedback_print_content_element_value'>

                            </span>
                        </div>
                        <div className='feedback_print_content_element'>
                            <span className='feedback_print_content_element_number'>
                                17.7
                            </span>
                            <span className='feedback_print_content_element_name'>
                                4.7 Доступность ЛПУ для инвалидов
                            </span>
                            <span className='feedback_print_content_element_value'>

                            </span>
                        </div>
                        <div className='feedback_print_content_element'>
                            <span className='feedback_print_content_element_number'>
                                18
                            </span>
                            <div className='feedback_print_content_element_receiv'>
                                <span className='feedback_print_content_element_receiv_title'>
                                    Содержание обращения
                                </span>
                                <p className='feedback_print_content_element_receiv_text'>
                                    {dataFeedbackPrint?.feedback}
                                </p>
                            </div>
                        </div>
                    </div>
                    <span className='feedback_print_accepted'>
                        Обращение принял(а): {dataFeedbackPrint?.operator}
                    </span>
                </div>
            </div>
        </div >
    )
}

export default FeedbackPrint