import { useCallback, useState } from 'react';
//
import { useFormik } from 'formik';
//
import Switch from "react-switch";
//
import _debounce from 'lodash/debounce';
//
import routes from '../../routes';
import config from '../../config';
//
import './ExceptionalEventsItem.css'


const ExceptionalEventsItem = ({ id, name, tags, type }) => {
    const [defaultData, setDefaultData] = useState({ name, tags, type })

    const [isSave, setIsSave] = useState(false)


    const handleDebounceFn = (value) => {
        const newValue = value.split(',').map(e => e.trim())
        config.api_host.post(routes.set_tags, {
            event_id: id,
            tags: newValue
        }).then(r => {
            if (r.status === 200) {
                setIsSave(true)
            }
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debounceFn = useCallback(_debounce(handleDebounceFn, 1000), [])

    


    const formik = useFormik({
        initialValues: {
            tags: defaultData.tags ? defaultData.tags.join(', ') : '',
            type: defaultData.type
        },
        onSubmit: values => {
            debounceFn(values.tags)
        },
    });

    const onChangeType = checked => {

        const newType = checked && 1 || !checked && 0

        config.api_host.post(routes.set_type, {
            event_id: id,
            type: newType
        }).then(r => {
            if (r.status === 200) {
                setDefaultData(prev => ({ ...prev, type: newType }))
            }
        })
    }

    return (
        <div className="exceptional_events_item">
            <div className="exceptional_events_item_mis">
                {name}
            </div>
            <form onSubmit={formik.handleSubmit} className='exceptional_events_item_form'>
                <div className="exceptional_events_item_kasper">
                    <input
                        id="tags"
                        name="tags"
                        value={formik.values.tags}
                        onChange={formik.handleChange}
                        onKeyUp={formik.submitForm}
                        type="text"
                        style={{ backgroundColor: isSave && '#3EB53E' }}
                        className="exceptional_events_item_kasper_input"
                    />
                </div>
                <div className="exceptional_events_item_access">
                    {/* <input
                        id="type"
                        name="type"
                        value={formik.values.type}
                        onChange={formik.handleChange}
                        onKeyUp={formik.submitForm}
                        type="text"
                        className="exceptional_events_item_access_input"
                    /> */}
                    <Switch onChange={onChangeType} checked={defaultData.type === 1}  />
                </div>
            </form>
        </div>
    )
}

export default ExceptionalEventsItem