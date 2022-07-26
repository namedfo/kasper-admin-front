import { useEffect, useState } from 'react'
//
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import ExceptionalEvents from '../../components/ExceptionalEvents'
//
import PageContainer from '../../Layouts/PageContainer'
//
import './PExceptionalEvents.css'
import config from '../../config'
import routes from '../../routes'

const PExceptionalEvents = () => {

    const [defaultData, setDefaultData] = useState([])


    useEffect(() => {
        config.api_host.get(routes.exceptional_events).then(r => {
            setDefaultData(r.data)
        })
    }, [])

    return (
        <div className='p_exceptional_events'>
            <Navbar />
            <Sidebar />
            <PageContainer>
                <ExceptionalEvents defaultData={defaultData} />
            </PageContainer>
        </div>
    )
}

export default PExceptionalEvents