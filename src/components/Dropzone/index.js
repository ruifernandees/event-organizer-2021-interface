import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import UploadIcon from '../../icons/UploadIcon';

import './styles.css'

const Dropzone = ({ onFileUploaded }) => {
    const [selectedFileName, setSelectedFileName] = useState('');

    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0];
        setSelectedFileName(file.path);
        onFileUploaded(file);
    }, [onFileUploaded]);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'text/plain'
    });

    return (
        <div className="dropzone" {...getRootProps()}>
            <input {...getInputProps()} accept='text/plain' />
            <UploadIcon size={2.4} />
            {
                selectedFileName 
                ? 
                <h1 className="titleLecturesLabel">{selectedFileName}</h1>
                :
                <h1 className="titleLecturesLabel">
                    Choose a .txt file with the lectures
                </h1>
            }
        </div>
    );
};

export default Dropzone;