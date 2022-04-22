import React,{useEffect,useState} from 'react';
import {Table} from 'reactstrap';
import Widget from "components/Widget/index";
import {Button} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import {useForm} from 'react-hook-form';
import {NotificationContainer,NotificationManager} from 'react-notifications';
import IntlMessages from 'util/IntlMessages';
import Spinner from 'react-spinner-material';
import DeleteIcon from '@material-ui/icons/Delete';
// import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Swal from 'sweetalert2';
import './style.css'

const AccessoriesType=() => {
const [addvisibility,setAddvisibility]=useState(false);
const [visibility,setVisibility]= useState(false);
 const [accessoriestype,setAccessoriestype]= useState([]);
  useEffect(() => {
    getAccessoriestype();
  },[])
  
  const getAccessoriestype=async () => {
    setVisibility(true)
    axios.get('api/accessoriestype')
      .then(res => {  
          setVisibility(false)
         setAccessoriestype(res.data)
        }
    ).catch(err => {
          setVisibility(false)
           NotificationManager.error(<IntlMessages id="notification.errorMessage"/>, <IntlMessages
              id="notification.titleHere"/>);
          }
      )
  };

  const {register,handleSubmit}=useForm(); // initialize the hook
  const onSubmit=(data) => {
      axios.post('api/accessoriestype', data)
        .then(res => {
             getAccessoriestype();
                NotificationManager.success(<IntlMessages id="notification.successMessage"/>, <IntlMessages
              id="notification.titleHere" />);
            
              }
        ).catch(err => {
               NotificationManager.error(<IntlMessages id="notification.errorMessage"/>, <IntlMessages
              id="notification.titleHere"/>);
            } 
        )
  };

  const deletaccessoriestype=(id) => {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if(result.isConfirmed) {
          axios.delete('api/accessoriestype/'+id)
            .then(res => {
                  // setAccessoriestype(res.data)
                  setAccessoriestype(accessoriestype.filter((value) => value.id !==id));
                 Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                  )
                }
            ).catch( err =>{
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Something went wrong!',
                 
                })
            })  
        }
      })
  }
  
    
  return (
    <>
      
      <Widget styleName={`tableheight`}>
        <div className="d-flex flex-row mb-2">
           <IconButton color="primary" aria-label="upload picture" component="span"
            onClick={() => setAddvisibility(true)} hidden={addvisibility===true}>
                 <span class="material-icons">
                          add_circle_outline
                  </span>
          </IconButton>  
          <IconButton color="primary" aria-label="upload picture" component="span"
            hidden={addvisibility===false} onClick={() => setAddvisibility(false)}>
                <span class="material-icons">
                  remove_circle_outline
                </span>
            </IconButton>    
          { 
            addvisibility?  
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">

              <div className="col-md-9">
                <TextField id="outlined-basic" label="Accessories type" variant="outlined"
                  placeholder="Accessories type"
                  name="name"
                  size="small"
                  fullWidth
                  inputRef={register} />
              </div>

              <div className="col-md-3">
                <Button color="primary"   variant="contained" size="medium" type="submit">
                  <span className="material-icons">
                          add_circle_outline
                  </span>
                </Button>
              </div>
              
            </div>
          </form>
          :null  
         }         
        </div>

        <span className="row justify-content-center">
           <Spinner radius={60} color={"#3f51b5"} stroke={3} visible={visibility} />
           </span>     
          
        <div className="table-responsive-material">  
        <Table className="default-table table-unbordered table table-sm table-hover justify-content:center">
          <thead className="table-head-sm th-border-b">
              <tr>
            <th>No:</th>    
            <th>Name</th>
            <th>Action</th>
          </tr>
          </thead>
          <tbody>
          {accessoriestype.map((data, index) => {
                return <tr key={index}>
              <td>
                {index+1}
              </td>  
              <td>
                {data.name}
              </td>
              <td>
                <IconButton size="small" aria-label="Delete" color="secondary" onClick={() => {
                  deletaccessoriestype(data.id);
                  }}>
                  <DeleteIcon />
                </IconButton>
                  
              </td>
            </tr>
          })}
          </tbody>
        </Table>
      </div>
 
    </Widget>
     <NotificationContainer />
    </>
  );
};

export default AccessoriesType;
