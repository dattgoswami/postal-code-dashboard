import React from "react";
import {
  Stack,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";

const CitiesDropdown = React.memo(function CitiesDropdown({
  cities,
  selectedCities,
  setSelectedCities,
}) {
  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedCities(value);
  };

  return (
    <Stack>
      <FormControl fullWidth variant="outlined">
        <InputLabel sx={{ color: "primary.main" }}>Select Cities</InputLabel>
        <Select
          multiple
          value={selectedCities}
          onChange={handleChange}
          renderValue={(selected) => selected.join(", ")}
          sx={{
            mt: 2,
            mb: 3,
            backgroundColor: "#2c2c2c",
            color: "background.paper",
          }}
        >
          {cities.map((city) => (
            <MenuItem key={city} value={city}>
              <Checkbox checked={selectedCities.indexOf(city) > -1} />
              <ListItemText primary={city} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
});

export default CitiesDropdown;
