import React from 'react';
// import ContainerHeader from "components/ContainerHeader/index";
// import IntlMessages from "util/IntlMessages";
import {UserList} from "./UserList";






const Usermangment = ({match}) => (
    <div className="app-wrapper">
   {/* <ContainerHeader match={match} title={<IntlMessages id="sidebar.usermangment"/>}/>   */}
    
   
     <UserList/>
  </div>

);

export default Usermangment;
