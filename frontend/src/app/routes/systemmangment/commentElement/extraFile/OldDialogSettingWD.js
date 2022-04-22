import React, { useState } from "react";
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
// code for small steps
import Slider from '@material-ui/core/Slider';
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
      value: 400,
      label: '400M',
    },
  ];
  const marksD = [
    {
      value: 0,
      label: '0V',
    },
    {
      value: 50,
      label: '50V',
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
  
export default function DialogSettingWD(props){
    // start code of dialog modal for Solar Panal 
    const {openWSD, setOpenWSD} = props;
    const handleClose = () => {
      setOpenWSD(false);
    };
    // end code of dialog modal for Solar Panal 
    const [cableType, setCableType] = useState("");
    const [head, setHead] = useState("");
    const [discharge, setDischarge] = useState("");
    const [cableLength, setCableLength] = useState("");

    const classes = useStyles();

    const handleSubmit = (e) => {
        e.preventDefault();
        let data = {
            head, discharge, cableLength, cableType
        }
        console.log(data);
    }

    
    return (
        <Dialog onClose={handleClose} className="dialogWD"  aria-labelledby="customized-dialog-title" open={openWSD}>
           <form autoComplete="off" onSubmit={handleSubmit}>  
            <DialogTitle id="customized-dialog-title" className='customizedDialogWaterP' onClose={handleClose}>
              Setup
            </DialogTitle>
            <DialogContent dividers>
                {/* <WaterPumpDeviceSettingForm /> */}
                <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-12">
               
                    <div className="row">
                        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12 insideFormPaddingWPS inputAdornmentWrap">
                            <Typography id="discrete-slider-small-steps" gutterBottom>
                            Head 
                            </Typography>
                            <Slider onChange={(event, value) => setHead(value)}
                                defaultValue={200}
                                getAriaValueText={valuetext}
                                aria-labelledby="discrete-slider-small-steps"
                                step={5}
                                marks={marksM}
                                min={0}
                                max={400}
                                valueLabelDisplay="auto"
                            />
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12 insideFormPaddingWPS inputAdornmentWrap">
                            <Typography id="discrete-slider-small-steps" gutterBottom>
                            Discharge
                            </Typography>
                            <Slider onChange={(event, value) => setDischarge(value)}
                                defaultValue={25}
                                getAriaValueText={valuetext}
                                aria-labelledby="discrete-slider-small-steps"
                                step={1}
                                marks={marksD}
                                min={0}
                                max={50}
                                valueLabelDisplay="auto"
                            />
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12 insideFormPaddingWPS inWPS3 inputAdornmentWrap">
                            <Typography id="discrete-slider-small-steps" gutterBottom>
                                Cable length
                            </Typography>
                            <Slider onChange={(event, value) => setCableLength(value)}
                                defaultValue={500}
                                getAriaValueText={valuetext}
                                aria-labelledby="discrete-slider-small-steps"
                                step={10}
                                marks={marksCL}
                                min={0}
                                max={1000}
                                valueLabelDisplay="auto"
                            />
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12 insideFormPadding inWPST">
                            <FormControl variant="outlined" size="small" className={classes.formControl}>
                                <InputLabel id="demo-simple-select-outlined-label">Cable Type</InputLabel>
                                <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={cableType}
                                onChange={(e) => setCableType(e.target.value)}
                                label="Cable Type"
                                >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Cable Type 1</MenuItem>
                                <MenuItem value={20}>Cable Type 2</MenuItem>
                                <MenuItem value={30}>Cable Type 2</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                    
              </div>
          </div>
            </DialogContent>
            
            <DialogActions>
              <IconButton size="small" color="primary" aria-label="remove alarm">
                <RemoveCircleOutlineIcon />
              </IconButton>
              <IconButton size="small" color="primary" aria-label="remove alarm">
                <AddCircleOutlineIcon />
              </IconButton>
              <Button variant="contained" type="submit" color="primary" className="jr-btn jr-btn-lg ">Submit</Button>
            </DialogActions>
          </form>
        </Dialog>
    );
}