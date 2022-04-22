import React,{useEffect,useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles} from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {Button} from 'reactstrap';
import axios from 'axios';
import {useForm} from 'react-hook-form';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import CardBox from 'components/CardBox';
import Sliderr from "react-slick";
import './custome.css';
import Alert from '@material-ui/lab/Alert';
//slider
import Slider from '@material-ui/core/Slider';

//circal slider
import { CircleSlider } from "react-circle-slider";
//daynamic form
import {v4 as uuidv4} from 'uuid';
// form
import {NotificationContainer,NotificationManager} from 'react-notifications';
import IntlMessages from 'util/IntlMessages';
//back drop
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import Project from './Project';

function valuetext(value) {
  return `${value}°C`;
}

const marks = [
  {
    value: 0,
    label: '0°C',
  },
  {
    value: 20,
    label: '20°C',
  },
  {
    value: 37,
    label: '37°C',
  },
  {
    value: 100,
    label: '100°C',
  },
];

const daynomicheadrange = [
  {
    value: 0,
    label: 'm',
  },

  {
    value: 30,
    label: '37m',
  },

  {
    value: 100,
    label: '100m',
  },
   {
    value: 200,
    label: '200m',
  },
  
  {
    value: 300,
    label: '300m',
  }, 

    {
    value: 400,
    label: '400m',
  }, 
];


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
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
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles=makeStyles((theme) => ({
    rootslider: {
      height: 200,
      marginLeft:40,
      
  },

   backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
   
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    mainHieght: 600,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
   option: {
    fontSize: 15,
    '& > span': {
      marginRight: 10,
      fontSize: 18,
    },
  },
   cardstyle:{
    padding: '0px',
    boxShadow: 'none',
} 
}));

const imagehieght = {
  height: '420px',
  width: '500px',
}
 
export default function VerticalTabs() {

//slider 
  const options = {
    // dots: true,
    infinite: false,
    arrows: false,
    speed: 500,
    slidesToShow:3,
    marginRight: 10,
    slidesToScroll: 1,

    responsive: [
      {
        breakpoint: 1050,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          dots: false
        }
      }, {
        breakpoint: 850,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: false
        }
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false
        }
      }
    ]
  };


  const classes=useStyles();
  const [value,setValue]=React.useState(0);
  const handleChange=(event,newValue) => {
    console.log('this',event);
    setValue(newValue);
  };

  const navigate=(id) => {
     setValue(id);
  }

  const navigateback=(id) => {
     setValue(id);
  }

  //solar and pump
  const solarbrand=(id,index) => {
    setSolarstate(index);
    setSolarvalue(id);
  }

  const pumpbrand=(id,index) => {
    setPumpstate(index);
    setPumpvalue(id);
  }

  function toggelactivestyle(index) {
    if(solarstate===index) {
      return "activebrand img-thumbnail rounded mx-auto d-block imagebrandhieght";
    } else {
      return "img-thumbnail rounded mx-auto d-block imagebrandhieght";
    }
  }

    function toggelactivestylepump(index) {
    if(pumpstate===index) {
      return "activebrand img-thumbnail rounded mx-auto d-block imagebrandhieght";
    } else {
      return "img-thumbnail rounded mx-auto d-block imagebrandhieght";
    }
  }
//end solar and brand
  const [daynomichead,setDaynomichead]=useState('');
  const [watertem,setWatertem]=useState([]);
  const [country,setCountry]=React.useState({});
  const [city,setCity]=React.useState("");

  const [projectname,setProjectname]=React.useState("");
  const [discription,setDiscription]=React.useState("");

  const [dirtloss,setDirtloss]=React.useState("");
  const [motorcable,setMotorcable]=React.useState("");


  //pump and solar
  const [solarstate,setSolarstate]=useState('');
  const [pumpstate,setPumpstate]=useState('');

  const [solarvalue,setSolarvalue]=useState('');
  const [pumpvalue,setPumpvalue]=useState('');
  //end pump and solar

  const [open,setOpen]=React.useState(false);
 

  const {register,handleSubmit}=useForm(); // initialize the hook
  const onSubmit=(data) => {
    setOpen(true);

      let alldata = {
      daynomichead,watertem,city,country,projectname,discription,dirtloss,motorcable,
      solarvalue,pumpvalue,valueCircalslider,inputFields,
      }
      axios.post('api/project', alldata)
        .then(res => {
          setOpen(false);
          navigate(5);
             NotificationManager.success(<IntlMessages id="notification.successMessage"/>, <IntlMessages
              id="notification.titleHere" />);
            }
      ).catch(err => {
        setOpen(false);
              NotificationManager.error(<IntlMessages id="notification.errorMessage"/>, <IntlMessages
              id="notification.titleHere"/>);
            } 
        )
  };


  //circal slider
  const [valueCircalslider,setValueCircalslider]=React.useState('');

    const handleChangeCircalslider = (valueCircalslider) => {
        //console.log(`Changed value ${value}`);
    console.log(valueCircalslider);
        setValueCircalslider(valueCircalslider);
  };
  
  const handlseelctitem=(event,value,id) => {  
     inputFields[id].item=value.id;
  }

  const handlselectuom=(event,value,index) => {
   inputFields[index].uomid=value.id;
  }

  const handlchangquantity=(value, index) => {
     inputFields[index].quantity=value;
  }
  //daynamic form
    const [inputFields, setInputFields] = useState([
          {id: '',item: '',uomid: '',quantity: ''},
          {id: '',item: '',uomid: '',quantity: ''},
          { id: '',item: '',uomid: '', quantity: ''},
  ]);
  
   const handleAddFields = () => {
      setInputFields([...inputFields, { id: '', item: '', uomid: '', quantity: ''}])
  }
  
     const handleRemoveFields = () => {
      const values  = [...inputFields];
      values.splice(values.length-1, 1);
      setInputFields(values);
  }
  

const [location,setLocation]=useState([]);
const [solar,setSolar]=useState([]);
const [pump,setPump]=useState([]);
const [accessories,setAccessories]=useState([]);
const [uom,setUom]=useState([]);

  useEffect(() => {
        getProjectdata();
  },[])

  const getProjectdata=async () => {
    axios.get('api/gitprojectdata')
      .then(res => {  
        setLocation(res.data.geolocation);
        setSolar(res.data.solarbrand);
        setPump(res.data.pumpbrand);
        setAccessories(res.data.accessories);
        setUom(res.data.uom);
      
      }
        
    ).catch(err => {
           NotificationManager.error(<IntlMessages id="notification.errorMessage"/>, <IntlMessages
            id="notification.titleHere"/>);
          }
      )
  };

  const [imagepath,setImagepath]=useState('/images/General layout.png');
  const [myImage,setMyImage]=useState('fade-in img-thumbnail rounded mx-auto d-block');
  const [foucus,setFoucus]=useState(false);

  const dirtlossMouseOver=(wichInput,wichfunction) => {

    if(wichInput==="dirt" &&wichfunction==="focus") {
       setFoucus(true)
       setMyImage('fade-incustom img-thumbnail rounded mx-auto d-block')
       setImagepath('/images/System layout.png')
    }

    if(wichInput==="dirt"&&wichfunction==="hover") {
      if(!foucus) {
        setMyImage('fade-incustom img-thumbnail rounded mx-auto d-block')
        setImagepath('/images/System layout.png')
      }
     
     }

    if(wichInput==="motor"&&wichfunction==="focus") {
      setFoucus(true)
      setMyImage('fade-incustom img-thumbnail rounded mx-auto d-block')
      setImagepath('/images/Motor Cable layout.png')
    }

    if(wichInput==="motor"&&wichfunction==="hover") {
      if(!foucus) {
        setMyImage('fade-incustom img-thumbnail rounded mx-auto d-block')
        setImagepath('/images/Motor Cable layout.png')
      }  
    }

    if(wichInput==="head"&&wichfunction==="focus") {
        setFoucus(true)
        setMyImage('fade-incustom img-thumbnail rounded mx-auto d-block')
        setImagepath('/images/Hight layout.png')
    }

    if(wichInput==="head"&&wichfunction==="hover") {
      if(!foucus) {
        setMyImage('fade-incustom img-thumbnail rounded mx-auto d-block')
        setImagepath('/images/Hight layout.png')
      }
    }

    if(wichInput==="temp"&&wichfunction==="focus") {
         setFoucus(true)
        setMyImage('fade-incustom img-thumbnail rounded mx-auto d-block')
        setImagepath('/images/System details layout.png')
    }
    if(wichInput==="temp"&&wichfunction==="hover") {
      if(!foucus) {
        setMyImage('fade-incustom img-thumbnail rounded mx-auto d-block')
        setImagepath('/images/System details layout.png')
      } 
      }
  }
  const dirtlossMouseLeave=(wichfunction) => {
    if(wichfunction==="fout") {
         setFoucus(false)
     setMyImage('fade-in img-thumbnail rounded mx-auto d-block')
     setImagepath('/images/General layout.png')
    }

     if(!foucus) {
       setMyImage('fade-in img-thumbnail rounded mx-auto d-block')
       setImagepath('/images/General layout.png')
    }
    
  }

 
  
  return (
  
<>
    <Project/>
    <div className={classes.root}>

       <Backdrop className={classes.backdrop} open={open} >
        <CircularProgress color="inherit" />
      </Backdrop>
      
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab label="Step One" {...a11yProps(0)} />
        <Tab label="Step Two" {...a11yProps(1)} />
        <Tab label="Step Three" {...a11yProps(2)} />
        <Tab label="Step Four" {...a11yProps(3)} />
        <Tab label="Step Five" {...a11yProps(4)} />
        <Tab label="Success" {...a11yProps(5)} disabled/>
   
      </Tabs>
 
 <form  onSubmit={handleSubmit(onSubmit)}>     
      <TabPanel value={value} index={0} style={{width: 1100}}>
        
        <div className="row">
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
             <div className="row">
              <div>  
                <h1>The step one</h1> 
                <h3>In this step you should slect the complate name of project  !</h3>
              </div>
            </div> 

        <div className="row"> 
          <div className="col-md-6 p-2">
             <FormControl fullWidth>  

            <Autocomplete  
            id="country-select-demo" value={country}  onChange={(event, newValue) => {setCountry(newValue);}}
            style={{ width: 300 }}
            options={location}
            classes={{
            option: classes.option,
            }}
            autoHighlight
            getOptionLabel={(option) => option.country}
            renderOption={(option) => (
            <React.Fragment>
                {option.country}
            </React.Fragment>
            )}
            renderInput={(params) => (
            <TextField size="small" 
                {...params}
                label="Select Country"
                variant="outlined"
                  helperText="Full width!"
                placeholder="pick the country !"
                margin="normal"
                name="location"
                InputLabelProps={{
                  shrink: true,
                }}

                inputProps={{
                ...params.inputProps,
                autoComplete: 'new-password', // disable autocomplete and autofill
                }}
              />
                    )}
                />  
            </FormControl> 
            </div>    

           <div className="col-md-6 p-2">
             <FormControl fullWidth >  
              <Autocomplete  
            id="country-select-demo" value={city} onChange={(event, newValue) => {setCity(newValue);}}
            style={{ width: 300 }}
            options={location}
            classes={{
            option: classes.option,
            }}
            autoHighlight
            getOptionLabel={(option) => option.city}
            renderOption={(option) => (
            <React.Fragment>
                {option.city}
            </React.Fragment>
            )}
            renderInput={(params) => (
            <TextField size="small" 
                {...params}
                label="Select the City"
                variant="outlined"
                helperText="Full width!"
                placeholder="pick the City !"
                margin="normal"
                name="location"
                InputLabelProps={{
                  shrink: true,
                }}

                inputProps={{
                ...params.inputProps,
                autoComplete: 'new-password', // disable autocomplete and autofill
                }}
               />
                )}
              />  
              </FormControl> 
            </div> 

             <FormControl fullWidth className="p-2">  
              <TextField id="outlined-basic" label="Poject Name" variant="outlined"
                helperText="Full width!"
                placeholder="complate Project name !"
                margin="normal"
                name="project_name" 
                    value={projectname}    
                onChange={(event)=> setProjectname(event.target.value)}    
                InputLabelProps={{
                  shrink: true,
                }}
              />
                </FormControl>  

              <FormControl fullWidth className="p-2">  
              <TextField id="outlined-basic" label="Discription" variant="outlined"
                helperText="Full width!"
                placeholder="Discription About Project  !"
                    margin="normal"
                    name="discription"    
                    multiline   
                    value={discription}   
                    onChange={(event)=> setDiscription(event.target.value)}  
                InputLabelProps={{
                  shrink: true,
                }}
              inputRef={register}/>
                </FormControl> 
              
              <Button onClick={() => navigate(1)} color="primary" variant="contained">Next</Button>              
            </div>  

          
          </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 mt-3">
            <img src="/images/General layout.png" className="fade-in img-thumbnail rounded mx-auto d-block" alt="Responsive" style={imagehieght}/>
            </div> 
            
          </div>  
          
      </TabPanel>
        <TabPanel value={value} index={1} style={{width:1100}}>
        <div className="row">
           
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
             <div className="row">
              <div>  
                <h1>The step Tow</h1> 
                <h3>In this step you should insert the project details  !</h3>
              </div>
            </div> 

      <div className="row"> 
        <div className="col-md-6">        
          <FormControl fullWidth >  
              <TextField id="outlined-basic" label="Dist loss" variant="outlined"
                helperText="Full width!"
                placeholder="Dirt loss !"
                margin="normal"
                      name="dist_loss" 
                type="number"      
                InputProps={{
                  endAdornment: <InputAdornment position="end">%</InputAdornment>,
                }}
                InputLabelProps={{
                  shrink: true,
                      }}
                  value={dirtloss}   
                   onChange={(event) => setDirtloss(event.target.value)} 
                     onMouseOver={()=> dirtlossMouseOver('dirt','hover')}
                     onMouseLeave={()=> dirtlossMouseLeave('xy')}
                     onFocus={() => dirtlossMouseOver('dirt','focus')}
                    onBlur={()=> dirtlossMouseLeave('fout')}  
                      
                      
              />
              </FormControl> 

             <FormControl fullWidth>  
              <TextField id="outlined-basic" label="Motor Cable" variant="outlined"
                helperText="Full width!"
                placeholder="Motor cable!"
                margin="normal"
                      name="motor_cable" 
                  type="number"       
                InputLabelProps={{
                shrink: true,
                    }}
                  InputProps={{
                endAdornment: <InputAdornment position="end">m</InputAdornment>,
                      }} 
                  value={motorcable}   
                      onChange={(event) => setMotorcable(event.target.value)}  
                      onMouseOver={()=> dirtlossMouseOver('motor','hover')}
                     onMouseLeave={()=> dirtlossMouseLeave('xy')}
                     onFocus={() => dirtlossMouseOver('motor','focus')}
                    onBlur={()=> dirtlossMouseLeave('fout')}  
             />
                  </FormControl> 

                </div>
                <div className="col-md-6 row">
                  <div className={classes.rootslider} styleName={`ml-1`}>
                      <Typography id="vertical-slider" gutterBottom className="pb-3">
                     Head
                    </Typography>
                    <Slider
                       onChange={(event,newValue) => {setDaynomichead(newValue);}}
                      orientation="vertical"
                      defaultValue={30}
                      aria-labelledby="vertical-slider"
                      marks={daynomicheadrange}
                      max={400}
                      step={1}
                      getAriaValueText={valuetext}
                      valueLabelDisplay="auto"
              
                      onMouseOver={()=> dirtlossMouseOver('head','hover')}
                      onMouseLeave={()=> dirtlossMouseLeave('xy')}
                      onFocus={() => dirtlossMouseOver('head','focus')}
                      onBlur={()=> dirtlossMouseLeave('fout')}  
                      />
                  </div>
                  
                   <div className={classes.rootslider}>
                   <Typography id="vertical-slider" gutterBottom className="pb-3">
                     Water Temp
                    </Typography>
                  
                    <Slider
                     onChange={(event,newValue) => {setWatertem(newValue);}}  
                      name="watertemprature"
                        orientation="vertical"
                        defaultValue={[20, 37]}
                        aria-labelledby="vertical-slider"
                      marks={marks}
                      step={1}
                      getAriaValueText={valuetext}
                      valueLabelDisplay="auto"
                 
                      onMouseOver={()=> dirtlossMouseOver('temp','hover')}
                      onMouseLeave={()=> dirtlossMouseLeave('xy')}
                      onFocus={() => dirtlossMouseOver('temp','focus')}
                      onBlur={()=> dirtlossMouseLeave('fout')}  
                      
                    />
               
                    </div>
               
                </div>  
                 <Button onClick={() => navigateback(0)} variant="contained" color="secondary" className="mt-2">Previous</Button>
               <Button onClick={() => navigate(2)} color="primary" variant="contained" className="mt-2">Next</Button>
            
            
              </div>  

          </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 mt-3">
              <img src={imagepath} className={myImage} alt="Responsive" style={imagehieght} />
              
              
            </div> 
            
          </div>  
        </TabPanel>
        
      <TabPanel value={value} index={2} style={{width:1100}}>
          <div className="row">
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
             <div className="row ">
              <div>  
                <h1>The step three</h1> 
                <h3>In this step you should insert the project information  !</h3>
              </div>
            </div> 

              <div className="row ml-4 mb-5">    
               <CircleSlider
                  value={valueCircalslider}
                  size={240}
                  onChange={()=> setValueCircalslider(value)}
                  knobRadius={15}
                  progressWidth={10}
                  circleWidth={25}
                  showTooltip={true}
                  tooltipSize={26}
                  max={30}
                  />
              </div> 
              
              <span className="ml-5">
           <Button onClick={() => navigateback(1)} variant="contained" color="secondary">Previous</Button>       
                <Button onClick={() => navigate(3)} color="primary" variant="contained">Next</Button>
               
              </span>  
          </div>
          
            
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 mt-3 pull-right">
            <img src="/images/General layout.png" className="fade-in img-thumbnail rounded mx-auto d-block" alt="Responsive" style={imagehieght}/>
            </div> 
            
          </div> 
      </TabPanel>
      <TabPanel value={value} index={3} style={{width:1100}}>
           <div className="row">
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
             <div className="row">
              <div>  
                <h1>The step Four</h1> 
                <h3>In this step you should insert the project information  !</h3>
              </div>
            </div> 

              <div className="row ">  

      <CardBox styleName="col-lg-12 customeCard" cardStyle="text-center"
                  heading="Water pump Brand">
       
         <Sliderr className="slick-app-frame" {...options}>
               {solar.map((data,index) => {  
                     
             return <span key={index} onClick={()=> solarbrand(data.id,index)} >        
            <div className="slick-slide-item">
               <div className="brand-logo">
                  <div>
                   <img src={`http://localhost:8000/brand/solar/${data.image}`} className={toggelactivestyle(index)} alt="Responsive" />
                  </div>
               </div>
                </div>
              </span>         
             })} 
                     
           
          </Sliderr>        
      </CardBox>
      <CardBox styleName="col-lg-12 customeCard" cardStyle="text-center"
        heading="Water pump Brand">
       
         <Sliderr className="slick-app-frame" {...options}>
                    {pump.map((data,index) => {  
                      return <span key={index} onClick={() => pumpbrand(data.id,index)}>        
            <div class="slick-slide-item">
               <div className="brand-logo">
                  <div>
                   <img src={`http://localhost:8000/brand/pumpbrand/${data.image}`} class={toggelactivestylepump(index)} alt="Responsive" />
                  </div>
               </div>
                    </div>
              </span>         
             })} 
          </Sliderr>        
      </CardBox>          
                
              </div>  
            <Button  onClick={() => navigateback(2)} variant="contained" color="secondary">Previous</Button> 
             <Button onClick={() => navigate(4)} color="primary" variant="contained">Next</Button>    
        
          </div>
          
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 mt-3">
            <img src="/images/General layout.png" className="fade-in img-thumbnail rounded mx-auto d-block" alt="Responsive" style={imagehieght}/>
            </div> 
            
          </div> 
        </TabPanel>

          <TabPanel value={value} index={4} style={{width:1100}}>
           <div className="row">
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
             <div className="row">
              <div>  
                <h1>The step Five</h1> 
                <h3>In this step you should insert the project information  !</h3>
              </div>
            </div> 


              {inputFields.map((inputField,index) => (      
              
              <div className="row">  
              <div className="col-md-6">
                    
            <FormControl fullWidth >  
              <Autocomplete  
            id="country-select-demo"  onChange={(event, newValue) => handlseelctitem(event,newValue,index)}
            style={{ width: 300 }}
            options={accessories}
            classes={{
            option: classes.option,
            }}
            autoHighlight
            getOptionLabel={(option) => option.name}
            renderOption={(option) => (
            <React.Fragment>
                {option.name}
            </React.Fragment>
            )}
            renderInput={(params) => (
            <TextField size="small" 
                {...params}
                label="Item"
                variant="outlined"
                helperText="Full width!"
                placeholder="pick item !"
                margin="normal"
                name="item"
                 size="small" 
                InputLabelProps={{
                  shrink: true,
                }}

                inputProps={{
                ...params.inputProps,
                autoComplete: 'new-password', // disable autocomplete and autofill
                }}
               />
                )}
              />  
              </FormControl>
                </div>  

                <div className="col-md-3">
            <FormControl fullWidth >  
              <Autocomplete  
            id="country-select-demo"   onChange={(event, newValue) => handlselectuom(event,newValue,index)}
            style={{ width: 300 }}
            options={uom}
            classes={{
            option: classes.option,
            }}
            autoHighlight
            getOptionLabel={(option) => option.acronym}
            renderOption={(option) => (
            <React.Fragment>
                {option.acronym}
            </React.Fragment>
            )}
            renderInput={(params) => (
            <TextField size="small" 
                {...params}
                label="UoM"
                variant="outlined"
                placeholder="pick UoM!"
                margin="normal"
                name="location"
                InputLabelProps={{
                  shrink: true,
                }}
                 size="small" 

                inputProps={{
                ...params.inputProps,
                autoComplete: 'new-password', // disable autocomplete and autofill
                }}
                />
                )}
              />  
              </FormControl>
                </div>
                  <div className="col-md-3">
                    
              <FormControl fullWidth >  
              <TextField id="outlined-basic" label='Quantity'
              variant="outlined"
                placeholder="Quantity"
                margin="normal"
                name="Quantity" 
                onChange= {(event)=> handlchangquantity(event.target.value, index)}     
                 //value={inputFields.quantity}      
                InputLabelProps={{
                shrink: true,
                      }}
                
              size="small"    
             />
                </FormControl>   
                </div>
              </div>             
            ))}  
          

               <IconButton color="primary" aria-label="upload picture" component="span"  onClick={handleAddFields}>
                 <span class="material-icons">
                          add_circle_outline
                          </span>
              </IconButton>

              <IconButton color="primary" aria-label="upload picture" component="span" onClick={handleRemoveFields} disabled={inputFields.length<=1}>
                 <span class="material-icons">
                          remove_circle_outline
                          </span>
              </IconButton>
              <div className="mt-3"></div>
              <span className="mt-3">
              <Button onClick={() => navigateback(3)} variant="contained" color="secondary">Previous</Button> 
                <Button color="primary" variant="contained" type="submit">Submit</Button>
              </span>  
            </div>
             
          
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 mt-3">
            <img src="/images/General layout.png" className="fade-in img-thumbnail rounded mx-auto d-block" alt="Responsive" style={imagehieght}/>
            </div> 
            
          </div> 
        </TabPanel>

         <TabPanel value={value} index={5} style={{width:1100}}>
           <div className="row justify-content-center custompargraph">
        
           
            <Alert severity="success" color="info">
            <h1 color="success">Congratulations Project Successfully Inserted !</h1>  
              
            </Alert>

            <p className="mt-3">

              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled 
            </p>

            <Button variant="contained" color="success" className="mt-5 p-3" size="large">
           
              View project summary
            </Button>

          </div> 
        </TabPanel>
      </form>  

       <NotificationContainer/>
  
      </div>

    </>  
  );
}
