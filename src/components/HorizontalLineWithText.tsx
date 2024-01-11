import { Box, Typography } from "@mui/material";

interface HorizontalLineWithTextProps {
  text: string;
}

const HorizontalLineWithText = ({ text }: HorizontalLineWithTextProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: "23vw",
        my: 1,
        mx: "auto",
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          height: "1px",
          backgroundColor: "black",
        }}
      />
      <Typography
        variant="body2"
        sx={{
          mx: 2,
          color: "#071032",
        }}
      >
        {text}
      </Typography>
      <Box
        sx={{
          flexGrow: 1,
          height: "1px",
          backgroundColor: "black",
        }}
      />
    </Box>
  );
};

export default HorizontalLineWithText;
