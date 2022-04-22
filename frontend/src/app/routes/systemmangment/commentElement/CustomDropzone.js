import React, {useState, useEffect} from 'react';
import {useDropzone} from "react-dropzone";
import axios from 'axios';


// start code for dropzone
const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
  };
  
  const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 165,
    height: 100,
    padding: 4,
    boxSizing: 'border-box'
  };
  
  const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
  };
  
  const img = {
    display: 'block',
    width: '100%',
    height: '100%'
  };
  // end code for dropzone
export default function CustomDropzone(props) {
const [files, setFiles] = useState([]);
const oldImage = props?.formData.oldImage;
const filePath = props?.formData.filePath;
const btnText = props?.formData.btnText;
 // dropzone code
    
 const {getRootProps, getInputProps} = useDropzone({
    accept: 'image/*,',
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });

  const thumbs = files.map(file => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img alt={file.name}
             src={file.preview}
             style={img}
        />
      </div>
    </div>
  ));

  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  useEffect(() => {
  
    if (props.onChange) {
      getBase64(files[0])
      .then(result => {
        // console.log("File Is", files);
        props.onChange(result);
      })
      .catch(err => {
        console.log(err);
      });
    }
  }, [files]);

  const getBase64 = file => {
    return new Promise(resolve => {
      // let fileInfo;
      let baseURL = "";
      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        // console.log("Called", reader);
        baseURL = reader.result;
        // console.log(baseURL);
        resolve(baseURL);
      };
      // console.log(fileInfo);
    });
  };

  return (
    <div className="dropzone-card">
        <div className="dropzone">
            <div {...getRootProps({className: 'dropzone-file-btn'})}>
                <input {...getInputProps()} />
                <p>Upload {btnText}</p>
            </div>
        </div>
        <div className="dropzone-content" style={thumbsContainer}>
            {thumbs}
            {(files.length === 0 )? ((oldImage!=="" && oldImage!=='0' && oldImage!==0)? (<spam>
            <span className={`sp_right_padding`}>Cuurent {btnText} </span>
            <span><img src={`${axios.defaults.baseURL}${filePath}${oldImage}`} class="img-thumbnail rounded edit_img_width"  alt="Responsive"></img></span>
            </spam>): ''): ''}
        </div>
    </div>
  );
}