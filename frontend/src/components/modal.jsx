import { forwardRef } from 'react';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import DialogTitle from '@mui/material/DialogTitle';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

function Modal({ dialogState, setdialogState, ...props }) {
    const { isOpen, title, size } = dialogState
    const handleClose = () => {
        setdialogState({ ...dialogState, isOpen: false })
    };

    return (
        <Dialog
            open={isOpen}
            TransitionComponent={Transition}
            fullWidth={true}
            maxWidth={size}
            keepMounted
            onClose={handleClose}
        >
            <DialogTitle>{title}</DialogTitle>
            {
                props.children
            }
        </Dialog>
    )
}
export default Modal;