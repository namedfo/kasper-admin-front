//
import './ServiceBindingTable.css'




const ServiceBindingTable = ({ selectedDoctor }) => {

    console.log(selectedDoctor)




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
                {selectedDoctor && selectedDoctor.result && selectedDoctor.result.map(el => (
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

                                if (cell && cell.active) return '#5ba75b'
                            }

                            const getActiveCheckbox = () => {
                                if (cell && cell.active && cell.priority === 1) return true

                                if (cell && cell.active && cell.priority === 2) return true

                                if (cell && cell.active) return true
                            }

                            return (
                                <td key={index} style={{ backgroundColor: getBgColor() }} className='service_binding_table_td_with_cells'>
                                    <div className='service_binding_table_td_with_cells_header'>
                                        <input type="checkbox" checked={getActiveCheckbox()} />
                                    </div>
                                    <div
                                        className='service_binding_table_td_with_cells_footer'
                                    >
                                        <input
                                            value={cell?.duration}
                                            className='service_binding_table_td_input'
                                            type="number"
                                        />
                                        <span className='service_binding_table_td_divider'>|</span>
                                        <input
                                            value={cell?.min_age}
                                            className='service_binding_table_td_input'
                                            type="number"
                                        />
                                        <span className='service_binding_table_td_divider'>-</span>
                                        <input
                                            value={cell?.max_age}
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