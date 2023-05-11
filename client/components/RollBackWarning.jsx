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


export default function AlertDialog({Article,update}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleGetBack = async (slug) => {
    await fetch(`http://localhost:5000/api/v1/article/${slug}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InRlc3RlciIsImlhdCI6MTY4MzM1NDI3MCwiZXhwIjoxNjkxMTMwMjcwfQ.hV8IxgycYdTpsPp42DSDCboSSg2_d3TKpTslcPON79E`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
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
          <Button onClick={async () => {
            await axios
              .delete(
                `http://localhost:5000/api/v1/article/${Article}`,
                {
                  headers: {
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InRlc3RlciIsImlhdCI6MTY4MzM1NDI3MCwiZXhwIjoxNjkxMTMwMjcwfQ.hV8IxgycYdTpsPp42DSDCboSSg2_d3TKpTslcPON79E`,
                  },
                }
              )
              .then(async (response) => {
                const data = response.data
                console.log(response)
                if(data.status=="success"){
                  toast("Article Deleted Successfully", {
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