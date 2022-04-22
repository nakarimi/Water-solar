import  React, {useEffect, useState} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

// form dependency
import {TextField,InputLabel,Select} from '@material-ui/core';
import {FormControl,RadioGroup,FormControlLabel,Radio, FormHelperText} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import  './stayle.css';
import axios from 'axios';
import {useForm} from 'react-hook-form';
//drop zoon
import {useDropzone} from 'react-dropzone';
import {NotificationContainer,NotificationManager} from 'react-notifications';
import IntlMessages from 'util/IntlMessages';

//drop down
const useStyles = makeStyles((theme) => ({ 
}));

//end drop down
const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 0
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 190,
  height: 190,
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

const dropzone1 = {
  
    height: '100px',
    minWidth: '210px',
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '40px',
    borderWidth: '2px',
    borderRadius: '2px',
    borderColor: '#3548d9',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#3548d9',
    outline: 'none',
    transition: 'border .24s ease-in-out',
};
// end form dependency

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

export default function CustomizedDialogs(props) {
  const {register, handleSubmit, errors }=useForm(); // initialize the hook
  const {open,setOpen} = props;
  const {userDataOject, setUserDataObject} = props;
  // const handleClickOpen = () => {
  //   setOpen(true);
  // };
  const handleClose = () => {
    setUserDataObject(null);
    setFiles([]);
    setOpen(false);
  };
   //drop down
  const classes = useStyles();
  const [state, setState] = React.useState({
    expiration: '',
    name: 'hai',
  });
  const [cities, setCities] = React.useState([]);
  const [city, setCity] = React.useState('');

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  //end drop down

//drop zone
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
        <img
          src={file.preview}
          style={img}
          alt="previews"
        />
      </div>
    </div>
  ));

  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  useEffect(() => {
    getCity();    
  },[props.open]);
  const getCity=async () => {
    axios.get('api/userCity')
          .then( res => {
            // console.log(res.data);
            setCities(res.data);
              }
          ).catch( err =>{
                NotificationManager.error(<IntlMessages id="notification.errorMessage"/>, <IntlMessages
                id="notification.titleHere"/>);
              }
          );
  };

  const onSubmit = (data) => {
    // console.log('data in post form', data);
    if(files.length!==0){
      var userimage = '';
      let file = files[0];
      let reader = new FileReader();
      reader.onloadend = (file) => {
        userimage = reader.result;
        data['userimage'] = userimage;
        axios.post('api/user', data)
          .then( res => {
                NotificationManager.success(<IntlMessages id="notification.successMessage"/>, <IntlMessages
                id="notification.titleHere" />);
                setOpen(false)
              }
          ).catch( err =>{
                NotificationManager.error(<IntlMessages id="notification.errorMessage"/>, <IntlMessages
                id="notification.titleHere"/>);
              }
            
          )
      }
      reader.readAsDataURL(file); 
    }else{
      data['userimage'] = 'oldImage';
      axios.post('api/user', data)
          .then( res => {
                NotificationManager.success(<IntlMessages id="notification.successMessage"/>, <IntlMessages
                id="notification.titleHere" />);
                setOpen(false)
              }
          ).catch( err =>{
                NotificationManager.error(<IntlMessages id="notification.errorMessage"/>, <IntlMessages
                id="notification.titleHere"/>);
              }
            
          )
    }
  };


  return (
    <div className={classes.modlewidth}>
          <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} maxWidth="md" fullWidth="md">
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          User Registration Form
        </DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>      
         <DialogContent dividers>
          <div className="row"> 
             <div className="col-xl-8 col-gl-8 col-md-8 col-sm-12 col-12">
              <div className="row mb-5">
                  <div className="col-xl-6 col-gl-6 col-md-6 col-sm-12 col-12">
                    <TextField id="id" type='hidden' name="id" defaultValue={(userDataOject?.id) ? userDataOject?.id : 0} inputRef={register}/>
                    <TextField id="name" className="form-control" name="name" defaultValue={userDataOject?.name }  label="Full Name" size="small" variant="outlined" inputRef={register({required: true})} 
                    error={errors.name && true} helperText={errors.name && '*required'}
                    />
                  </div>
                  <div className="col-xl-6 col-gl-6 col-md-6 col-sm-12 col-12">
                    <TextField id="companyname" name="companyname" className="form-control" defaultValue={userDataOject?.companyname}  size="small" label="Company Name" variant="outlined" inputRef={register({required: true})} error={errors.companyname && true} helperText={errors.companyname && '*required'}/> 
                  </div>  
              </div>
             <div className="row mb-5">
                <div className="col-xl-6 col-gl-6 col-md-6 col-sm-12 col-12">
                 <TextField id="email" className="form-control" label="Email" name="email" defaultValue={userDataOject?.email} size="small" type="email" variant="outlined" inputRef={register({required: true})} error={errors.email && true} helperText={errors.email && '*required'}/>   
                </div>
                <div className="col-xl-6 col-gl-6 col-md-6 col-sm-12 col-12">
                  {userDataOject?.id ? (
                  <TextField name="new_password" className="form-control" label='New Password' size="small" type="password" variant="outlined" inputRef={register({minLength: {value: 6, message: "At least be 6 Characters"}})} error={errors.new_password && true} helperText={errors.new_password && errors.new_password?.message}/>
                  ):  (
                  <TextField name="password" className="form-control" label='Password' size="small" type="password" variant="outlined" inputRef={register({required: true, minLength: 6})} error={errors.password && true} helperText={(errors.password?.type === "required") && '*required'+ (errors.password?.type === "minLength") && "At least be 6 Characters" }/>
                  )}
                </div>
              </div>

              <div className="row mb-5">
                <div className="col-xl-6 col-gl-6 col-md-6 col-sm-12 col-12">
                   <TextField name="website" defaultValue={userDataOject?.website} className="form-control" label="Website"  size="small" variant="outlined" inputRef={register()} error={errors.website && true} helperText={errors.website && '*required'}/>
                </div>
                <div className="col-xl-6 col-gl-6 col-md-6 col-sm-12 col-12">
                   <TextField name="phone" defaultValue={userDataOject?.phone} className="form-control" label="Phone"  size="small" variant="outlined" inputRef={register({required: true})} error={errors.phone && true} helperText={errors.phone && '*required'}/>
                </div>    
              </div>

              <div className="row mb-5">
                <div className="col-xl-4 col-gl-4 col-md-4 col-sm-12 col-12">
                  <FormControl variant="outlined" className="form-control" size="small">
                    <InputLabel htmlFor="outlined-city-native-simple" error={errors.city && true}  >City</InputLabel>
                    <Select  native
                      defaultValue={userDataOject?.geolocation_id}
                      inputRef={register({required: true})}
                      error={errors.expiration && true}
                      // helperText={errors.expiration && '*required'}
                      // value={city}
                      onChange={e=> setCity(e.target.value)}
                      label="city"

                      inputProps={{
                        name: 'city',
                        id: 'outlined-city-native-simple',
                      }}
                    >
                      <option aria-label="None" value="" ></option>
                      
                      {cities.map(data => 
                         <option value={data.id}>{data.city}</option>
                      )}
                    </Select>
                    {errors.city && <FormHelperText error={errors.city && true}>*required</FormHelperText>}
                  </FormControl>
                </div> 
                <div className="col-xl-4 col-gl-4 col-md-4 col-sm-12 col-12">
                  <FormControl variant="outlined" className="form-control" size="small">
                    <InputLabel htmlFor="outlined-age-native-simple" error={errors.expiration && true}  >Expiration</InputLabel>
                    <Select  native
                      defaultValue={userDataOject?.expiration}
                      inputRef={register({required: true})}
                      error={errors.expiration && true}
                      // helperText={errors.expiration && '*required'}
                      value={state.age}
                      onChange={handleChange}
                      label="expiration"

                      inputProps={{
                        name: 'expiration',
                        id: 'outlined-expiration-native-simple',
                      }}
                    >
                      <option aria-label="None" value="" />
                      <option value={3}>3 Month</option>
                      <option value={6}>6 Month</option>
                      <option value={12}>12 Month</option>
                    </Select>
                    {errors.expiration && <FormHelperText error={errors.expiration && true}>*required</FormHelperText>}
                  </FormControl>
                </div> 
                <div className="col-xl-4 col-gl-4 col-md-4 col-sm-12 col-12">
                   <FormControl component="fieldset" variant="outlined" className="form-control"  size="small">
                    {/* <FormLabel component="legend" size="small">Status</FormLabel> */}
                  <RadioGroup size="small" className="d-flex flex-row" aria-label="status"
                      name="status" defaultValue={(userDataOject?.status)? userDataOject?.status : 'male'} >
                    <FormControlLabel value="male"  inputRef={register} control={<Radio color="primary"/>} label="Active"/>
                    <FormControlLabel value="female"  inputRef={register} control={<Radio color="primary"/>} label="Inactive"/>
                  </RadioGroup>
                 </FormControl>               
                </div>    
              </div> 
            </div>
            <div className="col-xl-4 col-gl-4 col-md-4 col-sm-12 col-12">
             <section className="container">
                <div {...getRootProps({className: 'dropzone'})} style={dropzone1}>
                  <input {...getInputProps()} />
                  <p>Uplod Logo</p>
                </div>
                <aside style={thumbsContainer}>
                    {thumbs}
                    {(files.length === 0 )? ((userDataOject?.userimage!=="" && userDataOject?.userimage!==undefined)? (<spam>
                      <span className={`sp_right_padding`}>Cuurent Image </span>
                      <span><img src={`${axios.defaults.baseURL}user/img/${userDataOject?.userimage}`} class="img-thumbnail rounded edit_img_width"  alt="Responsive"></img></span>
                    </spam>): ''): ''}
                </aside>
              </section>
            </div>
          </div>                 

                 
     
        </DialogContent>
        <DialogActions>
          <Button  type="submit" color="primary" variant="contained" className="pull-right">
            Register User
          </Button>
            </DialogActions>
           </form>          
      </Dialog>
         <NotificationContainer />
    </div>
  );
}
