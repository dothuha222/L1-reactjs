const GET_EMPLOYEE_DATA = "GET_EMPLOYEES_DATA"
const GET_EMPLOYEE_DATA_SUCCESS = "GET_EMPLOYEES_DATA_SUCCESS"
const CREATE_EMPLOYEE_DATA = "CREATE_EMPLOYEE_DATA"
const UPDATE_EMPLOYEE_DATA = "UPDATE_EMPLOYEE_DATA"
const DELETE_EMPLOYEE_DATA = "DELETE_EMPLOYEE_DATA"

export const getEmployeeData = (payload) => { 
    return {    
        type:GET_EMPLOYEE_DATA,
        payload
    }
}
export const getEmployeeDataSuccess = (payload) => { 
    return {    
        type:GET_EMPLOYEE_DATA_SUCCESS,
        payload
    }
}

export const createEmployeeData = (payload) => { 
    return {
        type:CREATE_EMPLOYEE_DATA,
        payload
    }
}

export const updateEmployeeData = (payload,id) => { 
    return {
        type:UPDATE_EMPLOYEE_DATA,
        payload,
        id
    }
}

export const deleteEmployeeData = (id) => { 
    return {
        type:DELETE_EMPLOYEE_DATA,
        id
    }
}