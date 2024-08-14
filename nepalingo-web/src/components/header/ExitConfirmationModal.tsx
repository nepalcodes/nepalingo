import React from "react"
interface ExitConfrimationModalProps {
    show: boolean;
    onConfirm: (confirm: boolean) => void;
}
const ExitConfrimationModal: React.FC<ExitConfrimationModalProps> = ({
    show,
    onConfirm
}) => {
    if (!show) return null;

    function confirmExit(arg0: boolean): void {
        throw new Error("Function not implemented.");
    }

    return (
        <div className="fixed inset-0 bg-black-600 bg-opacity-50 flex items-center justify-center">
            <div className=" bg-red p-6 rounded shadow-lg text-center">
                <p className="mb-4">Are you sure you want to exit?</p>
                <div className="flex justify-center space x-6">
                    <button className="bg-red-600 text-white p-2 rounded hover:bg-red-700"
                        onClick={() => confirmExit(true)}>
                        Yes
                    </button>
                    <button className="bg-green-600 text-white p-2 rounded hover:bg-green-700"
                        onClick={() => confirmExit(false)}>
                        No

                    </button>
                </div>
            </div>
        </div>
    );
};
export default ExitConfirmationModal;