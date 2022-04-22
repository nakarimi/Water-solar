import React, {useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import axios from 'axios';

function DataSheetFile(props) {
  const [files, setFiles] = useState([]);
  const oldImage = props?.formData.oldImage;
  const filePath = props?.formData.filePath;

  const {getRootProps, getInputProps} = useDropzone({
    accept: '.pdf',
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });
  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);
  const filesList = files.map(file => (
    <li key={file.path} >
      {file.path} - {file.size} bytes
    </li>
    
  ));
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
          <p>Data Sheet (.pdf)</p>
        </div>
        {/* <button className="btn btn-primary" type="button" onClick={open}>
          Open File DataSheetFile
        </button> */}
      </div>
      <div className="dropzone-content">
        {/* <h3>Accepted File(.pdf)</h3> */}
        <ul>{filesList}</ul>
        {(files.length === 0 )? ((oldImage!=="" && oldImage!=='0')? (
            <span><a href={`${axios.defaults.baseURL}${filePath}${oldImage}`} class="btn btn-primary">{oldImage}</a></span>
            ): ''): ''}
      </div>
    </div>
  );
}

export default DataSheetFile;