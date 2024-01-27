import { Autocomplete, InputAdornment, TextField } from "@mui/material";
import { useEffect } from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { observer } from "mobx-react-lite";
import citiesStore from "@/common/store/cities.store";

interface Props {
  city: string;
  setCity: (city: string) => void;
  sx?: any;
}

const SelectCity = observer(({ city, setCity, sx }: Props) => {
  const { cities, fetchCities } = citiesStore;

  useEffect(() => {
    fetchCities();
  }, [fetchCities]);

  return (
    <Autocomplete // TODO: need to set padding exactly like the textfield
      value={city}
      onChange={(_event, value: string | null) => setCity(value ?? "")}
      options={cities}
      renderInput={(params) => (
        <TextField
          {...params}
          label="city"
          placeholder="city"
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <HomeOutlinedIcon />
              </InputAdornment>
            ),
          }}
        />
      )}
      sx={sx}
    />
  );
});

export default SelectCity;
