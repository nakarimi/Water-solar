import React from 'react';
// import ContainerHeader from "components/ContainerHeader/index";
// import IntlMessages from "util/IntlMessages";
// import VerticalTabs from './VerticalTabs';
import SizingPage from './SizingPage'

const Sizing = ({match}) => (
    <div className="app-wrapper">
    {/* <ContainerHeader match={match} title={<IntlMessages id="sidebar.sizing" />} />    */}
 
     <SizingPage/>
  </div>
);

export default Sizing;