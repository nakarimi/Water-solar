import React from 'react';

// import ContainerHeader from "components/ContainerHeader/index";
import IntlMessages from "util/IntlMessages";
import CardBox from 'components/CardBox/index';

import GeoLocation from "./GeoLocation"; 
import WaterPump from "./WaterPump";
import SolarPanel from "./SolarPanel";
import Accessories from "./Accessories";
import Invertor from "./Invertor";
import Divider from '@material-ui/core/Divider';

import './style.css';

const Systemmangment = ({match}) => (
    <div className="app-wrapper">
      {/* <ContainerHeader match={match} title={<IntlMessages id="System Mangment"/>} />  */}
      <h3><b>Geo-Location Mangment</b></h3>
      <span>
        <GeoLocation/>
      </span>
      <Divider className='diver-sys' /> <br/>

      <h3><b>Water Pumps</b></h3>
      <span>
        <WaterPump/>
      </span>
      <Divider  className='diver-sys' /><br/>

      <h3><b>Solar Panels</b></h3>
      <span>
        <SolarPanel/>
      </span>
      <Divider  className='diver-sys' /><br/>

      <h3><b>Inverters</b></h3>
      <span>
        <Invertor/>
      </span>
      <Divider  className='diver-sys' /><br/>
      <div className="row mb-md-3">
        <CardBox styleName="col-12" cardStyle="p-0" heading={<IntlMessages id="Accessories"/>}
                  headerOutside>
          <Accessories/>
        </CardBox>
      </div>
  </div>
);

export default Systemmangment;