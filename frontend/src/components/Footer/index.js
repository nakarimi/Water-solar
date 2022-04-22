import React from 'react';
import Button from '@material-ui/core/Button';
import IntlMessages from 'util/IntlMessages';

const Footer = () => {
    return (
      <footer className="app-footer">
        <span className="d-inline-block">Copyright Company Name &copy; 2021</span>
        <Button
          href="#"
          target="_blank"
          size="small"
          color="primary"
        ><IntlMessages id="water_is_life"/></Button>
      </footer>
    );
  }
;

export default Footer;
