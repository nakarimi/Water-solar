import React, { useState, useEffect } from "react";
import { Table } from 'reactstrap';
import Widget from "components/Widget/index";

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import LocalDrinkIcon from '@material-ui/icons/LocalDrink';
import Edit from '@material-ui/icons/Edit';
import SettingsIcon from '@material-ui/icons/Settings';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
// import TextareaAutosize from '@material-ui/core/TextareaAutosize';
// start import for taps 
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
// import Popover from '@material-ui/core/Popover';
import './style.css';
import { useDropzone } from "react-dropzone";
import DialogWaterP from './commentElement/DialogWaterP'
import DialogSettingWD from './commentElement/DialogSettingWD'

// end import for taps

// start import for dialog
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
// end import for dialog 
//form importas
import axios from 'axios';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import IntlMessages from 'util/IntlMessages';
import Swal from 'sweetalert2';
import Spinner from 'react-spinner-material';
import Country from './commentElement/Country';
import * as type from 'yup';
import { checkValidation, runValidation } from './commentElement/utils';

// start of dialog modal for water pump
const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});
const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});
const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);
const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);


// start taps functions
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
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
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    // width: 500,
  },
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing(1),
  },
  option: {
    fontSize: 15,
    '& > span': {
      marginRight: 10,
      fontSize: 18,
    },
  },
}));
// end taps functions

// start code for dropzone
const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};
// end code for dropzone

// validation code
const initialState = {
  formData: {
    brand: '',
    country: '',
    // description: '',
  },
  error: {},
  touched: {},
  isValid: false
};

const setState = 'SET_STATE';

function reducer(state, action) {
  switch (action.type) {
    case setState:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
}
const schema = type.object().shape({
  brand: type.string().required("Required"),
  country: type.string().required("Required"),
  // description: type.string().required("Required"),
});


// end validation code


const WaterPump = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [visibility, setVisibility] = useState(false);
  const [brand, setBrand] = React.useState("");
  const [country, setCountry] = React.useState(Country[0]);
  const [inputValue, setInputValue] = React.useState(Country[0]);
  // const [description, setDescription] = React.useState("");
  const [waterBrandID, setWaterBrandID] = useState('0');
  const [waterBrOldImage, setWaterBrOldImage] = useState("");

  const [value, setValue] = React.useState(0);
  const [waterPumpBrands, setWaterPumpBrands] = useState([]);
  const [waterPumpLists, setWaterPumpLists] = useState([]);
  const [{
    formData,
    error,
    touched,
    isValid
  }, dispatch] = React.useReducer(reducer, initialState);
  useEffect(() => {
    getWaterPumps();
  }, [])

  const Field = (event, newValue) => {
    emptyForm();
    handleAllField(false);
    setValue(newValue);
  };
  const handleChangeIndex = (index) => {
    setValue(index);
  };
  // start code of dialog modal for water pump
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const [openD, setOpenD] = React.useState(false);
  const [openWSD, setOpenWSD] = React.useState(false);
  useEffect(() => {
    getWaterPumpLists();
  }, [openD])
  const handleClose = () => {
    emptyForm();
    handleAllField(false);
    setOpen(false);
  };
  // end code of dialog modal for water pump
  // dropzone code
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));

    }

  });

  const thumbs = files.map(file => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img alt={file.name}
          src={file.preview}
          style={img}
        />
      </div>
    </div>
  ));

  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach(file => URL.revokeObjectURL(file.preview));
    // handleImage();
  }, [files]);
  // end dropzone code
  // const handleImage= async()=> {
  //   let name = 'files';
  //   const schemaErrors = await runValidation(schema, {
  //     ...formData, [name]: files
  //   });
  //   dispatch({
  //     type: setState,
  //     payload: {
  //       error: schemaErrors,
  //       formData: { ...formData, [name]: files },
  //       touched: { ...touched, [name]: true },
  //       isValid: checkValidation(schemaErrors)
  //     }
  //   });
  // }

  // start form sumbit

  // Start code of water Pumps List Setting 
  const [pumpListId, setPumpListId] = useState('');
  const [pumpListModel, setPumpListModel] = useState('');

  const onButtonClick = (listId, pumpModel) => {

    setPumpListId(listId);
    setPumpListModel(pumpModel);
    // console.log("list id: ", listId);
    setOpenWSD(true);
  }
  // End code of water pumps list setting 

  // start delete function Water Device list
  const deleteWaterList = (id) => {
    // console.log("it is id of that water pump brand: ", id);
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete('api/pumpList/' + id)
          .then(res => {
            // setSolarLists(res.data)
            setWaterPumpLists(waterPumpLists.filter((value) => value.id !== id));
            NotificationManager.success(<IntlMessages id="notification.successMessage" />, <IntlMessages
              id="notification.titleHere" />);
          }
          ).catch(err => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',

            })
          })
      }
    })
  }
  // End delete Water Device lists
  // start get WaterPump panal list

  const getWaterPumpLists = async () => {
    axios.get('api/pumpList')
      .then(res => {
        // console.log(res);
        setWaterPumpLists(res.data);
      }
      ).catch(err => {
        NotificationManager.error(<IntlMessages id="notification.errorMessage" />, <IntlMessages
          id="notification.titleHere" />);
      }
      )
  }

  // end get solar pabal list

  const editWaterBrand = (dataValue) => {
    // console.log(dataValue);
    setBrand(dataValue.name);
    setCountry(dataValue.country);
    // setDescription(dataValue.discription);
    setWaterBrandID(dataValue.id);
    setWaterBrOldImage(dataValue.image);
    setValue(0);
    handleAllField(true);
    // setBrand(); setD1escription();
  }
  const handleAllField = async (valid) => {
    let f1 = 'brand', f2 = 'country';
    // let f3 = 'description';
    const schemaErrors = await runValidation(schema, {
      ...formData, [f1]: brand, [f2]: country /* , [f3]: description*/
    });
    dispatch({
      type: setState,
      payload: {
        error: schemaErrors,
        formData: { ...formData, [f1]: brand, [f2]: country /*, [f3]: description*/ },
        touched: { ...touched, [f1]: false, [f2]: false /*, [f3]: false*/ },
        isValid: valid
      }
    });
  }
  const emptyForm = () => {
    setBrand('');
    setCountry(Country[0]);
    setInputValue(Country[0]);
    // setDescription('');
    setWaterBrandID('0');
    setWaterBrOldImage('');
    setFiles([]);
  }
  const deleteWaterPumpBrand = (id) => {
    setVisibility(true)
    // console.log("it is id of that water pump brand: ", id);
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete('api/pumpbrand/' + id)
          .then(res => {
            setVisibility(false)
            // setWaterPumpBrands(res.data)
            setWaterPumpBrands(waterPumpBrands.filter((value) => value.id !== id));
            NotificationManager.success(<IntlMessages id="notification.successMessage" />, <IntlMessages
              id="notification.titleHere" />);
          }
          ).catch(err => {
            setVisibility(false)
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',

            })
          })
      }
    })
  }
  const getWaterPumps = async () => {
    setVisibility(true)
    axios.get('api/pumpbrand')
      .then(res => {
        setVisibility(false)
        // console.log(res);
        setWaterPumpBrands(res.data);
      }
      ).catch(err => {
        setVisibility(false)
        NotificationManager.error(<IntlMessages id="notification.errorMessage" />, <IntlMessages
          id="notification.titleHere" />);
      }
      )
  }
  const handleCountry = async (event, value) => {
    setCountry(value);
    let name = 'country';
    const schemaErrors = await runValidation(schema, {
      ...formData, [name]: value
    });
    dispatch({
      type: setState,
      payload: {
        error: schemaErrors,
        formData: { ...formData, [name]: value },
        touched: { ...touched, [name]: true },
        isValid: checkValidation(schemaErrors)
      }
    });
  };
  const handleChangeField = async ({ target: { name, value } }) => {
    if (name === 'brand') {
      setBrand(value)
    }
    // else if(name==='description'){
    //   setDescription(value)
    // }

    const schemaErrors = await runValidation(schema, {
      ...formData, [name]: value
    });
    dispatch({
      type: setState,
      payload: {
        error: schemaErrors,
        formData: { ...formData, [name]: value },
        touched: { ...touched, [name]: true },
        isValid: checkValidation(schemaErrors)
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setVisibility(true)
    let data = {
      waterBrandID, country, brand /*, description*/
    }
    if (data.waterBrandID === undefined) {
      data.waterBrandID = 0;
    }
    if (files.length !== 0) {
      var image = '';
      let file = files[0];
      let reader = new FileReader();
      reader.onloadend = (file) => {
        image = reader.result;
        data['image'] = image;
        axios.post('api/pumpbrand', data)
          .then(res => {
            setVisibility(false)
            getWaterPumps();
            getWaterPumpLists();
            NotificationManager.success(<IntlMessages id="notification.successMessage" />, <IntlMessages
              id="notification.titleHere" />);
          }
          ).catch(err => {
            setVisibility(false)
            NotificationManager.error(<IntlMessages id="notification.errorMessage" />, <IntlMessages
              id="notification.titleHere" />);
          }
          )
      }
      reader.readAsDataURL(file);
    }
    else {
      data['image'] = 'oldImage';
      axios.post('api/pumpbrand', data)
        .then(res => {
          setVisibility(false)
          getWaterPumps();
          getWaterPumpLists();
          NotificationManager.success(<IntlMessages id="notification.successMessage" />, <IntlMessages
            id="notification.titleHere" />);
        }
        ).catch(err => {
          setVisibility(false)
          NotificationManager.error(<IntlMessages id="notification.errorMessage" />, <IntlMessages
            id="notification.titleHere" />);
        }
        )
    }
  }
  // end form sumbit

  // start popove code
  // const [anchorEl, setAnchorEl] = React.useState(null);
  // const handlePopoverOpen = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const handlePopoverClose = () => {
  //   setAnchorEl(null);
  // };
  // const open1 = Boolean(anchorEl);
  // end popover code
  const [waterListObject, setWaterListObject] = React.useState([]);
  const editWaterList = (waterListObj) => {
    setWaterListObject(waterListObj);
    setOpenD(true);
  }
  return (
    <div className="row">
      <div className="col-xl-4 col-lg-4 col-md-12 col-12">
        <div className={classes.root}>
          <Widget styleName={`text-white waterPumpPanelBackGrad`}>
            <div className="d-flex flex-row justify-content-center mb-3">
              {/* <i className={`zmdi zmdi-view-web zmdi-hc-4x`}/> */}
              <LocalDrinkIcon className="lDrinkIcon" />
            </div>
            <div className="text-center">
              <h3 className="jr-font-weight-medium mb-3">Water Pump Brands</h3>
              <p className="mb-3">List of Current Water Pump Brands</p>
              <Button size="large" className="bg-warning text-white mt-3 text-capitalize" onClick={handleClickOpen}>Manage</Button>
            </div>
          </Widget>
          <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>

            <form autoComplete="off" onSubmit={handleSubmit}>
              <DialogTitle id="customized-dialog-title" className='customizedDialog1' onClose={handleClose}>
                <AppBar position="static" color="default">
                  <Tabs
                    value={value}
                    onChange={Field}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                  >
                    <Tab label="Add Brand" {...a11yProps(0)} />
                    <Tab label="List of Brand" {...a11yProps(1)} />
                  </Tabs>
                </AppBar>

              </DialogTitle>
              <DialogContent dividers>
                <SwipeableViews
                  axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                  index={value}
                  onChangeIndex={handleChangeIndex}
                >
                  <TabPanel value={value} index={0} dir={theme.direction} className="waterPumpPanel">
                    <div className="row wp-brand">
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                        <TextField id="outlined-basic" name='brand' value={brand} onChange={e => handleChangeField(e)}
                          error={(touched && touched.brand) && (error && error.brand) ? true : false}
                          helperText={(touched && touched.brand) && (error && error.brand) ? '*required' : ''}
                          label="Brand Name" variant="outlined" />
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                        <Autocomplete
                          value={country} onChange={(event, newValue) => handleCountry(event, newValue)}
                          inputValue={inputValue}
                          onInputChange={(event, newInputValue) => {
                            setInputValue(newInputValue);
                          }}
                          id="controllable-states-demo"
                          options={Country}
                          style={{ width: 300 }}
                          renderInput={(params) => <TextField {...params} label="Country" name='country'
                            error={(touched && touched.country) && (error && error.country) ? true : false}
                            helperText={(touched && touched.country) && (error && error.country) ? '*required' : ''}
                            variant="outlined" />}
                        />

                      </div>
                    </div>
                    {/* <div className="row paddingTopForm">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <TextareaAutosize name='description' value={description} onChange={e => handleChangeField(e)}
                    id='description' aria-label="minimum height" rowsMin={3} 
                    className={`minWidth form-control ${(touched && touched.description) && (error && error.description) ? 'error' : ''}`}
                     placeholder="Short Description" />
                     <span className={(touched && touched.description) && (error && error.description) ? 'displayBlock errorText' : 'displayNone'}>*required</span>
                  </div>
                </div> */}
                    <div className="row paddingTopForm">

                      <div className="col-xl-9 col-lg-9 col-md-9 col-sm-12 col-12 accessory_file waterPumFile">
                        <div className="dropzone-card">
                          <div className="dropzone">
                            <div {...getRootProps({ className: 'dropzone-file-btn' })} >
                              <input {...getInputProps()} />
                              <p>Upload image</p>
                            </div>
                          </div>
                          <div className="dropzone-content" style={thumbsContainer}>
                            {thumbs}
                            {(files.length === 0) ? ((waterBrOldImage !== "" && waterBrOldImage !== undefined) ? (<spam>
                              <span className={`sp_right_padding`}>Cuurent Image </span>
                              <span><img src={`${axios.defaults.baseURL}brand/pumpbrand/${waterBrOldImage}`} class="img-thumbnail rounded edit_img_width" alt="Responsive"></img></span>
                            </spam>) : '') : ''}
                          </div>
                        </div>
                      </div>

                    </div>

                  </TabPanel>
                  <TabPanel value={value} index={1} dir={theme.direction}>
                    <div className="row">
                      <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                        <span className="row justify-content-center">
                          <Spinner radius={60} color={"#3f51b5"} stroke={3} visible={visibility} />
                        </span>
                        <div className="table-responsive-material">
                          <Table className="default-table table-unbordered table table-sm table-hover">
                            <thead className="table-head-sm th-border-b">
                              <tr>
                                <th>ID</th>
                                <th>Brand</th>
                                <th>Coutry</th>
                                <th>logo</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {waterPumpBrands.map((data, index) => {
                                return <tr key={index}>
                                  <td>{index + 1}</td>
                                  <td>
                                    {data.name}
                                    {/* 
                                <div className="d-flex align-items-center">
                                  <div className="user-detail">
                                    
                                    <h5 className="user-name">
                                    <Typography
                                      aria-owns={open1 ? 'mouse-over-popover' : undefined}
                                      aria-haspopup="true"
                                      onMouseEnter={handlePopoverOpen}
                                      onMouseLeave={handlePopoverClose}
                                    >
                                      {data.name}
                                    </Typography>
                                    </h5>
                                    <Popover
                                      id="mouse-over-popover"
                                      className={classes.popover}
                                      classes={{
                                        paper: classes.paper,
                                      }}
                                      open={open1}
                                      anchorEl={anchorEl}
                                      anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                      }}
                                      transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                      }}
                                      onClose={handlePopoverClose}
                                      disableRestoreFocus
                                    >
                                      <Typography>{data.discription}</Typography>
                                    </Popover>
                                  </div>
                                </div> */
                                    }
                                  </td>

                                  <td>{data.country}</td>

                                  <td>
                                    <div className="d-flex align-items-center">
                                      <img src={`${axios.defaults.baseURL}brand/pumpbrand/${data.image}`} class="img-thumbnail rounded acc_img_width" alt="Responsive" />
                                    </div>

                                  </td>
                                  <td>
                                    <div className="pointer text-primary">
                                      <IconButton size="small" aria-label="delete" color="secondary" onClick={() => deleteWaterPumpBrand(data.id)} >
                                        <DeleteIcon />
                                      </IconButton>
                                      <IconButton size="small" color="primary" aria-label="edit an alarm" onClick={() => editWaterBrand(data)}>
                                        <Edit />
                                      </IconButton>


                                    </div>
                                  </td>
                                </tr>
                              })}
                            </tbody>
                          </Table>
                        </div>
                      </div>
                    </div>
                  </TabPanel>
                </SwipeableViews>
              </DialogContent>
              <DialogActions>
                {(value === 0) ? (<Button variant="contained" type="submit" color="primary" className="jr-btn jr-btn-lg " disabled={!isValid} >Submit</Button>) : null}
              </DialogActions>
            </form>
          </Dialog>
        </div>

      </div>

      <div className="col-xl-8 col-lg-8 col-md-12 col-12 wp-second-col">
        {/* imported dialog form another file */}

        <DialogWaterP
          openD={openD}
          setOpenD={setOpenD}
          waterPumpBrands={waterPumpBrands}
          waterListObject={waterListObject}
          setWaterListObject={setWaterListObject}
        />
        <DialogSettingWD
          pumpListId={pumpListId}
          pumpListModel={pumpListModel}
          openWSD={openWSD}
          setOpenWSD={setOpenWSD}
        />

        <Widget>
          <div className="d-flex flex-row mb-3">
            <h4 className="mb-0"> List of Water Pumps</h4>
            <span className="text-primary ml-auto pointer d-none d-sm-inline-flex align-items-sm-center" onClick={() => setOpenD(true)}>
              <i className="zmdi zmdi-plus-circle-o mr-1" />Register New Device</span>
          </div>
          <span className="row justify-content-center">
            <Spinner radius={60} color={"#3f51b5"} stroke={3} visible={visibility} />
          </span>
          <div className="table-responsive-material">
            <Table className="default-table table-unbordered table table-sm table-hover">
              <thead className="table-head-sm th-border-b">
                <tr>
                  <th>ID</th>
                  <th>Name/Model</th>
                  <th>Outlet (Inch)</th>
                  <th>Current (A)</th>
                  <th>Diameter (Inch)</th>
                  <th>Power (KW)</th>
                  {/* <th>Image</th> */}
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {waterPumpLists.map((waterList, index) => {
                  return <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="user-detail">
                          <h5 className="user-name">{waterList.model}</h5>
                        </div>
                      </div>
                    </td>
                    <td>{waterList.outlet}</td>
                    <td>{waterList.ampeier}</td>
                    <td>{waterList.diameter}</td>
                    <td>{waterList.power}</td>
                    {/* <td>
                  <div className="d-flex align-items-center">
                      <img src={`${axios.defaults.baseURL}brand/pumpbrand/pump_list/${waterList.image}`}  class="img-thumbnail rounded acc_img_width"  alt="Responsive" />
                  </div>
                </td> */}

                    <td>
                      <div className="pointer text-primary">
                        <IconButton size="small" aria-label="delete" color="secondary" onClick={() => deleteWaterList(waterList.id)}>
                          <DeleteIcon />
                        </IconButton>
                        <IconButton size="small" color="primary" aria-label="edit an alarm" onClick={() => editWaterList(waterList)}>
                          <Edit />
                        </IconButton>
                        <IconButton size="small" color="primary" aria-label="setting an alarm" onClick={() => { onButtonClick(waterList.id, waterList.model) }}>
                          <SettingsIcon />
                        </IconButton>
                      </div>
                    </td>
                  </tr>
                })}
              </tbody>
            </Table>
          </div>
          <span className="text-primary mt-2 pointer d-block d-sm-none" onClick={() => setOpenD(true)}>
            <i className="zmdi zmdi-plus-circle-o mr-1 jr-fs-lg d-inline-block align-middle" />
        Register New Device</span>
        </Widget>
      </div>
      <NotificationContainer />
    </div>
  );
};
export default WaterPump;
