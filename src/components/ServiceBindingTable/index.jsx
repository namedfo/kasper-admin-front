import { memo } from 'react'
// components
import ServiceBindingTableRow from '../ServiceBindingTableRow'
//
import './ServiceBindingTable.css'




const ServiceBindingTable = ({ selectedDoctor, setChangedData }) => {

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
                    {selectedDoctor.schedules && selectedDoctor.schedules.map(el => (
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
                {selectedDoctor.result && selectedDoctor.result.map((row, rowIndex) => (
                    <ServiceBindingTableRow
                        setChangedData={setChangedData}
                        row={row}
                        key={`${row.service_id}_${rowIndex}`}
                    />
                ))}
            </tbody>
        </table>
    )
}

export default memo(ServiceBindingTable)