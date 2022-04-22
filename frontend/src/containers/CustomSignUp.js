import React, { useEffect, useState } from 'react';
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
import { TextField, InputLabel, Select } from '@material-ui/core';
import { FormControl, /*RadioGroup, FormControlLabel, Radio,*/ FormHelperText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { useForm } from 'react-hook-form';
//drop zoon
import { useDropzone } from 'react-dropzone';
import { NotificationContainer, NotificationManager } from 'react-notifications';
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
    // marginRight: 8,
    // width: 190,
    // height: 190,
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
    width: '100%',
    height: '100%'
};

const dropzone1 = {

    height: '70px',
    minWidth: '210px',
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '23px',
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

export default function CustomSignUp(props) {
    const { register, handleSubmit, errors } = useForm(); // initialize the hook
    const { open, onChangeD } = props;

    const handleClose = () => {
        setFiles([]);
        onChangeD(false);
    };
    //drop down
    const classes = useStyles();

    const [cities, setCities] = React.useState([]);
    const [city, setCity] = React.useState('');

    //end drop down

    //drop zone
    const [files, setFiles] = useState([]);
    const { getRootProps, getInputProps } = useDropzone({
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
    }, [props.open]);
    const getCity = async () => {
        axios.get('api/userCity')
            .then(res => {
                // console.log(res.data);
                setCities(res.data);
            }
            ).catch(err => {
                NotificationManager.error(<IntlMessages id="notification.errorMessage" />, <IntlMessages
                    id="notification.titleHere" />);
            }
            );
    };

    const onSubmit = (data) => {
        // console.log('data in post form', data);
            var companyLogo = '';
            let file = files[0];
            let reader = new FileReader();
            reader.onloadend = (file) => {
                companyLogo = reader.result;
                data['companyLogo'] = companyLogo;
                axios.post("api/signupRequest", data)
                    .then((res) => {
                        NotificationManager.success(
                        <IntlMessages id="notification.successMessageSignIp" />,
                        <IntlMessages id="notification.titleHereSingUp" />
                        );
                        // handleClose();
                    })
                    .catch((err) => {
                        NotificationManager.error(
                        <IntlMessages id="notification.errorMessageSingUp" />,
                        <IntlMessages id="notification.titleHereSingUp" />
                        );
                    });
            }
            reader.readAsDataURL(file);
        
    };


    return (
        <div className={classes.modlewidth}>
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} maxWidth="md" fullWidth="md">
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                 Registration Request Form
                </DialogTitle>
                <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                    <DialogContent dividers>
                        <div className="row">
                            <div className="col-xl-8 col-gl-8 col-md-8 col-sm-12 col-12">
                                <div className="row mb-4">
                                    <div className="col-xl-6 col-gl-6 col-md-6 col-sm-12 col-12">
                                        <TextField id="name" className={`form-control ${errors.name && 'mb-2'}`} name="name" label="Full Name" size="small" variant="outlined" inputRef={register({ required: true })} error={errors.name && true} helperText={errors.name && '*required'}
                                        />
                                    </div>
                                    <div className="col-xl-6 col-gl-6 col-md-6 col-sm-12 col-12">
                                        <TextField id="companyname" name="companyname" className={`form-control ${errors.companyname && 'mb-2'}`} size="small" label="Company Name" variant="outlined" inputRef={register({ required: true })} error={errors.companyname && true} helperText={errors.companyname && '*required'} />
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    <div className="col-xl-6 col-gl-6 col-md-6 col-sm-12 col-12">
                                        <TextField id="email" className={`form-control ${errors.email && 'mb-2'}`} label="Email" name="email" size="small" type="email" variant="outlined" inputRef={register({ required: true })} error={errors.email && true} helperText={errors.email && '*required'} />
                                    </div>
                                    <div className="col-xl-6 col-gl-6 col-md-6 col-sm-12 col-12">
                                        <TextField name="phone" className={`form-control ${errors.phone && 'mb-2'}`} label="Phone" size="small" variant="outlined" inputRef={register({ required: true })} error={errors.phone && true} helperText={errors.phone && '*required'} />
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    <div className="col-xl-6 col-gl-6 col-md-6 col-sm-12 col-12">
                                        <TextField name="website" className={`form-control`} label="Website" size="small" variant="outlined" inputRef={register()}/>
                                    </div>
                                    <div className="col-xl-6 col-gl-6 col-md-6 col-sm-12 col-12">
                                        <FormControl variant="outlined" className={`form-control ${errors.city && 'mb-2'}`} size="small">
                                            <InputLabel htmlFor="outlined-city-native-simple" error={errors.city && true} >City</InputLabel>
                                            <Select native
                                                inputRef={register({ required: true })}
                                                error={errors.expiration && true}
                                                // helperText={errors.expiration && '*required'}
                                                // value={city}
                                                onChange={e => setCity(e.target.value)}
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
                                </div>
                            </div>
                            <div className="col-xl-4 col-gl-4 col-md-4 col-sm-12 col-12">
                                <section className="container">
                                    <div {...getRootProps({ className: 'dropzone' })} style={dropzone1}>
                                        <input {...getInputProps()} />
                                        <p>Uplod Logo</p>
                                    </div>
                                    <aside style={thumbsContainer}>
                                        {thumbs}
                                    </aside>
                                </section>
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button type="submit" color="primary" variant="contained" className="pull-right">
                            Request Now
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
            <NotificationContainer />
        </div>
    );
}
