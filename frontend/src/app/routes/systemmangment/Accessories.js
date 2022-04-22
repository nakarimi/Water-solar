import React, { useState, useEffect } from "react";
import {NotificationContainer,NotificationManager} from 'react-notifications';
import IntlMessages from 'util/IntlMessages';
import Swal from 'sweetalert2';
import axios from 'axios';
import MaterialTable from 'material-table';
// Taps Start Code 
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import AccessoriesForm from './commentElement/AccessoriesForm';
import Spinner from 'react-spinner-material';
//form importas

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
        <Box p={3} component={'div'}>
          <Typography component={'div'}>{children}</Typography>
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
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

// Taps End code
 

function Accessories() {
  const [visibility,setVisibility]= useState(false);
  // start code for taps 
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [getValue, setGetValue] = React.useState(0);
  const [accessoryObject, setAccessoryObject] =React.useState([]);
  const handleChange = (event, newValue) => {
    setAccessoryObject('');
    if(newValue===0){
      getAccessories();
      setGetValue(0);
    }
    if(newValue===1){
      setGetValue(1);
    }
    setValue(newValue);
  };
   
  // end code for taps 

  // get, delete and edit List list
// Delete functions for geo location
const [accessoriesList,setAccessoriesList]= useState([]);
useEffect(() => {
  getAccessories();
},[])
const getAccessories = async() =>{
  setVisibility(true);
  axios.get('api/accessories')
      .then(res => {  
          // console.log(res);
          setVisibility(false);
          setAccessoriesList(res.data);
        }
    ).catch(err => {
      setVisibility(false);
           NotificationManager.error(<IntlMessages id="notification.errorMessage"/>, <IntlMessages
              id="notification.titleHere"/>);
          }
      )
}
const editAccessory = (accessoryObj) =>{
  //  console.log(accessoryObj);
   setValue(1);
   setAccessoryObject(accessoryObj);
}
const deletAccessory=(id) => {
  setVisibility(true);
  console.log("it is id of that geo location: ", id);
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if(result.isConfirmed) {
      axios.delete('api/accessories/'+id)
        .then(res => {
          setVisibility(false);
              // setAccessories(res.data)
              setAccessoriesList(accessoriesList.filter((value) => value.id !==id));
            NotificationManager.success(<IntlMessages id="notification.successMessage"/>, <IntlMessages
            id="notification.titleHere" />);
          }
        ).catch( err =>{
          setVisibility(false);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
             
            })
        })  
    }
  })
}

  
  // end get, delete and edit List list 
 
  // let i = 1;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="List of Accessories" {...a11yProps(0)} />
          <Tab label="Add New Accessory" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0} className={`tap1_acc`}>
        <span className="row justify-content-center">
          <Spinner radius={60} color={"#3f51b5"} stroke={3} visible={visibility} />
        </span>
        <MaterialTable 
                title="Dynamic list you can Edit and Delete the specific accessory"
                columns={[
                    { title: 'ID', field: 'id' },
                    { title: 'Name', field: 'name' },
                    { title: 'Model', field: 'model' },
                    { title: 'Uom', field: 'uom_name' },
                    { title: 'Min Quantity', field: 'min_quantity'},
                    {title: 'Max Quantity', field: 'max_quantity'},
                    // {title: 'Image', field: 'img', render: item => <img src={`${axios.defaults.baseURL}accessories/${item.image}`}  class="img-thumbnail rounded acc_img_width"  alt="Responsive" />},
                        
                ]}
                data={accessoriesList}
                actions={[
                    {
                    icon: 'edit',
                    tooltip: 'Edit Accessory',
                    color: "primary",
                    onClick: (event, rowData) => editAccessory(rowData)
                    },
                    rowData => ({
                    icon: 'delete',
                    color:'secondary',  
                    tooltip: 'Delete Accessory',
                    onClick: (event, rowData) => deletAccessory(rowData.id),
                    disabled: rowData.birthYear < 2000
                    })
                ]}
                options={{
                    actionsColumnIndex: -1,
                    search: false,
                }}
          />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <AccessoriesForm accessoryObject={accessoryObject} getValue={getValue}/>
      </TabPanel>
    <NotificationContainer />
  </div>
  );
}


export default Accessories;