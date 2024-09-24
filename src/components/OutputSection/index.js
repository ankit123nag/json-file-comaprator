import { Viewer } from 'json-diff-kit';
import 'json-diff-kit/dist/viewer.css';
import './OutputSection.scss';

function OutputSection(props) {
    return (<>
        <div className='file-names'>
            <section>{props.file1.fileName.split('.')[0]}</section>
            <section>{props.file2.fileName.split('.')[0]}</section>
        </div>
        <Viewer
            className='output-container'
            diff={props.diff}          // required
            indent={4}                 // default `2`
            lineNumbers={true}         // default `false`
            highlightInlineDiff={true} // default `false`
            inlineDiffOptions={{
                mode: 'word',            // default `"char"`, but `"word"` may be more useful
                wordSeparator: ' ',      // default `""`, but `" "` is more useful for sentences
            }}
        />
    </>
    );
};

export default OutputSection;
