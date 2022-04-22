import React, { useState, useEffect } from "react";
import TextField from '@material-ui/core/TextField';
import CustomDropzone from "./CustomDropzone";
import DataSheetFile from './DataSheetFile/index';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
// import InputLabel from '@material-ui/core/InputLabel';
// import MenuItem from '@material-ui/core/MenuItem';
// import FormControl from '@material-ui/core/FormControl';
// import Select from '@material-ui/core/Select';
import Autocomplete from '@material-ui/lab/Autocomplete';
// end of dialog modal for water pump
import axios from 'axios';
import {NotificationContainer,NotificationManager} from 'react-notifications';
import IntlMessages from 'util/IntlMessages';
import {useForm} from 'react-hook-form';

// end code for country selection 
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
  }));

export default function AccessoriesForm(props) {
  const {register, handleSubmit, errors }=useForm(); // initialize the hook
  // const [type, setType] = useState("");
  // const [description, setDescription] = useState("");
  const [uom, setUom] = useState([]);
  const [uom1, setUom1] = useState([]);
  const [uomList, setUomList] = useState([]);
  const accessoryObject = props.accessoryObject;
  const [image, setImage] = useState({ oldImage: '', filePath: 'accessories/', btnText: 'Accessory Image' });
  let imageFile = '';
  const [dataSheet, setDataSheet] = useState({ oldImage: '', filePath: 'accessories/data_sheet/', btnText: 'Data Sheet' });
  let dataSheetFile = '';
  const eventhandlerIm = (data) => {
    imageFile = data;
    // console.log('images file data', data);
    // console.log('images file', imageFile);
  };
  const eventhandlerDaSh = data => {
    dataSheetFile = data;
    // console.log('dataSheetFile file', dataSheetFile);
  };
  const classes = useStyles();
// const [accessoriestype,setAccessoriestype]= useState([]);
  useEffect(() => {
    getUOM();
  },[])
  
  useEffect(() => {
    if(accessoryObject?.uom_id){
      getUomObj(accessoryObject.uom_id);
      // setUom(accessoryObject.uom_id);
    }
    // setType(accessoryObject.accessories_type_id);
    // setDescription(accessoryObject.discription);
    setImage({ ...image, oldImage: accessoryObject.image?accessoryObject.image:''});
    setDataSheet({ ...dataSheet, oldImage: accessoryObject.data_sheet?accessoryObject.data_sheet: ''});
  },[props.accessoryObject])
  useEffect(() => {
    if(props.getValue===1){
      console.log('inside of getValue', uom1)
      setUom(uom1);
    }

  },[uom1, props.getValue])

  const getUOM=async () => {
    axios.get('api/uom')
      .then(res => {  
         setUomList(res.data)
         let data = res.data[0];
        //  console.log('data first one', data);
         setUom1(data);
        }
    ).catch(err => {
           NotificationManager.error(<IntlMessages id="notification.errorMessage"/>, <IntlMessages
              id="notification.titleHere"/>);
          }
      )
  }; 
  const getUomObj = (id) => {
    axios.get('api/uom/'+id)
      .then(res => {  
         setUom(res.data)
        }
    ).catch(err => {
           NotificationManager.error(<IntlMessages id="notification.errorMessage"/>, <IntlMessages
              id="notification.titleHere"/>);
          }
      )
  }
 
  // const getAccessoriestype=async () => {
  //   axios.get('api/accessoriestype')
  //     .then(res => {  
  //        setAccessoriestype(res.data)
  //       }
  //   ).catch(err => {
  //          NotificationManager.error(<IntlMessages id="notification.errorMessage"/>, <IntlMessages
  //             id="notification.titleHere"/>);
  //         }
  //     )
  // };  
  
  const onSubmit = (data) => {
    data['uom']=uom.id;
    data['uom_name']=uom.name;
    data['imageFile'] = imageFile;
    data['dataSheetFile'] = dataSheetFile;
    // console.log("filese: ", data);
      axios.post('api/accessories', data)
        .then(res => {
              // console.log(res.data);
                NotificationManager.success(<IntlMessages id="notification.successMessage"/>, <IntlMessages
              id="notification.titleHere" />);
            }
        ).catch(err =>{
              NotificationManager.error(<IntlMessages id="notification.errorMessage"/>, <IntlMessages
              id="notification.titleHere"/>);
            }
        );
  }
  
  
  return (
    <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-12 col-12">
            <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
            
                    {/* <div className="col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12 insideFormBP"> */}
                        {/* <TextField id="outlined-basic" size="small" className="fullWidthInput" label="Type" value={type} onChange={(e) => setType(e.target.value)} variant="outlined" /> */}
                        {/* <FormControl variant="outlined" size="small" className={classes.formControl}>
                            <InputLabel id="demo-simple-select-outlined-label" size="small"  error={(touched && touched.type) && (error && error.type) ? true : false} >Type</InputLabel>
                            <Select size="small"
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={type}
                                onChange={e => handleChangeField(e)}
                                label="Type"
                                name="type"
                                error={(touched && touched.type) && (error && error.type) ? true : false}
                                helperText={(touched && touched.type) && (error && error.type) ? '*required' : ''} 
                              >
                              <MenuItem value=''>none</MenuItem>
                              {accessoriestype.map((data, index) =>  
                                <MenuItem value={data.id}>{data.name}</MenuItem>
                              )}
                            </Select>

                        </FormControl> */}
                    {/* </div> */}
                    <div className="col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12 insideFormBP">
                    <TextField id="id" type='hidden' style={{width: '0%'}} name="accessoryID" defaultValue={(accessoryObject?.id) ? accessoryObject?.id : ''} inputRef={register}/>
                        <TextField id="outlined-basic" size="small" className="fullWidthInput" label="Name" name='name' variant="outlined"
                        defaultValue={accessoryObject?.name} inputRef={register({required: true})} 
                        error={errors.name && true} helperText={errors.name ? '*required' : ''}
                        />
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12 insideFormBP">
                        <TextField id="outlined-basic-mod" size="small" className="fullWidthInput" label="Model" name='model' variant="outlined"
                        defaultValue={accessoryObject?.model} inputRef={register({required: true})} 
                        error={errors.model && true} helperText={errors.model ? '*required' : ''}
                        />
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12 insideFormBP">
                        
                        <Autocomplete  size="small"
                          id="country-select-demo" value={uom}  onChange={(event, newValue) => setUom(newValue)}
                          style={{ width: 300 }}
                          options={uomList}
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
                              name="uom"
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
                    </div>
                    
                    <div className="col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12 insideFormBP">
                        <TextField id="outlined-basic-min" size="small" type="number" className="fullWidthInput" label="MinQ" name='min_quantity' variant="outlined"
                        defaultValue={accessoryObject?.min_quantity} inputRef={register({required: true})} 
                        error={errors.min_quantity && true} helperText={errors.min_quantity ? '*required' : ''}
                        />
                    </div>

                    <div className="col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12 insideFormBP">
                        <TextField id="outlined-basic-max" size="small" type="number" className="fullWidthInput" label="MaxQ" name='max_quantity' variant="outlined" 
                        defaultValue={accessoryObject?.max_quantity} inputRef={register({required: true})} 
                        error={errors.max_quantity && true} helperText={errors.max_quantity ? '*required' : ''}
                        />
                    </div>
                        
                    {/* <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12 col-12">
                        <div className="form-group">
                            <textarea className={`form-control form-control-lg ${(touched && touched.description) && (error && error.description) ? 'error' : ''}`} name='description' value={description} onChange={(e) => handleChangeField(e)} rows="2"  placeholder="Short Description"></textarea>
                            <span className={(touched && touched.description) && (error && error.description) ? 'displayBlock errorText' : 'displayNone'}>*required</span>
                        </div>
                    </div> */}
                    <div className="col-xl-3 col-lg-3 col-md-4 col-12 waterPumFile waterPumpListFile">
                        <CustomDropzone formData={image} onChange={eventhandlerIm.bind(this)}/>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-4 col-12 waterPumFile waterPumpListFile accessory-row">
                      <DataSheetFile formData={dataSheet} onChange={eventhandlerDaSh.bind(this)}/>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12 btnAccessory">
                     <Button variant="contained" type="submit" color="primary" className="jr-btn jr-btn-lg accessBtn">Submit</Button>
                    </div>
                    </div>
            </form>
          </div>
          <NotificationContainer />   
      </div>
    
        
  );
}