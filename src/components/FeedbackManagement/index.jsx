import { useState } from 'react'
//
import { BsPrinter } from 'react-icons/bs'
//
import config from '../../config'
import routes from '../../routes'
//
import './FeedbackManagement.css'





const FeedbackManagement = ({ defaultData }) => {
    const [data, setData] = useState([...defaultData])


    const onHandleCloseAppeal = id => {
        config.api_host.post(routes.feedback_post, {
            entry_id: id
        }).then(r => {
            if (r.status === 200) {
                setData(prev => prev.map(el => {
                    if (el.entry_id === id) return { ...el, is_active: false }

                    return el
                }))
            }
        })
    }


    return (
        <div className='feedback_management'>
            <div className='feedback_management_header'>
                <h4 className='feedback_management_header_title'>
                    Управление обращениями граждан
                </h4>
            </div>
            <div className='feedback_management_content'>
                <table className='feedback_management_table'>
                    <thead className='feedback_management_thead'>
                        <tr className='feedback_management_tr'>
                            <th className='feedback_management_th'>ID</th>
                            <th className='feedback_management_th'>Дата</th>
                            <th className='feedback_management_th'>ФИО</th>
                            <th className='feedback_management_th'>Телефон</th>
                            <th className='feedback_management_th'>Действия</th>
                        </tr>
                    </thead>
                    <tbody className='feedback_management_tbody'>
                        {data.map(el => {
                            
                            function padTo2Digits(num) {
                                return num.toString().padStart(2, '0');
                              }

                            const date = new Date(el.created_at)
                            const newDate = `${padTo2Digits(date.getDate())}.${padTo2Digits(date.getMonth() + 1)}.${date.getFullYear()} ${padTo2Digits(date.getHours())}:${padTo2Digits(date.getMinutes())}:${padTo2Digits(date.getSeconds())}`
                            return (
                                <tr className='feedback_management_tr' key={el.entry_id}>
                                    <td className='feedback_management_td'>{el.entry_id}</td>
                                    <td className='feedback_management_td'>{newDate}</td>
                                    <td className='feedback_management_td'>{el.patient_name}</td>
                                    <td className='feedback_management_td'>{el.phone}</td>
                                    <td className='feedback_management_td feedback_management_content_table_actions'>
                                        <button
                                            onClick={() => onHandleCloseAppeal(el.entry_id)}
                                            className={`feedback_management_content_table_close ${!el.is_active && 'feedback_management_content_table_close_disabled'}`}
                                            disabled={!el.is_active}
                                        >
                                            {el.is_active ? 'Закрыть обращение' : 'Закрыто'}
                                        </button>
                                        <button
                                            className='feedback_management_content_table_printer'>
                                            <BsPrinter />
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}


export default FeedbackManagement