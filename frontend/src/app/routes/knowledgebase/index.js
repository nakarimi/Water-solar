import React from 'react';
import ContainerHeader from "components/ContainerHeader/index";
import IntlMessages from "util/IntlMessages";
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import PrintIcon from '@material-ui/icons/Print';
//pdf
import Pdf from 'react-to-pdf';
import ReactToPrint from 'react-to-print';
// import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
// import { StyleSheet } from '@react-pdf/renderer';
//check boxes
// import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
// import CheckBoxIcon from '@material-ui/icons/CheckBox';
//chart 
//chart iports
import {Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import data from './data';

const ref=React.createRef();
// const styles = StyleSheet.create({
//   page: { backgroundColor: 'tomato' },
//   section: { color: 'white', textAlign: 'center', margin: 5 }
// });
const ProjectSummary=({match}) => {
    
    return (
           <div className="app-wrapper">
            <ContainerHeader match={match} title={<IntlMessages id="Project Summary" />} />

            <div className="row">
                  
                <div className="col-md-9" ref={ref}>
                      
                    <Paper elevation={0} className="mb-3 p-4">

                     <div className="row">
                            <div className="col-md-6 mb-4">
                            <h1>New Project</h1> 
                            </div>
                            <div className="col-md-6">
                               
                            </div>
                        </div>  
                        
                <strong>Solar pumping Project</strong> 
                <table class="table">
                        <thead>
                            <tr>
                            <th scope="col">Parameter</th>
                            <th scope="col"></th>
                            <th scope="col">Products</th>
                             <th scope="col"></th>
                             <th scope="col">Qty</th>
                            <th scope="col">Accesories</th>        
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td>Location</td>
                            <td>Kabul, 34, 69</td>
                            <td>Pump Model</td>
                            <td>4SR10/26</td>
                            <td>1</td>
                            <td>Controller Box</td>        
                                </tr>

                              <tr>
                            <td>Location</td>
                            <td>Kabul, 34, 69</td>
                            <td>Pump Model</td>
                            <td>4SR10/26</td>
                            <td>1</td>
                            <td>Controller Box</td>        
                                </tr>

                              <tr>
                            <td>Location</td>
                            <td>Kabul, 34, 69</td>
                            <td>Pump Model</td>
                            <td>4SR10/26</td>
                            <td>1</td>
                            <td>Controller Box</td>        
                            </tr>    
                           
                           
                        </tbody>
                        </table> 

                        <Divider className="mb-3 mt-3" />   
                        <strong>Output</strong>  
                        <div className="row">
                            <div className="col-md-7 col-sm-7 col-7  col-xs-12">
                                <ResponsiveContainer width="100%" height={250}>
                                    <BarChart data={data}
                                        margin={{top: 10,right: 0,left: -15,bottom: 0}}
                                    >
                                    <XAxis dataKey="name"/>
                                    <YAxis/>
                                    <CartesianGrid strokeDasharray="3 3"/>
                                    <Tooltip/>
                                    <Legend/>
                                    <Bar dataKey="pv" fill="#3367d6"/> 
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="col-md-5 col-sm-5 col-5 col-xs-12">
                                <ResponsiveContainer width="100%" height={250}>
                                    <BarChart data={data}
                                    margin={{top: 10, right: 0, left: -15, bottom: 0}}
                                    >
                                    <XAxis dataKey="name"/>
                                    <YAxis/>
                                    <CartesianGrid strokeDasharray="3 3"/>
                                    <Tooltip/>
                                    <Legend/>
                                    <Bar dataKey="pv" fill="#3367d6"/> 
                                    </BarChart>
                                </ResponsiveContainer>
                            </div> 
                        </div> 


                        <Divider className="mb-3 mt-3" />   
                        <strong>Iridiation</strong> 
                            <div className="row">
                            <div className="col-md-7 col-sm-7 col-7  col-xs-12">
                                <ResponsiveContainer width="100%" height={250}>
                                    <BarChart data={data}
                                        margin={{top: 10,right: 0,left: -15,bottom: 0}}
                                    >
                                    <XAxis dataKey="name"/>
                                    <YAxis/>
                                    <CartesianGrid strokeDasharray="3 3"/>
                                    <Tooltip/>
                                    <Legend/>
                                    <Bar dataKey="pv" fill="#ffc658"/> 
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="col-md-5 col-sm-5 col-5 col-xs-12">
                                <ResponsiveContainer width="100%" height={250}>
                                    <BarChart data={data}
                                    margin={{top: 10, right: 0, left: -15, bottom: 0}}
                                    >
                                    <XAxis dataKey="name"/>
                                    <YAxis/>
                                    <CartesianGrid strokeDasharray="3 3"/>
                                    <Tooltip/>
                                    <Legend/>
                                     <Bar dataKey="pv" fill="#ffc658"/> 
                                    </BarChart>
                                </ResponsiveContainer>
                            </div> 
                        </div>


                        <Divider className="mb-3 mt-3" />
                        <strong>Energy</strong> 
                            <div className="row">
                            <div className="col-md-7 col-sm-7 col-7  col-xs-12">
                                <ResponsiveContainer width="100%" height={250}>
                                    <BarChart data={data}
                                        margin={{top: 10,right: 0,left: -15,bottom: 0}}
                                    >
                                    <XAxis dataKey="name"/>
                                    <YAxis/>
                                    <CartesianGrid strokeDasharray="3 3"/>
                                    <Tooltip/>
                                    <Legend/>
                                     <Bar dataKey="pv" fill="#FF0000"/> 
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="col-md-5 col-sm-5 col-5 col-xs-12">
                                <ResponsiveContainer width="100%" height={250}>
                                    <BarChart data={data}
                                    margin={{top: 10, right: 0, left: -15, bottom: 0}}
                                    >
                                    <XAxis dataKey="name"/>
                                    <YAxis/>
                                    <CartesianGrid strokeDasharray="3 3"/>
                                    <Tooltip/>
                                    <Legend/>
                                     <Bar dataKey="pv" fill="#FF0000"/> 
                                    </BarChart>
                                </ResponsiveContainer>
                            </div> 
                        </div>
                        

                         <Divider className="mb-3 mt-3" /> 
                        <strong>System Characteristic</strong> 
                       <table class="table">
                        <thead>
                            <tr>
                         
                                 
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td>Location</td>
                            <td>Kabul, 34, 69</td>
                            <td>Pump Model</td>
                            <td>4SR10/26</td>
                                   
                                </tr>

                                 <tr>
                            <td>Location</td>
                            <td>Kabul, 34, 69</td>
                            <td>Pump Model</td>
                            <td>4SR10/26</td>
                                   
                                </tr>

                                 <tr>
                            <td>Location</td>
                            <td>Kabul, 34, 69</td>
                            <td>Pump Model</td>
                            <td>4SR10/26</td>
                                   
                                </tr>  
                           
                           
                        </tbody>
                        </table> 


                        <div className="row">
                            <div className="col-md-7 col-sm-7 col-7  col-xs-12">
                                  <img src="/images/General layout.png" className="img-thumbnail " alt="Responsive" />
                            </div>
                            <div className="col-md-5 col-sm-5 col-5 col-xs-12">
                                  <img src="/images/General layout.png" className="img-thumbnail " alt="Responsive" />
                            </div>
                        </div>

                        <Divider className="mb-5 mt-5" /> 
                        
                        <div className="row">
                            <div className="col-md-7 col-sm-7 col-7  col-xs-12">
                             <table class="table">
                        
                                <tbody>
                                    <tr>
                                    <td>Solar Name</td>
                                    <td>PROPSOLAR</td>
                                </tr>

                                <tr>
                                    <td>Solar Type</td>
                                    <td>Poly Crystallin</td>
                                </tr>

                                    <tr>
                                    <td>Solar Power (w)</td>
                                    <td>270</td>
                                </tr> 
                                
                                
                                </tbody>
                                </table> 
                            </div>

                            <div className="col-md-5 col-sm-5 col-5 col-xs-12">
                               <img src="/images/General layout.png" className="img-thumbnail " alt="Responsive" />
                            </div>
                        </div>
                        
                      

                        <Divider className="mb-3 mt-3" /> 
                        
                        </Paper>
                       
                </div>
                           
                <div className="col-md-3">
                         <Paper elevation={0} className="mb-3 p-4">
                        <div className="row ">
                            <div className="col-md-6 d-flex justify-content-center p-1">
                                <Pdf targetRef={ref} filename="Project summary.pdf" >  
                                 {({toPdf}) => (
                                    <Button variant="contained" color="primary" onClick={toPdf} startIcon={<CloudDownloadIcon />} className="float-right"> Download </Button>
                                    )}    
                                   
                                 </Pdf>   
                            </div>
                            <div className="col-md-6 d-flex justify-content-center p-1">

                             <ReactToPrint
                                trigger={() => <Button  variant="contained"  color="primary" startIcon={<PrintIcon />} className="float-right"> Print </Button>}
                                content={() => ref.current}
                            />    
                                 
                            </div>
                        </div>
                         <Divider className="mb-3 mt-3" />
                         <FormControlLabel control={<Checkbox name="checkedC" />} label="Uncontrolled" />
                         <FormControlLabel  control={<Checkbox name="checkedD" />} label="Disabled" />
                          <FormControlLabel control={<Checkbox checked name="checkedE" />} label="Disabled" />
                         <FormControlLabel  control={<Checkbox name="checkedD" />} label="Disabled" />
                         <FormControlLabel  control={<Checkbox checked name="checkedE" />} label="Disabled" />
                                                    
                         </Paper>  
                </div>
            </div>
             
        </div> 
         
    );
}
export default ProjectSummary;
