import React, { useState, useEffect } from "react";
// start import for dialog
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { v4 as uuidv4 } from 'uuid';
// code for small steps
import Slider from '@material-ui/core/Slider';
import axios from 'axios';
import {NotificationManager} from 'react-notifications';
import IntlMessages from 'util/IntlMessages';
import DropzoneSC from './DropzoneSC';
// import WaterPumpDeviceSettingForm from './WaterPumpDeviceSettingForm';
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

// const useStyles = makeStyles((theme) => ({
//     formControl: {
//       margin: theme.spacing(0),
//       minWidth: "100%",
//     },
//     selectEmpty: {
//       marginTop: theme.spacing(2),
//     },
//     option: {
//         fontSize: 15,
//         '& > span': {
//             marginRight: 10,
//             fontSize: 18,
//         },
//     },
//     root: {
//         width: 300,
//       },
      
//   }));
  // const marksP = [
  //   {
  //     value: 0,
  //     label: '0W',
  //   },
  //   {
  //     value: 240,
  //     label: '240W',
  //   },
  // ];
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
      // label: '52KW',
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
export default function DialogSettingWD(props){
    // start code of dialog modal for Solar Panal 
    const {openSPD, setOpenSPD} = props;
    const handleClose = () => {
      setOpenSPD(false);
    };
    // end code of dialog modal for Solar Panal 
  // const classes = useStyles();
   
  const solarList_Id = props.solarListId;
  const solarListModel = props.solarListModel;
  let imageFile = '';
  const [inputFields, setInputFields] = useState([
    { id: uuidv4(), mId: '', power: 15, base: 'Manual Tracker', quantity: '', panal: '', image: '', imageRaw: '', solar_list_id: solarList_Id},
  ]);
  const handleChangeInput = (id, event) => {
    const newInputFields = inputFields.map(i => {
      if(id === i.id) {
        i[event.target.name] = event.target.value
      }
      return i;
    })
    
    setInputFields(newInputFields);
  }
  const handleChangeRadio = (id, event) => {
    const newInputFields = inputFields.map(i => {
      if(id === i.id) {
        // console.log("base value", event.target.value);
        i['base'] = event.target.value
      }
      return i;
    })
    
    setInputFields(newInputFields);
  }
  
  const handleChangeStep = (id, event, value, name) => {
    const newInputFields = inputFields.map(i => {
      if(id === i.id) {
        if('power' === name){
          i['power'] = value;
        }
      }
      return i;
    })
    
    setInputFields(newInputFields);
  }
  const handleAddFields = () => {
    let newElement = { id: uuidv4(), mId: '', power: inputFields[inputFields.length-1].power, base: inputFields[inputFields.length-1].base, quantity: inputFields[inputFields.length-1].quantity, panal: inputFields[inputFields.length-1].panal, image: '', imageRaw: '', solar_list_id: solarList_Id};
    setInputFields([...inputFields, newElement])
  }
  const handleRemoveFields = id => {
    const values  = [...inputFields];
    values.splice(values.findIndex(value => value.id === id), 1);
    setInputFields(values);
  }
  
  useEffect(() => {
    // console.log("solarList Id before if", props.solarListId);
    if(props.solarListId!==0){
      // inputFields[0].solarListId=props.solarListId;
      getSolarListSettings(props.solarListId);
      // console.log("solarList Id inside if", props.solarListId);
    }
    // console.log("solarList Id outside if", props.solarListId); 
     
    // console.log("solarList Id outside if", props.solarListId);  
  },[props.solarListId])
  const eventhandlerSoCImage = data => {
    imageFile = data[0];
    const newInputFields = inputFields.map(i => {
      if(i.id === data[1]) {
        i['imageRaw'] = imageFile;
      }
      return i;
    })
    
    setInputFields(newInputFields);
    // console.log('data config file', data);
    // console.log('newInputFields', newInputFields);
  };
  const getSolarListSettings = async(id) => {
    // console.log("id: ", id);
    if(id!==0 && id!==""){
      // console.log("ok it is not 0", id);
      axios.get('api/solarListSetting/'+id)
      .then(res => { 
        let mydata = res.data;
        // console.log("the result: "+ mydata + "length"+ mydata.length);
        const mainArray = []
        if(mydata.length !== 0){
          mydata.forEach(elem => {
            // console.log(elem); 
            mainArray.push({ id: elem.id, mId: elem.id, power: elem.power, base: elem.base, quantity: elem.solar_quantity, panal: elem.panal_quantity, image: elem.image, imageRaw: '', solar_list_id: elem.solar_list_id});
          });
          // console.log('mainArray is: ',mainArray);
        }else{
          mainArray.push({ id: uuidv4(), mId: '', power: 15, base: 'Manual Tracker', quantity: '', panal: '', image: '', imageRaw: '', solar_list_id: id});
        }
        setInputFields(mainArray);
      }).catch(err => {
        
          NotificationManager.error(<IntlMessages id="notification.errorMessage"/>, <IntlMessages
              id="notification.titleHere"/>);
          }
        )
    }
  }
  const handleSubmit = (e) => {
      e.preventDefault();
      // let data = {
      //     power, base, quantity, panal, files
      // }
      // console.log(inputFields);
      axios.post('api/solarListSetting', inputFields)
        .then(
            res => {
              // console.log(res);
              getSolarListSettings(solarList_Id);
              NotificationManager.success(<IntlMessages id="notification.successMessage"/>, <IntlMessages
              id="notification.titleHere" />);
              handleClose();
            }
        ).catch(
            err =>{
              NotificationManager.error(<IntlMessages id="notification.errorMessage"/>, <IntlMessages
              id="notification.titleHere"/>);
                console.log(err);
            } 
        )
  }
  let id_field;
    return (
        <Dialog onClose={handleClose} className="dialogWD" fullWidth={'md'} maxWidth={'md'} aria-labelledby="customized-dialog-title" open={openSPD}>
           <form autoComplete="off" onSubmit={handleSubmit}>  
            <DialogTitle id="customized-dialog-title" className='customizedDialogWaterP' onClose={handleClose}>
              Setup of {solarListModel}
            </DialogTitle>
            <DialogContent dividers>
                <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                    { inputFields.map(inputField => (
                    <div key={id_field = inputField.id}>
                      <div className="row insideSPDS paddingBottom">
                          <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12 insideFormPaddingWPS powerKW-SS1 inputAdornmentWrap">
                            <Typography id="discrete-slider-small-steps" gutterBottom >
                            Power to KW 
                            </Typography>
                            <Slider name="power" onChange={(event, value) => handleChangeStep(inputField.id, event, value, 'power')}
                                defaultValue={(inputField.power)?inputField.power: 15 }
                                getAriaValueText={valuetext}
                                aria-labelledby="discrete-slider-small-steps"
                                step={null}
                                marks={marksKW}
                                min={0.75}
                                max={110}
                                valueLabelDisplay="auto"
                            />
                            {/* <Typography id="range-slider" gutterBottom>
                                  Power
                              </Typography>
                              <Slider name="power" onChange={(event, value) => handleChangeStep(inputField.id, event, value, 'power')}
                                  value={inputField.power}
                                  valueLabelDisplay="auto"
                                  aria-labelledby="range-slider"
                                  getAriaValueText={valuetext}
                                  min={0}
                                  max={240}
                                  marks={marksP}
                              /> */}
                          </div>
                          <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12 insideFormPaddingWPS inWPSG2 inputAdornmentWrap">
                              <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
                                  <input type="radio" class="btn-check" name={"btnradio1"+id_field} id={"btnradio1"+id_field} autocomplete="off" checked={(inputField.base)==='Manual Tracker'} value="Manual Tracker" onChange={event => handleChangeRadio(inputField.id, event)}/>
                                  <label class="btn btn-outline-primary" for={"btnradio1"+id_field}>Manual Tracker</label>
                                  <input type="radio" class="btn-check" name={"btnradio2"+id_field} id={"btnradio2"+id_field} autocomplete="off" checked={(inputField.base)==='Ground Structure'} value="Ground Structure" onChange={event => handleChangeRadio(inputField.id, event)}/>
                                  <label class="btn btn-outline-primary" for={"btnradio2"+id_field}>Ground Structure</label>
                              </div>
                          </div>
                          <div className="col-xl-2 col-lg-2 col-md-6 col-sm-12 col-12 insideFormPaddingWPS inWPS3 inputAdornmentWrap col1-m1">
                              <TextField required size="small" name="quantity" value={inputField.quantity} onChange={event => handleChangeInput(inputField.id, event)}
                                  id={`outlined-number1`+inputField.id}
                                  label="Solar Qty"
                                  type="number"
                                  InputLabelProps={{
                                      shrink: true,
                                  }}
                                  variant="outlined"
                              />
                          </div>
                          <div className="col-xl-2 col-lg-2 col-md-6 col-sm-12 col-12 insideFormPaddingWPS col1-m1">
                              <TextField required size="small" name="panal" value={inputField.panal} onChange={event => handleChangeInput(inputField.id, event)}
                                  id={"outlined-number"+inputField.id}
                                  label="Stand Qty"
                                  type="number"
                                  InputLabelProps={{
                                      shrink: true,
                                  }}
                                  variant="outlined"
                              />
                          </div>
                          <div className="col-xl-3 col-lg-3 col-md-6 col-12 iaccessory_file waterPumFle solarCDropzone">
                                  <DropzoneSC onChange={eventhandlerSoCImage.bind(this)} image={inputField.image} fieldId={inputField.id}/>
                          </div>

                      </div>
                  </div>
                  )) }
              </div>
          </div>
            </DialogContent>
            
            <DialogActions>
              <IconButton size="small" color="primary" aria-label="remove alarm" disabled={inputFields.length === 1} onClick={() => handleRemoveFields(id_field)}>
                <RemoveCircleOutlineIcon />
              </IconButton>
              <IconButton size="small" color="primary" aria-label="remove alarm" onClick={handleAddFields}>
                <AddCircleOutlineIcon />
              </IconButton>
              <Button variant="contained" type="submit" color="primary" className="jr-btn jr-btn-lg ">Submit</Button>
            </DialogActions>
          </form>
        </Dialog>
    );
}