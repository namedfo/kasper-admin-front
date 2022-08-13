import { useState } from 'react'
//
import { BsPrinter } from 'react-icons/bs'
//
import { useNavigate } from 'react-router'
//
import config from '../../config'
import routes from '../../routes'
// utils
import padTo2Digits from '../../utils/padTo2Digits'
//
import './FeedbackManagement.css'





const FeedbackManagement = ({ defaultData }) => {
    const [data, setData] = useState([...defaultData])

    const navigate = useNavigate()


    const onHandleCloseAppeal = id => {
        config.api_host.post(routes.feedback_post, {
            id: id
        }).then(r => {
            if (r.status === 200) {
                setData(prev => prev.map(el => {
                    if (el.id === id) return { ...el, is_active: false }

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
                            <th className='feedback_management_th'>Дата создания</th>
                            <th className='feedback_management_th'>ФИО</th>
                            <th className='feedback_management_th'>Телефон</th>
                            <th className='feedback_management_th'>Действия</th>
                        </tr>
                    </thead>
                    <tbody className='feedback_management_tbody'>
                        {data.map(el => {
                            

                            const date = new Date(el.created_at * 1000)
                            const newDate = `${padTo2Digits(date.getDate())}.${padTo2Digits(date.getMonth() + 1)}.${date.getFullYear()} ${padTo2Digits(date.getHours())}:${padTo2Digits(date.getMinutes())}:${padTo2Digits(date.getSeconds())}`
                            return (
                                <tr className='feedback_management_tr' key={el.id}>
                                    <td className='feedback_management_td'>{el.id}</td>
                                    <td className='feedback_management_td'>{newDate}</td>
                                    <td className='feedback_management_td'>{el.full_name}</td>
                                    <td className='feedback_management_td'>{el.phone}</td>
                                    <td className='feedback_management_td feedback_management_content_table_actions'>
                                        <button
                                            onClick={() => onHandleCloseAppeal(el.id)}
                                            className={`feedback_management_content_table_close ${!el.is_active && 'feedback_management_content_table_close_disabled'}`}
                                            disabled={!el.is_active}
                                        >
                                            {el.is_active ? 'Закрыть обращение' : 'Закрыто'}
                                        </button>
                                        <button
                                            onClick={() => navigate(`/feedback-print/${el.id}`)}
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