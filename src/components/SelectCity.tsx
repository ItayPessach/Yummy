import { Autocomplete, InputAdornment, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import axios from "axios";

interface Props {
  city: string;
  setCity: (city: string) => void;
  sx?: any;
}

function SelectCity({ city, setCity, sx }: Props) {
  const [cities, setCities] = useState<string[]>([]);

  useEffect(() => {
    const cities = localStorage.getItem("cities");
    if (!cities) {
      // TODO: consider using an env variable for the url, and maybe create a config file for the app
      axios
        .get(
          "https://data.gov.il/api/3/action/datastore_search?resource_id=d4901968-dad3-4845-a9b0-a57d027f11ab"
        )
        .then((res) => {
          const cities = res.data?.result?.records.map((city: any) =>
            city["שם_ישוב_לועזי"].trim()
          );
          localStorage.setItem("cities", JSON.stringify(cities));
        });
    } else {
      setCities(JSON.parse(cities));
    }
  }, []);

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
}

export default SelectCity;
