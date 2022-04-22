import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import CustomDropzone from "./CustomDropzone";
import DataSheetFile from './DataSheetFile/index';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputAdornment from '@material-ui/core/InputAdornment';
// import clsx from 'clsx';
import './CommentEleStyle.css';
// code for small steps
import Slider from '@material-ui/core/Slider';
import axios from 'axios';
import IntlMessages from 'util/IntlMessages';
import { NotificationManager } from 'react-notifications';
import { v4 as uuidv4 } from 'uuid';
// start import for dialog
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { useForm } from 'react-hook-form';

// import WaterPumpDeviceForm from './WaterPumpDeviceForm';
// end import for dialog 
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
// end of dialog modal for water pump
function valuetext(value) {
  return `${value}KW`;
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
const marksKW = [
  {
    value: 0.75,
    label: '0.75KW',
  },
  {
    value: 1.1,
    // label: '1.1KW',
  },
  {
    value: 1.5,
    // label: '1.5KW',
  },
  {
    value: 2.2,
    // label: '2.2KW',
  },
  {
    value: 3,
    // label: '3KW',
  },
  {
    value: 4,
    // label: '4KW',
  },
  {
    value: 5.5,
    // label: '5.5KW',
  },
  {
    value: 7.5,
    // label: '7.5KW',
  },
  {
    value: 11,
    // label: '11KW',
  },
  {
    value: 15,
    // label: '15KW',
  },
  {
    value: 18.5,
    // label: '18.5KW',
  },
  {
    value: 22,
    // label: '22KW',
  },
  {
    value: 30,
    // label: '30KW',
  },
  {
    value: 37,
    // label: '37KW',
  },
  {
    value: 45,
    // label: '45KW',
  },
  {
    value: 52,
    label: '52KW',
  },
  {
    value: 55,
    // label: '55KW',
  },
  {
    value: 60,
    // label: '60KW',
  },
  {
    value: 67,
    // label: '67KW',
  },
  {
    value: 75,
    // label: '75KW',
  },
  {
    value: 81,
    // label: '81KW',
  },
  {
    value: 92,
    // label: '92KW',
  },
  {
    value: 110,
    label: '110KW',
  },
];
const marksHP = [
  { value: 1, label: '1hp', },
  { value: 1.5, /*label: '1.5hp',*/ },
  { value: 2, /*label: '2hp',*/ },
  { value: 3, /*label: '3hp',*/ },
  { value: 4, /*label: '4hp',*/ },
  { value: 5.5, /*label: '5.5hp',*/ },
  { value: 7.5, /*label: '7.5hp',*/ },
  { value: 10, /*label: '10hp',*/ },
  { value: 15, /*label: '15hp',*/ },
  { value: 20, /*label: '20hp',*/ },
  { value: 25, /*label: '25hp',*/ },
  { value: 30, /*label: '30hp',*/ },
  { value: 40, label: '40hp', },
  { value: 50, /*label: '50hp',*/ },
  { value: 60, /*label: '60hp',*/ },
  { value: 70, label: '70hp', },
  { value: 75, /*label: '75hp',*/ },
  { value: 80, /*label: '80hp',*/ },
  { value: 90, /*label: '90hp',*/ },
  { value: 100, label: '100hp', },
];
const marksV = [
  {
    value: 110,
    label: '110V',
  },
  {
    value: 220,
    // label: '220V',
  },
  {
    value: 380,
    label: '380V',
  },
];

export default function DialogWaterP(props) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm(); // initialize the hook
  // start code of dialog modal for water pump
  const { openD, setOpenD } = props;
  const [saveNew, setSaveNew] = useState(false);
  // const handleClickOpen = () => {
  //     setOpenD(true);
  // };
  const handleClose = () => {
    formReset();
    emptyForm();
    setOpenD(false);
    setSaveNew(false);
  };
  // end code of dialog modal for water pump
 
  const [brand, setBrand] = useState('');
  const waterPumpBrands = props.waterPumpBrands;
  const { waterListObject, setWaterListObject } = props;

  const [powerKW, setPowerKW] = useState(15);
  const [powerHP, setPowerHP] = useState(15);
  const [voltage, setVoltage] = useState(110);
  const [phase, setPhase] = useState("1Phase");
  // const [description, setDescription] = useState("");
  const [image, setImage] = useState({ oldImage: '', filePath: 'brand/pumpbrand/pump_list/', btnText: 'Image' });
  let imageFile = '';
  const [dataSheet, setDataSheet] = useState({ oldd: '', filePath: 'brand/pumpbrand/pump_list/data_sheet/', btnText: 'Data Sheet' });
  let dataSheetFile = '';
  const [graph, setGraph] = useState({ oldImage: '', filePath: 'brand/pumpbrand/pump_list/', btnText: 'Graph' });
  let graphFile = '';
  const eventhandlerIm = (data) => {
    imageFile = data;
    // console.log('images file data', data);
    // console.log('images file', imageFile);
  };
  const eventhandlerDaSh = data => {
    dataSheetFile = data;
    // console.log('dataSheetFile file', dataSheetFile);
  };
  const eventhandlerGr = data => {
    graphFile = data;
    // console.log('graphs file', graphFile);
    // console.log('graph', graph);
  };

  const emptyForm = () => {
    setWaterListObject([]);
    setPowerKW(15);
    setVoltage('');
    setPowerHP(15);
    setPhase('1Phase');
    // setDescription("");
    setImage({ ...image, oldImage: '' });
    setDataSheet({ ...dataSheet, oldImage: '' });
    setGraph({ ...graph, oldImage: '' });
  }

  useEffect(() => {
    setPowerKW(waterListObject.power ? waterListObject.power : 15);
    setPowerHP(waterListObject.power ? waterListObject.hp : 15);

    if (waterListObject?.pump_brand_id) {
      setBrand(waterListObject.pump_brand_id);
    } else {
      waterPumpBrands.map((wbrand, index) => {
        if (index === 0) { setBrand(wbrand.id); }
      });
    }
    setVoltage(waterListObject.voltage ? waterListObject.voltage : 110);
    setPhase(waterListObject.phase ? waterListObject.phase : '1Phase');
    // setDescription(waterListObject.discription);
    setImage({ ...image, oldImage: waterListObject.image?waterListObject.image:'' });
    setDataSheet({ ...dataSheet, oldImage: waterListObject.data_sheet ? waterListObject.data_sheet : '' });
    setGraph({ ...graph, oldImage: waterListObject.graph ? 'graph/' + waterListObject.graph : '' });
    if(props.waterListObject?.id){
      reset({
        waterListID: waterListObject?.id,
        name: waterListObject?.model,
        outlet: waterListObject?.outlet,
        current: waterListObject?.ampeier,
        diameter: waterListObject?.diameter,
        weight: waterListObject?.weight,
      });
    }
   
  }, [waterListObject, props.openD])

  const classes = useStyles();
  const formReset = ()=>{
    reset({
      waterListID: "",
      name: "",
      outlet: "",
      current: "",
      diameter: "",
      weight: "",
    });
  };
  const handleData =  (data)=>{
    data['brand'] = brand;
    data['powerKW'] = powerKW;
    data['powerHP'] = powerHP;
    data['phase'] = phase;
    data['voltage'] = voltage;
    data['imageFile'] = imageFile;
    data['dataSheetFile'] = dataSheetFile;
    data['graphFile'] = graphFile;
    data['serial_no'] = uuidv4();
    console.log("form data of handle Data", data);

    axios.post('api/pumpList', data)
      .then(res => {
          setWaterListObject([]);
          formReset();
          setSaveNew(true);
        // console.log('result ', res.data);
        NotificationManager.success(<IntlMessages id="notification.successMessage" />, <IntlMessages
          id="notification.titleHere" />);
      }).catch(err => {
        NotificationManager.error(<IntlMessages id="notification.errorMessage" />, <IntlMessages
          id="notification.titleHere" />);
      }
      );
  };
  const onSubmit = (data, e) => {
    data['brand'] = brand;
    data['powerKW'] = powerKW;
    data['powerHP'] = powerHP;
    data['phase'] = phase;
    data['voltage'] = voltage;
    data['imageFile'] = imageFile;
    data['dataSheetFile'] = dataSheetFile;
    data['graphFile'] = graphFile;
    data['serial_no'] = uuidv4();
    
    console.log(data);
    axios.post('api/pumpList', data)
      .then(res => {
        setSaveNew(false);
        handleClose();
        // console.log('result ', res.data);
        NotificationManager.success(<IntlMessages id="notification.successMessage" />, <IntlMessages
          id="notification.titleHere" />);
      }).catch(err => {
        NotificationManager.error(<IntlMessages id="notification.errorMessage" />, <IntlMessages
          id="notification.titleHere" />);
      }
      );
  }
  return (
    <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={openD}>
      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle id="customized-dialog-title" className='customizedDialogWaterP' onClose={handleClose}>
          Add Water Pump Device
            </DialogTitle>
        <DialogContent dividers>
          {/* <WaterPumpDeviceForm /> */}
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-12">

              <div className="row">
                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 insideFormBP">
                  <TextField id="id" type='hidden' style={{ width: '0%' }} name="waterListID" defaultValue={(waterListObject?.id) ? waterListObject?.id : ''} inputRef={register} />
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
                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 insideFormBP">
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
                      {waterPumpBrands.map(wbrand =>
                        <MenuItem value={wbrand.id}>{wbrand.name}</MenuItem>
                      )}
                    </Select>
                  </FormControl>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 insideFormBP">
                  <TextField id="name" size="small" variant="outlined" name="name" className="fullWidthInput" label="Name/Model" defaultValue={(waterListObject?.model)? waterListObject?.model :''} inputRef={register({ required: true })}
                    error={errors.name && true} helperText={errors.name ? '*required' : ''}
                  />
                </div>
                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 insideFormBP inputAdornmentWrap">
                  <FormControl fullWidth >
                    <TextField size="small" id="outlet" label="Outlet" variant="outlined"
                      name="outlet"
                      InputProps={{
                        endAdornment: <InputAdornment position="end">inch</InputAdornment>,
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      defaultValue={(waterListObject?.outlet)?waterListObject?.outlet:''} inputRef={register({ required: true, pattern: /^[+-]?([0-9]*[.])?[0-9]+$/, })}
                      error={errors.outlet && true} helperText={errors.outlet ? '*Please enter valid number.' : ''} />
                  </FormControl>

                </div>
                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 insideFormBP inputAdornmentWrap">
                  <FormControl fullWidth >
                    <TextField size="small" id="outlined-basic3" label="Current" variant="outlined"
                      name="current"
                      InputProps={{
                        endAdornment: <InputAdornment position="end">A</InputAdornment>,
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      defaultValue={(waterListObject?.ampeier)? waterListObject?.ampeier :''} inputRef={register({ required: true, pattern: /^[+-]?([0-9]*[.])?[0-9]+$/, })}
                      error={errors.current && true} helperText={errors.current ? '*Please enter valid number.' : ''} /> 
                  </FormControl>

                </div>
                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 insideFormBP inputAdornmentWrap">
                  <FormControl fullWidth >
                    <TextField size="small" id="outlined-basic4" label="Diameter" variant="outlined"
                      name="diameter"
                      InputProps={{
                        endAdornment: <InputAdornment position="end">inch</InputAdornment>,
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      defaultValue={waterListObject?.diameter?waterListObject?.diameter:''} inputRef={register({ required: true, pattern: /^[+-]?([0-9]*[.])?[0-9]+$/, })}
                      error={errors.diameter && true} helperText={errors.diameter ? '*Please enter valid number.' : ''}
                    />
                  </FormControl>

                </div>
                <div className="col-xl-5 col-lg-5 col-md-5 col-12 insideFormBP powerKW-PR inputAdornmentWrap">
                  <Typography id="discrete-slider-small-steps" gutterBottom >
                    Power to KW
                                </Typography>
                  <Slider name="powerKW" onChange={(event, value) => setPowerKW(value)}
                    defaultValue={(powerKW) ? powerKW : 15}
                    getAriaValueText={valuetext}
                    aria-labelledby="discrete-slider-small-steps"
                    step={null}
                    marks={marksKW}
                    min={0.75}
                    max={110}
                    valueLabelDisplay="auto"
                  />
                </div>
                <div className="col-xl-3 col-lg-3 col-md-3 col-12 insideFormBP voltage inputAdornmentWrap">
                  <Typography id="discrete-slider-small-steps" gutterBottom >
                    Voltage to V
                                </Typography>
                  <Slider name="voltage" onChange={(event, value) => setVoltage(value)}
                    defaultValue={(voltage) ? voltage : 110}
                    getAriaValueText={valuetext}
                    aria-labelledby="discrete-slider-small-steps"
                    step={null}
                    marks={marksV}
                    min={110}
                    max={380}
                    valueLabelDisplay="auto"
                  />
                </div>
                <div className="col-xl-4 col-lg-4 col-md-4 col-12 insideFormBP group_radio_phase insideFormPaddingWPS">
                  <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
                    <input type="radio" class="btn-check" name={`radio${phase}`} id="btnradio11Phase" autocomplete="off" checked={(phase === "1Phase" || phase === undefined) ? true : false} value="1Phase" onChange={event => setPhase(event.target.value)} />
                    <label class="btn btn-outline-primary" for="btnradio11Phase">1Phase</label>
                    <input type="radio" class="btn-check" name={`radio${phase}`} id="btnradio23Phase" autocomplete="off" checked={(phase === "3Phase") ? true : false} value="3Phase" onChange={event => setPhase(event.target.value)} />
                    <label class="btn btn-outline-primary" for="btnradio23Phase">3Phase</label>
                  </div>

                </div>
                <div className="col-xl-8 col-lg-8 col-md-8 col-12 insideFormBP powerHP inputAdornmentWrap">
                  <Typography id="discrete-slider-small-steps" gutterBottom >
                    Power to HP
                                </Typography>
                  <Slider name="powerHP" onChange={(event, value) => setPowerHP(value)}
                    defaultValue={(powerHP) ? powerHP : 15}
                    getAriaValueText={valuetext}
                    aria-labelledby="discrete-slider-small-steps"
                    step={null}
                    marks={marksHP}
                    min={1}
                    max={100}
                    valueLabelDisplay="auto"
                  />
                </div>
                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 insideFormBP inputAdornmentWrap">
                  <FormControl fullWidth >
                    <TextField size="small" id="outlined-basic21" label="Weight" variant="outlined"
                      name="weight"
                      InputProps={{
                        endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      defaultValue={waterListObject?.weight?waterListObject?.weight:''} inputRef={register({ required: true, pattern: /^[+-]?([0-9]*[.])?[0-9]+$/, })}
                      error={errors.weight && true} helperText={errors.weight ? '*Please enter valid number.' : ''} />
                  </FormControl>

                </div>
                {/* <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                                <div class="form-group">
                                    <textarea class={`form-control form-control-lg ${(touched && touched.description) && (error && error.description) ? 'error' : ''}`} name="description"  value={description} onChange={(e) => handleChangeField(e)} rows="2" spellcheck="false" placeholder="Short Description"></textarea>
                                    <span className={(touched && touched.description) && (error && error.description) ? 'displayBlock errorText' : 'displayNone'}>*required</span>
                                </div>
                            </div> */}
                <div className="col-xl-4 col-lg-4 col-md-4 col-12 waterPumFile waterPumpListFile">
                  <CustomDropzone formData={image} onChange={eventhandlerIm.bind(this)} />
                </div>
                <div className="col-xl-4 col-lg-4 col-md-4 col-12 waterPumFile waterPumpListFile">
                  <DataSheetFile formData={dataSheet} onChange={eventhandlerDaSh.bind(this)} />
                </div>
                <div className="col-xl-4 col-lg-4 col-md-4 col-12 waterPumFile waterPumpListFile">
                  <CustomDropzone formData={graph} onChange={eventhandlerGr.bind(this)} />
                </div>
              </div>
            </div>
          </div>
        </DialogContent>

        <DialogActions>
          <Button variant="contained" color="primary" className="jr-btn jr-btn-lg" disabled={waterListObject?.id? true : false} onClick={handleSubmit(handleData)}>Save & New</Button>
          <Button variant="contained" type="submit" color="primary" className="jr-btn jr-btn-lg">Submit</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}