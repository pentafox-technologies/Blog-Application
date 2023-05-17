import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import axios from "axios";
import Cookies from "js-cookie";
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';


export default function AlertDialog({User,update}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{display:"inline"}}>
      <Button onClick={handleClickOpen} color="success">
        <KeyboardDoubleArrowUpIcon />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to promote the User to Moderator"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
              The promoted user will have access to validate and publish posts of other users. 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>cancel</Button>
          <Button onClick={async () => {
            const token = Cookies.get("token"); 
            const userName = Cookies.get("userName");
            await axios
              .patch(
                `http://localhost:5000/api/v1/user/promote/${User}`,
                {
                  role:'moderator'
                },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              )
              .then(async (response) => {
                const data = response.data
                console.log(response)
                if(data.status=="success"){
                  toast("User Promoted Successfully", {
                    hideProgressBar: false,
                    autoClose: 1500,
                    type: "success",
                    theme: "colored",
                  });
                  await update(1);
                }
                else{
                  toast("An Unexpected error occured. Try again later", {
                    hideProgressBar: false,
                    autoClose: 1500,
                    type: "error",
                    theme: "colored",
                  });
                }
                setOpen(false);
              });
          }} autoFocus>
            promote
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}