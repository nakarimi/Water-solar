import React from 'react';
// import ContainerHeader from "components/ContainerHeader/index";
// import IntlMessages from "util/IntlMessages";
import Uom from './Uom';
import CableType from './CableType';
// import AccessoriesType from './AccessoriesType';


const Setting = ({match}) => (
    <div className="app-wrapper">
   {/* <ContainerHeader match={match} title={<IntlMessages id="setting"/>}/>       */}
        <div className="row">

            <div className="col-md-4">
              <Uom  />
            </div>  
             <div className="col-md-4">
              <CableType />
            </div>
{/* 
            <div className="col-md-4">
             <AccessoriesType/>
            </div> */}
        </div>
  </div>
);

export default Setting;
