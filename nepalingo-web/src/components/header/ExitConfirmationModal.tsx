import React from "react";

interface ExitConfirmationModalProps {
    show: boolean;
    onConfirm: (confirm: boolean) => void;
}

const ExitConfirmationModal: React.FC<ExitConfirmationModalProps> = ({
    show,
    onConfirm
}) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded shadow-lg text-center">
                <p className="mb-4">Are you sure you want to exit?</p>
                <div className="flex justify-center space-x-6">
                    <button
                        className="bg-white-600 text-black p-3 rounded hover:bg-red-700"
                        onClick={() => onConfirm(true)}
                    >
                        Yes
                    </button>
                    <button
                        className="bg-white-600 text-black p-3 rounded hover:bg-green-700"
                        onClick={() => onConfirm(false)}
                    >
                        No
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ExitConfirmationModal;
