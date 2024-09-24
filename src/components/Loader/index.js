import './Loader.scss';

function Loader({ showLoader }) {

    return (<>
        {showLoader ? <div className='loader-wrapper'>
            <div className="loader-text">
                Please wait<span className="dot">.</span><span className="dot">.</span><span className="dot">.</span>
            </div>
        </div> : null}
    </>)
}

export default Loader;
