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
      variant="outline"
      component={Stack}
      sx={{
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CardHeader
        title="Oops!"
        titleTypographyProps={{ variant: "h1" }}
      />
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
