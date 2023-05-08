import * as React from "react";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

export default function MultipleTags({ name, data, getSubCaregory, value }) {
  console.log(value)
  return (
    <Stack spacing={3} sx={{ width: "auto" }}>
      <Autocomplete
        multiple
        defaultValue={value}
        id="tags-filled"
        options={data.map((option) => option)}
        freeSolo
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              variant="outlined"
              label={option}
              {...getTagProps({ index })}
            />
          ))
        }
        onChange={(event, value) => getSubCaregory(value)}
        renderInput={(params) => (
          <TextField {...params} variant="outlined" placeholder=" Type.." />
        )}
      />
    </Stack>
  );
}
