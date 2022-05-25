import React from 'react';

const ErrorModal = ({ error }) => {
    return (
        <div>
            {/* <!-- The button to open modal --> */}
            {/* <label htmlFor="error-modal" className="btn modal-button">open modal</label> */}

            {/* <!-- Put this part before </body> tag --> */}
            <input type="checkbox" id="error-modal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{error.header}</h3>
                    <p className="py-4">{error.body}</p>
                    <div className="modal-action">
                        <label htmlFor="error-modal" className="btn">Okay</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ErrorModal;