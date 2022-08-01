import { useState } from 'react'
// components
import ServiceBindingTableRow from '../ServiceBindingTableRow'
//
import './ServiceBindingTable.css'




const ServiceBindingTable = ({ selectedDoctor, setChangedData }) => {
    const [data, setData] = useState({
        staticData: selectedDoctor && selectedDoctor.resultInArrayWithArrayCells,
        schedules: selectedDoctor && selectedDoctor.schedules
    })

    // const onChangeData = (indexUpper, indexLower, type, value, cell) => {
    //     console.log(data.previousData[indexUpper].cells[indexLower])
    //     setData(prev => {
    //         return {
    //             ...prev,
    //             previousData: [
    //                 ...prev.previousData,
    //                 prev.previousData[indexUpper] = {
    //                     ...prev.previousData[indexUpper],
    //                     cells: [
    //                         ...prev.previousData[indexUpper].cells,
    //                         prev.previousData[indexUpper].cells[indexLower] = {
    //                             ...prev.previousData[indexUpper].cells[indexLower],
    //                             [type]: value
    //                         } 
    //                     ]
    //                 }
    //             ]

    //         }
    //     })
    // }


    // const onChangeData = (service_id, schedule_id, value, type, cell) => {
    //     setData(prev => {

    //         let newNextData = [ ...prev.nextData ]

    //         const newCell = {
    //             ...cell,
    //             [type]: typeof value !== Boolean ? Number(value) : value
    //         }

    //         if (newNextData.length > 0) {
    //             newNextData.forEach((el, index) => {
    //                 if (el.service_id === service_id && el.schedule_id === schedule_id) {
    //                     newNextData[index] = newCell
    //                 } else {
    //                     newNextData = [ ...newNextData, newCell ]
    //                 }
    //             })
    //         } else {
    //             newNextData = [ newCell ]
    //         }

    //         return {
    //             ...prev,
    //             previousData: {
    //                 ...prev.previousData,
    //                 [service_id]: {
    //                     ...prev.previousData[service_id],
    //                     cells: {
    //                         ...prev.previousData[service_id].cells,
    //                         [schedule_id]: {
    //                             ...prev.previousData[service_id].cells[schedule_id],
    //                             [type]: value
    //                         }
    //                     }
    //                 }
    //             },
    //             nextData: newNextData
    //         }
    //     })
    // }

    // const onHandleRemove = (schedule_id, service_id) => {
    //     config.api_host.post(routes.service_by_schedule_remove, {
    //         schedule_id: schedule_id,
    //         service_id: service_id
    //     }).then(r => r.status === 200 && onUpdateSelectedDoctor())
    // }


    // const onHandleSave = () => {
    //     data.nextData.forEach(el => {
    //         console.log(el)
    //         config.api_host.post(routes.service_by_schedule_save, {
    //             schedule_id: el.schedule_id,
    //             service_id: el.service_id,
    //             min_age: el.min_age,
    //             max_age: el.max_age
    //         })
    //     })
    // }


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
                    {data && data.schedules && data.schedules.map(el => (
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
                {data && data.staticData && data.staticData.map((row, rowIndex) => (
                    <ServiceBindingTableRow
                        setChangedData={setChangedData}
                        row={row}
                        key={`${row.service_id}_${rowIndex}`}
                    />
                ))}
                {/* {data && data.staticData && data.staticData.map((el, indexUpper) => (
                    <tr
                        className='service_binding_table_tr'
                        key={el.service_id}
                    >
                        <td className='service_binding_table_td_first'>
                            {el.name}
                        </td>
                        {el.cells.map((cell, indexLower) => {

                            const getBgColor = () => {
                                if (cell && cell.active && cell.priority === 1) return '#5ba75b'

                                if (cell && cell.active && cell.priority === 2) return '#90a7fc'

                                if (cell && !cell.active) return '#ffa2a2'

                                if (cell && indexLower === 0) return '#90a7fc'
                            }

                            const getActiveCheckbox = () => {
                                if (cell && cell.active && cell.priority === 1) return true

                                if (cell && cell.active && cell.priority === 2) return true

                                if (cell && indexLower === 0) return true
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
                                <td key={indexLower} style={{ backgroundColor: getBgColor() }} className='service_binding_table_td_with_cells'>
                                    <div className='service_binding_table_td_with_cells_header'>
                                        <input type="checkbox" checked={getActiveCheckbox()} />
                                        {getRemove()}
                                    </div>
                                    <div
                                        className='service_binding_table_td_with_cells_footer'
                                    >
                                        <input
                                            value={cell ? cell.duration : ''}
                                            onChange={e => onChangeData(indexUpper, indexLower, 'duration', e.target.value, cell)}
                                            onChange={e => onChangeData(el.service_id, cell.schedule_id, e.target.value, 'duration', cell)}
                                            value={cell && data.previousData[el.service_id].cells[cell.schedule_id]?.duration}
                                            className='service_binding_table_td_input'
                                            type="number"
                                        />
                                        <span className='service_binding_table_td_divider'>|</span>
                                        <input
                                            value={cell ? cell.min_age : ''}
                                            onChange={e => onChangeData(indexUpper, indexLower, 'min_age', e.target.value, cell)}
                                            onChange={e => onChangeData(el.service_id, cell.schedule_id, e.target.value, 'min_age', cell)}
                                            value={cell && data.previousData[el.service_id].cells[cell.schedule_id]?.min_age}
                                            className='service_binding_table_td_input'
                                            type="number"
                                        />
                                        <span className='service_binding_table_td_divider'>-</span>
                                        <input
                                            value={cell ? cell.max_age : ''}
                                            onChange={e => onChangeData(indexUpper, indexLower, 'max_age', e.target.value, cell)}
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
                ))} */}
            </tbody>
        </table>
    )
}

export default ServiceBindingTable