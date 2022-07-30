import { type } from '@testing-library/user-event/dist/type';
import { useState } from 'react';
//
import Select from 'react-select';
//
import config from '../../config'
import routes from '../../routes'
import ServiceBindingTable from '../ServiceBindingTable';
//
import './ServiceBinding.css'




const ServiceBinding = ({ defaultData }) => {
    const [selectedOption, setSelectedOption] = useState(null);

    const [selectedDoctor, setSelectedDoctor] = useState(null)


    const data = defaultData.map(el => ({
        value: el.id,
        label: el.name
    }))

    const getSelectedDoctor = id => {
        setSelectedDoctor({})
        config.api_host.get(`${routes.doctor}?id=${id}`).then(r => {
            let finalResult = {}

            console.log(r)

            r.data.services.forEach(service => {
                finalResult[service.service_id] = {
                    service_id: service.service_id,
                    name: service.name,
                    cells: {}
                }

                r.data.schedules.forEach(schedule => {
                    finalResult[service.service_id].cells[schedule.schedule_id] = null
                })
            })

            r.data.services.forEach(service => {
                finalResult[service.service_id].cells[service.schedule_id] = service
            })


            let resultInArray = []
            for (let [key, value] of Object.entries(finalResult)) {
                resultInArray = [...resultInArray, value]
            }


            const resultWithCells = resultInArray.map(e => {

                let resultCells = []
                for (let [key, value] of Object.entries(e.cells)) {
                    resultCells = [...resultCells, value]
                }

                return {
                    ...e,
                    cells: resultCells
                }
            })

            resultWithCells.map(e => {
                r.data.default_schedules.forEach(i => {
                    if (i.service_id === e.service_id) {
                        return {
                            cells: e.cells.unshift(i)
                        }
                    } else {
                        return {
                            ...e,
                            cells: e.cells.unshift(null)
                        }
                    }
                })
            })
            

            setSelectedDoctor({
                services: r.data.services,
                schedules: r.data.schedules,
                result: resultWithCells
            })

        })
    }



    const onHandleSelectedOption = selected => {
        setSelectedOption(selected)

        getSelectedDoctor(selected.value)
    }

    const onUpdateSelectedDoctor = () => {
        getSelectedDoctor(selectedDoctor.value)
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
                        <button
                            onClick={onUpdateSelectedDoctor}
                            className='service_binding_content_doctors_btn_update'
                        >
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
                    {selectedDoctor
                        ? <ServiceBindingTable selectedDoctor={selectedDoctor} />
                        : (
                            <span>
                                Select doctor
                            </span>
                        )
                    }
                    {/* <table className='service_binding_table'>
                        <thead className='service_binding_thead'>
                            <tr>
                                <th className='service_binding_wrapper_th'>
                                    <div className='service_binding_th'>
                                        <span>Услуги</span>
                                    </div>
                                </th>
                                <th className='service_binding_wrapper_th'>
                                    <div className='service_binding_th'>
                                        <span>Для всех</span>
                                        <div className='service_binding_th_inputs_v1'>
                                            <input className='service_binding_th_input' type="number" />
                                            <span>-</span>
                                            <input className='service_binding_th_input' type="number" />
                                        </div>
                                    </div>
                                </th>
                                {selectedDoctor.schedules.map(el => (
                                    <th key={el.schedule_id} className='service_binding_wrapper_th'>
                                        <div className='service_binding_th'>
                                            <span>{el.place_name}</span>
                                            <div className='service_binding_th_inputs_v1'>
                                                <input className='service_binding_th_input' type="number" />
                                                <span>-</span>
                                                <input className='service_binding_th_input' type="number" />
                                            </div>
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className='service_binding_tbody'>
                            {selectedDoctor.services.map(el => (
                                <tr className='service_binding_tr'>
                                    <td className='service_binding_td service_binding_td_one'>
                                        {el.real_name}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table> */}
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