import { useState } from 'react';
import UploadFile from '../../components/UploadFile';
import OutputSection from '../../components/OutputSection';
import ModalPopup from '../../components/ModalPopup';
import { Differ } from 'json-diff-kit';
import './FileComparator.scss';

function FileComparator() {

    const [file1, setFile1] = useState({});
    const [file2, setFile2] = useState({});
    const [diff, setDiff] = useState('');
    const [showWarning, setShowWarning] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const differ = new Differ({
        detectCircular: true,    // default `true`
        maxDepth: Infinity,      // default `Infinity`
        showModifications: true, // default `true`
        arrayDiffMethod: 'lcs',  // default `"normal"`, but `"lcs"` may be more useful
    });

    const handleSubmit = () => {
        const checkFile1 = file1 && Object.keys(file1).length > 0;
        const checkFile2 = file2 && Object.keys(file2).length > 0;
        if (!checkFile1 || !checkFile2) {
            setErrorMsg(
                `Please upload JSON format files.
                (${!checkFile1 && !checkFile2 ? 'both files are' : !checkFile1 ? 'file 1' : 'file 2'} missing).`
            );
            setShowWarning(true);
        } else {
            const diff = differ.diff(file1.jsonData, file2.jsonData);
            setDiff(diff)
        }
    }

    const setFileData = fileData => {
        const { name, fileName, parsedData } = fileData;
        const fileDataObj = {
            name,
            fileName,
            jsonData: parsedData
        };
        if (name === 'file1') {
            setFile1(fileDataObj)
        } else if (name === 'file2') {
            setFile2(fileDataObj)
        }
    }

    return (
        <>
            <div className='main-container'>
                {Array.from({ length: 2 },
                    (_, index) => <UploadFile
                        key={index}
                        supportedFormat='.json'
                        sequence={index + 1}
                        setFileData={setFileData}
                    />
                )}
            </div>
            <button
                className='btn'
                onClick={handleSubmit}
            >
                Compare
            </button>
            {diff && <OutputSection
                diff={diff}
                file1={file1}
                file2={file2}
            />}
            <ModalPopup
                showModal={showWarning}
                title='Oops! Missing File!'
                content={errorMsg}
                handleClose={() => setShowWarning(false)}
            />
        </>
    )
}

export default FileComparator;
