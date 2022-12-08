import axios from "axios";
import ConstantList from "../../appConfig";
const API_PATH = ConstantList.API_ENPOINT + "/employees";
const API_PATH_SEARCH = ConstantList.API_ENPOINT + "/employees/search";
const API_PROVINCE = ConstantList.API_ENPOINT + "/provinces/search";
const API_DISTRICT = ConstantList.API_ENPOINT + "/districts/search";
const API_COMMUNE = ConstantList.API_ENPOINT + "/communes/search";


export const getEmployees = () => {
  return axios.post(API_PATH_SEARCH,{})
}

export const getEmployeeById = (id) => {
  return axios.get(`${API_PATH_SEARCH}/${id}`)
}

export const createEmployees = (data) => {
  return axios.post(API_PATH,data);
}

export const deleteEmployees = (id) => {
  return axios.delete(`${API_PATH}/${id}`);
}

export const updateEmployees = (data,id) => {
  return axios.put(`${API_PATH}/${id}`,data)
}

export const getProvince = () => {
  return axios.post(API_PROVINCE,{});
}

export const getDistrict = () => {
  return axios.post(API_DISTRICT,{});
}

export const getCommune = () => {
  return axios.post(API_COMMUNE, {});
}

