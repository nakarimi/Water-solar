import React from "react";
import {Table} from 'reactstrap';
import Widget from "components/Widget/index";
// import Avatar from '@material-ui/core/Avatar';
// import axios from 'axios';

const Projects = ({projects}) => {
  return (
    <Widget>
      <div className="d-flex flex-row mb-3">
        <h4 className="mb-0"> Current Project list</h4>
        {/* <span className="text-primary ml-auto pointer d-none d-sm-inline-flex align-items-sm-center">
                    <i className="zmdi zmdi-plus-circle-o mr-1"/>Add New Account</span> */}
      </div>
      <div className="table-responsive-material">
        <Table className="default-table table-unbordered table table-sm table-hover">
          <thead className="table-head-sm th-border-b">
          <tr>
            <th>Name</th>
            <th>Daynomic Head</th>
            <th>Motor Cable</th>
            <th>Dailay Output</th>
            <th>Dirty Loss</th>
          </tr>
          </thead>
          <tbody>
          {projects.map((data, index) => {
            return <tr key={index}>
              <td>
                <div className="d-flex align-items-center">
                  {/* {data.image === '' ? null :
                    <Avatar className="user-avatar size-30" src={`${axios.defaults.baseURL}user/img/${data.userimage}`}/>} */}
                  <div className="user-detail">
                    <h5 className="user-name">{data.name}</h5>
                  </div>
                </div>
              </td>
              <td>{data.daynomic_head}</td>
              <td>{data.motor_cable}</td>
              <td>{data.daily_output}</td>
              <td>
                {data.dirt_loss}
              </td>
            </tr>
          })}
          </tbody>
        </Table>
      </div>
      <span className="text-primary mt-2 pointer d-block d-sm-none">
                    <i className="zmdi zmdi-plus-circle-o mr-1 jr-fs-lg d-inline-block align-middle"/>
                    Add New Account</span>
    </Widget>
  );
};

export default Projects;
