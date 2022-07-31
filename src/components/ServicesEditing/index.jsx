import { useState } from 'react'
//
import ServiceEditingItem from '../ServiceEditingItem'
//
import './ServicesEditing.css'



const ServicesEditing = ({ defaultData }) => {

    const [filted, setFiltred] = useState('')

    const filtredItems = defaultData.filter((item) => {
        const commonSearchBy = `${item.code}${item.name}`
        return commonSearchBy.toLowerCase().includes(filted.toLowerCase())
    }); 


    return (
        <div className="services_editing">
            <div className='services_editing_header'>
                <h4 className='services_editing_header_title'>
                    Редактирование услуг
                </h4>
                    <input
                        className='services_editing_header_search'
                        value={filted} 
                        onChange={e => setFiltred(e.target.value)} 
                        placeholder='Search...' type="text" 
                    />
            </div>
            <div className='services_editing_content'>
                {filtredItems.map(item => (
                    <ServiceEditingItem key={item.id} {...item}  />
                ))}
            </div>
        </div>
    )
}

export default ServicesEditing