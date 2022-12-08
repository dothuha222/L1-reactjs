import {getEmployees} from "../Employees/EmployeesService"
const GET_EMPLOYEE_DATA = "GET_EMPLOYEES_DATA"
const GET_EMPLOYEE_DATA_SUCCESS = "GET_EMPLOYEES_DATA_SUCCESS"

function* getEmployeeSaga() {
    const api = yield call(getEmployees) 
    yield put({ type: GET_EMPLOYEE_DATA_SUCCESS, payload: { api } });
   
}
export default function* rootSaga() {
    yield takeLatest(GET_EMPLOYEE_DATA, getEmployeeSaga);
  }