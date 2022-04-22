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
import { NotificationManager } from 'react-notifications';
import { useForm } from 'react-hook-form';
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
  return `${value}KW`;
}
function valuetextDV(value) {
  return `${value}V`;
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
  { value: 0.75, label: '0.75KW', },
  { value: 1.1, /* label: '1.1KW',*/ },
  { value: 1.5,/* label: '1.5KW',*/ },
  { value: 2.2,/* label: '2.2KW',*/ },
  { value: 3,/* label: '3KW',*/ },
  { value: 3.7,/* label: '3.7KW',*/ },
  { value: 4,/* label: '4KW',*/ },
  { value: 5.5,/* label: '5.5KW',*/ },
  { value: 7.5,/* label: '7.5KW',*/ },
  { value: 11,/* label: '11KW',*/ },
  { value: 15,/* label: '15KW',*/ },
  { value: 18.5,/* label: '18.5KW',*/ },
  { value: 22,/* label: '22KW',*/ },
  { value: 30,/* label: '30KW',*/ },
  { value: 37,/* label: '37KW',*/ },
  { value: 45,/* label: '45KW',*/ },
  { value: 52,/* label: '52KW',*/ },
  { value: 55,/* label: '55KW',*/ },
  { value: 60,/* label: '60KW',*/ },
  { value: 67,/* label: '67KW',*/ },
  { value: 75,/* label: '75KW',*/ },
  { value: 81,/* label: '81KW',*/ },
  { value: 92,/* label: '92KW',*/ },
  { value: 110, label: '110KW', },
];
const marksV = [
  { value: 110, label: '110V', },
  { value: 220, /* label: '220V', */ },
  { value: 380, /*label: '380V',*/ },
  { value: 480, label: '480V', },
];
const marksVolDC = [
  { value: 100, label: '100V', },
  { value: 900, label: '900V', },
];
const marksVolAC = [
  { value: 100, label: '100V', },
  { value: 480, label: '480V', },
];

export default function DialogInvertor(props) {
  const { register, handleSubmit, errors, reset} = useForm(); // initialize the hook
  // start code of dialog modal for Solar Panal 
  const { openIn, setOpenIn } = props;
  const [saveNew, setSaveNew] = useState(false);
  const { invertorListObject, setInvertorListObject } = props;

  // end code of dialog modal for Solar Panal 
  const invertorBrands = props.invertorBrands;
  const [brand, setBrand] = useState('');
  const [powerKW, setPowerKW] = useState(150);
  const [voltage, setVoltage] = useState(100);
  const [voltageDC, setVoltageDC] = useState([100, 500]);
  const [voltageAC, setVoltageAC] = useState([100, 200]);
  const [description, setDescription] = useState("");

  const [image, setImage] = useState({ oldImage: '', filePath: 'brand/invertor/invertor_list/', btnText: 'Image' });
  let imageFile = '';
  const [dataSheet, setDataSheet] = useState({ oldImage: '', filePath: 'brand/invertor/invertor_list/data_sheet/', btnText: 'Data Sheet' });
  let dataSheetFile = '';
  const [diameter, setDiameter] = useState({ oldImage: '', filePath: 'brand/invertor/invertor_list/diameter/', btnText: 'Diameter' });
  let diameterFile = '';

  const eventhandlerIm = (data) => {
    imageFile = data;
    // console.log('images file data', data);
    // console.log('images file', imageFile);
  };
  const eventhandlerDaSh = data => {
    dataSheetFile = data;
    // console.log('dataSheetFile file', dataSheetFile);
  };
  const eventhandlerDia = data => {
    diameterFile = data;
    // console.log('dataSheetFile file', dataSheetFile);
  };

  const classes = useStyles();

  const handleCloseS = () => {
    formReset();
    emptyForm();
    setOpenIn(false);
    setSaveNew(false);
  };

  const emptyForm = () => {
    setInvertorListObject([]);
    setPowerKW(15);
    setVoltage(220);
    setVoltageDC([100, 500]);
    setVoltageDC([100, 200]);
    setDescription("");
    setImage({ ...image, oldImage: '' });
    setDataSheet({ ...dataSheet, oldImage: '' });
    setDiameter({ ...diameter, oldImage: '' });
  }

  useEffect(() => {
    let minAC = invertorListObject.voltage_ac_min ? invertorListObject.voltage_ac_min : 100;
    let maxAC = invertorListObject.voltage_ac_max ? invertorListObject.voltage_ac_max : 200;
    setVoltageAC([minAC, maxAC]);
    let min = invertorListObject.voltage_dc_min ? invertorListObject.voltage_dc_min : 100;
    let max = invertorListObject.voltage_dc_max ? invertorListObject.voltage_dc_max : 500;
    setVoltageDC([min, max]);
    if (invertorListObject?.invertor_brand_id) {
      setBrand(invertorListObject.invertor_brand_id);
    } else {
      invertorBrands.map((inBrand, index) => {
        if ((index + 1) === 1) { setBrand(inBrand.id); }
      });
    }
    setPowerKW(invertorListObject.power ? invertorListObject.power : 15);
    setVoltage(invertorListObject.voltage_ac ? invertorListObject.voltage_ac : 220);
    setDescription(invertorListObject.discription?invertorListObject.discription:'');
    setImage({ ...image, oldImage: invertorListObject.image?invertorListObject.image:''});
    setDataSheet({ ...dataSheet, oldImage: invertorListObject.data_sheet ? invertorListObject.data_sheet : '' });
    setDiameter({ ...diameter, oldImage: invertorListObject.diameter ? invertorListObject.diameter : '' });

    if(props.invertorListObject?.id){
      reset({
        invertorListID: invertorListObject.id,
        model: invertorListObject.model,
        current: invertorListObject.current,
      });
    }
  }, [props.invertorListObject, openIn])

  const formReset = ()=>{
    reset({
      invertorListID: "",
      model: "",
      current: "",
    });
  };
  const handleData =  (data)=>{
    data['brand'] = brand;
    data['powerKW'] = powerKW;
    data['voltage'] = voltage;
    data['voltageDC'] = voltageDC;
    data['voltageAC'] = voltageAC;
    data['description'] = description;
    data['imageFile'] = imageFile;
    data['dataSheetFile'] = dataSheetFile;
    data['diameterFile'] = diameterFile;
    // console.log("Inverter Data:", data);
    axios.post('api/invertorList', data)
      .then(res => {
          setInvertorListObject([]);
          formReset();
          setSaveNew(true);
        // console.log(res.data);
        NotificationManager.success(<IntlMessages id="notification.successMessage" />, <IntlMessages
          id="notification.titleHere" />);
      }).catch(err => {
        NotificationManager.error(<IntlMessages id="notification.errorMessage" />, <IntlMessages
          id="notification.titleHere" />);
      });
  };
  const onSubmit = (data) => {
    data['brand'] = brand;
    data['powerKW'] = powerKW;
    data['voltage'] = voltage;
    data['voltageDC'] = voltageDC;
    data['voltageAC'] = voltageAC;
    data['description'] = description;
    data['imageFile'] = imageFile;
    data['dataSheetFile'] = dataSheetFile;
    data['diameterFile'] = diameterFile;

    // console.log("Inverter Data:", data);
    axios.post('api/invertorList', data)
      .then(res => {
        setSaveNew(false);
        handleCloseS();
        // console.log(res.data);
        // setOpenIn(false);
        // emptyForm();
        NotificationManager.success(<IntlMessages id="notification.successMessage" />, <IntlMessages
          id="notification.titleHere" />);
      }).catch(err => {
        NotificationManager.error(<IntlMessages id="notification.errorMessage" />, <IntlMessages
          id="notification.titleHere" />);
      });

  }
  return (
    <Dialog onClose={handleCloseS} aria-labelledby="customized-dialog-title" open={openIn}>
      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle id="customized-dialog-title" className='customizedDialogWaterP' onClose={handleCloseS}>
          Add Inverter Device
            </DialogTitle>
        <DialogContent dividers>
          {/* <SolarPanalDeviceForm /> */}
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-12">

              <div className="row">
                <div className="col-xl-4 col-lg-4 col-md-4 col-12 insideFormBP">
                  <TextField id="id" type='hidden' style={{ width: '0%' }} name="invertorListID" defaultValue={(invertorListObject?.id) ? invertorListObject?.id : ''} inputRef={register} />
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
                    <InputLabel id="demo-simple-select-outlined-label" >Brand</InputLabel>
                    <Select name='brand'
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                      label="Brand"
                    >
                      <MenuItem value="">
                        <em></em>
                      </MenuItem>
                      {invertorBrands.map(brand =>
                        <MenuItem value={brand.id}>{brand.name}</MenuItem>
                      )}
                    </Select>
                  </FormControl>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-4 col-12 insideFormBP">
                  <TextField id="outlined-basic1" size="small" variant="outlined" name="model" className="fullWidthInput" label="Model" defaultValue={invertorListObject?.model} inputRef={register({ required: true })}
                    error={errors.model && true} helperText={errors.model ? '*required' : ''}
                  />
                </div>

                <div className="col-xl-8 col-lg-8 col-md-8 col-12 insideFormPadding1 inverPower inputAdornmentWrap">
                  <Typography id="discrete-slider-small-steps" gutterBottom>
                    Power (KW)
                  </Typography>
                  <Slider onChange={(event, value) => setPowerKW(value)}
                    defaultValue={powerKW ? powerKW : 150}
                    getAriaValueText={valuetext}
                    aria-labelledby="discrete-slider-small-steps"
                    step={null}
                    marks={marksKW}
                    min={0.75}
                    max={110}
                    valueLabelDisplay="auto"
                  />
                </div>

                <div className="col-xl-4 col-lg-4 col-md-4 col-12 insideFormPadding2 ivertor-vol inputAdornmentWrap">
                  <Typography id="discrete-slider-small-steps" gutterBottom>
                    Voltage
                  </Typography>
                  <Slider onChange={(event, value) => setVoltage(value)}
                    defaultValue={voltage ? voltage : 110}
                    getAriaValueText={valuetext}
                    aria-labelledby="discrete-slider-small-steps"
                    step={null}
                    marks={marksV}
                    min={110}
                    max={480}
                    valueLabelDisplay="auto"
                  />
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
                    defaultValue={invertorListObject?.current} inputRef={register({required: true, pattern: /^[+-]?([0-9]*[.])?[0-9]+$/,})} 
                    error={errors.current && true} helperText={errors.current ? '*Please enter valid number.' : ''}
                    />
                  </FormControl>
                </div>

                <div className="col-xl-4 col-lg-4 col-md-4 col-12 insideFormPadding3 ivertor-ac inputAdornmentWrap">
                  <Typography id="range-slider" gutterBottom>
                    Voltage (AC)
                  </Typography>
                  <Slider name="voltageDC" onChange={(event, value) => setVoltageAC(value)}
                    value={voltageAC}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    getAriaValueText={valuetextDV}
                    min={100}
                    max={480}
                    marks={marksVolAC}
                  />
                </div>
                
                <div className="col-xl-4 col-lg-4 col-md-4 col-12 insideFormPadding3 ivertor-dc pr-slider inputAdornmentWrap">
                  <Typography id="range-slider" gutterBottom>
                    Voltage (DC)
                  </Typography>
                  <Slider name="voltageDC" onChange={(event, value) => setVoltageDC(value)}
                    value={voltageDC}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    getAriaValueText={valuetextDV}
                    min={100}
                    max={900}
                    marks={marksVolDC}
                  />
                </div>

                <div className="col-xl-12 col-lg-12 col-md-12 col-12 descriptInvertor">
                  <div class="form-group">
                    <textarea class={`form-control form-control-lg`} id='description' name='description' value={description} onChange={e => setDescription(e.target.value)} rows="2" spellcheck="false" placeholder="Short Description"></textarea>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-4 col-12 waterPumFile waterPumpListFile">
                  <CustomDropzone formData={image} onChange={eventhandlerIm.bind(this)} />
                </div>
                <div className="col-xl-4 col-lg-4 col-md-4 col-12 waterPumFile waterPumpListFile">
                  <DataSheetFile formData={dataSheet} onChange={eventhandlerDaSh.bind(this)} />
                </div>
                <div className="col-xl-4 col-lg-4 col-md-4 col-12 waterPumFile waterPumpListFile">
                  <CustomDropzone formData={diameter} onChange={eventhandlerDia.bind(this)} />
                </div>
              </div>

            </div>
          </div>

        </DialogContent>

        <DialogActions>
          <Button variant="contained" color="primary" className="jr-btn jr-btn-lg" disabled={invertorListObject?.id? true : false} onClick={handleSubmit(handleData)}>Save & New</Button>
          <Button variant="contained" type="submit" color="primary" className="jr-btn jr-btn-lg">Submit</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}