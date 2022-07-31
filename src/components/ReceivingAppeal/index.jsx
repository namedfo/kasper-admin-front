import { useFormik } from 'formik';
//
import './ReceivingAppeal.css'



const ReceivingAppeal = () => {


    const formik = useFormik({
        initialValues: {
            
        },
        onSubmit: values => {
        },
    });


    return (
        <div className='receiving_appeal'>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <span>

                    </span>
                    <input type="text" />
                </div>
                <button type="submit">
                    Save
                </button>
            </form>
        </div>
    )
}

export default ReceivingAppeal