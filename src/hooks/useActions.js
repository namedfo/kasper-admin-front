import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
// actions
import { serviceActions } from "../store/service/service.slice.ts";



const AllActions = {
    ...serviceActions
}


const useActions = () => {
    const dispatch = useDispatch()


    return bindActionCreators(AllActions, dispatch)
}

export default useActions