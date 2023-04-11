import { Grid } from '@mui/material' 
import logincss from '../styles/Login.module.css'
import React from 'react';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function LoginForm() {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
  return (
    <Grid container direction="column" justifyContent="center" alignItems="center">
        <Grid item xs={12}>
            <FormControl sx={{ m: 1, width: '45ch' }} variant="outlined" style={{ marginBottom: '15px'}}  className={logincss.grid}>
                <TextField
                required
                fullWidth
                id="outlined-required"
                label="Email"
                style={{background: 'white'}}
                />  
            </FormControl>
        </Grid>
        <Grid item xs={12}>
            <FormControl sx={{ m: 1, width: '45ch' }} variant="outlined"  className={logincss.grid}>
                <InputLabel htmlFor="outlined-adornment-password" className={logincss.gridpasslabel} >Password</InputLabel>
                <OutlinedInput
                        style={{background: 'white'}}
                    fullWidth
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                    }
                    label="Password"
                />
            </FormControl>
        </Grid>
    </Grid>
  )
}
