import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Tooltip from "@material-ui/core/Tooltip";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Alert from "@material-ui/lab/Alert";
import { useForm } from "react-hook-form";
//css
import "./custome.css";
//validation
import * as type from "yup";
import { checkValidation, runValidation } from "./utils";
//backdrop
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
//country flag
import Flags from "country-flag-icons/react/3x2";
//form import
import axios from "axios";
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import IntlMessages from "util/IntlMessages";
//slider
import CardBox from "components/CardBox";
import Sliderr from "react-slick";
//dialog
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import CloseIcon from "@material-ui/icons/Close";
//analize project
import Analyze from "./Analyze";

// Start code for brand stepper selection
// import Stepper from "@material-ui/core/Stepper";
// import Step from "@material-ui/core/Step";
// import StepLabel from "@material-ui/core/StepLabel";
import PropTypes from 'prop-types';
import LocalDrinkIcon from '@material-ui/icons/LocalDrink';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import FlashAutoIcon from '@material-ui/icons/FlashAuto';
import StepConnector from "@material-ui/core/StepConnector";
import clsx from 'clsx';
// end code of brand stepper selection

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});
const useStylesBootstrap = makeStyles((theme) => ({
  arrow: {
    color: "#f4f4f7",
  },
  tooltip: {
    // width: '153px',
    textAlign: "justify",
    backgroundColor: "#f4f4f7",
    color: "#000",
    fontFamily: "Roboto",
  },
}));

function BootstrapTooltip(props) {
  const classes = useStylesBootstrap();

  return (
    <Tooltip
      arrow
      enterDelay={2000}
      leaveDelay={50}
      classes={classes}
      {...props}
    />
  );
}

//slider
const options = {
  // dots: true,
  infinite: false,
  arrows: false,
  speed: 300,
  slidesToShow: 3,
  marginRight: 5,
  slidesToScroll: 1,

  responsive: [
    {
      breakpoint: 1050,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        dots: false,
      },
    },
    {
      breakpoint: 850,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: false,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        dots: false,
      },
    },
    {
      breakpoint: 400,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
      },
    },
  ],
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },

  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  popover: {
    pointerEvents: "none",
  },
  paper: {
    padding: theme.spacing(1),
  },
}));

function getSteps() {
  return ["", "", ""];
}

//dialog
const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
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

//end dialog

function getFlag(countryname) {
  switch (countryname) {
    case "Afghanistan":
      return <Flags.AF title="United States" className="customflag" />;
    case "Italy":
      return <Flags.IT title="United States" className="customflag" />;
    case "China":
      return <Flags.CH title="United States" className="customflag" />;
    case "Iran":
      return <Flags.IR title="United States" className="customflag" />;
    default:
      return "";
  }
}

//validation
const initialState = {
  formData: {
    projectname: "",
  },
  error: {},
  touched: {},
  isValid: false,
};

const setState = "SET_STATE";

function reducer(state, action) {
  switch (action.type) {
    case setState:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
const schema = type.object().shape({
  // country: type.object().required("Required"),
  projectname: type.string().required("Required"),
});

//end validation

// start code of brand stepper
const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    '& $line': {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  completed: {
    '& $line': {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
  },
})(StepConnector);

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <LocalDrinkIcon />,
    2: <WbSunnyIcon />,
    3: <FlashAutoIcon />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};
const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  },
  completed: {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  },
});
function getStepsBrand() {
  return ['Select Water Pump Brand', 'Select Solar Brand', 'Select Inverter Brand'];
}
function getStepContent(step) {
  switch (step) {
    case 0:
      return 'Select campaign settings...';
    case 1:
      return 'What is an ad group anyways?';
    case 2:
      return 'This is the bit I really care about!';
    default:
      return 'Unknown step';
  }
}
// end code of brand stepper
export default function Project() {
  const [{ formData, error, touched, isValid }, dispatch] = React.useReducer(
    reducer,
    initialState
  );

  const handlchangfild = async ({ target: { name, value } }) => {
    if (name === "projectname") {
      setProjectname(value);
    }

    const schemaErrors = await runValidation(schema, {
      ...formData,
      [name]: value,
    });
    dispatch({
      type: setState,
      payload: {
        error: schemaErrors,
        formData: { ...formData, [name]: value },
        touched: { ...touched, [name]: true },
        isValid: checkValidation(schemaErrors),
      },
    });
  };

  const handgleCountry = async (event, value) => {
    setCountry(value);
    let name = "country";
    // const schemaErrors = await runValidation(schema, {
    //   ...formData, [name]: value
    // });
    // dispatch({
    //   type: setState,
    //   payload: {
    //     error: schemaErrors,
    //     formData: { ...formData, [name]: value },
    //     touched: { ...touched, [name]: true },
    //     isValid: checkValidation(schemaErrors)
    //   }
    // });
  };

  const handcahngeCity = async (event, value) => {
    setCity(value);
    let name = "city";
    const schemaErrors = await runValidation(schema, {
      ...formData,
      [name]: value,
    });
    dispatch({
      type: setState,
      payload: {
        error: schemaErrors,
        formData: { ...formData, [name]: value },
        touched: { ...touched, [name]: true },
        isValid: checkValidation(schemaErrors),
      },
    });
  };
  // start brand stepper state code
  const [activeStepBrand, setActiveStepBrand] = React.useState(1);
  const stepsBrand = getStepsBrand();
  const handleNextBrand = () => {
    setActiveStepBrand((prevActiveStepBrand) => prevActiveStepBrand + 1);
  };

  const handleBackBrand = () => {
    setActiveStepBrand((prevActiveStepBrand) => prevActiveStepBrand - 1);
  };

  const handleResetBrand = () => {
    setActiveStepBrand(0);
  };
  // end brand stepper State code

  //solar and pump
  const [solarbrandname, setSolarbrandname] = useState();
  const solarbrand = (id, name, index) => {
    setSolarstate(index);
    setSolarvalue(id);
    setSolarbrandname(name);
  };
  const [pumpbrandname, setPumpbrandname] = useState();
  const pumpbrand = (id, name, index) => {
    setPumpstate(index);
    setPumpvalue(id);
    setPumpbrandname(name);
  };

  const [invertorbrandname, setInvertorbrandname] = useState();
  const invertorbrand = (id, name, index) => {
    setInvertorstate(index);
    setInvertorvalue(id);
    setInvertorbrandname(name);
  };

  function toggelactivestyle(index) {
    if (solarstate === index) {
      return "activebrand brand-logo";
    } else {
      return "brand-logo";
    }
  }

  function toggelactivestylepump(index) {
    if (pumpstate === index) {
      return "activebrand brand-logo";
    } else {
      return "brand-logo";
    }
  }

  function toggelactivestyleinvertor(index) {
    if (invertorstate === index) {
      return "activebrand brand-logo";
    } else {
      return "brand-logo";
    }
  }
  //end solar and brand
  //Dialog
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //start steeper
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  //end stepper
  // start code for mouse poppur
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const openEl = Boolean(anchorEl);
  // end mouse poppur
  //database data
  const [location, setLocation] = useState([]);
  const [solar, setSolar] = useState([]);
  const [solarWatts, setSolarWatt] = useState([]);
  const [solarSelectWatt, setSolarSelectWatt] = useState('');
  const [pump, setPump] = useState([]);
  const [invertor, setInvertor] = useState([]);
  const [accessories, setAccessories] = useState([]);
  const [uom, setUom] = useState([]);
  const [dbcity, setDbcity] = useState([]);
  //pump and solar
  const [solarstate, setSolarstate] = useState("");
  const [solarvalue, setSolarvalue] = useState("");
  const [pumpstate, setPumpstate] = useState("");
  const [pumpvalue, setPumpvalue] = useState("");
  const [invertorstate, setInvertorstate] = useState("");
  const [invertorvalue, setInvertorvalue] = useState("");
  //end pump and solar

  //start form value
  const [projectname, setProjectname] = React.useState("");
  const [bas, setBas] = React.useState("Manual Tracker");
  const [country, setCountry] = React.useState({});
  const [city, setCity] = React.useState([]);
  const [daynomichead, setDaynomichead] = useState();
  const [motorcable, setMotorcable] = React.useState("");
  const [piplenght, setPiplenght] = React.useState();
  const [dirtloss, setDirtloss] = React.useState(5);
  const [discharge, setDischarge] = React.useState("");

  //start dynomic form
  const handlseelctitem = (event, value, id) => {
    inputFields[id].item = value.id;
  };

  const handlchangquantity = (value, index) => {
    inputFields[index].quantity = value;
  };

  const [inputFields, setInputFields] = useState([
    { id: "", item: "", quantity: "" },
  ]);

  const handleAddFields = () => {
    setInputFields([
      ...inputFields,
      { id: "", item: "", uomid: "", quantity: "" },
    ]);
  };

  const handleRemoveFields = () => {
    const values = [...inputFields];
    values.splice(values.length - 1, 1);
    setInputFields(values);
  };

  useEffect(() => {
    getProjectdata();
  }, []);

  const getProjectdata = async () => {
    setOpenbackdrop(true);
    handleResetBrand();
    axios.get("api/gitprojectdata")
      .then((res) => {
        console.log(res.data)
        setOpenbackdrop(false);
        setLocation(res.data.countrylist);
        setSolar(res.data.solarbrand);
        setSolarWatt(res.data.solarWatts);
        setPump(res.data.pumpbrand);
        setInvertor(res.data.invertorbrand);
        setAccessories(res.data.accessories);
        setUom(res.data.uom);
        setOpen(true);
      })
      .catch((err) => {
        setOpenbackdrop(false);
        NotificationManager.error(
          <IntlMessages id="notification.errorMessage" />,
          <IntlMessages id="notification.titleHere" />
        );
      });
  };

  const [openbackdrop, setOpenbackdrop] = React.useState(false);
  const getcitylist = (country) => {
    setOpenbackdrop(true);
    axios
      .get("api/getcity/" + country)
      .then((res) => {
        setOpenbackdrop(false);
        setDbcity(res.data);
      })
      .catch((err) => {
        setOpenbackdrop(false);
        NotificationManager.error(
          <IntlMessages id="notification.errorMessage" />,
          <IntlMessages id="notification.titleHere" />
        );
      });
  };

  const [citylocation, setCitylocation] = useState("");
  const getIrredation = (city) => {
    setCitylocation(city.id);
  };

  const [imagepath, setImagepath] = useState("/images/General layout.png");
  const [myImage, setMyImage] = useState(
    "img-thumbnail rounded mx-auto d-block"
  );
  const [foucus, setFoucus] = useState(false);

  const dirtlossMouseOver = (wichInput, wichfunction) => {
    // setEvaluation(false);
    if (wichInput === "MT" && wichfunction === "focus") {
      setFoucus(true);
      setMyImage("img-thumbnail rounded mx-auto d-block");
      setImagepath("/images/Hight layout.png");
    }

    if (wichInput === "MT" && wichfunction === "hover") {
      if (!foucus) {
        setMyImage("img-thumbnail rounded mx-auto d-block");
        setImagepath("/images/Hight layout.png");
      }
    }
    if (wichInput === "GS" && wichfunction === "focus") {
      setFoucus(true);
      setMyImage("img-thumbnail rounded mx-auto d-block");
      setImagepath("/images/System layout.png");
    }

    if (wichInput === "GS" && wichfunction === "hover") {
      if (!foucus) {
        setMyImage("img-thumbnail rounded mx-auto d-block");
        setImagepath("/images/System layout.png");
      }
    }
    if (wichInput === "dirt" && wichfunction === "focus") {
      setFoucus(true);
      setMyImage("img-thumbnail rounded mx-auto d-block");
      setImagepath("/images/System layout.png");
    }

    if (wichInput === "dirt" && wichfunction === "hover") {
      if (!foucus) {
        setMyImage("img-thumbnail rounded mx-auto d-block");
        setImagepath("/images/System layout.png");
      }
    }

    if (wichInput === "motor" && wichfunction === "focus") {
      setFoucus(true);
      setMyImage("img-thumbnail rounded mx-auto d-block");
      setImagepath("/images/Motor Cable layout.png");
    }

    if (wichInput === "motor" && wichfunction === "hover") {
      if (!foucus) {
        setMyImage("img-thumbnail rounded mx-auto d-block");
        setImagepath("/images/Motor Cable layout.png");
      }
    }

    if (wichInput === "head" && wichfunction === "focus") {
      setFoucus(true);
      setMyImage("img-thumbnail rounded mx-auto d-block");
      setImagepath("/images/Hight layout.png");
    }

    if (wichInput === "head" && wichfunction === "hover") {
      if (!foucus) {
        setMyImage("img-thumbnail rounded mx-auto d-block");
        setImagepath("/images/Hight layout.png");
      }
    }

    if (wichInput === "temp" && wichfunction === "focus") {
      setFoucus(true);
      setMyImage("img-thumbnail rounded mx-auto d-block");
      setImagepath("/images/System details layout.png");
    }
    if (wichInput === "temp" && wichfunction === "hover") {
      if (!foucus) {
        setMyImage("img-thumbnail rounded mx-auto d-block");
        setImagepath("/images/System details layout.png");
      }
    }

    if (wichInput === "pip" && wichfunction === "focus") {
      setFoucus(true);
      setMyImage("img-thumbnail rounded mx-auto d-block");
      setImagepath("/images/Pipe layout.png");
    }
    if (wichInput === "pip" && wichfunction === "hover") {
      if (!foucus) {
        setMyImage("img-thumbnail rounded mx-auto d-block");
        setImagepath("/images/Pipe layout.png");
      }
    }
  };
  const dirtlossMouseLeave = (wichfunction) => {
    // setEvaluation(true);
    if (wichfunction === "fout") {
      setFoucus(false);
      setMyImage(" img-thumbnail rounded mx-auto d-block");
      setImagepath("/images/General layout.png");
    }

    if (!foucus) {
      setMyImage(" img-thumbnail rounded mx-auto d-block");
      setImagepath("/images/General layout.png");
    }
  };

  const [evaluation, setEvaluation] = useState(false);
  const { register, handleSubmit } = useForm(); // initialize the hook
  const onSubmit = (data) => {
    setOpenbackdrop(true);

    let alldata = {
      daynomichead,
      city,
      country,
      projectname,
      dirtloss,
      motorcable,
      solarvalue,
      pumpvalue,
      inputFields,
      invertorvalue,
      discharge,
    };
    axios
      .post("api/project", alldata)
      .then((res) => {
        setOpenbackdrop(false);
        handleNext();
        NotificationManager.success(
          <IntlMessages id="notification.successMessage" />,
          <IntlMessages id="notification.titleHere" />
        );
      })
      .catch((err) => {
        setOpenbackdrop(false);
        NotificationManager.error(
          <IntlMessages id="notification.errorMessage" />,
          <IntlMessages id="notification.titleHere" />
        );
      });
  };

  const [evaluationdata, setEvaluationdata] = React.useState("");
  const evaluationfunction = () => {
    let evalData = {
      daynomichead,
      dirtloss,
      motorcable,
      citylocation,
      solarvalue,
      pumpvalue,
      discharge,
      piplenght,
      bas,
    };
    setEvaluation(true);
    setEvaluationdata(evalData);
  };

  return (
    <>
      <Backdrop className={classes.backdrop} open={openbackdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className={classes.root}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => (
            <Step key={`${label}${index}`}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Paper elevation={0} className="mb-3 p-4">
          {activeStep === steps.length ? (
            <div>
              <Typography className={classes.instructions}>
                All steps completed
              </Typography>
              <Button onClick={handleReset}>Reset</Button>
            </div>
          ) : (
            <div>
              <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                {activeStep === 0 ? (
                  <div className="row">
                    <div className="col-md-4">
                      <Button
                        size="large"
                        color="primary"
                        variant="outlined"
                        className="form-control p-4"
                        onClick={handleClickOpen}
                      >
                        Select Brand
                      </Button>
                      {/* start dialog */}
                      <Dialog
                        onClose={handleClose}
                        aria-labelledby="customized-dialog-title"
                        open={open}
                        maxWidth="sm"
                        fullWidth="sm"
                      >
                        <DialogTitle
                          id="customized-dialog-title"
                          onClose={handleClose}
                        >
                          Brand Managment
                        </DialogTitle>
                        <DialogContent dividers>
                          <div className={classes.root}>
                            <Stepper style={{ paddingLeft: '0px', paddingRight: '0px' }} alternativeLabel activeStep={activeStepBrand} connector={<ColorlibConnector />}>
                              {stepsBrand.map((label, index) => (
                                <Step key={`${label}${index}`}>
                                  <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                                </Step>
                              ))}
                            </Stepper>

                            <div>
                              {activeStepBrand === stepsBrand.length ? (
                                <CardBox styleName="col-lg-12 customeCard" cardStyle="text-center">
                                  <Sliderr className="slick-app-frame " {...options}>
                                    {invertor.map((data, index) => {
                                      return <span key={index} onClick={() => invertorbrand(data.id, data.name, index)}>
                                        <div class="slick-slide-item">
                                          <div className={toggelactivestyleinvertor(index)}>
                                            <div>
                                              <img src={`${axios.defaults.baseURL}brand/invertor/${data.image}`} className="img-thumbnail rounded mx-auto d-block imagebrandhieght" alt="Responsive" />
                                            </div>
                                            <span> {data.country} {getFlag(data.country)}  </span>
                                          </div>
                                        </div>
                                      </span>
                                    })}
                                  </Sliderr>
                                </CardBox>
                              ) : (
                                <div>
                                  <Typography className={classes.instructions}>
                                    {activeStepBrand === 0 ?
                                      <CardBox styleName="col-lg-12 customeCard" cardStyle="text-center">
                                        <Sliderr className="slick-app-frame " {...options}>
                                          {pump.map((data, index) => {
                                            return <span key={index} onClick={() => pumpbrand(data.id, data.name, index)}>
                                              <div class="slick-slide-item">
                                                <div className={toggelactivestylepump(index)}>
                                                  <div>
                                                    <img src={`${axios.defaults.baseURL}brand/pumpbrand/${data.image}`} className="img-thumbnail rounded mx-auto d-block imagebrandhieght" alt="Responsive" />
                                                  </div>
                                                  <span> {data.country} {getFlag(data.country)}  </span>
                                                </div>
                                              </div>
                                            </span>
                                          })}
                                        </Sliderr>
                                      </CardBox>
                                      : activeStepBrand === 1 ?
                                        <div className="row">
                                          <CardBox styleName="col-xl-9 col-lg-9 col-md-9 col-12 customeCard" cardStyle="text-center">
                                            <Sliderr className="slick-app-frame" {...options}>
                                              {solar.map((data, index) => {
                                                return <span key={index} onClick={() => solarbrand(data.id, data.name, index)} >
                                                  <div className="slick-slide-item solar">
                                                    <div className={toggelactivestyle(index)}>
                                                      <div>
                                                        <img src={`${axios.defaults.baseURL}brand/solar/${data.image}`} className="img-thumbnail rounded mx-auto d-block imagebrandhieght img_solar_brand_hieght" alt="Responsive" />
                                                      </div>
                                                      <span> {data.country} {getFlag(data.country)}  </span>
                                                    </div>
                                                  </div>
                                                </span>
                                              })}
                                            </Sliderr>
                                          </CardBox>
                                          {solarWatts ?
                                            <div className="col-xl-3 col-lg-3 col-md-3 col-12 insideFormBPCable">
                                              <FormControl variant="outlined" size="small" className='form-control'>
                                                <InputLabel id="demo-simple-select-outlined-label">Solar Watt</InputLabel>
                                                <Select name='solarwatt'
                                                  labelId="demo-simple-select-outlined-label"
                                                  id="demo-simple-select-outlined-solarwatt"
                                                  value={solarSelectWatt}
                                                  onChange={(e) => setSolarSelectWatt(e.target.value)}
                                                  label="Solar Watt"
                                                >
                                                  <MenuItem value="">
                                                    <em></em>
                                                  </MenuItem>
                                                  {solarWatts?.map(watt =>
                                                    <MenuItem value={watt.id}>{watt.power}W</MenuItem>
                                                  )}
                                                </Select>
                                              </FormControl>
                                            </div>
                                            : ''}
                                        </div>
                                        : activeStepBrand === 2 ?
                                          <CardBox styleName="col-lg-12 customeCard" cardStyle="text-center">
                                            <Sliderr className="slick-app-frame " {...options}>
                                              {invertor.map((data, index) => {
                                                return <span key={index} onClick={() => invertorbrand(data.id, data.name, index)}>
                                                  <div class="slick-slide-item">
                                                    <div className={toggelactivestyleinvertor(index)}>
                                                      <div>
                                                        <img src={`${axios.defaults.baseURL}brand/invertor/${data.image}`} className="img-thumbnail rounded mx-auto d-block imagebrandhieght" alt="Responsive" />
                                                      </div>
                                                      <span> {data.country} {getFlag(data.country)}  </span>
                                                    </div>
                                                  </div>
                                                </span>
                                              })}
                                            </Sliderr>
                                          </CardBox>
                                          : ''
                                    }
                                  </Typography>
                                </div>
                              )}
                            </div>
                          </div>
                        </DialogContent>
                        <DialogActions>
                          <div>
                            {activeStepBrand === stepsBrand.length ? (
                              <div>
                                <Button onClick={handleResetBrand} className={classes.button}>
                                  Reset
                                </Button>
                              </div>
                            ) : (
                              <div>
                                <div>
                                  <Button disabled={activeStepBrand === 0} onClick={handleBackBrand} className={classes.button}>
                                    Back
                                  </Button>

                                  <Button
                                    variant="contained"
                                    color="primary"
                                    disabled={activeStepBrand === stepsBrand.length - 1 ? true : false}
                                    onClick={handleNextBrand}
                                    className={classes.button}
                                  >
                                    Next
                                    {/* {activeStepBrand === stepsBrand.length - 1 ? 'Finish' : 'Next'} */}
                                  </Button>
                                </div>
                              </div>
                            )}
                          </div>
                          {activeStepBrand === stepsBrand.length - 1 ?
                            <Button
                              onClick={handleClose}
                              color="primary"
                              variant="contained"
                              disabled={activeStepBrand === stepsBrand.length - 1 ? false : true}
                            >
                              Done
                          </Button> : ''}

                        </DialogActions>
                      </Dialog>
                      {/* end dialog */}
                      <Divider className="mb-3 mt-3" />

                      <div className="col-md-12 p-0">
                        <BootstrapTooltip title="write the name of the Projects which you want to do the calculation for that.">
                          <TextField
                            className="form-control"
                            id="outlined-basic"
                            label="Poject Name"
                            variant="outlined"
                            placeholder="Project name !"
                            margin="normal"
                            size="small"
                            name="projectname"
                            value={projectname}
                            onChange={(event) => handlchangfild(event)}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            error={
                              touched &&
                                touched.projectname &&
                                error && error.projectname
                                ? true
                                : false
                            }
                            // helperText={(touched && touched.projectname) && (error && error.projectname) ? '' : ''}
                            aria-owns={
                              openEl ? "mouse-over-popover" : undefined
                            }
                            aria-haspopup="true"
                            onMouseEnter={handlePopoverOpen}
                            onMouseLeave={handlePopoverClose}
                          />
                        </BootstrapTooltip>
                      </div>

                      <div className="row">
                        <div className="col-md-6">
                          <Autocomplete
                            size="small"
                            id="country-select-demo"
                            onChange={(event, newValue) => {
                              handgleCountry(event, newValue);
                              getcitylist(
                                newValue ? newValue.country : "Afghanistan"
                              );
                            }}
                            style={{ width: 300 }}
                            options={location}
                            inputValue={`Afghanistan`}
                            onInputChange={(event) => {
                              handgleCountry(event, "Afghanistan");
                              getcitylist("Afghanistan");
                            }}
                            classes={{
                              option: classes.option,
                            }}
                            autoHighlight
                            getOptionLabel={(option) =>
                              option ? option.country : "Afghanistan"
                            }
                            renderOption={(option) => (
                              <React.Fragment>{option.country}</React.Fragment>
                            )}
                            renderInput={(params) => (
                              <TextField
                                size="small"
                                {...params}
                                label="Select Country"
                                variant="outlined"
                                placeholder="pick the country !"
                                margin="normal"
                                name="country"
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                //  error={(touched && touched.country) && (error && error.country) ? true : false}

                                inputProps={{
                                  ...params.inputProps,
                                  autoComplete: "new-password",
                                }}
                              />
                            )}
                          />
                        </div>

                        <div className="col-md-6">
                          <Autocomplete
                            size="small"
                            id="country-select-demo2"
                            onChange={(event, newValue) => {
                              handcahngeCity(event, newValue);
                              getIrredation(newValue);
                            }}
                            style={{ width: 300 }}
                            options={dbcity}
                            classes={{
                              option: classes.option,
                            }}
                            error={
                              touched && touched.city && error && error.city
                                ? true
                                : false
                            }
                            autoHighlight
                            getOptionLabel={(option) =>
                              option ? option.city : ""
                            }
                            renderOption={(option) => (
                              <React.Fragment>{option.city}</React.Fragment>
                            )}
                            renderInput={(params) => (
                              <TextField
                                size="small"
                                {...params}
                                label="Select the City"
                                variant="outlined"
                                placeholder="pick the City !"
                                margin="normal"
                                name="city"
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                inputProps={{
                                  ...params.inputProps,
                                  autoComplete: "new-password",
                                }}
                              />
                            )}
                          />
                        </div>
                      </div>

                      <Divider className="mb-3 mt-3" />

                      <div className="col-md-12 p-0">
                        <BootstrapTooltip title="Vertical height from the dynamic water level to the highest point of delivery">
                          <TextField
                            id="outlined-basic-1"
                            className="form-control"
                            label={`Head ${piplenght && dirtloss
                              ? "+ " +
                              Math.ceil(
                                Number((dirtloss * piplenght) / 100)
                              )
                              : ""
                              }`}
                            variant="outlined"
                            placeholder="Head !"
                            margin="normal"
                            name="head"
                            type="number"
                            size="small"
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  m
                                </InputAdornment>
                              ),
                            }}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            value={daynomichead}
                            onChange={(event) =>
                              setDaynomichead(event.target.value)
                            }
                            onMouseOver={() =>
                              dirtlossMouseOver("head", "hover")
                            }
                            onMouseLeave={() => dirtlossMouseLeave("xy")}
                            onFocus={() => dirtlossMouseOver("head", "focus")}
                            onBlur={() => dirtlossMouseLeave("fout")}
                          />
                        </BootstrapTooltip>
                      </div>

                      <div className="row">
                        <div className="col-md-6">
                          <BootstrapTooltip title="The electrical cable between controller/inverter and submersible pump">
                            <TextField
                              id="outlined-basic-2"
                              label="Motor Cable"
                              variant="outlined"
                              placeholder="Motor cable!"
                              margin="normal"
                              name="motor_cable"
                              type="number"
                              size="small"
                              InputLabelProps={{
                                shrink: true,
                              }}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    m
                                  </InputAdornment>
                                ),
                              }}
                              value={motorcable}
                              onChange={(event) =>
                                setMotorcable(event.target.value)
                              }
                              onMouseOver={() =>
                                dirtlossMouseOver("motor", "hover")
                              }
                              onMouseLeave={() => dirtlossMouseLeave("xy")}
                              onFocus={() =>
                                dirtlossMouseOver("motor", "focus")
                              }
                              onBlur={() => dirtlossMouseLeave("fout")}
                            />
                          </BootstrapTooltip>
                        </div>
                        <div className="col-md-6">
                          <BootstrapTooltip
                            title="Pipe line from the submersible pump outlet to the delivery point.
                        Note: up to 100meter pipe length please add manually 4 meter on each 100meter in (Dynamic head) box."
                          >
                            <TextField
                              id="outlined-basic-4"
                              label="Pipe-lenght"
                              variant="outlined"
                              placeholder="Pipe lenght!"
                              margin="normal"
                              name="motor_cable"
                              type="number"
                              size="small"
                              InputLabelProps={{
                                shrink: true,
                              }}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    m
                                  </InputAdornment>
                                ),
                              }}
                              value={piplenght}
                              onChange={(event) =>
                                setPiplenght(event.target.value)
                              }
                              onMouseOver={() =>
                                dirtlossMouseOver("pip", "hover")
                              }
                              onMouseLeave={() => dirtlossMouseLeave("xy")}
                              onFocus={() => dirtlossMouseOver("pip", "focus")}
                              onBlur={() => dirtlossMouseLeave("fout")}
                            />
                          </BootstrapTooltip>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6">
                          <BootstrapTooltip title="Enter your hourly water requirement in average method.">
                            <TextField
                              id="outlined-basic-5"
                              label="Water Demand"
                              variant="outlined"
                              placeholder="Water Demand"
                              margin="normal"
                              name="discharge"
                              size="small"
                              type="number"
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    m³/h
                                  </InputAdornment>
                                ),
                              }}
                              InputLabelProps={{
                                shrink: true,
                              }}
                              value={discharge}
                              onChange={(event) =>
                                setDischarge(event.target.value)
                              }
                              onMouseOver={() =>
                                dirtlossMouseOver("dirt", "hover")
                              }
                              onMouseLeave={() => dirtlossMouseLeave("xy")}
                              onFocus={() => dirtlossMouseOver("dirt", "focus")}
                              onBlur={() => dirtlossMouseLeave("fout")}
                            />
                          </BootstrapTooltip>
                        </div>
                        <div className="col-md-6">
                          <TextField
                            id="outlined-basic-11"
                            label="Pipe Friction losses"
                            variant="outlined"
                            size="small"
                            placeholder="Pipe Friction losses!"
                            margin="normal"
                            name="dist_loss"
                            type="number"
                            min="0"
                            max="10"
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  %
                                </InputAdornment>
                              ),
                            }}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            value={piplenght >= 500 ? 10 : dirtloss}
                            onChange={(event) =>
                              setDirtloss(
                                event.target.value >= 0 &&
                                  event.target.value <= 10
                                  ? event.target.value
                                  : 5
                              )
                            }
                            onMouseOver={() =>
                              dirtlossMouseOver("dirt", "hover")
                            }
                            onMouseLeave={() => dirtlossMouseLeave("xy")}
                            onFocus={() => dirtlossMouseOver("dirt", "focus")}
                            onBlur={() => dirtlossMouseLeave("fout")}
                          />
                        </div>
                      </div>

                      <div className="col-md-12 insideFormPaddingWPS inputAdornmentWrap mt-3 project_bas_field">
                        <BootstrapTooltip title="Select your solar panels mounting type. Note: Manual is more efficient than fix/ground mounting structures.">
                          <div
                            class="btn-group"
                            role="group"
                            aria-label="Basic radio toggle button group"
                          >
                            <input
                              type="radio"
                              class="btn-check"
                              name={"btnradio1"}
                              id={"btnradio1"}
                              autocomplete="off"
                              checked={bas === "Manual Tracker"}
                              value="Manual Tracker"
                              onChange={(event) => setBas(event.target.value)}
                              onMouseOver={() =>
                                dirtlossMouseOver("MT", "hover")
                              }
                              onMouseLeave={() => dirtlossMouseLeave("xy")}
                              onFocus={() => dirtlossMouseOver("MT", "focus")}
                              onBlur={() => dirtlossMouseLeave("fout")}
                            />
                            <label
                              class="btn btn-outline-primary"
                              for={"btnradio1"}
                            >
                              Manual Tracker
                            </label>
                            <input
                              type="radio"
                              class="btn-check"
                              name={"btnradio2"}
                              id={"btnradio2"}
                              autocomplete="off"
                              checked={bas === "Ground Structure"}
                              value="Ground Structure"
                              onChange={(event) => setBas(event.target.value)}
                              onMouseOver={() =>
                                dirtlossMouseOver("GS", "hover")
                              }
                              onMouseLeave={() => dirtlossMouseLeave("xy")}
                              onFocus={() => dirtlossMouseOver("GS", "focus")}
                              onBlur={() => dirtlossMouseLeave("fout")}
                            />
                            <label
                              class="btn btn-outline-primary"
                              for={"btnradio2"}
                            >
                              Ground Structure
                            </label>
                          </div>
                        </BootstrapTooltip>
                      </div>

                      <Divider className="mb-3 mt-3" />

                      <Button
                        size="large"
                        color="primary"
                        variant="contained"
                        className="form-control mb-3 p-4"
                        onClick={() => evaluationfunction()}
                        disabled={!isValid}
                      >
                        Evaluation
                      </Button>
                    </div>
                    <div className="col-md-8 rSPrSection">
                      {evaluation === true ? (
                        <>
                          <div className="row ">
                            <div className="col-md-12">
                              <h2>Project Name : {projectname} </h2>{" "}
                            </div>
                          </div>
                          {/* <div className="row ">
                            <div className="col-md-4"><strong>Country Name:</strong> {country ? country.country : ""}</div>
                            <div className="col-md-4"><strong>City Name:</strong> {city.city}</div>
                             <div className="col-md-4"><strong>Location:</strong> {projectname} </div>
                          </div> */}
                          {/* <Divider className="m-4"/> */}
                          <div className="row m-1">
                            <Analyze
                              evaluationdata={evaluationdata}
                              citylocation={citylocation}
                            />
                          </div>
                        </>
                      ) : (
                        <img
                          src={imagepath}
                          className={myImage}
                          alt="Responsive"
                        />
                      )}
                    </div>
                  </div>
                ) : (
                  ""
                )}

                {activeStep === 1 ? (
                  <div className="row">
                    <div className="col-md-4">
                      <h3>Project Accessories</h3>
                      {inputFields.map((inputField, index) => (
                        <div className="row">
                          <div className="col-md-7">
                            <FormControl fullWidth>
                              <Autocomplete size="small"
                                id="country-select-demo3"
                                onChange={(event, newValue) =>
                                  handlseelctitem(event, newValue, index)
                                }
                                style={{ width: 300 }}
                                options={accessories}
                                classes={{
                                  option: classes.option,
                                }}
                                autoHighlight
                                getOptionLabel={(option) =>
                                  option
                                    ? option.name + "/" + option.uom_name
                                    : ""
                                }
                                renderOption={(option) => (
                                  <React.Fragment>
                                    {option.name + " -> " + option.uom_name}
                                  </React.Fragment>
                                )}
                                renderInput={(params) => (
                                  <TextField
                                    size="small"
                                    {...params}
                                    label="Item"
                                    variant="outlined"
                                    placeholder="pick item !"
                                    margin="normal"
                                    name="item"
                                    InputLabelProps={{
                                      shrink: true,
                                    }}
                                    inputProps={{
                                      ...params.inputProps,
                                      autoComplete: "new-password", // disable autocomplete and autofill
                                    }}
                                  />
                                )}
                              />
                            </FormControl>
                          </div>
                          <div className="col-md-5">
                            <FormControl fullWidth>
                              <TextField
                                id="outlined-basic7"
                                label="Quantity"
                                variant="outlined"
                                size="small"
                                placeholder="Quantity"
                                margin="normal"
                                name="Quantity"
                                type="number"
                                onChange={(event) =>
                                  handlchangquantity(event.target.value, index)
                                }
                                //value={inputFields.quantity}
                                InputLabelProps={{
                                  shrink: true,
                                }}
                              />
                            </FormControl>
                          </div>
                        </div>
                      ))}

                      <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="span"
                        onClick={handleAddFields}
                      >
                        <span class="material-icons"> add_circle_outline </span>
                      </IconButton>

                      <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="span"
                        onClick={handleRemoveFields}
                        disabled={inputFields.length <= 1}
                      >
                        <span class="material-icons">
                          {" "}
                          remove_circle_outline{" "}
                        </span>
                      </IconButton>
                    </div>

                    <div className="col-md-8">
                      <img
                        src="/images/General layout.png"
                        className=" img-thumbnail rounded mx-auto d-block"
                        alt="Responsive"
                      />
                    </div>
                  </div>
                ) : (
                  ""
                )}

                {activeStep === 2 ? (
                  <div className="row">
                    <div className="col-md-3">
                      <TextField
                        id="outlined-basic1"
                        className="form-control"
                        label="Head"
                        variant="outlined"
                        placeholder="Head !"
                        margin="normal"
                        name="head"
                        type="number"
                        size="small"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">m</InputAdornment>
                          ),
                        }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />

                      <TextField
                        id="outlined-basic12"
                        className="form-control"
                        label="Head"
                        variant="outlined"
                        placeholder="Head !"
                        margin="normal"
                        name="head"
                        type="number"
                        size="small"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">m</InputAdornment>
                          ),
                        }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />

                      <TextField
                        id="outlined-basic"
                        className="form-control"
                        label="Head"
                        variant="outlined"
                        placeholder="Head !"
                        margin="normal"
                        name="head"
                        type="number"
                        size="small"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">m</InputAdornment>
                          ),
                        }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </div>
                    <div className="col-md-9">
                      <div className="row justify-content-center ">
                        <Alert severity="success" color="info">
                          <h1 color="success">
                            Congratulations Project Successfully Inserted !
                          </h1>
                        </Alert>

                        <p className="mt-3 p-4">
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industry's standard dummy text ever since the 1500s,
                          when an unknown printer took a galley of type and
                          scrambled
                        </p>

                        <Button
                          variant="contained"
                          color="success"
                          className="mt-5 p-3"
                          size="large"
                        >
                          View project summary
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}

                <div>
                  <Button
                    variant="contained"
                    color="secondary"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.backButton}
                  >
                    Back
                  </Button>

                  {activeStep === steps.length - 2 ? (
                    <Button variant="contained" color="primary" type="submit">
                      Submit
                    </Button>
                  ) : (
                    ""
                  )}

                  {activeStep === steps.length - 3 ? (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                    >
                      Next
                    </Button>
                  ) : (
                    ""
                  )}

                  {activeStep === steps.length - 1 ? (
                    <Button variant="contained" color="primary" disabled>
                      Next
                    </Button>
                  ) : (
                    ""
                  )}
                </div>
              </form>
            </div>
          )}
        </Paper>
        <NotificationContainer />
      </div>
    </>
  );
}
