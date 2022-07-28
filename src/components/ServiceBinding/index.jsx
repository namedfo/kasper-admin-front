import { useState } from 'react';
//
import Select from 'react-select';
//
import config from '../../config'
import routes from '../../routes'
//
import './ServiceBinding.css'




const ServiceBinding = ({ defaultData }) => {
    const [selectedOption, setSelectedOption] = useState(null);

    const [selectedDoctor, setSelectedDoctor] = useState(null)


    const data = defaultData.map(el => ({
        value: el.id,
        label: el.name
    }))



    const onHandleSelectedOption = selected => {
        setSelectedOption(selected)

        console.log(selected)

        config.api_host.get(`${routes.doctor}?id=${selected.value}`).then(r => {
            console.log(r)
            setSelectedDoctor(r.data)
        })
    }




    return (
        <div className='service_binding'>
            <div className='service_binding_header'>
                <h4 className='service_binding_header_title'>
                    Привязка услуг
                </h4>
            </div>
            <div className='service_binding_content'>
                <div className='service_binding_content_doctors'>
                    <span className='service_binding_content_doctors_title'>
                        Заполнение услуг для врача: <b>{selectedOption?.label || '...'}</b>
                    </span>
                    <div style={{ display: 'flex', flexDirection: ' row' }}>
                        <div style={{ width: '100%' }}>
                            <Select
                                styles={{
                                    width: '100%'
                                }}
                                defaultValue={selectedOption}
                                onChange={onHandleSelectedOption}
                                options={data}
                            />
                        </div>
                        <button className='service_binding_content_doctors_btn_update'>
                            Обновить
                        </button>
                    </div>
                </div>
                <div className='service_binding_content_divider' />
                <div className='service_binding_content_wrapper_info'>
                    <div className='service_binding_content_info'>
                        <div className='service_binding_content_info_el'>
                            <div
                                style={{
                                    border: '1px solid black',
                                    borderRadius: '5px',
                                    width: '20px',
                                    height: '20px',
                                    backgroundColor: '#5ba75b',
                                    marginRight: '2px'
                                }}
                            />
                            Самостоятельное расписание
                        </div>
                        <div className='service_binding_content_info_el'>
                            <div
                                style={{
                                    border: '1px solid black',
                                    borderRadius: '5px',
                                    width: '20px',
                                    height: '20px',
                                    backgroundColor: '#90a7fc',
                                    marginRight: '2px'
                                }}
                            />
                            Наследуется
                        </div>
                        <div className='service_binding_content_info_el'>
                            <div
                                style={{
                                    border: '1px solid black',
                                    borderRadius: '5px',
                                    width: '20px',
                                    height: '20px',
                                    backgroundColor: '#ffa2a2',
                                    marginRight: '2px'
                                }}
                            />
                            Выключено
                        </div>
                        <div className='service_binding_content_info_el'>
                            <div
                                style={{
                                    border: '1px solid black',
                                    borderRadius: '5px',
                                    width: '20px',
                                    height: '20px',
                                    backgroundColor: '#ff9800',
                                    marginRight: '2px'
                                }}
                            />
                            Не сохранено
                        </div>
                        <div className='service_binding_content_info_el'>
                            <div
                                style={{
                                    border: '1px solid black',
                                    borderRadius: '5px',
                                    width: '20px',
                                    height: '20px',
                                    backgroundColor: 'white',
                                    marginRight: '2px'
                                }}
                            />
                            Не настроено
                        </div>
                    </div>
                    <button className='service_binding_content_info_btn_save'>
                        Сохранить
                    </button>
                </div>
                <div className='service_binding_content_wrapper_table'>
                    <table className='service_binding_table'>
                        <thead className='service_binding_thead'>
                            <tr>
                                <th className='service_binding_th'>
                                    ID
                                </th>
                                <th className='service_binding_th'>
                                    ID
                                </th> 
                                <th className='service_binding_th'>
                                    ID
                                </th> 
                                <th className='service_binding_th'>
                                    ID
                                </th>
                                <th className='service_binding_th'>
                                    ID
                                </th>
                                <th className='service_binding_th'>
                                
                                </th>
                                <th className='service_binding_th'>
                                    ID
                                </th>
                                <th className='service_binding_th'>
                                    ID
                                </th>
                                <th className='service_binding_th'>
                                    ID
                                </th>
                                <th className='service_binding_th'>
                                    ID
                                </th>
                            </tr>
                        </thead>
                        <tbody className='service_binding_tbody'>
                            <tr className='service_binding_tr'>
                                <td className='service_binding_td service_binding_td_one'>
                                    1
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

{/* <table>
<thead>
    <tr>
        <th>ID</th>
        <th>Дата</th>
        <th>ФИО</th>
        <th>Телефон</th>
        <th>Действия</th>
    </tr>
</thead>
<tbody>
    {data.map(el => {
        
        function padTo2Digits(num) {
            return num.toString().padStart(2, '0');
          }

        const date = new Date(el.created_at)
        const newDate = `${padTo2Digits(date.getDate())}.${padTo2Digits(date.getMonth() + 1)}.${date.getFullYear()} ${padTo2Digits(date.getHours())}:${padTo2Digits(date.getMinutes())}:${padTo2Digits(date.getSeconds())}`
        return (
            <tr key={el.entry_id}>
                <td>{el.entry_id}</td>
                <td>{newDate}</td>
                <td>{el.patient_name}</td>
                <td>{el.phone}</td>
                <td className='feedback_management_content_table_actions'>
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
</table> */}
export default ServiceBinding