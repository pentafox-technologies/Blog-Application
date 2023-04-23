import * as React from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";

export default function AutoComplete({ name, data, getTopCaregory }) {
  return (
    <Stack spacing={2} sx={{ width: 300 }}>
      <Autocomplete
        id="free-solo-demo"
        freeSolo
        options={data.map((option) => option)}
        onChange={(event, value) => getTopCaregory(value)}
        renderInput={(params) => <TextField {...params} placeholder="Search" />}
      />
    </Stack>
  );
}
