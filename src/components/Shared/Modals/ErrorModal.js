import React from 'react';

const ErrorModal = ({ error, setShowModal, showModal }) => {
    return (
        <div>
            <input type="checkbox" className="modal-toggle" />

            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{error.header}</h3>
                    <p className="py-4">{error.body}</p>

                    <div className="modal-action">
                        <button className="btn btn-primary">Okay</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ErrorModal;