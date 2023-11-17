import { forwardRef, useImperativeHandle, useState } from 'react'

const Modal = ({ gameStatus, solution, handleGameReset }, ref) => {
    const [openModal, setOpenModal] = useState(false);

    useImperativeHandle(ref, () => ({
        openModal: () => setOpenModal(true)
    }));

    const onClose = () => {
        setOpenModal(false)
        handleGameReset()
    }

    if (!openModal) return null;

    return (
        <div className="backdrop">
            <div className="modal">
                <p>{gameStatus}</p>
                <p>The word was: {solution}</p>
                <button onClick={onClose}>Play Again?</button>
            </div>
        </div>
    )
}

export default forwardRef(Modal)