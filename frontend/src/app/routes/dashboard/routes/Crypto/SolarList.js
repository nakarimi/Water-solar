import React from "react";
import {Table} from 'reactstrap';
import Widget from "components/Widget/index";
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import GetAppIcon from '@material-ui/icons/GetApp';
import axios from 'axios';

const SolarList = ({solarLists}) => {
  const download = (data) => {
    console.log('data: ', data);
  }
  return (
    <Widget>
      <div className="d-flex flex-row mb-3">
        <h4 className="mb-0"> Solar list</h4>
        {/* <span className="text-primary ml-auto pointer d-none d-sm-inline-flex align-items-sm-center">
                    <i className="zmdi zmdi-plus-circle-o mr-1"/>Add New Account</span> */}
      </div>
      <div className="table-responsive-material">
        <Table className="default-table table-unbordered table table-sm table-hover">
          <thead className="table-head-sm th-border-b">
          <tr>
          <th>Model</th>
          <th>Power (W)</th>
          <th>Voltage (V)</th>
          <th>Current (A)</th>
          <th>Download</th>
          </tr>
          </thead>
          <tbody>
          {solarLists.map((data, index) => {
            return <tr key={index}>
              <td>
                <div className="d-flex align-items-center">
                  {data.image === '' ? null :
                    <Avatar className="user-avatar size-30" src={`${axios.defaults.baseURL}brand/solar/solar_list/${data.image}`}/>}
                  <div className="user-detail">
                    <h5 className="user-name">{data.model}</h5>
                  </div>
                </div>
              </td>
              <td>{data.power}</td>
              <td>{data.voltage}</td>
              <td>{data.current}</td>
              <td>
                <div className="pointer text-primary">
                  <IconButton size="small" color="primary" aria-label="edit an alarm" onClick={() => download(data)}>
                      <GetAppIcon />
                  </IconButton>
                </div>
              </td>
            </tr>
          })}
          </tbody>
        </Table>
      </div>
      
    </Widget>
  );
};

export default SolarList;
