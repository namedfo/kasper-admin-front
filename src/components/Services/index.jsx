import { useState } from 'react'
//
import ServicesItem from '../ServicesItem'
//
import './Services.css'



const Services = ({ defaultData }) => {

    const [filted, setFiltred] = useState('')

    const filtredItems = defaultData.filter((item) => {
        const commonSearchBy = `${item.code}${item.name}`
        return commonSearchBy.toLowerCase().includes(filted.toLowerCase())
    }); 


    return (
        <div className="services">
            <div className='services_header'>
                <h4 className='services_header_title'>
                    Редактирование услуг
                </h4>
                    <input
                        className='services_header_search'
                        value={filted} 
                        onChange={e => setFiltred(e.target.value)} 
                        placeholder='Search...' type="text" 
                    />
            </div>
            <div className='services_content'>
                {filtredItems.map(item => (
                    <ServicesItem key={item.id} {...item}  />
                ))}
            </div>
        </div>
    )
}

export default Services