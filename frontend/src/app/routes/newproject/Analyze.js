import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';

//form
import axios from 'axios';
// import TextField from '@material-ui/core/TextField';
// import Autocomplete from '@material-ui/lab/Autocomplete';
// import InputAdornment from '@material-ui/core/InputAdornment';
// import FormControl from '@material-ui/core/FormControl';
import {NotificationContainer,NotificationManager} from 'react-notifications';
import IntlMessages from 'util/IntlMessages';
//backdrop
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
//country flag
import Flags from 'country-flag-icons/react/3x2';
//chart iports
import {Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';

//alert 
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',

  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  
 
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
     
  },

  backgroundaccordiancolor:{
      backgroundColor: '#00000008',
      
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },

   rootalert: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));


function getFlag(countryname) {
  switch (countryname) {
    case 'Afghanistan':
      return <Flags.AF title="United States" className="customflag"/> ;
    case 'Italy':
      return <Flags.IT title="United States" className="customflag"/> ;
    case 'China':
      return <Flags.CH title="United States" className="customflag" />;
     case 'Iran':
     return <Flags.IR title="United States" className="customflag"/> ;
    default:
      return '';
  }
}

export default function Analyze(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // const {evaluationdata,setEvaluationdata}=props.evaluationdata;
 // const [citylocation,setCitylocation]=props.citylocation;
  
  useEffect(() => {
    if(props.evaluationdata) {
     docalculculation();
    }
    if(props.citylocation) {
      getIrredation();
    }
   
  },[props.evaluationdata,props.citylocation])

  const [openbackdrop,setOpenbackdrop]=React.useState(false);
  const [sugestedpump,setSugestedpump]=React.useState([]);
  const [cable,setCable]=React.useState([]);
  const [solar,setSolar]=React.useState([]);
  const [solarbrand,setSolarbrand]=React.useState([]);
  const [hrEnergy,setHrEnergy]=useState([]);
  const [energy,setEnergy]=useState([]);
  const [hrOutputP,setHrOutputP]=useState([]);
  const [monthlyHrOutput,setMonthlyHrOutput]=useState([]);

  const docalculculation=() => {
    setOpenbackdrop(true);
    // console.log("props evaluationdata: ", props.evaluationdata);
       axios.post('api/project-analyze', props.evaluationdata)
        .then(res => {
          console.log(res.data);
          setOpenbackdrop(false);
          setSugestedpump(res.data.pupm);
          setCable(res.data.cable);
          setSolar(res.data.solar);
          setSolarbrand(res.data.solarbrand);
          setHrEnergy(res.data.hrEnergy);
          setEnergy(res.data.energy);
          setHrOutputP(res.data.hrOutputP);
          setMonthlyHrOutput(res.data.monthlyHrOutput);
             NotificationManager.success(<IntlMessages id="notification.successMessage"/>, <IntlMessages
              id="notification.titleHere" />);
            }
      ).catch(err => {
        setOpenbackdrop(false);
              NotificationManager.error(<IntlMessages id="notification.errorMessage"/>, <IntlMessages
              id="notification.titleHere"/>);
            } 
        )
  }
  const [irdationAvregePerHour,setirdationAvregePerHour]=useState([]);
  const [irdformont,setIrdformont]=useState([]);
  
  const [avgmonth,setAvgmonth]=useState('');
  const getIrredation=() => {    
     setOpenbackdrop(true);
       axios.get('api/getIrredation/'+ props.citylocation)
        .then(res => {
          setOpenbackdrop(false);
          setirdationAvregePerHour(res.data.avForhour);
          setIrdformont(res.data.avForMonth);
          setAvgmonth(res.data.avgofeachmonth);
          
            }
      ).catch(err => {
        setOpenbackdrop(false);
              NotificationManager.error(<IntlMessages id="notification.errorMessage"/>, <IntlMessages
              id="notification.titleHere"/>);
            } 
        )
  }
  return (
    <>

      <Backdrop className={classes.backdrop} open={openbackdrop} >
        <CircularProgress color="inherit" />
      </Backdrop> 
      

    <div className={classes.root}>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          className={classes.backgroundaccordiancolor}
        >
          <Typography className={classes.heading}>Output</Typography>
        </AccordionSummary>
        <AccordionDetails>
         
           {/* start char */}
        
                <div className="col-md-7">
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={monthlyHrOutput}
                        margin={{top: 10, right: 0, left: -25, bottom: 0}}>
                        <XAxis dataKey="name"/>
                        <YAxis/>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <Tooltip/>
                        <Legend/>
                        <Bar dataKey="MonthlyOutput" fill="#3367d6"/> 
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="col-md-5">
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={hrOutputP}
                        margin={{top: 10, right: 0, left: -25, bottom: 0}}>
                        <XAxis dataKey="name"/>
                        <YAxis/>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <Tooltip/>
                        <Legend/>
                        <Bar dataKey="hrOutput" fill="#3367d6"/> 
                        </BarChart>
                    </ResponsiveContainer>
                </div> 
       
           {/* end chart */}
         
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
          className={classes.backgroundaccordiancolor}
        >
          <Typography className={classes.heading}>Irradiations</Typography>
         
        </AccordionSummary>

        <AccordionDetails>
             {/* start char */}
        
            <div className="col-md-7">
              
              <span class="badge badge-primary ml-4">Average = {avgmonth}</span>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={irdformont}
                        margin={{top: 10, right: 0, left: -25, bottom: 0}}>
                        <XAxis dataKey="name"/>
                        <YAxis/>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <Tooltip/>
                        <Legend/>
                        <Bar dataKey="value" fill="#ffc658"/> 
                </BarChart>
               
                    </ResponsiveContainer>
                  

                </div>
            <div className="col-md-5">
               <span class="badge badge-primary ml-4">Average = 50</span>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={irdationAvregePerHour}
                        margin={{top: 10, right: 0, left: -25, bottom: 0}}>
                        <XAxis dataKey="name"/>
                        <YAxis/>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <Tooltip/>
                        <Legend/>
                        <Bar dataKey="val" fill="#ffc658"/> 
                        </BarChart>
                    </ResponsiveContainer>
                </div> 
       
           {/* end chart */}
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
           className={classes.backgroundaccordiancolor}
        >
          <Typography className={classes.heading}>Energy</Typography>
        
        </AccordionSummary>
        <AccordionDetails>
             {/* start char */}
        
                <div className="col-md-7">
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={energy}
                        margin={{top: 10, right: 0, left: -25, bottom: 0}}>
                        <XAxis dataKey="name"/>
                        <YAxis/>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <Tooltip/>
                        <Legend/>
                        <Bar dataKey="energy" fill="#FF0000"/> 
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="col-md-5">
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={hrEnergy}
                        margin={{top: 10, right: 0, left: -25, bottom: 0}}>
                        <XAxis dataKey="name"/>
                        <YAxis/>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <Tooltip/>
                        <Legend/>
                        <Bar dataKey="hrEn" fill="#FF0000"/> 
                        </BarChart>
                    </ResponsiveContainer>
                </div> 
       
           {/* end chart */}
        </AccordionDetails>
      </Accordion>
      <div className="mt-4"></div>

        <h2>Water Pump:</h2>  
        {sugestedpump?.length !==0? (
          
          <>
          <strong className="mb-2" style={{marginBottom: '2px'}}> </strong>
            <div className="row">
              <div className="col-md-4"><strong>Made in: {sugestedpump[0].pump_brand.country}</strong>{getFlag(sugestedpump[0].pump_brand.country)} </div>
              <div className="col-md-4"><strong>Brand: {sugestedpump[0].pump_brand.name}</strong></div>
              <div className="col-md-4"><strong>Model: {sugestedpump[0].model}</strong></div>
            </div>

            <div className="row">
              <div className="col-md-4"><strong>Power: {sugestedpump[0].power}</strong></div>
              <div className="col-md-4"><strong>Current: {sugestedpump[0].Ampeier} </strong> </div>
              <div className="col-md-4"><strong>Cable: {cable.name}</strong>  </div>
            </div> 
            </>
        
        ):""}
        
        {sugestedpump?.length===0? (
             <div className={classes.rootalert}>
              <Alert severity="error">Water Pump Not found !</Alert>
            </div>
        ): ""}
       
     
      <Divider className="mb-3 mt-3" />
        <h2>Solar:</h2> 
        {solar?.length!==0? (
          <>
           <strong className="mb-2" style={{marginBottom: '2px'}}> </strong>
          <div className="row">
              <div className="col-md-4"><strong>Made in: {solarbrand.country}</strong> {getFlag(solarbrand.country)} </div>
            <div className="col-md-4"><strong>Brand: {solarbrand.name}</strong> </div>
              <div className="col-md-4"><strong>Model: {solar.model}</strong> </div>
         </div> 
      
         <div className="row">
              <div className="col-md-4"><strong>Power: {solar.power}</strong> </div>
              <div className="col-md-4"><strong>Structure: {solar.base}</strong></div>
              <div className="col-md-4"><strong>Quantity: {solar.solar_quantity}</strong> </div>
            </div> 

          </>  
        ):""}

        {solar?.length===0? (
           <div className={classes.rootalert}>
              <Alert severity="error">Solar  Not found !</Alert>
            </div>
        ):""}
        
      </div>
 <NotificationContainer/>
    </>  
  );
}
