import React, { useState, useEffect } from "react";
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import CustomDropzone from "./CustomDropzone";
import DataSheetFile from './DataSheetFile/index';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputAdornment from '@material-ui/core/InputAdornment';

// start import for dialog
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
// import SolarPanalDeviceForm from './SolarPanalDeviceForm';
// code for small steps
import Slider from '@material-ui/core/Slider';
import axios from 'axios';
import IntlMessages from 'util/IntlMessages';
import {NotificationManager} from 'react-notifications';
import { v4 as uuidv4 } from 'uuid';
import {useForm} from 'react-hook-form';

// end import for dialog 
// start of dialog modal for Solar Panal 
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
  // end of dialog modal for Solar Panal 
  function valuetext(value) {
    return `${value}W`;
  } 
  const useStyles = makeStyles((theme) => ({
      formControl: {
        margin: theme.spacing(0),
        minWidth: "100%",
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
      option: {
          fontSize: 15,
          '& > span': {
              marginRight: 10,
              fontSize: 18,
          },
      },
      root: {
          width: 300,
      },
    }));

  const marksW = [
    {
      value: 100,
      label: '100W',
    },
    // {
    //   value: 270,
    //   // label: '270W',
    // },
    {
      value: 600,
      label: '600W',
    },
];
// const marksV = [
//     {
//       value: 0,
//       label: '0V',
//     },
//     {
//       value: 270,
//       label: '270V',
//     },
// ];
// const marksC = [
//     {
//       value: 0,
//       label: '0A',
//     },
//     {
//       value: 270,
//       label: '270A',
//     },
// ];

export default function DialogSolarP(props){
  const {register, handleSubmit, errors, reset }=useForm(); // initialize the hook
    // start code of dialog modal for Solar Panal 
    const {openS,   setOpenS} = props;
    const [saveNew, setSaveNew] = useState(false);
    const {solarListObject, setSolarListObject} = props;
    
    // end code of dialog modal for Solar Panal 
    const [brand, setBrand] = useState('');
    const solarBrands=props.solarBrands;
    const [solarType, setSolarType] = useState("Mono");
    const [powerW, setPowerW] = useState(150);
    const [cableType, setCableType] = useState('');
    const [cableTypesSelect,setCabletypesSelect]= useState([]);
    // const [description, setDescription] = useState("");
    const [image, setImage] = useState({ oldImage: '', filePath: 'brand/solar/solar_list/', btnText: 'Image' });
    let imageFile = '';
    const [dataSheet, setDataSheet] = useState({ oldImage: '', filePath: 'brand/solar/solar_list/data_sheet/', btnText: 'Data Sheet' });
    let dataSheetFile = '';
  
  const classes = useStyles();
  const handleCloseS = () => {
    formReset();
    emptyForm();
    setOpenS(false);
    setSaveNew(false);
  };
  const eventhandlerIm = (data) => {
    imageFile = data;
    // console.log('images file data', data);
    // console.log('images file', imageFile);
  };
  const eventhandlerDaSh = data => {
    dataSheetFile = data;
    // console.log('dataSheetFile file', dataSheetFile);
  };
  const emptyForm = () =>{
    setSolarListObject([]);
    setSolarType("Mono");
    setPowerW(150);
    // setDescription("");
    setImage({ ...image, oldImage: ''});
    setDataSheet({ ...dataSheet, oldImage: ''});
  }

  useEffect(() => {
    getCabletype();
    if(solarListObject?.solar_brand_id){
      setBrand(solarListObject.solar_brand_id);
    }else{
      solarBrands.map((sBrand, index) =>  { 
        if((index+1)===1){setBrand(sBrand.id);}
      });
    }
    // setCableType(solarListObject.cable_type_id);
    if(solarListObject?.cable_type_id){
      setCableType(solarListObject.cable_type_id);
    }else{
      cableTypesSelect.map((cableOption, index) =>  { 
        if(index===0){setCableType(cableOption.id);}
      });
    }

    setSolarType(solarListObject.type?solarListObject.type:"Mono");
    setPowerW(solarListObject.power?solarListObject.power:150);
    // setDescription(solarListObject.discription);
    setImage({ ...image, oldImage: solarListObject.image?solarListObject.image:''});
    setDataSheet({ ...dataSheet, oldImage: solarListObject.data_sheet?solarListObject.data_sheet: ''});

    if(props.solarListObject?.id){
      reset({
        solarListID: solarListObject.id,
        model: solarListObject.model,
        voltage: solarListObject.voltage,
        current: solarListObject.current,
      });
    }
    
  },[solarListObject, props.openS]);
  const formReset = ()=>{
    reset({
      solarListID: "",
      model: "",
      voltage: "",
      current: "",
    });
  };
  const handleData =  (data)=>{
    data['brand'] = brand;
    data['solarType'] = solarType;
    data['powerW'] = powerW;
    data['cableType'] = cableType;
    data['imageFile'] = imageFile;
    data['dataSheetFile'] = dataSheetFile;
    data['serial_no'] = uuidv4();
    axios.post('api/solarList', data)
    .then(res => {
      formReset();
      setSaveNew(true);
      // console.log('result ', res.data);
        NotificationManager.success(<IntlMessages id="notification.successMessage"/>, <IntlMessages
          id="notification.titleHere" />);
    }).catch(err =>{
      NotificationManager.error(<IntlMessages id="notification.errorMessage"/>, <IntlMessages
        id="notification.titleHere"/>);
      }
    );
  }
  const onSubmit = (data) => {
    data['brand'] = brand;
    data['solarType'] = solarType;
    data['powerW'] = powerW;
    data['cableType'] = cableType;
    data['imageFile'] = imageFile;
    data['dataSheetFile'] = dataSheetFile;
    data['serial_no'] = uuidv4();

    // console.log(data);
    axios.post('api/solarList', data)
    .then(res => {
      setSaveNew(false);
      handleCloseS();
      // console.log('result ', res.data);
        NotificationManager.success(<IntlMessages id="notification.successMessage"/>, <IntlMessages
          id="notification.titleHere" />);
    }).catch(err =>{
      NotificationManager.error(<IntlMessages id="notification.errorMessage"/>, <IntlMessages
        id="notification.titleHere"/>);
      }
    );
  }

// start get cable type
 
const getCabletype=async () => {
  axios.get('api/cabletype')
    .then(res => {  
      setCabletypesSelect(res.data)
      }
  ).catch(err => {
         NotificationManager.error(<IntlMessages id="notification.errorMessage"/>, <IntlMessages
            id="notification.titleHere"/>);
        }
    )
};
// end get cable type

    return (
      <Dialog onClose={handleCloseS}  aria-labelledby="customized-dialog-title" open={openS}>
        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <DialogTitle id="customized-dialog-title" className='customizedDialogWaterP' onClose={handleCloseS}>
              Add Solar Panal  Device
            </DialogTitle>
            <DialogContent dividers>
                {/* <SolarPanalDeviceForm /> */}
              <div className="row">
                <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                    
                        <div className="row">
                            <div className="col-xl-4 col-lg-4 col-md-4 col-12 insideFormBP">
                            <TextField id="id" type='hidden' style={{width: '0%'}} name="solarListID" defaultValue={(solarListObject?.id) ? solarListObject?.id : ''} inputRef={register}/>
                                <TextField size="small"
                                    id="outlined-read-only-input"
                                    label="ID"
                                    defaultValue={1}
                                    InputProps={{
                                    readOnly: true,
                                    }}
                                    variant="outlined"
                                />
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-4 col-12 insideFormBP">
                            <FormControl variant="outlined" size="small" className={classes.formControl}>
                                <InputLabel id="demo-simple-select-outlined-label">Brand</InputLabel>
                                <Select
                                name="brand"
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                                label="Brand"
                                >
                                <MenuItem value=""> </MenuItem>
                                {solarBrands.map(sBrand => 
                                  <MenuItem value={sBrand.id}>{sBrand.name}</MenuItem>
                                )}
                                </Select>
                              </FormControl>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-4 col-12 insideFormBP">
                                <TextField id="outlined-basic1" size="small" variant="outlined" name="model" className="fullWidthInput" label="Model" defaultValue={solarListObject?.model} inputRef={register({required: true})} 
                                error={errors.model && true} helperText={errors.model ? '*required' : ''}
                                />
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-4 col-12 insideFormBP group_radio insideFormPaddingWPS">
                              <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
                                  <input type="radio" class="btn-check" name={`radio${solarType}`} id="btnradio1Mono" autocomplete="off" checked={(solarType==="Mono" || solarType === undefined) ? true : false} value="Mono" onChange={event => setSolarType(event.target.value)}/>
                                  <label class="btn btn-outline-primary" for="btnradio1Mono">Mono</label>
                                  <input type="radio" class="btn-check" name={`radio${solarType}`} id="btnradio2Poly" autocomplete="off" checked={(solarType==="Poly")? true : false} value="Poly" onChange={event => setSolarType(event.target.value)}/>
                                  <label class="btn btn-outline-primary" for="btnradio2Poly">Poly</label>
                              </div>
                               
                            </div>
                            <div className="col-xl-8 col-lg-8 col-md-8 col-12 insideFormPadding1 inputAdornmentWrap powerW-solarL">
                                <Typography id="discrete-slider-small-steps" gutterBottom>
                                    Power
                                    </Typography>
                                    <Slider onChange={(event, value) => setPowerW(value)}
                                        defaultValue={(powerW) ? powerW : 270}
                                        getAriaValueText={valuetext}
                                        aria-labelledby="discrete-slider-small-steps"
                                        step={5}
                                        marks={marksW}
                                        min={100}
                                        max={600}
                                        valueLabelDisplay="auto"
                                    />
                            </div>
                            
                            <div className="col-xl-4 col-lg-4 col-md-4 col-12 insideFormBPCable">
                                <FormControl fullWidth >  
                                  <TextField size="small" id="outlined-basic3-voltage" label="Voltage" variant="outlined"
                                  name="voltage"  
                                  InputProps={{
                                    endAdornment: <InputAdornment position="end">V</InputAdornment>,
                                  }}
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  defaultValue={solarListObject?.voltage} inputRef={register({required: true, pattern: /^[+-]?([0-9]*[.])?[0-9]+$/,})} 
                                  error={errors.voltage && true} helperText={errors.voltage ? '*Please enter valid number.' : ''}
                                 />
                                </FormControl>
                            </div>
                            
                            <div className="col-xl-4 col-lg-4 col-md-4 col-12 insideFormBPCable">
                                <FormControl fullWidth >  
                                  <TextField size="small" id="outlined-basic3-current" label="Current" variant="outlined"
                                  name="current"  
                                  InputProps={{
                                    endAdornment: <InputAdornment position="end">A</InputAdornment>,
                                  }}
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  defaultValue={solarListObject?.current} inputRef={register({required: true, pattern: /^[+-]?([0-9]*[.])?[0-9]+$/,})} 
                                  error={errors.current && true} helperText={errors.current ? '*Please enter valid number.' : ''}
                                 />
                                </FormControl>
                                
                            </div>
                            
                            <div className="col-xl-4 col-lg-4 col-md-4 col-12 insideFormBPCable">
                              <FormControl variant="outlined" size="small" className={classes.formControl}>
                                  <InputLabel id="demo-simple-select-outlined-label">Cable Type</InputLabel>
                                  <Select name='cableType'
                                  labelId="demo-simple-select-outlined-label"
                                  id="demo-simple-select-outlined"
                                  value={cableType}
                                  onChange={(e) => setCableType(e.target.value)}
                                  label="Cable Type"
                                  >
                                  <MenuItem value="">
                                      <em></em>
                                  </MenuItem>
                                  {cableTypesSelect.map(cableOption => 
                                  <MenuItem value={cableOption.id}>{cableOption.name}</MenuItem>
                                  )}
                                  </Select>
                              </FormControl>
                            </div>    
                            {/* <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                                <div class="form-group">
                                    <textarea name="description" class={`form-control form-control-lg ${(touched && touched.description) && (error && error.description) ? 'error' : ''}`}  value={description} onChange={(e) => handleChangeField(e)} rows="2" spellcheck="false" placeholder="Short Description"></textarea>
                                    <span className={(touched && touched.description) && (error && error.description) ? 'displayBlock errorText' : 'displayNone'}>*required</span>
                                </div>
                            </div> */}
                            <div className="col-xl-4 col-lg-4 col-md-4 col-12 waterPumFile waterPumpListFile">
                                <CustomDropzone formData={image} onChange={eventhandlerIm.bind(this)}/>
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-4 col-12 waterPumFile waterPumpListFile">
                              <DataSheetFile formData={dataSheet} onChange={eventhandlerDaSh.bind(this)}/>
                            </div>
                        </div>
                   
                </div>
            </div>
                
            </DialogContent>
            
            <DialogActions>
              <Button variant="contained" color="primary" className="jr-btn jr-btn-lg" disabled={solarListObject?.id? true : false} onClick={handleSubmit(handleData)}>Save & New</Button>
              <Button variant="contained" type="submit" color="primary" className="jr-btn jr-btn-lg">Submit</Button>
            </DialogActions>
          </form>
      </Dialog>
    );
}