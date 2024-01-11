import React from "react";
import { Box, InputBase } from "@mui/material";
import { SvgIconProps } from "@mui/material/SvgIcon";

interface TextInputProps {
  placeholder: string;
  Icon?: React.ElementType<SvgIconProps>;
}

const TextInput = ({ placeholder, Icon }: TextInputProps) => {
  return (
    <Box
      sx={{
        width: "30vw",
        height: "5vh",
        display: "flex",
        flexDirection: "row",
        border: "1px solid #071032",
        borderRadius: 2,
        gap: 2,
        p: 1,
        mx: "auto",
      }}
    >
      {Icon && <Icon sx={{ alignSelf: "center" }} />}
      <InputBase
        placeholder={placeholder.toUpperCase()}
        sx={{ width: "100%" }}
      />
    </Box>
  );
};

export default TextInput;
