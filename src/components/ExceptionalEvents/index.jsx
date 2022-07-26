//
import ExceptionalEventsItem from '../ExceptionalEventsItem'
import './ExceptionalEvents.css'


const ExceptionalEvents = ({ defaultData }) => {
    return (
        <div className='exceptional_events'>
            <div className='exceptional_events_header'>
                <h4 className='exceptional_events_header_title'>
                    Настройки исключительных событий
                </h4>
            </div>
            <div className='exceptional_events_content'>
                <div className='exceptional_events_content_title'>
                    <b className='exceptional_events_content_title_mis'>
                        Название резерва МИС
                    </b>
                    <b className='exceptional_events_content_title_kasper'>
                        Название резерва Каспер
                    </b>
                </div>
                {defaultData.map(el => (
                    <ExceptionalEventsItem key={el.id} { ...el } />
                ))}
            </div>
        </div>
    )
}

export default ExceptionalEvents