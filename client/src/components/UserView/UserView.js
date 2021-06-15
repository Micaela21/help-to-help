import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
// import UserOrders from "./UserOrders";
import "./UserView.css";
import UserInfo from "./UserInfo";
// import NewProductCard from "./NewProductCard";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
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

// function a11yProps(index) {
//   return {
//     id: `simple-tab-${index}`,
//     'aria-controls': `simple-tabpanel-${index}`,
//   };
// }

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function UserView() {
  // const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="userView">
      <AppBar position="static" className="appBar">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Personal Data" className="tabNro1" />
          <Tab label="Orders" className="tabNro2" />
          <Tab label="Products" className="tabNro3" />
          {/* {...a11yProps(2)} */}
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <UserInfo />
      </TabPanel>
      <TabPanel value={value} index={1}>
        {/* <UserOrders /> */}
      </TabPanel>
      <TabPanel value={value} index={2}>
        <div className="newCardsCnt" >
          {/* <NewProductCard />
          <NewProductCard />
          <NewProductCard />
          <NewProductCard />
          <NewProductCard />
          <NewProductCard /> */}
        </div>
      </TabPanel>
    </div>
  );
}
