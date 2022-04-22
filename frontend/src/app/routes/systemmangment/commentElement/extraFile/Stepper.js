import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';
import SettingsIcon from '@material-ui/icons/Settings';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import VideoLabelIcon from '@material-ui/icons/VideoLabel';
import StepConnector from '@material-ui/core/StepConnector';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  activeBrand: {
    '& $line': {
      borderColor: '#784af4',
    },
  },
  completedBrand: {
    '& $line': {
      borderColor: '#784af4',
    },
  },
  line: {
    borderColor: '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1,
  },
})(StepConnector);

const useQontoStepIconStyles = makeStyles({
  root: {
    color: '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
  },
  activeBrand: {
    color: '#784af4',
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
  completedBrand: {
    color: '#784af4',
    zIndex: 1,
    fontSize: 18,
  },
});

function QontoStepIcon(props) {
  const classes = useQontoStepIconStyles();
  const { activeBrand, completedBrand } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.activeBrand]: activeBrand,
      })}
    >
      {completedBrand ? <Check className={classes.completedBrand} /> : <div className={classes.circle} />}
    </div>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is activeBrand.
   */
  activeBrand: PropTypes.bool,
  /**
   * Mark the step as completedBrand. Is passed to child components.
   */
  completedBrand: PropTypes.bool,
};

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  activeBrand: {
    '& $line': {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  completedBrand: {
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
  activeBrand: {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  },
  completedBrand: {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  },
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { activeBrand, completedBrand } = props;

  const icons = {
    1: <SettingsIcon />,
    2: <GroupAddIcon />,
    3: <VideoLabelIcon />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.activeBrand]: activeBrand,
        [classes.completedBrand]: completedBrand,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is activeBrand.
   */
  activeBrand: PropTypes.bool,
  /**
   * Mark the step as completedBrand. Is passed to child components.
   */
  completedBrand: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getStepsBrand() {
  return ['Select campaign settings', 'Create an ad group', 'Create an ad'];
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

export default function CustomizedSteppers() {
  const classes = useStyles();
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

  return (
    <div className={classes.root}>
      <Stepper alternativeLabel activeStepBrand={activeStepBrand}>
        {stepsBrand.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Stepper alternativeLabel activeStepBrand={activeStepBrand} connector={<QontoConnector />}>
        {stepsBrand.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Stepper alternativeLabel activeStep={activeStepBrand} connector={<ColorlibConnector />}>
        {stepsBrand.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStepBrand === stepsBrand.length ? (
          <div>
            <Typography className={classes.instructions}>
              All stepsBrand completedBrand - you&apos;re finished
            </Typography>
            <Button onClick={handleResetBrand} className={classes.button}>
              Reset
            </Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>{getStepContent(activeStepBrand)}</Typography>
            <div>
              <Button disabled={activeStepBrand === 0} onClick={handleBackBrand} className={classes.button}>
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNextBrand}
                className={classes.button}
              >
                {activeStepBrand === stepsBrand.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}