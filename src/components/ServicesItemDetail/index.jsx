
import { useFormik } from "formik";
import { useState } from "react";
//
import { BsQuestion } from 'react-icons/bs'
//
import config from "../../config";
import routes from "../../routes";
//
import './ServicesItemDetail.css'


const ServicesItemDetail = ({ setDetailInfo, detailInfo }) => {

    const [isPopover, setIsPopover] = useState(false)


    const formik = useFormik({
        initialValues: { ...detailInfo },
        onSubmit: values => {
            config.api_host.post(routes.post, JSON.stringify(values, null, 2)).then(r => {
                if (r.status === 200) {
                    setDetailInfo(false)
                }
            })
        },
    });

    return (
        <form
            onSubmit={formik.handleSubmit}
            className='services_item_detail'
        >
            <div className='services_item_detail_input'>
                <div className="services_item_detail_input_name">
                    <span>id</span>
                </div>
                <input
                    className="services_item_detail_input_input"
                    id="id"
                    name="id"
                    type="number"
                    value={formik.values.id}
                    onChange={formik.handleChange}
                    cols='30'
                    disabled={true}
                    rows="4"
                />
            </div>
            <div className='services_item_detail_input'>
                <div className="services_item_detail_input_name">
                    <span>group_id</span>
                </div>
                <input
                    className="services_item_detail_input_input"
                    id="group_id"
                    name="group_id"
                    type="number"
                    onChange={formik.handleChange}
                    value={formik.values.group_id}
                    cols='30'
                    rows="4"
                />
            </div>
            <div className='services_item_detail_input'>
                <div className="services_item_detail_input_name">
                    <span>code</span>
                </div>
                <input
                    className="services_item_detail_input_input"
                    id="code"
                    name="code"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.code}
                    cols='30'
                    rows="4"
                />
            </div>
            <div className='services_item_detail_input'>
                <div className="services_item_detail_input_name">
                    <span>real_name</span>
                </div>
                <textarea
                    className="services_item_detail_input_input"
                    id="real_name"
                    name="real_name"
                    disabled={true}
                    type="text"
                    value={formik.values.real_name}
                    onChange={formik.handleChange}
                    cols='30'
                    rows="4"
                />
            </div>
            <div className='services_item_detail_input'>
                <div className="services_item_detail_input_name">
                    <span>name</span>
                </div>
                <textarea
                    className="services_item_detail_input_input"
                    id="name"
                    name="name"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    cols='30'
                    rows="4"
                />
            </div>
            <div className='services_item_detail_input'>
                <div className="services_item_detail_input_name">
                    <span>description</span>
                    <div style={{ position: 'relative' }}>
                        {isPopover && (
                            <div className="services_item_detail_input_popover">
                                <p>{`{{Код Услуги}}`} - Ссылка на услугу</p>
                                <p>[[http://yandex.ru|яндекс]] - Ссылка</p>
                                <p>__Текст__ - <i>Наклонный текст</i></p>
                                <p>**Текст** - <b>Жирный текст</b></p>
                                <p>\ - Разрыв строки</p>
                                <p>---- - Горизонтальная линия</p>
                            </div>
                        )}
                        <span 
                            onMouseLeave={() => setIsPopover(false)}
                            onMouseEnter={() => setIsPopover(true)} className="services_item_detail_input_popover_start">
                            <BsQuestion size={24} />
                        </span>
                    </div>
                </div>
                <textarea
                    className="services_item_detail_input_input"
                    id="description"
                    name="description"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.description}
                    cols='30'
                    rows="4"
                />
            </div>
            <div className='services_item_detail_input'>
                <div className="services_item_detail_input_name">
                    <span>contrain</span>
                </div>
                <textarea
                    className="services_item_detail_input_input"
                    id="contrain"
                    name="contrain"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.contrain}
                    cols='30'
                    rows="4"
                />
            </div>
            <div className='services_item_detail_input'>
                <div className="services_item_detail_input_name">
                    <span>synonym</span>
                </div>
                <textarea
                    className="services_item_detail_input_input"
                    id="synonym"
                    name="synonym"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.synonym}
                    cols='30'
                    rows="4"
                />
            </div>
            <input
                className="services_item_detail_input_save"
                type="submit"
                value='Save All'
            />
        </form>
    )
}

export default ServicesItemDetail