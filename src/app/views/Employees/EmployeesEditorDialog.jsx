import React, { useState, useEffect } from "react";
import {
  Dialog,
  Button,
  Grid,
  DialogActions,
  DialogTitle,
  DialogContent,
  IconButton,
  Icon,
  TextField,
  MenuItem
} from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Draggable from 'react-draggable';
import Paper from '@material-ui/core/Paper';
import '../../../styles/views/_loadding.scss';
import clsx from 'clsx';
import CircularProgress from '@material-ui/core/CircularProgress';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from "react-i18next";
import { useParams} from 'react-router-dom'
import '../../../styles/views/_style.scss';
import { createEmployees, getCommuneSearch, getEmployees, updateEmployees } from "./EmployeesService";
// import { FormControl } from "material-ui";
import {getProvince,getDistrict,getCommune} from './EmployeesService'
toast.configure({
  autoClose: 2000,
  draggable: false,
  limit: 3
});
function PaperComponent(props) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}
function MaterialButton(props) {
  const item = props.item;
  return (
    <div>
      <IconButton onClick={() => props.onSelect(item, 1)}>
        <Icon color="error">delete</Icon>
      </IconButton>
    </div>
  );
}


function EmployeesEditorDialog({open,handleClose, editItem, isAdd, isEdit, loadEmployees}) {
  const {t} = useTranslation();
  const {id} = useParams();
  const [employee, setEmployee] = useState({})
  const [provinces, setProvinces] = useState([])
  const [province, setProvince] = useState('')
  const [districts, setDistricts] = useState([])
  const [district, setDistrict] = useState('')
  const [communes, setCommunes] = useState([])
  const [commune, setCommune] = useState('')


  const handleChange = (key,value) => {
    setEmployee({...employee,[key]:value})
  }
  
  const handleSubmit = () => {
    console.log(employee)
    if(isAdd){
      createEmployees(employee)
        .then((res) => {
          if(res.data.code == 200){
            loadEmployees()
            handleClose()
            toast.success('Tạo thành công')
          }
        }
        )
        .catch((err) => console.log(err))
    }
    else if(isEdit){
      updateEmployees(employee,employee.id)
        .then((res) => {
          if(res.data.code == 200){
            loadEmployees()
            handleClose()
            toast.success('Sửa thành công')
          }
        }
        )
        .catch(err => console.log(err))
    }
  }

  useEffect(()=> {
    loadProvince()
    loadDistrict()
  },[])

  useEffect(()=>{
    loadCommune()
   },[district])

  useEffect(() => {
    setEmployee(editItem)
  },[editItem])
  
  const handleSelectProvince = (value) => {
    setProvince(value)
  }

  const handleSelectDistrict = (value) => {
    setDistrict(value.id)
    console.log(district)
  }

  const handleSelectCommune = (value) => {
    setCommune(value)
    console.log(commune)
  }

   
  
  const loadProvince = () => {
    getProvince({})
      .then(res => 
        setProvinces(res.data.data)
      )
  }

  const loadDistrict = () => {
    getDistrict()
      .then(res => 
        {setDistricts(res.data.data)
        console.log(res.data.data)}
      )
  }

  const loadCommune = () => {
    getCommune()
      .then(res => setCommunes(res.data.data.filter(item => item.district.id === district)))
  }


    return (
      <Dialog open={open} PaperComponent={PaperComponent} maxWidth={'md'} fullWidth={true}>
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
        <span className="mb-20 styleColor"> {(id ? t("update") : t("Add")) + " " + t("staff.title")} </span>
        <IconButton style={{ position: "absolute", right: "10px", top: "10px" }} onClick = {() => handleClose()}>
          <Icon color="error" 
              title={t("close")}>
              close
          </Icon>
        </IconButton>
        </DialogTitle>
        <ValidatorForm style={{
          overflowY: "auto",
          display: "flex",
          flexDirection: "column"
        }}>
          <DialogContent dividers>
            <Grid className="mb-16" container spacing={2}>
              <Grid item lg={12} md={6} sm={12} xs={12}>
                <TextValidator
                  className="w-100 mb-16"
                  label={
                    <span className="font">
                      <span style={{ color: "red" }}> * </span>
                      {t('staff.code')}
                    </span>
                  }
                  onChange = {(e) => handleChange(e.target.name,e.target.value)}
                  type="text"
                  name="code"
                  value = {employee.code}
                  validators={["required"]}
                  errorMessages={[t("staff.noti.code")]}
                  variant="outlined"
                  size="small"
                />
              </Grid>

              <Grid item lg={12} md={6} sm={12} xs={12}>
                <TextValidator
                  className="w-100 mb-16"
                  label={
                    <span className="font">
                      <span style={{ color: "red" }}> * </span>
                      {t('staff.displayName')}
                    </span>
                  }
                  onChange = {(e) => handleChange(e.target.name,e.target.value)}
                  type="text"
                  name="name"
                  value={employee.name}
                  validators={["required"]}
                  errorMessages={[t("staff.noti.name")]}
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item lg={12} md={6} sm={12} xs={12}>
                <TextValidator
                  className="w-100 mb-16"
                  label={
                    <span className="font">
                      <span style={{ color: "red" }}> * </span>
                      {t('staff.age')}
                    </span>
                  }
                  onChange = {(e) => handleChange(e.target.name,e.target.value)}
                  type="text"
                  name="age"
                  value = {employee.age}
                  // value={person ? person.displayName : ''}
                  validators={["required"]}
                  errorMessages={[t("staff.noti.age")]}
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item lg={12} md={6} sm={12} xs={12}>
                <TextValidator
                  className="w-100 mb-16"
                  label={
                    <span className="font">
                      <span style={{ color: "red" }}> * </span>
                      {t('staff.phoneNumber')}
                    </span>
                  }
                  onChange = {(e) => handleChange(e.target.name,e.target.value)}
                  type="text"
                  name="phone"
                  value = {employee.phone}
                  // value={person ? person.displayName : ''}
                  validators={["required"]}
                  errorMessages={[t("staff.noti.phone")]}
                  variant="outlined"
                  size="small"
                />
              </Grid>
             
              <Grid item lg={12} md={6} sm={12} xs={12}>
                <TextValidator
                  className="w-100 mb-16"
                  label={
                    <span className="font">
                      <span style={{ color: "red" }}> * </span>
                      {t("staff.email")}
                    </span>
                  }
                  onChange = {(e) => handleChange(e.target.name,e.target.value)}
                  type="email"
                  name="email"
                  value ={employee.email}
                  validators={["required", "isEmail"]}
                  errorMessages={[
                    t("staff.noti.email"),
                    t("staff.noti.email_valid")
                  ]}
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item lg={4} md={6} sm={12} xs={12}>
                <TextValidator
                  select
                  className="w-100 mb-16"
                  label={
                    <span className="font">
                      <span style={{ color: "red" }}> * </span>
                      {t("staff.province")}
                    </span>
                  }
                  validators={["required"]}
                  errorMessages={[t("staff.noti.province")]}
                  variant="outlined"
                  size="small"
                  name ="province"
                  onChange = {(e) => (handleChange(e.target.name, e.target.value),handleSelectProvince(e.target.value))}
                  value = {employee.province}
                >
                  {provinces.map(province => (
                    <MenuItem value = {province} >{province.name}</MenuItem>
                  ))}
                </TextValidator>
              </Grid>
              <Grid item lg={4} md={6} sm={12} xs={12}>
                <TextValidator
                  select
                  className="w-100 mb-16"
                  label={
                    <span className="font">
                      <span style={{ color: "red" }}> * </span>
                      {t("staff.district")}
                    </span>
                  }
                  validators={["required"]}
                  errorMessages={[t("staff.noti.district")]}
                  variant="outlined"
                  size="small"
                  name = "district"
                  onChange = {(e) => (handleChange(e.target.name, e.target.value),handleSelectDistrict(e.target.value))}
                  value = {employee.district}
                >
                  {districts.map(district => (
                    <MenuItem value = {district} >{district.name}</MenuItem>
                  ))}
                </TextValidator>
              </Grid>
              <Grid item lg={4} md={6} sm={12} xs={12}>
                <TextValidator
                  select
                  className="w-100 mb-16"
                  label={
                    <span className="font">
                      <span style={{ color: "red" }}> * </span>
                      {t("staff.commune")}
                    </span>
                  }
                  validators={["required"]}
                  errorMessages={[t("staff.noti.commune")]}
                  variant="outlined"
                  size="small"
                  name = "commune"
                  onChange = {(e) => (handleChange(e.target.name, e.target.value),handleSelectCommune(e.target.value))}
                  value = {employee.commune}
                >
                  {communes.map(commune => (
                    <MenuItem value = {commune}>{commune.name}</MenuItem>
                  ))}
                </TextValidator>
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions spacing={4} className="flex flex-end flex-middle">
            <Button
              variant="contained"
              color="secondary"
              onClick = {() => handleClose()}
            >
              {t('Cancel')}
            </Button>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              onClick = {() => handleSubmit()}
            >
              {t('Save')}
            </Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    );
  }

export default EmployeesEditorDialog;
