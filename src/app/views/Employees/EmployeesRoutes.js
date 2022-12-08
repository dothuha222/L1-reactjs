import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
import { useTranslation, withTranslation, Trans } from 'react-i18next';
const Employees = EgretLoadable({
  loader: () => import("./Employees")
});
const ViewComponent = withTranslation()(Employees);

const EmployeesRoutes = [
  {
    path:  ConstantList.ROOT_PATH+"list/employees",
    exact: true,
    component: ViewComponent
  }
];

export default EmployeesRoutes;
