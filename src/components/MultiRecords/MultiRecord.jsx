import { MdRemoveCircleOutline } from 'react-icons/md'


const getItemStyle = (isDragging, draggableStyle) => ({
	// some basic styles to make the items look a bit nicer
	userSelect: "none",
	margin: `0 0 ${15}px 0`,

	...draggableStyle
});

const MultiRecord = ({
    onRemoveRecord,
    service,
    provided,
    snapshot
}) => {


    const getPrice = () => {
        if (service.minPrice === service.maxPrice) {
            return `${service.minPrice}₽`
        }

        return `${service.minPrice}₽ - ${service.maxPrice}₽`
    }
    return (
        <div
            ref={provided.innerRef}
            snapshot={snapshot}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={getItemStyle(
                snapshot.isDragging,
                provided.draggableProps.style
            )}
            className="p_main_multi_recording_footer_element"
        >
            <span>
                {service.serv_name}
            </span>
            <span className="p_main_multi_recording_footer_element_price">
                Стоимость: {getPrice()}
            </span>
            <div className='p_main_multi_recording_footer_element_footer'>
                <span>
                    Выбрано врачей: {service.selectedDoctors}
                </span>
                <button onClick={() => onRemoveRecord(service.code)} className='p_main_multi_recording_footer_element_footer_remove'>
                    <MdRemoveCircleOutline />
                </button>
            </div>
        </div>
    )
}


export default MultiRecord