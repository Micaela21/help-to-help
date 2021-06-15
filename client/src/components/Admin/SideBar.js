import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import DataTableAdmin from "./DataTableAdmin";
import ProductsTable from "../ProductForm/ProductsTable";
import UserOrders from "../UserView/UserOrders";

import "./SideBar.css";
import AllCategories from "../CategoryForm/AllCategories";
import NewCategoryForm from "../CategoryForm/NewCategoryForm";
import ProductFormAdd from "../ProductForm/ProductFormAdd";
import UserTableAdmin from "./UserTableAdmin";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../Actions/Actions";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: "100%",
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export default function SideBar() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [valueA, setValueA] = React.useState(0);
  const [valueO, setValueO] = React.useState(0);
  const userInfo = useSelector(store => store.getUser)
  const dispatch = useDispatch()

  useEffect(async () => {
      await dispatch(getUser())
  },[])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeA = (event, newValue) => {
    setValueA(newValue);
  };

  const handleChangeO = (event, newValue) => {
    setValueO(newValue);
  };

  return (
    <>
      {userInfo.role === "user" && (
        <div className={classes.root}>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            className={classes.tabs}
          >
            <Tab label="Lista de Ordenes" {...a11yProps(0)} />
          </Tabs>
          <TabPanel className="tabPanelTable" value={value} index={0}>
            <UserOrders />
          </TabPanel>
        </div>
      )}

      {userInfo.role === "admin" && (
        <div className={classes.root}>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={valueA}
            onChange={handleChangeA}
            aria-label="Vertical tabs example"
            className={classes.tabs}
          >
            <Tab label="Tabla de Ordenes" {...a11yProps(0)} />
            <Tab label="Categorias" {...a11yProps(1)} />
            <Tab label="Agregar Categorias" {...a11yProps(2)} />
            <Tab label="Tabla de Usuarios" {...a11yProps(3)} />
          </Tabs>
          <TabPanel
            className="tabPanelTable"
            value={valueA}
            index={0}
          >
            <DataTableAdmin />
          </TabPanel>

          <TabPanel value={valueA} index={1}>
            <AllCategories />
          </TabPanel>
          <TabPanel value={valueA} index={2}>
            <NewCategoryForm />
          </TabPanel>
          <TabPanel
            className="tabPanelTable"
            value={valueA}
            index={3}
          >
            <UserTableAdmin />
          </TabPanel>
        </div>
      )}

      {userInfo.role === "os" && (
        <div className={classes.root}>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={valueO}
            onChange={handleChangeO}
            aria-label="Vertical tabs example"
            className={classes.tabs}
          >
            <Tab label="Tabla de Ordenes" {...a11yProps(0)} />
            <Tab label="Agregar producto" {...a11yProps(1)} />
            <Tab label="Editar Producto" {...a11yProps(2)} />
          </Tabs>
          <TabPanel
            className="tabPanelTable"
            value={valueO}
            index={0}
          >
            <DataTableAdmin />
          </TabPanel>

          <TabPanel value={valueO} index={1}>
            <ProductFormAdd />
          </TabPanel>
          <TabPanel
            className="tabPanelTable"
            value={valueO}
            index={2}
          >
            <div className="newCardsCnt">
              <ProductsTable />
            </div>
          </TabPanel>
        </div>
      )}
    </>
  );
}
