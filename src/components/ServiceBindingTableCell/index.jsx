//
import { useState, memo } from 'react'
//
import _isEqual from 'lodash/isEqual'
import _remove from 'lodash/remove'
import _isEmpty from 'lodash/isEmpty'
//
import { AiOutlineCloseCircle } from 'react-icons/ai'
//
import config from '../../config'
import routes from '../../routes'
//
import './ServiceBindingTableCell.css'



const ServiceBindingTableCell = ({ cell, cellIndex, setChangedData }) => {

    const [newCell, setNewCell] = useState(cell)


    const getIsChanged = () => _isEqual(newCell, cell)



    const getBgColor = () => {
        if (_isEmpty(newCell)) return 'white'

        if (!getIsChanged()) {
            return '#ff9800'
        } else {
            if (newCell && newCell.active && newCell.priority === 1) return '#5ba75b'

            if (newCell && newCell.active && newCell.priority === 2) return '#90a7fc'

            if (newCell && !newCell.active) return '#ffa2a2'

            if (newCell && cellIndex === 0) return '#90a7fc'
        }
    }


    const onChange = (type, value) => {
        setNewCell(prev => ({
            ...prev,
            [type]: typeof value === Boolean ? value : +value
        }))

        const newCellLocal = {
            ...newCell,
            [type]: typeof value === Boolean ? value : +value
        }

        setChangedData(prev => {
            if (prev.length > 0) {

                _remove(prev, (item) => item.service_id === newCell.service_id && item.schedule_id === newCell.schedule_id)


                return [...prev, newCellLocal]
            } else {
                return [newCellLocal]
            }
        })
    }


    const onHandleRemove = (schedule_id, service_id) => {
        config.api_host.post(routes.service_by_schedule_remove, {
            schedule_id: schedule_id,
            service_id: service_id
        }).then(r => {
            if (r.status === 200) {
                setNewCell(null)

                setChangedData(prev => {

                    _remove(prev, (item) => item.service_id === newCell.service_id && item.schedule_id === newCell.schedule_id)


                    return prev
                })
            }
        })
    }

    const getRemove = () => {
        const btnRemove = <AiOutlineCloseCircle
            size={20}
            onClick={() => onHandleRemove(cell.schedule_id, cell.service_id)}
            className="service_binding_table_cell_header_btn_remove"
        />

        if (!_isEmpty(newCell) && newCell.active && newCell.priority === 1) return btnRemove

        if (!_isEmpty(newCell) && !newCell.active) return btnRemove
    }


    return (
        <td
            className='service_binding_table_cell'
            style={{ backgroundColor: getBgColor() }}
        >
            <div className='service_binding_table_cell_header'>
                <input checked={newCell && newCell.active ? newCell.active : false} onChange={e => onChange('active', e.currentTarget.checked)} type="checkbox" />
                {getRemove()}
            </div>
            <div className='service_binding_table_cell_content'>
                <input
                    value={newCell?.duration ?? ''}
                    onChange={e => onChange('duration', e.target.value)}
                    className='service_binding_table_cell_content_input'
                    type="text"
                />
                <span
                    className='service_binding_table_cell_content_divider'
                >
                    |
                </span>
                <input
                    value={newCell?.min_age ?? ''}
                    onChange={e => onChange('min_age', e.target.value)}
                    className='service_binding_table_cell_content_input'
                    type="text"
                />
                <span
                    className='service_binding_table_cell_content_divider'
                >
                    -
                </span>
                <input
                    value={newCell?.max_age ?? ''}
                    onChange={e => onChange('max_age', e.target.value)}
                    className='service_binding_table_cell_content_input'
                    type="text"
                />
            </div>
        </td>
    )
}

export default memo(ServiceBindingTableCell)