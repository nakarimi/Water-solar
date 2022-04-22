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
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import Select from '@material-ui/core/Select';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import { v4 as uuidv4 } from 'uuid';
// code for small steps
import Slider from '@material-ui/core/Slider';
import axios from 'axios';
import {NotificationManager} from 'react-notifications';
import IntlMessages from 'util/IntlMessages';
// import * as type from 'yup';
// import { checkValidation, runValidation } from './utils';
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
  const marksM = [
    {
      value: 0,
      label: '0M',
    },
    {
      value: 500,
      label: '500M',
    },
  ];
  const marksD = [
    {
      value: 0,
      label: '0m³/h',
    },
    {
      value: 100,
      label: '100m³/h',
    },
  ];
  const marksCL = [
    {
      value: 0,
      label: '0M',
    },
    {
      value: 1000,
      label: '1000M',
    },
  ];
  // We need to wrap component in `forwardRef` in order to gain
// access to the ref object that is assigned using the `ref` prop.
// This ref is passed as the second parameter to the function component.
// const Child = forwardRef((props, ref) => {

//   // The component instance will be extended
//   // with whatever you return from the callback passed
//   // as the second argument
  // useImperativeHandle(ref, () => ({

  //   getAlert() {
  //     alert("getAlert from Child");
  //   }

  // }));

//   return <h1>Hi</h1>;
// });
// validation code
// const initialState = {
//   formData: {
//     cableTypes: {cableType: ''},
//   },
//   error: {},
//   touched: {},
//   isValid: false
// };

// const setState = 'SET_STATE';

// function reducer(state, action) {
//   switch(action.type) {
//     case setState:
//       return {
//         ...state,
//         ...action.payload
//       };
//     default:
//       return state;
//   }
// }
// const schema = type.object().shape({
//   cableType: type.string().required("Required"),
// });


// end validation code

export default function DialogSettingWD(props){
  
  const classes = useStyles();
    // start code of dialog modal for Solar Panal 
    const {openWSD, setOpenWSD} = props;
    const handleClose = () => {
      setOpenWSD(false);
      
    };
    // end code of dialog modal for Solar Panal 
    
    const pumpList_Id = props.pumpListId;
    const pumpListModel = props.pumpListModel;
     
    const [inputFields, setInputFields] = useState([
      { id: uuidv4(), head: [20, 100], discharge: [10, 30], cableLength: [300, 800], 'pumpListId': pumpList_Id, cableType: ''},
    ]);
    useEffect(() => {
      if(props.pumpListId!==0){
        getWaterPumpSettings(props.pumpListId);
      }
    },[props.pumpListId])
    
    const getWaterPumpSettings = async(id) => {
      console.log("id: ", id);
      if(id!==0 && id!==""){
        // console.log("ok it is not 0", id);
        axios.get('api/pumpListSetting/'+id)
        .then(res => { 
          let mydata = res.data;
          // console.log("the result: "+mydata + "length"+ mydata.length);
          const mainArray = []
          if(mydata.length !== 0){
            mydata.forEach(elem => {
              // console.log(elem); 
              mainArray.push({ id: elem.id, head: [elem.min_head,elem.max_head], discharge: [elem.min_discharge,elem.max_discharge], cableLength: [elem.min_cable_length,elem.max_cable_length], pumpListId: elem.pump_list_id, cableType: elem.cable_type_id});
            });
            // console.log('mainArray is: ',mainArray);
          }else{
            mainArray.push({ id: uuidv4(), head: [20, 100], discharge: [10, 30], cableLength: [300, 800], 'pumpListId': id, cableType: ''});
          }
          setInputFields(mainArray);
        }).catch(err => {
          
            NotificationManager.error(<IntlMessages id="notification.errorMessage"/>, <IntlMessages
                id="notification.titleHere"/>);
            }
          )
      }
    }
    
    // setInputFields(props.setInputFields);
    // inputFields[0].pump_list_id = pumpList_Id;
    const handleChangeStep = (id, event, value, name) => {
      const newInputFields = inputFields.map(i => {
        if(id === i.id) {
          if('head' === name){
            i['head'] = value;
          }
          else if('discharge' === name){
            i['discharge'] = value;
          }
          else if('cableLength' === name){
            i['cableLength'] = value;
          }
          
        }
        return i;
      })
      
      setInputFields(newInputFields);
    }
    const handleChangeInput = (id, event) => {
      const newInputFields = inputFields.map(i => {
        if(id === i.id) {
          i[event.target.name] = event.target.value
        }
        return i;
      })
      
      setInputFields(newInputFields);
    }
    const handleAddFields = () => {
      // console.log(inputFields);
      inputFields[0].pumpListId = pumpList_Id;
      let newElement = { id: uuidv4(), head: inputFields[inputFields.length-1].head, discharge: inputFields[inputFields.length-1].discharge, cableLength: inputFields[inputFields.length-1].cableLength, pumpListId: pumpList_Id, cableType: inputFields[inputFields.length-1].cableType};
      setInputFields([...inputFields, newElement])
      // console.log(inputFields);
      // console.log(pumpList_Id);
    }
    const handleRemoveFields = id => {
      const values  = [...inputFields];
      values.splice(values.findIndex(value => value.id === id), 1);
      setInputFields(values);
    }
    // start get cable type
    useEffect(() => {
      getCabletype();
      
    },[])

    const [cableTypesSelect,setCabletypesSelect]= useState([]);
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
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("InputFields", inputFields);
        axios.post('api/pumpListSetting', inputFields)
        .then(
            res => {
              console.log(res);
              // getWaterPDevices();
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
      <>
        

        <Dialog onClose={handleClose} className="dialogWD"  aria-labelledby="customized-dialog-title" open={openWSD}>
           <form autoComplete="off" onSubmit={handleSubmit}>  
            <DialogTitle id="customized-dialog-title" className='customizedDialogWaterP' onClose={handleClose}>
              Setup of {pumpListModel}
            </DialogTitle>
            <DialogContent dividers>
                {/* <WaterPumpDeviceSettingForm /> */}
                <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-12">
              { inputFields.map((inputField, index) => (
                <div key={id_field = inputField.id}>
                    <div className="row paddingBottom">
                        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12 insideFormPaddingWPS inputAdornmentWrap">
                              <Typography id="range-slider" gutterBottom>
                              head
                              </Typography>
                              <Slider name="head" onChange={(event, value) => handleChangeStep(inputField.id, event, value, 'head')}
                                  value={inputField.head}
                                  valueLabelDisplay="auto"
                                  aria-labelledby="range-slider"
                                  getAriaValueText={valuetext}
                                  min={0}
                                  max={500}
                                  marks={marksM}
                              />
                            {/* <Typography id="range-slider" gutterBottom>
                            Head 
                            </Typography>
                            <Slider name="head" onChange={(event, value) => handleChangeStep(inputField.id, event, value, 'head')}
                                getAriaValueText={valuetext}
                                aria-labelledby="range-slider"
                                marks={marksM}
                                max={400}
                                valueLabelDisplay="auto"
                            /> */}
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12 insideFormPaddingWPS dis-wps inputAdornmentWrap">
                              <Typography id="range-slider" gutterBottom>
                              Discharge
                              </Typography>
                              <Slider name="discharge" onChange={(event, value) => handleChangeStep(inputField.id, event, value, 'discharge')}
                                  value={inputField.discharge}
                                  valueLabelDisplay="auto"
                                  aria-labelledby="range-slider"
                                  getAriaValueText={valuetext}
                                  min={0}
                                  max={100}
                                  marks={marksD}
                              />
                            {/* <Typography id="range-slider" gutterBottom>
                            Discharge
                            </Typography>
                            <Slider name="discharge" onChange={(event, value) => handleChangeStep(inputField.id, event, value, 'discharge')}
                                // defaultValue={25}
                                getAriaValueText={valuetext}
                                aria-labelledby="range-slider"
                                // step={1}
                                marks={marksD}
                                min={0}
                                max={50}
                                valueLabelDisplay="auto"
                            /> */}
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12 insideFormPaddingWPS inWPS3 inputAdornmentWrap">
                              <Typography id="range-slider" gutterBottom>
                              Cable length
                              </Typography>
                              <Slider name="cableLength" onChange={(event, value) => handleChangeStep(inputField.id, event, value, 'cableLength')}
                                  value={inputField.cableLength}
                                  valueLabelDisplay="auto"
                                  aria-labelledby="range-slider"
                                  getAriaValueText={valuetext}
                                  min={0}
                                  max={1000}
                                  marks={marksCL}
                              />
                            {/* <Typography id="range-slider" gutterBottom>
                                Cable length
                            </Typography>
                            <Slider name="cableLength" onChange={(event, value) => handleChangeStep(inputField.id, event, value, 'cableLength')}
                                // defaultValue={500}
                                getAriaValueText={valuetext}
                                aria-labelledby="range-slider"
                                // step={10}
                                marks={marksCL}
                                min={0}
                                max={1000}
                                valueLabelDisplay="auto"
                            /> */}
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12 insideFormPadding inWPST">
                            <FormControl variant="outlined" size="small" className={classes.formControl}>
                                <InputLabel id="demo-simple-select-outlined-label">Cable Type</InputLabel>
                                <Select name="cableType"
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={inputField.cableType}
                                onChange={event => handleChangeInput(inputField.id, event)}
                                label="Cable Type"
                                >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {cableTypesSelect.map(cableOption => 
                                  <MenuItem value={cableOption.id}>{cableOption.name}</MenuItem>
                                  )}
                                </Select>
                            </FormControl>
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
    </>
    );
}
