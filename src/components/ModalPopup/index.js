import './ModalPopup.scss';

function ModalPopup({ showModal, title, content, handleClose }) {

    return (<>
        {showModal ? <div className='modal-wrapper'>
            <div className="modal-body">
                <h2 className='modal-title'>{title}</h2>
                <p className="content">
                    {content}
                </p>
                <button className='modal-btn' onClick={handleClose}>Close</button>
            </div>
        </div> : null}
    </>)
}

export default ModalPopup;
