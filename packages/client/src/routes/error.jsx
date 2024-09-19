import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Stack,
  Typography,
} from "@mui/material";
import { useRouteError } from "react-router-dom";

export default function Error({ root }) {
  const error = useRouteError();
  console.error(error);

  return (
    <Card
      component={Stack}
      sx={{
        alignItems: "center",
        justifyContent: "center",
        flexGrow: 1,
        minHeight: root ? "100vh" : "auto",
      }}
    >
      <CardHeader title="Oops!" component={"h1"} />
      <CardContent>
        <Typography
          variant="body1"
          color="textSecondary"
          component={"q"}
        >
          {error.statusText || error.message}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" href="/">
          Back to Home
        </Button>
      </CardActions>
    </Card>
  );
}
