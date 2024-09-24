import React, { useState } from 'react';
import './UploadFile.scss';
import ModalPopup from '../ModalPopup';

function UploadFile({ supportedFormat, sequence, setFileData }) {

    const [showWarning, setShowWarning] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        const file = files[0];
        const { name: fileName } = file;
        if (file && file.type === "application/json") {
            const reader = new FileReader();
            // Read the file as text
            reader.readAsText(file);
            // Once the file is loaded
            reader.onload = () => {
                try {
                    // Parse the JSON data
                    const parsedData = JSON.parse(reader.result);
                    setFileData({ name, fileName, parsedData }); // Store the JSON data in state
                } catch (error) {
                    console.error("Error parsing JSON:", error);
                    setErrorMsg('Something went wrong!!!');
                    setShowWarning(true);
                }
            };
            reader.onerror = () => {
                console.error("Error reading file");
                setErrorMsg('Something went wrong!!!');
                setShowWarning(true);
            };
        } else {
            // alert("Please upload a valid JSON file");
            setErrorMsg('Please upload a valid JSON file');
            setShowWarning(true);
        }
    };

    return (
        <>
            <div className='upload-container'>
                <label className='upload-label'>
                    <span>
                        Please upload a file {sequence}
                        <span className='mandatory-symbol'> *</span>
                        <span className='label-info'>(supported format is .json)</span>
                    </span>
                    <input
                        type="file"
                        name={`file${sequence}`}
                        className='file-input'
                        accept={supportedFormat}
                        onChange={handleFileChange}
                        required />
                </label>
            </div>
            <ModalPopup
                showModal={showWarning}
                title='Oops!'
                content={errorMsg}
                handleClose={() => setShowWarning(false)}
            />
        </>
    )
}

export default UploadFile;
