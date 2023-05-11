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
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import Cookies from "js-cookie";


export default function AlertDialog({Article,update,setRollBack}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleGetBack = async (slug) => {
    const token = Cookies.get("token"); 
    await axios
    .get(
      `http://localhost:5000/api/v1/article/getBack/${Article}`,
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
        toast("Article Rollbacked Successfully", {
          hideProgressBar: false,
          autoClose: 1500,
          type: "success",
          theme: "colored",
        });
        await update(1);
        await setRollBack(1);
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
  }

  return (
    <div style={{display:"inline"}}>
      <Button onClick={handleClickOpen}>
        <UnarchiveIcon style={{cursor: 'pointer', color:'red'}}/>
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to Rollback the article"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Once you rollbacked the article it will go to draft
            and for verification you need to request again.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>cancel</Button>
          <Button onClick={handleGetBack} autoFocus>
            Rollback
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}