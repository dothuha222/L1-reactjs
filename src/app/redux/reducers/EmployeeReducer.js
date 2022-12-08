import {
    GET_EMPLOYEE_DATA,
    GET_EMPLOYEE_DATA_SUCCESS,
    CREATE_EMPLOYEE_DATA,
    UPDATE_EMPLOYEE_DATA,
    DELETE_EMPLOYEE_DATA
} from '../actions/EmployeeAction'

const initialState = {
}
const employeeReducer = function(state = initialState, action) {
    switch (action.type) {
        case GET_EMPLOYEE_DATA: {
            return {
              ...state,
              ...action.payload
            };
        }
        case GET_EMPLOYEE_DATA_SUCCESS: {
            return {
              ...state,
              ...action.payload
            };
        }
        // case CREATE_EMPLOYEE_DATA: {
        //     return {
        //       ...state
        //     };
        // }
        //   case UPDATE_EMPLOYEE_DATA: {
        //     return {
        //       ...state
        //     };
        // }
        //   case DELETE_EMPLOYEE_DATA: {
        //     return state;
        // }
        //   default: {
        //     return state;
        // }
    }
};

export default employeeReducer