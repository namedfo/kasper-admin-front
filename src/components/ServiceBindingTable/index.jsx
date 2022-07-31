import { useState } from 'react'
//
import { AiOutlineCloseCircle } from 'react-icons/ai'
//
import routes from '../../routes'
import config from '../../config'
//
import './ServiceBindingTable.css'




const ServiceBindingTable = ({ selectedDoctor, onUpdateSelectedDoctor }) => {
    const [result, setResult] = useState(selectedDoctor && selectedDoctor.resultWithCells)
    const [data, setData] = useState({
        previousData: selectedDoctor && selectedDoctor.finalResult,
        nextData: []
    })


    const onChangeData = (service_id, schedule_id, value, type, cell) => {
        setData(prev => {

            const newNextData = prev.nextData.map(el => {
                if (el) {

                } else {
                    
                }
            })

            return {
                ...prev,
                previousData: {
                    ...prev.previousData,
                    [service_id]: {
                        ...prev.previousData[service_id],
                        cells: {
                            ...prev.previousData[service_id].cells,
                            [schedule_id]: {
                                ...prev.previousData[service_id].cells[schedule_id],
                                [type]: value
                            }
                        }
                    }
                },
                nextData: newNextData
            }
        })
    }

    const onHandleRemove = (schedule_id, service_id) => {
        config.api_host.post(routes.service_by_schedule_remove, {
            schedule_id: schedule_id,
            service_id: service_id
        }).then(r => r.status === 200 && onUpdateSelectedDoctor())
    }


    return (
        <table className='service_binding_table'>
            <thead className='service_binding_table_thead'>
                <tr className='service_binding_table_tr'>
                    <th className='service_binding_table_th'>
                        <div className='service_binding_table_inner_th'>
                            <span>Услуги</span>
                        </div>
                    </th>
                    <th className='service_binding_table_th'>
                        <div className='service_binding_table_inner_th'>
                            <span>Для всех</span>
                            <div className='service_binding_table_inner_th_inputs'>
                                <input className='service_binding_table_inner_th_input' type="number" />
                                <span className='service_binding_table_inner_th_divider'>|</span>
                                <input className='service_binding_table_inner_th_input' type="number" />
                                <span className='service_binding_table_inner_th_divider'>-</span>
                                <input className='service_binding_table_inner_th_input' type="number" />
                            </div>
                        </div>
                    </th>
                    {selectedDoctor && selectedDoctor.schedules && selectedDoctor.schedules.map(el => (
                        <th key={el.schedule_id} className='service_binding_table_th'>
                            <div className='service_binding_table_inner_th'>
                                <span>{el.place_name}</span>
                                <div className='service_binding_table_inner_th_inputs'>
                                    <input className='service_binding_table_inner_th_input' type="number" />
                                    <span className='service_binding_table_inner_th_divider'>|</span>
                                    <input className='service_binding_table_inner_th_input' type="number" />
                                    <span className='service_binding_table_inner_th_divider'>-</span>
                                    <input className='service_binding_table_inner_th_input' type="number" />
                                </div>
                            </div>
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody className='service_binding_table_tbody'>
                {result && result.map(el => (
                    <tr
                        className='service_binding_table_tr'
                        key={el.service_id}
                    >
                        <td className='service_binding_table_td_first'>
                            {el.name}
                        </td>
                        {el.cells.map((cell, index) => {

                            const getBgColor = () => {
                                if (cell && cell.active && cell.priority === 1) return '#5ba75b'

                                if (cell && cell.active && cell.priority === 2) return '#90a7fc'

                                if (cell && !cell.active) return '#ffa2a2'

                                if (cell && index === 0) return '#90a7fc'
                            }

                            const getActiveCheckbox = () => {
                                if (cell && cell.active && cell.priority === 1) return true

                                if (cell && cell.active && cell.priority === 2) return true

                                if (cell && index === 0) return true
                            }

                            const getRemove = () => {
                                const btnRemove = <AiOutlineCloseCircle
                                    size={20}
                                    onClick={() => onHandleRemove(cell.schedule_id, cell.service_id)}
                                    className="service_binding_table_td_with_cells_header_remove"
                                />

                                if (cell && cell.active && cell.priority === 1) return btnRemove

                                if (cell && !cell.active) return btnRemove
                            }
                            return (
                                <td key={index} style={{ backgroundColor: getBgColor() }} className='service_binding_table_td_with_cells'>
                                    <div className='service_binding_table_td_with_cells_header'>
                                        {/* <input type="checkbox" checked={getActiveCheckbox()} /> */}
                                        {getRemove()}
                                    </div>
                                    <div
                                        className='service_binding_table_td_with_cells_footer'
                                    >
                                        <input
                                            onChange={e => onChangeData(el.service_id, cell.schedule_id, e.target.value, 'duration', cell)}
                                            value={cell && data.previousData[el.service_id].cells[cell.schedule_id]?.duration}
                                            className='service_binding_table_td_input'
                                            type="number"
                                        />
                                        <span className='service_binding_table_td_divider'>|</span>
                                        <input
                                            onChange={e => onChangeData(el.service_id, cell.schedule_id, e.target.value, 'min_age', cell)}
                                            value={cell && data.previousData[el.service_id].cells[cell.schedule_id]?.min_age}
                                            className='service_binding_table_td_input'
                                            type="number"
                                        />
                                        <span className='service_binding_table_td_divider'>-</span>
                                        <input
                                            onChange={e => onChangeData(el.service_id, cell.schedule_id, e.target.value, 'max_age', cell)}
                                            value={cell && data.previousData[el.service_id].cells[cell.schedule_id]?.max_age}
                                            className='service_binding_table_td_input'
                                            type="number"
                                        />
                                    </div>
                                </td>
                            )
                        })}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default ServiceBindingTable