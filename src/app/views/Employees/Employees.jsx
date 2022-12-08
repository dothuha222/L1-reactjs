
import { Breadcrumb } from 'egret';
import React from 'react'
import {useState, useEffect} from 'react'
import { useTranslation } from 'react-i18next'
import MaterialTable from 'material-table';
import {
    Grid,
    IconButton,
    Icon,
    TablePagination,
    Button,
    TextField,
    InputAdornment,
    Input
  } from "@material-ui/core";
import { deleteEmployees, getEmployeeById, getEmployees, updateEmployees } from './EmployeesService';
import EmployeesEditorDialog from './EmployeesEditorDialog';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useDispatch, useSelector} from 'react-redux'
toast.configure({
    autoClose: 2000,
    draggable: false,
    limit: 3
  });

function MaterialButton(props) {
    const { t, i18n } = useTranslation();
    const item = props.item;
    return <div>
      <IconButton size="small" onClick={() => props.onSelect(item, 0)}>
        <Icon fontSize="small" color="primary">edit</Icon>
      </IconButton>
      <IconButton onClick={() => props.onSelect(item, 1)}>
        <Icon color="error">delete</Icon>
      </IconButton>
    </div>;
  }


function Employees() {
    const {t} = useTranslation();
    const [employees, setEmployees] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [isAdd, setAdd] = useState(false);
    const [isEdit, setEdit] = useState(false);

    const loadEmployees = () => {
        getEmployees()
            .then(res => setEmployees(res.data.data));
    }

   useEffect(() => {
    loadEmployees()
   },[])

    let columns = [
        { title: t("staff.code"), field: "code", width: "150" },
        { title: t("staff.displayName"), field: "name", width: "150" },
        { title: t("staff.age"), field: "age", align: "left", width: "150"},
        { title: t("staff.phoneNumber"), field: "phone", align: "left", width: "150" },
        { title: t("general.email"), field: "email", align: "left", width: "150" },
        {
            title: t("staff.Action"),
            field: "custom",
            align: "left",
            width: "250",
            render: rowData => <MaterialButton
              item={rowData}
              onSelect={(rowData, method) => {
                console.log(rowData)
                if (method === 0) {
                    handleEditEmployee(rowData)
                } else if (method === 1) {
                    handleDeleteEmployee(rowData.id)
                } else {
                  alert('Call Selected Here:' + rowData.id);
                }
              }}
            />
          },
      ];
    
    const handleCloseDialog = () => {
        setOpenDialog(false);
    }

    const handleAddEmployee = () => {
        setOpenDialog(true);
        setAdd(true)
        setEdit(false)
        setEditItem({})
    }

    const handleDeleteEmployee = (id) => {
        if(window.confirm("Bạn muốn xóa nhân viên này không?")){
            deleteEmployees(id)
                .then(res => {
                    toast.error("Đã xóa")
                    loadEmployees()
                }
                )
        }
    }
    
    const handleEditEmployee = (data) => {
        setOpenDialog(true);
        setAdd(false)
        setEdit(true)
        setEditItem(data)
    }
    
    return(
        <div className="m-sm-30">
            <div className="mb-sm-30">
                <Breadcrumb routeSegments={[{ name: t("Dashboard.manage"), path: "/directory/apartment" },{ name: t('staff.title') }]} />
            </div>

            <Grid container spacing={3}>
                <Grid item lg={5} md={5} sm={5} xs={12}>
                    <Button
                    onClick = {() => handleAddEmployee()}
                    className="mb-16 mr-16 align-bottom"
                    variant="contained"
                    color="primary"
                    >
                    {t('Add')}
                    </Button>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <div>
                    {openDialog && 
                    <EmployeesEditorDialog 
                    open={openDialog} 
                    handleClose = {handleCloseDialog}  
                    editItem = {editItem} 
                    isAdd = {isAdd} 
                    isEdit = {isEdit} 
                    loadEmployees = {loadEmployees}
                     />
                     }
                </div>
            </Grid>
            <MaterialTable 
                columns = {columns}
                data = {employees}
                options={{
                selection: false,
                actionsColumnIndex: -1,
                paging: true,
                search: true,
                rowStyle: (rowData, index) => ({
                backgroundColor: (index % 2 === 1) ? '#EEE' : '#FFF',
                    }), 
                maxBodyHeight: '450px',
                minBodyHeight: '370px',
                headerStyle: {
                    backgroundColor: '#358600',
                    color:'#fff',
                },
                padding: 'dense',
                toolbar: false
                }}
            />
            
            
            
        </div>
    )
}

export default Employees