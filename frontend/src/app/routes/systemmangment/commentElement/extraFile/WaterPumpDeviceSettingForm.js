import React, { useState } from "react";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
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
export default function WaterPumpDeviceSettingForm() {
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
        <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                <form autoComplete="off" onSubmit={handleSubmit}>
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
                            {/* <FormControl variant="outlined" size="small" className={classes.formControl}>
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
                            </FormControl> */}
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-3 col-12 insideFormPadding">    
                        
                        </div>
                    </div>
                </form>
            </div>
        </div>    
    );
}