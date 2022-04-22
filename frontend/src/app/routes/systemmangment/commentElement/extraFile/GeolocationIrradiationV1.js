import React, { useState} from "react";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
// start code for bar chart
import CardBox from 'components/CardBox';
import {Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
// end code for bar chart

// start import for dialog
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
// end import for dialog 
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import AccordionActions from '@material-ui/core/AccordionActions';
import { v4 as uuidv4 } from 'uuid';
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
      rootAcc: {
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, .03)',
        borderBottom: '1px solid rgba(0, 0, 0, .125)',
      },
      footerAcc: {
        backgroundColor: 'rgba(0 0 0 / 20%)',
        borderBottom: '1px solid rgba(0 0 0 / 30%)',
      },
      
    }));
  // Accordation code 
    
  // end Accordation code
export default function DialogWaterP(props){
  const [expanded, setExpanded] = useState('January');
  const handleChangePanel = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
    // start code of dialog modal for water pump
    const {openGeoIr, setOpenGeoIr} = props;
    const [inputFieldsIrr, setInputFieldsIrr] = useState([
        { id: uuidv4(), month: 'January', time6_7: '', time7_8: '', time8_9: '', time9_10: '', time10_11: '', time11_12: '', time12_1: '', time1_2: '', time2_3: '', time3_4: '', time4_5: '', time5_6: ''} ,
        { id: uuidv4(), month: 'February', time6_7: '', time7_8: '', time8_9: '', time9_10: '', time10_11: '', time11_12: '', time12_1: '', time1_2: '', time2_3: '', time3_4: '', time4_5: '', time5_6: ''} ,
        { id: uuidv4(), month: 'March', time6_7: '', time7_8: '', time8_9: '', time9_10: '', time10_11: '', time11_12: '', time12_1: '', time1_2: '', time2_3: '', time3_4: '', time4_5: '', time5_6: ''} ,
        { id: uuidv4(), month: 'April', time6_7: '', time7_8: '', time8_9: '', time9_10: '', time10_11: '', time11_12: '', time12_1: '', time1_2: '', time2_3: '', time3_4: '', time4_5: '', time5_6: ''} ,
        { id: uuidv4(), month: 'May', time6_7: '', time7_8: '', time8_9: '', time9_10: '', time10_11: '', time11_12: '', time12_1: '', time1_2: '', time2_3: '', time3_4: '', time4_5: '', time5_6: ''} ,
        { id: uuidv4(), month: 'June', time6_7: '', time7_8: '', time8_9: '', time9_10: '', time10_11: '', time11_12: '', time12_1: '', time1_2: '', time2_3: '', time3_4: '', time4_5: '', time5_6: ''} ,
        { id: uuidv4(), month: 'July', time6_7: '', time7_8: '', time8_9: '', time9_10: '', time10_11: '', time11_12: '', time12_1: '', time1_2: '', time2_3: '', time3_4: '', time4_5: '', time5_6: ''} ,
        { id: uuidv4(), month: 'August', time6_7: '', time7_8: '', time8_9: '', time9_10: '', time10_11: '', time11_12: '', time12_1: '', time1_2: '', time2_3: '', time3_4: '', time4_5: '', time5_6: ''} ,
        { id: uuidv4(), month: 'September', time6_7: '', time7_8: '', time8_9: '', time9_10: '', time10_11: '', time11_12: '', time12_1: '', time1_2: '', time2_3: '', time3_4: '', time4_5: '', time5_6: ''} ,
        { id: uuidv4(), month: 'October', time6_7: '', time7_8: '', time8_9: '', time9_10: '', time10_11: '', time11_12: '', time12_1: '', time1_2: '', time2_3: '', time3_4: '', time4_5: '', time5_6: ''} ,
        { id: uuidv4(), month: 'November', time6_7: '', time7_8: '', time8_9: '', time9_10: '', time10_11: '', time11_12: '', time12_1: '', time1_2: '', time2_3: '', time3_4: '', time4_5: '', time5_6: ''} ,
        { id: uuidv4(), month: 'December', time6_7: '', time7_8: '', time8_9: '', time9_10: '', time10_11: '', time11_12: '', time12_1: '', time1_2: '', time2_3: '', time3_4: '', time4_5: '', time5_6: ''} ,
    ]);
    // const monthsInputFields=[
    //   'January','February','March','April','May','June','July','August','September','October', 'November', 'December'
    // ];
    const timeLable = ['6:00-7:00 AM', '7:00-8:00 AM', '8:00-9:00 AM', '9:00-10:00 AM', '10:00-11:00 AM', '11:00-12:00 AM', '12:00-1:00 PM', '1:00-2:00 PM','2:00-3:00 PM','3:00-4:00 PM','4:00-5:00 PM','5:00-6:00 PM'];
    
    const timeName = ['time6_7', 'time7_8', 'time8_9', 'time9_10', 'time10_11', 'time11_12', 'time12_1', 'time1_2', 'time2_3', 'time3_4', 'time4_5', 'time5_6'];
    const data = [
      {name: '6-7', Irradiation: 4, amt: 2400},
      {name: '7-8', Irradiation: 3, amt: 2210},
      {name: '8-9', Irradiation: 2, amt: 2290},
      {name: '9-10', Irradiation: 2, amt: 2000},
      {name: '10-11', Irradiation: 1, amt: 2181},
      {name: '11-12', Irradiation: 2, amt: 2500},
      {name: '12-1', Irradiation: 30, amt: 2100},
      {name: '1-2', Irradiation: 90, amt: 2100},
      {name: '2-3', Irradiation: 40, amt: 2100},
      {name: '3-4', Irradiation: 49, amt: 2100},
      {name: '4-5', Irradiation: 9, amt: 2100},
      {name: '5-6', Irradiation: 10, amt: 2100},
    ];
    
   
    const handleClose = () => {
        setOpenGeoIr(false);
    };
    // end code of dialog modal for water pump
     
    const classes = useStyles();
   
    const handleSubmit = (e, id) => {
      e.preventDefault();
      var newInputFieldsIrr1;
      inputFieldsIrr.map(i => {
        if(id === i.id) {
          return (newInputFieldsIrr1=i);
        }
      })
      console.log("IrradiationInputs", newInputFieldsIrr1);

    }
    

    const handleChangeInput = (id, event) => {

        const newInputFieldsIrr = inputFieldsIrr.map(i => {
          if(id === i.id) {
            i[event.target.name] = event.target.value
          }
          return i;
        })
        
        setInputFieldsIrr(newInputFieldsIrr);
    }
    // const handleAddFields = (id) => {
    //   for(var i=1; i<monthsInputFields.length; i++){
    //     if(i === id){
    //       setInputFieldsIrr([...inputFieldsIrr, { id: uuidv4(), month: monthsInputFields[id+1], time6_7: '', time7_8: '', time8_9: '', time9_10: '', time10_11: '', time11_12: '', time12_1: '', time1_2: '', time2_3: '', time3_4: '', time4_5: '', time5_6: ''}])
    //     }
    //   }
    // }
    let myVar;
    var inputField;
    return (
        <Dialog onClose={handleClose}  aria-labelledby="customized-dialog-title" open={openGeoIr} maxWidth="md" fullWidth='md'>
            {/* <form autoComplete="off" onSubmit={handleSubmit}> */}
            <DialogTitle id="customized-dialog-title" className='customizedDialogWaterP' onClose={handleClose}>
              Set Irradiation For: kabul
            </DialogTitle>
            <DialogContent dividers>
                <div className={classes.Acc}>
                {/* { monthsInputFields.map(monthInputFields => ( */}
                { inputFieldsIrr.map(inputField => (
                  <form autoComplete="off" onSubmit={e => handleSubmit(e, inputField.id)}>
                    <Accordion defaultExpanded={inputField.month=== 'January'} expanded={expanded === inputField.month} onChange={handleChangePanel(inputField.month)}>
                        <AccordionSummary className={classes.rootAcc}
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                        <Typography >{inputField.month} </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <div className="row barCharGeo">
                            <div className="col-xl-6 col-lg-6 col-md-12 col-12">
                                    <div className="row " key={myVar = inputField.month}>
                                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 myFormControl">
                                            <TextField id={inputField.month+timeName[0]} size="small" className="fullWidthInput" name={timeName[0]} label={timeLable[0]} value={inputField.time6_7} onChange={(event) => handleChangeInput(inputField.id, event)} variant="outlined" />
                                        </div>
                                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 myFormControl">
                                            <TextField id={inputField.month+timeName[1]} size="small" className="fullWidthInput" name={timeName[1]} label={timeLable[1]} value={inputField.time7_8} onChange={(event) => handleChangeInput(inputField.id, event)} variant="outlined" />
                                        </div>
                                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 myFormControl">
                                            <TextField id={inputField.month+timeName[2]} label={timeLable[2]} size="small" className="fullWidthInput" name={timeName[2]} label={timeLable[2]} value={inputField.time8_9} onChange={(event) => handleChangeInput(inputField.id, event)} variant="outlined" />
                                        </div>
                                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 myFormControl">
                                            <TextField id={inputField.month+timeName[3]} size="small" className="fullWidthInput" name={timeName[3]} label={timeLable[3]} value={inputField.time9_10} onChange={(event) => handleChangeInput(inputField.id, event)} variant="outlined" />
                                        </div>
                                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 myFormControl">
                                            <TextField id={inputField.month+timeName[4]} size="small" className="fullWidthInput" name={timeName[4]} label={timeLable[4]} value={inputField.time10_11} onChange={(event) => handleChangeInput(inputField.id, event)} variant="outlined" />
                                        </div>
                                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 myFormControl">
                                            <TextField id={inputField.month+timeName[5]} label={timeLable[5]} size="small" className="fullWidthInput" name={timeName[5]} label={timeLable[5]} value={inputField.time11_12} onChange={(event) => handleChangeInput(inputField.id, event)} variant="outlined" />
                                        </div>
                                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 myFormControl">
                                            <TextField id={inputField.month+timeName[6]} size="small" className="fullWidthInput" name={timeName[6]} label={timeLable[6]} value={inputField.time12_1} onChange={(event) => handleChangeInput(inputField.id, event)} variant="outlined" />
                                        </div>
                                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 myFormControl">
                                            <TextField id={inputField.month+timeName[7]} size="small" className="fullWidthInput" name={timeName[7]} label={timeLable[7]} value={inputField.time1_2} onChange={(event) => handleChangeInput(inputField.id, event)} variant="outlined" />
                                        </div>
                                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 myFormControl">
                                            <TextField id={inputField.month+timeName[8]} size="small" className="fullWidthInput" name={timeName[8]} label={timeLable[8]} value={inputField.time2_3} onChange={(event) => handleChangeInput(inputField.id, event)} variant="outlined" />
                                        </div>
                                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 myFormControl">
                                            <TextField id={inputField.month+timeName[9]} size="small" className="fullWidthInput" name={timeName[9]} label={timeLable[9]} value={inputField.time3_4} onChange={(event) => handleChangeInput(inputField.id, event)} variant="outlined" />
                                        </div>
                                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 myFormControl">
                                            <TextField id={inputField.month+timeName[10]} size="small" className="fullWidthInput" name={timeName[10]} label={timeLable[10]} value={inputField.time4_5} onChange={(event) => handleChangeInput(inputField.id, event)} variant="outlined" />
                                        </div>
                                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 myFormControl">
                                            <TextField id={inputField.month+timeName[11]} size="small" className="fullWidthInput" name={timeName[11]} label={timeLable[11]} value={inputField.time5_6} onChange={(event) => handleChangeInput(inputField.id, event)} variant="outlined" />
                                        </div>
                                         
                                    </div>
                            </div>
                            <CardBox heading="" >
                              <ResponsiveContainer width="100%" height={200}>
                                <BarChart data={data}
                                          margin={{top: 10, right: 0, left: -15, bottom: 0}}>
                                  <XAxis dataKey="name"/>
                                  <YAxis/>
                                  <CartesianGrid strokeDasharray="3 3"/>
                                  <Tooltip/>
                                  <Legend/>
                                  <Bar dataKey="Irradiation" fill="#3367d6"/>
                                  {/* <Bar dataKey="uv" fill="#ffc658"/> */}
                                </BarChart>
                              </ResponsiveContainer>
                            </CardBox>
                        </div>
                        
                        </AccordionDetails>
                        <Divider />
                        <AccordionActions className={classes.footerAcc}>
                        <Button variant="contained" type="submit" color="primary" className="jr-btn jr-btn-lg ">Save</Button>
                          {/* <Button size="small" color="primary" type="submit" >
                            Save
                          </Button> */}
                        </AccordionActions>
                    </Accordion>
                    </form>
                    )) }
                    
                </div>
              
            </DialogContent>
            
            <DialogActions>
            {/* <Button variant="contained" type="submit" color="primary" className="jr-btn jr-btn-lg ">Submit</Button> */}
            </DialogActions>
            {/* </form> */}
        </Dialog>
    );
}