import { Box, Divider, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useActionData } from "react-router-dom";
import { H1, SignIn } from "../../components";

export function Component({ children }) {
  const err = useActionData();

  return (
    <Stack divider={<Divider />} sx={{ flexGrow: 1 }}>
      <Stack
        spacing={3}
        sx={{
          alignSelf: "end",
          flexGrow: 1,
          display: "grid",
          mx: 6,
          my: 2,
          gridTemplateRows: "repeat(2, minmax(0, 1fr))",
        }}
      >
        <Stack
          component={H1}
          sx={{
            justifyContent: "end",
            fontFamily: "Scheherazade New",
          }}
        >
          <span>Unveil Thoughts</span>
          <Box sx={{ borderBottom: 3, alignSelf: "end", pb: 2 }}>
            Voice Yours
          </Box>
        </Stack>
        <Stack spacing={3} sx={{ alignItems: "end" }}>
          <Typography fontWeight={"light"}>
            Place Where Your Stories Meet Others&apos; Emotions.
          </Typography>
          <SignIn err={err} />
        </Stack>
      </Stack>
      <Box
        component={"footer"}
        sx={{ height: 100, bgcolor: grey[50] }}
      ></Box>
    </Stack>
  );
}
