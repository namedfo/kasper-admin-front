//
import './ServiceBindingTable.css'




const ServiceBindingTable = ({ selectedDoctor }) => {
    console.log(selectedDoctor)
    // const cells = selectedDoctor.schedules.map()



    // const getSquares = () => {
    //     return selectedDoctor.services.map(service => {
    //         return selectedDoctor.schedules.find(schedule => {
    //             if (schedule.schedule_id === service.schedule_id) return schedule
    //         })
    //     })
    // }
    // console.log(getSquares())

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
                    {selectedDoctor.schedules.map(el => (
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
                {selectedDoctor.services.map(el => (
                    <tr
                        className='service_binding_table_tr'
                        key={`${el.service_id}_${el.schedule_id}`}
                    >
                        <td className='service_binding_table_td_first'>
                            {el.real_name}
                        </td>
                        <td className='service_binding_table_td_with_cells'>
                            <div className='service_binding_table_td_with_cells_header'>
                                <input type="checkbox" />
                            </div>
                            <div
                                className='service_binding_table_td_with_cells_footer'
                            >
                                <input
                                    className='service_binding_table_td_input'
                                    type="number"
                                />
                                <span className='service_binding_table_td_divider'>|</span>
                                <input
                                    className='service_binding_table_td_input'
                                    type="number"
                                />
                                <span className='service_binding_table_td_divider'>-</span>
                                <input
                                    className='service_binding_table_td_input'
                                    type="number"
                                />
                            </div>
                        </td>
                        {selectedDoctor.schedules.map(i => {
                            const getBgColor = () => {
                                if (i.schedule_id === el.schedule_id) {
                                    if (el.active) {
                                        return '#5ba75b'
                                    } else {
                                        return '#ffa2a2'
                                    }
                                }
                            }
                            return (
                                <td key={i.schedule_id} style={{backgroundColor: getBgColor()}} className='service_binding_table_td_with_cells'>
                                    <div className='service_binding_table_td_with_cells_header'>
                                        <input checked={el.active && i.schedule_id === el.schedule_id} type="checkbox" />
                                    </div>
                                    <div
                                        className='service_binding_table_td_with_cells_footer'
                                    >
                                        <input
                                            value={el.duration}
                                            className='service_binding_table_td_input'
                                            type="number"
                                        />
                                        <span className='service_binding_table_td_divider'>|</span>
                                        <input
                                            className='service_binding_table_td_input'
                                            type="number"
                                        />
                                        <span className='service_binding_table_td_divider'>-</span>
                                        <input
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