import React from 'react';
import ContainerHeader from "components/ContainerHeader/index";
import IntlMessages from "util/IntlMessages";

const ProjectSummary=({match}) => (
    <div className="app-wrapper">
    <ContainerHeader match={match} title={<IntlMessages id="Project Summary"/>}/>       
    </div>
);

export default ProjectSummary;
