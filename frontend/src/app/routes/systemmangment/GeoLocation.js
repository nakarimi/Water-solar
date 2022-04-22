import React, {useEffect, useState} from "react";
import {Table} from 'reactstrap';
import Widget from "components/Widget/index";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import './style.css';
import axios from 'axios';
// start dialog import file 
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import SettingsBrightnessIcon from '@material-ui/icons/SettingsBrightness';
import {NotificationContainer,NotificationManager} from 'react-notifications';
import IntlMessages from 'util/IntlMessages';
import Swal from 'sweetalert2';
import Spinner from 'react-spinner-material';

// end dialog import file 
import GeoLocationIrradiation from './commentElement/GeoLocationIrradiation';
import * as type from 'yup';
import { checkValidation, runValidation } from './commentElement/utils';

// start dialog code
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
// end dialog code 

// start code for country selection 
// ISO 3166-1 alpha-2
// ⚠️ No support for IE 11
// function countryToFlag(isoCode) {
//   return typeof String.fromCodePoint !== 'undefined'
//     ? isoCode
//         .toUpperCase()
//         .replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397))
//     : isoCode;
// }
const useStyles = makeStyles({
  option: {
    fontSize: 15,
    '& > span': {
      marginRight: 10,
      fontSize: 18,
    },
  },
});
// From https://bitbucket.org/atlassian/atlaskit-mk-2/raw/4ad0e56649c3e6c973e226b7efaeb28cb240ccb0/packages/core/select/src/data/countries.js
const countries = [
  { code: 'AF', label: 'Afghanistan', phone: '93' },
  { code: 'AD', label: 'Andorra', phone: '376' },
  { code: 'AE', label: 'United Arab Emirates', phone: '971' },
  { code: 'AG', label: 'Antigua and Barbuda', phone: '1-268' },
  { code: 'AI', label: 'Anguilla', phone: '1-264' },
  { code: 'AL', label: 'Albania', phone: '355' },
  { code: 'AM', label: 'Armenia', phone: '374' },
  { code: 'AO', label: 'Angola', phone: '244' },
  { code: 'AQ', label: 'Antarctica', phone: '672' },
  { code: 'AR', label: 'Argentina', phone: '54' },
  { code: 'AS', label: 'American Samoa', phone: '1-684' },
  { code: 'AT', label: 'Austria', phone: '43' },
  { code: 'AU', label: 'Australia', phone: '61', suggested: true },
  { code: 'AW', label: 'Aruba', phone: '297' },
  { code: 'AX', label: 'Alland Islands', phone: '358' },
  { code: 'AZ', label: 'Azerbaijan', phone: '994' },
  { code: 'BA', label: 'Bosnia and Herzegovina', phone: '387' },
  { code: 'BB', label: 'Barbados', phone: '1-246' },
  { code: 'BD', label: 'Bangladesh', phone: '880' },
  { code: 'BE', label: 'Belgium', phone: '32' },
  { code: 'BF', label: 'Burkina Faso', phone: '226' },
  { code: 'BG', label: 'Bulgaria', phone: '359' },
  { code: 'BH', label: 'Bahrain', phone: '973' },
  { code: 'BI', label: 'Burundi', phone: '257' },
  { code: 'BJ', label: 'Benin', phone: '229' },
  { code: 'BL', label: 'Saint Barthelemy', phone: '590' },
  { code: 'BM', label: 'Bermuda', phone: '1-441' },
  { code: 'BN', label: 'Brunei Darussalam', phone: '673' },
  { code: 'BO', label: 'Bolivia', phone: '591' },
  { code: 'BR', label: 'Brazil', phone: '55' },
  { code: 'BS', label: 'Bahamas', phone: '1-242' },
  { code: 'BT', label: 'Bhutan', phone: '975' },
  { code: 'BV', label: 'Bouvet Island', phone: '47' },
  { code: 'BW', label: 'Botswana', phone: '267' },
  { code: 'BY', label: 'Belarus', phone: '375' },
  { code: 'BZ', label: 'Belize', phone: '501' },
  { code: 'CA', label: 'Canada', phone: '1', suggested: true },
  { code: 'CC', label: 'Cocos (Keeling) Islands', phone: '61' },
  { code: 'CD', label: 'Congo, Democratic Republic of the', phone: '243' },
  { code: 'CF', label: 'Central African Republic', phone: '236' },
  { code: 'CG', label: 'Congo, Republic of the', phone: '242' },
  { code: 'CH', label: 'Switzerland', phone: '41' },
  { code: 'CI', label: "Cote d'Ivoire", phone: '225' },
  { code: 'CK', label: 'Cook Islands', phone: '682' },
  { code: 'CL', label: 'Chile', phone: '56' },
  { code: 'CM', label: 'Cameroon', phone: '237' },
  { code: 'CN', label: 'China', phone: '86' },
  { code: 'CO', label: 'Colombia', phone: '57' },
  { code: 'CR', label: 'Costa Rica', phone: '506' },
  { code: 'CU', label: 'Cuba', phone: '53' },
  { code: 'CV', label: 'Cape Verde', phone: '238' },
  { code: 'CW', label: 'Curacao', phone: '599' },
  { code: 'CX', label: 'Christmas Island', phone: '61' },
  { code: 'CY', label: 'Cyprus', phone: '357' },
  { code: 'CZ', label: 'Czech Republic', phone: '420' },
  { code: 'DE', label: 'Germany', phone: '49', suggested: true },
  { code: 'DJ', label: 'Djibouti', phone: '253' },
  { code: 'DK', label: 'Denmark', phone: '45' },
  { code: 'DM', label: 'Dominica', phone: '1-767' },
  { code: 'DO', label: 'Dominican Republic', phone: '1-809' },
  { code: 'DZ', label: 'Algeria', phone: '213' },
  { code: 'EC', label: 'Ecuador', phone: '593' },
  { code: 'EE', label: 'Estonia', phone: '372' },
  { code: 'EG', label: 'Egypt', phone: '20' },
  { code: 'EH', label: 'Western Sahara', phone: '212' },
  { code: 'ER', label: 'Eritrea', phone: '291' },
  { code: 'ES', label: 'Spain', phone: '34' },
  { code: 'ET', label: 'Ethiopia', phone: '251' },
  { code: 'FI', label: 'Finland', phone: '358' },
  { code: 'FJ', label: 'Fiji', phone: '679' },
  { code: 'FK', label: 'Falkland Islands (Malvinas)', phone: '500' },
  { code: 'FM', label: 'Micronesia, Federated States of', phone: '691' },
  { code: 'FO', label: 'Faroe Islands', phone: '298' },
  { code: 'FR', label: 'France', phone: '33', suggested: true },
  { code: 'GA', label: 'Gabon', phone: '241' },
  { code: 'GB', label: 'United Kingdom', phone: '44' },
  { code: 'GD', label: 'Grenada', phone: '1-473' },
  { code: 'GE', label: 'Georgia', phone: '995' },
  { code: 'GF', label: 'French Guiana', phone: '594' },
  { code: 'GG', label: 'Guernsey', phone: '44' },
  { code: 'GH', label: 'Ghana', phone: '233' },
  { code: 'GI', label: 'Gibraltar', phone: '350' },
  { code: 'GL', label: 'Greenland', phone: '299' },
  { code: 'GM', label: 'Gambia', phone: '220' },
  { code: 'GN', label: 'Guinea', phone: '224' },
  { code: 'GP', label: 'Guadeloupe', phone: '590' },
  { code: 'GQ', label: 'Equatorial Guinea', phone: '240' },
  { code: 'GR', label: 'Greece', phone: '30' },
  { code: 'GS', label: 'South Georgia and the South Sandwich Islands', phone: '500' },
  { code: 'GT', label: 'Guatemala', phone: '502' },
  { code: 'GU', label: 'Guam', phone: '1-671' },
  { code: 'GW', label: 'Guinea-Bissau', phone: '245' },
  { code: 'GY', label: 'Guyana', phone: '592' },
  { code: 'HK', label: 'Hong Kong', phone: '852' },
  { code: 'HM', label: 'Heard Island and McDonald Islands', phone: '672' },
  { code: 'HN', label: 'Honduras', phone: '504' },
  { code: 'HR', label: 'Croatia', phone: '385' },
  { code: 'HT', label: 'Haiti', phone: '509' },
  { code: 'HU', label: 'Hungary', phone: '36' },
  { code: 'ID', label: 'Indonesia', phone: '62' },
  { code: 'IE', label: 'Ireland', phone: '353' },
  { code: 'IL', label: 'Israel', phone: '972' },
  { code: 'IM', label: 'Isle of Man', phone: '44' },
  { code: 'IN', label: 'India', phone: '91' },
  { code: 'IO', label: 'British Indian Ocean Territory', phone: '246' },
  { code: 'IQ', label: 'Iraq', phone: '964' },
  { code: 'IR', label: 'Iran, Islamic Republic of', phone: '98' },
  { code: 'IS', label: 'Iceland', phone: '354' },
  { code: 'IT', label: 'Italy', phone: '39' },
  { code: 'JE', label: 'Jersey', phone: '44' },
  { code: 'JM', label: 'Jamaica', phone: '1-876' },
  { code: 'JO', label: 'Jordan', phone: '962' },
  { code: 'JP', label: 'Japan', phone: '81', suggested: true },
  { code: 'KE', label: 'Kenya', phone: '254' },
  { code: 'KG', label: 'Kyrgyzstan', phone: '996' },
  { code: 'KH', label: 'Cambodia', phone: '855' },
  { code: 'KI', label: 'Kiribati', phone: '686' },
  { code: 'KM', label: 'Comoros', phone: '269' },
  { code: 'KN', label: 'Saint Kitts and Nevis', phone: '1-869' },
  { code: 'KP', label: "Korea, Democratic People's Republic of", phone: '850' },
  { code: 'KR', label: 'Korea, Republic of', phone: '82' },
  { code: 'KW', label: 'Kuwait', phone: '965' },
  { code: 'KY', label: 'Cayman Islands', phone: '1-345' },
  { code: 'KZ', label: 'Kazakhstan', phone: '7' },
  { code: 'LA', label: "Lao People's Democratic Republic", phone: '856' },
  { code: 'LB', label: 'Lebanon', phone: '961' },
  { code: 'LC', label: 'Saint Lucia', phone: '1-758' },
  { code: 'LI', label: 'Liechtenstein', phone: '423' },
  { code: 'LK', label: 'Sri Lanka', phone: '94' },
  { code: 'LR', label: 'Liberia', phone: '231' },
  { code: 'LS', label: 'Lesotho', phone: '266' },
  { code: 'LT', label: 'Lithuania', phone: '370' },
  { code: 'LU', label: 'Luxembourg', phone: '352' },
  { code: 'LV', label: 'Latvia', phone: '371' },
  { code: 'LY', label: 'Libya', phone: '218' },
  { code: 'MA', label: 'Morocco', phone: '212' },
  { code: 'MC', label: 'Monaco', phone: '377' },
  { code: 'MD', label: 'Moldova, Republic of', phone: '373' },
  { code: 'ME', label: 'Montenegro', phone: '382' },
  { code: 'MF', label: 'Saint Martin (French part)', phone: '590' },
  { code: 'MG', label: 'Madagascar', phone: '261' },
  { code: 'MH', label: 'Marshall Islands', phone: '692' },
  { code: 'MK', label: 'Macedonia, the Former Yugoslav Republic of', phone: '389' },
  { code: 'ML', label: 'Mali', phone: '223' },
  { code: 'MM', label: 'Myanmar', phone: '95' },
  { code: 'MN', label: 'Mongolia', phone: '976' },
  { code: 'MO', label: 'Macao', phone: '853' },
  { code: 'MP', label: 'Northern Mariana Islands', phone: '1-670' },
  { code: 'MQ', label: 'Martinique', phone: '596' },
  { code: 'MR', label: 'Mauritania', phone: '222' },
  { code: 'MS', label: 'Montserrat', phone: '1-664' },
  { code: 'MT', label: 'Malta', phone: '356' },
  { code: 'MU', label: 'Mauritius', phone: '230' },
  { code: 'MV', label: 'Maldives', phone: '960' },
  { code: 'MW', label: 'Malawi', phone: '265' },
  { code: 'MX', label: 'Mexico', phone: '52' },
  { code: 'MY', label: 'Malaysia', phone: '60' },
  { code: 'MZ', label: 'Mozambique', phone: '258' },
  { code: 'NA', label: 'Namibia', phone: '264' },
  { code: 'NC', label: 'New Caledonia', phone: '687' },
  { code: 'NE', label: 'Niger', phone: '227' },
  { code: 'NF', label: 'Norfolk Island', phone: '672' },
  { code: 'NG', label: 'Nigeria', phone: '234' },
  { code: 'NI', label: 'Nicaragua', phone: '505' },
  { code: 'NL', label: 'Netherlands', phone: '31' },
  { code: 'NO', label: 'Norway', phone: '47' },
  { code: 'NP', label: 'Nepal', phone: '977' },
  { code: 'NR', label: 'Nauru', phone: '674' },
  { code: 'NU', label: 'Niue', phone: '683' },
  { code: 'NZ', label: 'New Zealand', phone: '64' },
  { code: 'OM', label: 'Oman', phone: '968' },
  { code: 'PA', label: 'Panama', phone: '507' },
  { code: 'PE', label: 'Peru', phone: '51' },
  { code: 'PF', label: 'French Polynesia', phone: '689' },
  { code: 'PG', label: 'Papua New Guinea', phone: '675' },
  { code: 'PH', label: 'Philippines', phone: '63' },
  { code: 'PK', label: 'Pakistan', phone: '92' },
  { code: 'PL', label: 'Poland', phone: '48' },
  { code: 'PM', label: 'Saint Pierre and Miquelon', phone: '508' },
  { code: 'PN', label: 'Pitcairn', phone: '870' },
  { code: 'PR', label: 'Puerto Rico', phone: '1' },
  { code: 'PS', label: 'Palestine, State of', phone: '970' },
  { code: 'PT', label: 'Portugal', phone: '351' },
  { code: 'PW', label: 'Palau', phone: '680' },
  { code: 'PY', label: 'Paraguay', phone: '595' },
  { code: 'QA', label: 'Qatar', phone: '974' },
  { code: 'RE', label: 'Reunion', phone: '262' },
  { code: 'RO', label: 'Romania', phone: '40' },
  { code: 'RS', label: 'Serbia', phone: '381' },
  { code: 'RU', label: 'Russian Federation', phone: '7' },
  { code: 'RW', label: 'Rwanda', phone: '250' },
  { code: 'SA', label: 'Saudi Arabia', phone: '966' },
  { code: 'SB', label: 'Solomon Islands', phone: '677' },
  { code: 'SC', label: 'Seychelles', phone: '248' },
  { code: 'SD', label: 'Sudan', phone: '249' },
  { code: 'SE', label: 'Sweden', phone: '46' },
  { code: 'SG', label: 'Singapore', phone: '65' },
  { code: 'SH', label: 'Saint Helena', phone: '290' },
  { code: 'SI', label: 'Slovenia', phone: '386' },
  { code: 'SJ', label: 'Svalbard and Jan Mayen', phone: '47' },
  { code: 'SK', label: 'Slovakia', phone: '421' },
  { code: 'SL', label: 'Sierra Leone', phone: '232' },
  { code: 'SM', label: 'San Marino', phone: '378' },
  { code: 'SN', label: 'Senegal', phone: '221' },
  { code: 'SO', label: 'Somalia', phone: '252' },
  { code: 'SR', label: 'Suriname', phone: '597' },
  { code: 'SS', label: 'South Sudan', phone: '211' },
  { code: 'ST', label: 'Sao Tome and Principe', phone: '239' },
  { code: 'SV', label: 'El Salvador', phone: '503' },
  { code: 'SX', label: 'Sint Maarten (Dutch part)', phone: '1-721' },
  { code: 'SY', label: 'Syrian Arab Republic', phone: '963' },
  { code: 'SZ', label: 'Swaziland', phone: '268' },
  { code: 'TC', label: 'Turks and Caicos Islands', phone: '1-649' },
  { code: 'TD', label: 'Chad', phone: '235' },
  { code: 'TF', label: 'French Southern Territories', phone: '262' },
  { code: 'TG', label: 'Togo', phone: '228' },
  { code: 'TH', label: 'Thailand', phone: '66' },
  { code: 'TJ', label: 'Tajikistan', phone: '992' },
  { code: 'TK', label: 'Tokelau', phone: '690' },
  { code: 'TL', label: 'Timor-Leste', phone: '670' },
  { code: 'TM', label: 'Turkmenistan', phone: '993' },
  { code: 'TN', label: 'Tunisia', phone: '216' },
  { code: 'TO', label: 'Tonga', phone: '676' },
  { code: 'TR', label: 'Turkey', phone: '90' },
  { code: 'TT', label: 'Trinidad and Tobago', phone: '1-868' },
  { code: 'TV', label: 'Tuvalu', phone: '688' },
  { code: 'TW', label: 'Taiwan, Province of China', phone: '886' },
  { code: 'TZ', label: 'United Republic of Tanzania', phone: '255' },
  { code: 'UA', label: 'Ukraine', phone: '380' },
  { code: 'UG', label: 'Uganda', phone: '256' },
  { code: 'US', label: 'United States', phone: '1', suggested: true },
  { code: 'UY', label: 'Uruguay', phone: '598' },
  { code: 'UZ', label: 'Uzbekistan', phone: '998' },
  { code: 'VA', label: 'Holy See (Vatican City State)', phone: '379' },
  { code: 'VC', label: 'Saint Vincent and the Grenadines', phone: '1-784' },
  { code: 'VE', label: 'Venezuela', phone: '58' },
  { code: 'VG', label: 'British Virgin Islands', phone: '1-284' },
  { code: 'VI', label: 'US Virgin Islands', phone: '1-340' },
  { code: 'VN', label: 'Vietnam', phone: '84' },
  { code: 'VU', label: 'Vanuatu', phone: '678' },
  { code: 'WF', label: 'Wallis and Futuna', phone: '681' },
  { code: 'WS', label: 'Samoa', phone: '685' },
  { code: 'XK', label: 'Kosovo', phone: '383' },
  { code: 'YE', label: 'Yemen', phone: '967' },
  { code: 'YT', label: 'Mayotte', phone: '262' },
  { code: 'ZA', label: 'South Africa', phone: '27' },
  { code: 'ZM', label: 'Zambia', phone: '260' },
  { code: 'ZW', label: 'Zimbabwe', phone: '263' },
];
// end code for country selection 

const initialState = {
  formData: {
    country: '',
    city: '',
    latitude: '',
    longtitude: '',
  },
  error: {},
  touched: {},
  isValid: false
};

const setState = 'SET_STATE';

function reducer(state, action) {
  switch(action.type) {
    case setState:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
}
const schema = type.object().shape({
  country: type.string().required("Required"),
  city: type.string().required("Required"),
  latitude: type.number("must be a number").required("Required"),
  longtitude: type.number("must be a number").required("Required"),
});


const GeoLocation=() => {
  const [visibility,setVisibility]= useState(false);
  const [geoLocations,setGeoLocations]= useState([]);
  const [geoLoIrr, setGeoLoIrr] = useState([]);
  const [geoLocationId,setGeoLocationId]= useState(0);
  const [geoLocationCity,setGeoLocationCity]= useState('');

  const [district, setDistrict] = React.useState("");
  const [latitude, setLatitude] = React.useState("");
  const [longtitude, setLongtitude] = React.useState("");
  const [country, setCountry] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [openGeoIr, setOpenGeoIr] = React.useState(false);
   
  const [{
    formData,
    error,
    touched,
    isValid
  }, dispatch] = React.useReducer(reducer, initialState);

  useEffect(() => {
    getGeoLocations();
  },[])
  useEffect(() => {
    getGeoLocationIrradiations(1);
  },[openGeoIr])
  const classes = useStyles();
  // form code 
  // getModalStyle is not a pure function, we roll the style only on the first render
  
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
// end dialog code for modal 
// start form sumbit


const getGeoLocations = async() =>{
  setVisibility(true)
  axios.get('api/new_location')
      .then(res => {  
          setVisibility(false)
          // console.log(res);
          setGeoLocations(res.data);
        }
    ).catch(err => {
          setVisibility(false)
           NotificationManager.error(<IntlMessages id="notification.errorMessage"/>, <IntlMessages
              id="notification.titleHere"/>);
          }
      )
};

const getGeoLocationIrradiations = async(geoId) =>{
  // setVisibility(true)
  axios.get('api/new_location/'+geoId)
      .then(res => {  
          // setVisibility(false)
          // console.log("result data from server:", res);
          setGeoLoIrr(res.data);
        }
    ).catch(err => {
          // setVisibility(false)
          console.log("result data from server:", err);
           NotificationManager.error(<IntlMessages id="notification.errorMessage"/>, <IntlMessages
              id="notification.titleHere"/>);
          }
      )
};
  const handgleCountry = async (event, value) => {
    setCountry(value);
    let name = 'country';
    const schemaErrors = await runValidation(schema, {
      ...formData, [name]: value?.label
    });
    dispatch({
      type: setState,
      payload: {
        error: schemaErrors,
        formData: { ...formData, [name]: value?.label },
        touched: { ...touched, [name]: true },
        isValid: checkValidation(schemaErrors)
      }
    });
  };
  const handleChange = async ({ target: { name, value } }) => {
    if(name==='city'){
      setDistrict(value)
    }
    else if(name==='latitude'){
      setLatitude(value)
    }
    else if(name==='longtitude'){
      setLongtitude(value)
    }
    const schemaErrors = await runValidation(schema, {
      ...formData, [name]: value
    });
    dispatch({
      type: setState,
      payload: {
        error: schemaErrors,
        formData: { ...formData, [name]: value },
        touched: { ...touched, [name]: true },
        isValid: checkValidation(schemaErrors)
      }
    });
  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    
    // const isValid = await schema.isValid(formData);
    const isValid = true;
    console.log("isValid: ", isValid);
    if(isValid){
      var countryName = country.label;
      let data = {
        countryName, district, latitude, longtitude
      }
      // console.log(district);
      console.log(data);
      setVisibility(true)
      axios.post('api/new_location', data)
          .then(
              res => {
                // console.log(res);
                setVisibility(false)
                getGeoLocations();
                NotificationManager.success(<IntlMessages id="notification.successMessage"/>, <IntlMessages
                id="notification.titleHere" />);
                handleClose();
              }
          ).catch(
              err =>{
                setVisibility(false)
                NotificationManager.error(<IntlMessages id="notification.errorMessage"/>, <IntlMessages
                id="notification.titleHere"/>);
                  console.log(err);
              } 
          )
    }
    
  }
// end form sumbit

// Delete functions for geo location
const deletGeoLocation=(id) => {
  setVisibility(true)
  console.log("it is id of that geo location: ", id);
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if(result.isConfirmed) {
      axios.delete('api/new_location/'+id)
        .then(res => {
              // setGeoLocations(res.data)
            setVisibility(false)
            setGeoLocations(geoLocations.filter((value) => value.id !==id));
            NotificationManager.success(<IntlMessages id="notification.successMessage"/>, <IntlMessages
            id="notification.titleHere" />);
          }
        ).catch( err =>{
          setVisibility(false)
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
             
            })
        })  
    }
  })
}

  return (
    <div className="row">
    <div className="col-xl-6 col-lg-6 col-md-12 col-12 card-height">
        <Widget styleName={`hiegthCard`}>
       
      <div className="d-flex flex-row mb-3">
        <h4 className="mb-0"> Areas</h4>
            <span className="text-primary ml-auto pointer d-none d-sm-inline-flex align-items-sm-center" onClick={handleClickOpen}>
         <i className="zmdi zmdi-plus-circle-o mr-1"/>New Location</span> 
      </div>
      <span className="row justify-content-center">
        <Spinner radius={60} color={"#3f51b5"} stroke={3} visible={visibility} />
      </span>  
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        Add Geo-Location Country with City
        </DialogTitle>
        <DialogContent dividers>
          
          <div className="row">
            <div className="col-xl-8 col-gl-8 col-md-8 col-sm-12 col-12 cellPadding">
            <Autocomplete name="country"
              id="country-select-demo"  onChange={(event, newValue) => handgleCountry(event, newValue)}
              style={{ width: 300 }}
              options={countries}
              classes={{
                option: classes.option,
              }}
              autoHighlight
              getOptionLabel={(option) => option.label}
              renderOption={(option) => (
                <React.Fragment>
                  {/* <span>{countryToFlag(option.code)}</span> */}
                  {/* {option.label} ({option.code}) +{option.phone} */}
                  {option.label} 
                </React.Fragment>
              )}
              renderInput={(params) => (
                <TextField id="countryName" name="country"  
                  {...params}
                  label="Choose a country"
                  error={(touched && touched.country) && (error && error.country) ? true : false}
                  helperText={(touched && touched.country) && (error && error.country) ? 'required' : ''}
                  variant="outlined"
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: 'new-password', // disable autocomplete and autofill
                  }}
                />
              )} 
            /> 
             
            </div>
            <div className="col-xl-4 col-gl-4 col-md-4 col-sm-12 col-12 cellPadding">
              <TextField  id="outlined-basic" value={district} onChange={(e) => handleChange(e)} label="City" name='city' variant="outlined"
              error={(touched && touched.city) && (error && error.city) ? true : false}
              helperText={(touched && touched.city) && (error && error.city) ? 'required' : ''}
              />
              {/* { (touched && touched.city) && (error && error.city) && (
                <i>
                  {error.city}
                </i>
              )} */}
            </div>
          {/* </div>
          <div className="row"> */}
            <div className="col-xl-4 col-gl-4 col-md-4 col-sm-12 col-12 cellPadding">
              <TextField type="number" id="outlined-basic" size="small" value={latitude} onChange={(e) => handleChange(e)} label="Latitude" name='latitude' variant="outlined" 
              error={(touched && touched.latitude) && (error && error.latitude) ? true : false}
              helperText={(touched && touched.latitude) && (error && error.latitude) ? 'required' : ''}
              />
              {/* { (touched && touched.latitude) && (error && error.latitude) && (
                <i>
                  {error.latitude}
                </i>
              )} */}
            </div>
            <div className="col-xl-4 col-gl-4 col-md-4 col-sm-12 col-12 cellPadding">
              <TextField type="number" id="outlined-basic" size="small" value={longtitude} onChange={(e) => handleChange(e)} label="Longtitude" name='longtitude' variant="outlined" 
              error={(touched && touched.longtitude) && (error && error.longtitude) ? true : false}
              helperText={(touched && touched.longtitude) && (error && error.longtitude) ? 'required' : ''}
              />
              {/* { (touched && touched.longtitude) && (error && error.longtitude) && (
                <i>
                  {error.longtitude}
                </i>
              )} */}
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button type="submit" autoFocus color="primary" disabled={!isValid}>
            Save
          </Button>
        </DialogActions>
        </form>
      </Dialog>
          
      <div className="table-responsive-material">
        <Table className="default-table table-unbordered table table-sm table-hover">
          <thead className="table-head-sm th-border-b">
          <tr>
            <th>Id</th>
            <th>Country</th>
            <th>City</th>
            <th>Latitude</th>
            <th>Longtitude</th>
            <th>Action</th>
          </tr>
          </thead>
          <tbody>
          {geoLocations.map((data, index) => {
            return <tr key={index}>
              <td>{index+1}</td>
              <td>
                <div className="d-flex align-items-center">
                  <div className="user-detail">
                    <h5 className="user-name">{data.country}</h5>
                  </div>
                </div>
              </td>
              <td>{data.city}</td>
              <td>{data.latitude}</td>
              <td>{data.longtitude}</td>
              <td>
                <div className="pointer text-primary">
                <IconButton size="small" aria-label="delete"  color="secondary" onClick={() => deletGeoLocation(data.id)} >
                  <DeleteIcon />
                </IconButton>
                </div>
              </td>
            </tr>
          })}
          </tbody>
        </Table>
      </div>
      <span className="text-primary mt-2 pointer d-block d-sm-none" onClick={handleClickOpen}>
        <i className="zmdi zmdi-plus-circle-o mr-1 jr-fs-lg d-inline-block align-middle"/>
              New Location </span>
        
      </Widget>
    </div>

    <div className="col-xl-6 col-lg-6 col-md-12 col-12">
    <GeoLocationIrradiation 
        openGeoIr={openGeoIr}
        setOpenGeoIr={setOpenGeoIr}
        geoLocationId={geoLocationId}
        geoLocationCity={geoLocationCity}
      />
          <Widget  styleName={`hiegthCard`}>
      <div className="d-flex flex-row mb-3">
        <h4 className="mb-0"> Irradiation</h4>
        {/* <span className="text-primary ml-auto pointer d-none d-sm-inline-flex align-items-sm-center">
                    <i className="zmdi zmdi-plus-circle-o mr-1"/>New Record</span> */}
      </div>
      <span className="row justify-content-center">
        <Spinner radius={60} color={"#3f51b5"} stroke={3} visible={visibility} />
      </span> 
      <div className="table-responsive-material">
        <Table className="default-table table-unbordered table table-sm table-hover">
          <thead className="table-head-sm th-border-b">
          <tr>
            <th>ID</th>
            <th>City</th>
            <th>Irradiation (now)</th>
            <th>Action</th>
          </tr>
          </thead>
          <tbody>
          {geoLoIrr.map((data, index) => {
            return <tr key={index}>
              <td>{index+1}</td>
              <td>
                <div className="d-flex align-items-center">
                  <div className="user-detail">
                    <h5 className="user-name">{data.city}</h5>
                  </div>
                </div>
              </td>
              <td >{(data.currentIrr)? data.currentIrr: '0.00'}</td>
              <td>
                <div className="pointer text-primary">
                  <span className="d-inline-block mr-1">
                  <IconButton size="small" aria-label="Add Irradiation"  color="inherit" onClick={()=>{setGeoLocationId(data.id); setGeoLocationCity(data.city); setOpenGeoIr(true); }} >
                    <SettingsBrightnessIcon />
                  </IconButton>
                    {/* <i className="zmdi zmdi-mail-reply zmdi-hc-fw zmdi-hc-flip-horizontal"/> */}
                  </span>
                  {/* <span className="d-inline-block">{data.action}</span> */}
                </div>
              </td>
            </tr>
          })}
          </tbody>
        </Table>
      </div>
      {/* <span className="text-primary mt-2 pointer d-block d-sm-none">
        <i className="zmdi zmdi-plus-circle-o mr-1 jr-fs-lg d-inline-block align-middle"/>
              Add New Account</span> */}
        
      </Widget>
      <NotificationContainer />
      </div>

    </div>  
    

  );
};

export default GeoLocation;
