import React, { useState, useEffect, useRef } from "react";
import TextField from '@material-ui/core/TextField';
import {useDropzone} from "react-dropzone";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

// import {UUID} from "uuid";
import  './CommentEleStyle.css';
// import {useDropzone} from "react-dropzone";
// end of dialog modal for water pump
 
// code for small steps
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

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
// start code for dropzone
  const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
  };
  
  const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box'
  };
  
  const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
  };
  
  const img = {
    display: 'block',
    width: 'auto',
    height: '100%'
  };
// end code for dropzone

// function component lifecycle hook
const useComponentWillMount = func => {
    const willMount = useRef(true);
    if (willMount.current) {
      func();
    }
    useComponentDidMount(() => {
      willMount.current = false;
    });
  };
  
  const useComponentDidMount = func => useEffect(func, []);
  
//   const useInputState = initial => {
//     const [state, setState] = useState(initial);
//     const setInputState = e => {
//       setState(e.target.value);
//     };
//     return [state, setInputState];
//   };
// end function lifecycle hook

const marksKW = [
    {
      value: 0,
      label: '0KW',
    },
    {
      value: 270,
      label: '270KW',
    },
];
const marksV = [
    {
      value: 0,
      label: '0V',
    },
    {
      value: 270,
      label: '270V',
    },
];
const marksC = [
    {
      value: 0,
      label: '0A',
    },
    {
      value: 270,
      label: '270A',
    },
];

export default function SolarPanalDeviceForm() {
    let val
    useComponentWillMount(() => {
        console.log("willMount");
        // val = UUID.v4();
    });
    useComponentDidMount(() => console.log("didMount"));
    
    console.log("rendering");
  const [brand, setBrand] = useState("");
  const [typeModel, setTypeModel] = useState("");
  const [powerKW, setPowerKW] = useState("");
  const [voltage, setVoltage] = useState("");
  const [current, setCurrent] = useState("");
  const [cableType, setCableType] = useState("");
  const [description, setDescription] = useState("");
  const classes = useStyles();
  
// dropzone code
  const [files, setFiles] = useState([]);
  const {getRootProps, getInputProps} = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });

  const thumbs = files.map(file => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img alt={file.name}
             src={file.preview}
             style={img}
        />
      </div>
    </div>
  ));

  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);
// end dropzone code
  const handleSubmit = (e) => {
    e.preventDefault();
    let data = {
        brand, typeModel, powerKW, voltage, current, cableType, description, ...files
    }
    console.log(brand);
    console.log(data);
    console.log(files);
    

  }
  
  return (
    <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-12 col-12">
            <form autoComplete="off" onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-xl-4 col-lg-4 col-md-4 col-12 insideFormBP">
                        <TextField size="small"
                            id="outlined-read-only-input"
                            label="ID"
                            defaultValue={val}
                            InputProps={{
                            readOnly: true,
                            }}
                            variant="outlined"
                        />
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-4 col-12 insideFormBP">
                        <FormControl variant="outlined" size="small" className={classes.formControl}>
                            <InputLabel htmlFor="outlined-age-native-simple" size="small" >Brand</InputLabel>
                            <Select size="small"
                                native
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                                label="Brand"
                                inputProps={{
                                name: 'Brand',
                                id: 'outlined-age-native-simple',
                                }}
                            >
                                <option aria-label="None" value="" />
                                <option value={10}>Brand 1</option>
                                <option value={20}>Brand 2</option>
                                <option value={30}>Brand 3</option>
                            </Select>
                        </FormControl>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-4 col-12 insideFormBP">
                        <TextField id="outlined-basic" size="small" className="fullWidthInput" label="Type/Model" value={typeModel} onChange={(e) => setTypeModel(e.target.value)} variant="outlined" />
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-12 insideFormPadding1 inputAdornmentWrap">
                        <Typography id="discrete-slider-small-steps" gutterBottom>
                            Power
                            </Typography>
                            <Slider onChange={(event, value) => setPowerKW(value)}
                                defaultValue={150}
                                getAriaValueText={valuetext}
                                aria-labelledby="discrete-slider-small-steps"
                                step={20}
                                marks={marksKW}
                                min={0}
                                max={270}
                                valueLabelDisplay="on"
                            />
                    </div>
                    
                    <div className="col-xl-6 col-lg-6 col-md-6 col-12 insideFormPadding2 inputAdornmentWrap">
                        <Typography id="discrete-slider-small-steps" gutterBottom>
                            Voltage
                            </Typography>
                            <Slider onChange={(event, value) => setVoltage(value)}
                                defaultValue={150}
                                getAriaValueText={valuetext}
                                aria-labelledby="discrete-slider-small-steps"
                                step={20}
                                marks={marksV}
                                min={0}
                                max={270}
                                valueLabelDisplay="on"
                            />
                    </div>
                    
                    <div className="col-xl-8 col-lg-8 col-md-8 col-12 insideFormPadding3 inputAdornmentWrap">
                        <Typography id="discrete-slider-small-steps" gutterBottom>
                            Current
                            </Typography>
                            <Slider onChange={(event, value) => setCurrent(value)}
                                defaultValue={150}
                                getAriaValueText={valuetext}
                                aria-labelledby="discrete-slider-small-steps"
                                step={20}
                                marks={marksC}
                                min={0}
                                max={270}
                                valueLabelDisplay="on"
                            />
                    </div>
                     
                    <div className="col-xl-4 col-lg-4 col-md-4 col-12 insideFormBPCable">
                        <FormControl variant="outlined" size="small" className={classes.formControl}>
                            <InputLabel htmlFor="outlined-age-native-simple" size="small" >Cable Type</InputLabel>
                            <Select size="small"
                                native
                                value={cableType}
                                onChange={(e) => setCableType(e.target.value)}
                                label="Cable Type"
                                inputProps={{
                                name: 'cableType',
                                id: 'outlined-age-native-simple',
                                }}
                            >
                                <option aria-label="None" value="" />
                                <option value={10}>Cable Type 1</option>
                                <option value={20}>Cable Type 2</option>
                                <option value={30}>Cable Type 3</option>
                            </Select>
                        </FormControl>
                    </div>    
                    <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                        <div class="form-group">
                            <textarea class="form-control form-control-lg"  value={description} onChange={(e) => setDescription(e.target.value)} rows="2" spellcheck="false" placeholder="Short Description"></textarea>
                        </div>
                    </div>
                    <div className="col-xl-10 col-lg-10 col-md-10 col-12 accessory_file waterPumFile">
                        <div className="dropzone-card">
                            <div className="dropzone">
                                <div {...getRootProps({className: 'dropzone-file-btn'})}>
                                    <input {...getInputProps()} />
                                    <p>Drag 'n' drop Water Pump Device image</p>
                                </div>
                            </div>
                            <div className="dropzone-content" style={thumbsContainer}>
                                {thumbs}
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-2 col-lg-2 col-md-2 col-12">
                     <Button variant="contained" type="submit" color="primary" className="jr-btn jr-btn-lg accessBtn">Submit</Button>
                    </div>
                    </div>
            </form>
        </div>
    </div>
        
  );
}