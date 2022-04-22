import React from 'react';
// import ContainerHeader from "components/ContainerHeader/index";
// import IntlMessages from "util/IntlMessages";
// import VerticalTabs from './VerticalTabs';
import DownloadPage from './DownloadPage'

const Download = ({match}) => (
    <div className="app-wrapper">
    {/* <ContainerHeader match={match} title={<IntlMessages id="sidebar.download" />} />    */}
 
     <DownloadPage/>
  </div>
);

export default Download;