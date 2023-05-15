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
      <Button onClick={handleClickOpen}>
      <FontAwesomeIcon
        style={{
            color: "red",
            fontSize: "1.2rem",
            margin: "0.5rem 1rem",
            marginBottom: "1rem"
        }}
        icon={faTrash}
        />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete the User"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Once you deleted the User the user cannot access his/her account
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>cancel</Button>
          <Button onClick={async () => {
            const token = Cookies.get("token"); 
            await axios
              .delete(
                `http://localhost:5000/api/v1/user/${User}`,
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
                  toast("User Deleted Successfully", {
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
              });
          }} autoFocus>
            delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}