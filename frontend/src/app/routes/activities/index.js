import React from 'react';
import {NavLink} from 'react-router-dom';
// import ContainerHeader from "components/ContainerHeader/index";
// import IntlMessages from "util/IntlMessages";
import {ProjectList} from './ProjectList';
import SameDataComposedChart from './SameDataComposedChart';
import CardBox from 'components/CardBox';
import Widget from "components/Widget/index";

const activities=({match,props}) => {
  
  return (
    <div className="app-wrapper">
      {/* <ContainerHeader match={match} title={<IntlMessages id="Activities" />} /> */}
      <div className="row">
        <div className="col-md-8">
          <ProjectList />
        </div>

        <div className="col-md-4 p-0">

          <div className="pl-3 pr-3">
           <NavLink  to="/app/newproject">
                      <Widget styleName={`bg-gradient-primary darken-4 text-white mb-2`} >
                        <div className="d-flex flex-row justify-content-center mb-2">
                          <i className={`zmdi zmdi-plus-circle-o zmdi-hc-2x`} />
                        </div>
                        <div className="text-center">
                         <h3 className="jr-font-weight-medium mb-3">Add New Project</h3>
                       </div>
                  </Widget>
            </NavLink>
             </div>
                
          <CardBox styleName="col-lg-12" heading="User Insides Chart" className="p-0">
            <SameDataComposedChart />
          </CardBox>
            
        </div>
      </div>
    </div>
  )
};

export default activities;