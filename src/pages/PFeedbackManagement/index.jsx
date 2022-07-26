import { useState, useEffect } from 'react'
// components
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import FeedbackManagement from '../../components/FeedbackManagement'
// layouts
import PageContainer from '../../Layouts/PageContainer'
//
import config from '../../config'
import routes from '../../routes'
//
import './PFeedbackManagement.css'



const PFeedbackManagement = () => {

    const [defaultData, setDefaultData] = useState(false)


    useEffect(() => {
        config.api_host.get(routes.feedback_path).then(r => {
            setDefaultData(r.data)
        })
    }, [])


    return (
        <div className='p_feedback_management'>
            <Navbar />
            <Sidebar />
            <PageContainer>
                {defaultData ? (
                    <FeedbackManagement setDefaultData={setDefaultData} defaultData={defaultData} />
                ) : (
                    <span>
                        loading
                    </span>
                )}
            </PageContainer>
        </div>
    )
}

export default PFeedbackManagement