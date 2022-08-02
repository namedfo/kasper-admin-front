import { memo } from 'react'
// components
import ServiceBindingTableCell from '../ServiceBindingTableCell'
//
import './ServiceBindingTableRow.css'



const ServiceBindingTableRow = ({ row, setChangedData }) => {



    return (
        <tr
            className='service_binding_table_row'
        >
            <td className='service_binding_table_row_cell_static'>
                {row.name}
            </td>
            {row.cells.map((cell, cellIndex) => (
                <ServiceBindingTableCell
                    setChangedData={setChangedData}
                    cell={cell}
                    cellIndex={cellIndex}
                    key={cellIndex}
                />
            ))}
        </tr>
    )
}


export default memo(ServiceBindingTableRow)