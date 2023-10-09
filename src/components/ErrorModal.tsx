import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';


interface ErrorModalProps {
    handleShowErrorModalChange: () => void;
    showErrorModal: boolean;
    errorMessage: string;
}


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: 'none',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

const ErrorModal: React.FC<ErrorModalProps> = ({ handleShowErrorModalChange, showErrorModal, errorMessage}) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const onClick = () => {
        handleShowErrorModalChange()
    }
    return (
        <div>
  
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={showErrorModal}
                onClose={onClick}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={showErrorModal}>
                    <Box sx={style}>
                        <Stack direction='column' spacing={2}>
                            <Typography color='error' id="transition-modal-title" variant="h6" component="h2">
                                Error
                            </Typography>
                            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                                {errorMessage}
                            </Typography>
                            <Button sx={{ height: '30px' }} onClick={onClick}>Okay</Button>

                        </Stack>

                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}


export default ErrorModal