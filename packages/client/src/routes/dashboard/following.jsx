import { Image } from "@mui/icons-material";
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Stack,
  Typography,
} from "@mui/material";
import { useLoaderData } from "react-router-dom";

export default function Following({ children }) {
  const { data: posts } = useLoaderData();

  return (
    <List>
      {posts.map(({ author, title, abstract }, i) => (
        <ListItem divider key={title}>
          <List>
            <ListItem>
              <ListItemAvatar>
                <Avatar />
              </ListItemAvatar>
              <ListItemText primary={author} />
            </ListItem>
            <ListItem>
              <ListItemText>
                <Stack spacing={2}>
                  <Typography variant="h2">{title}</Typography>
                  <Typography
                    variant="body1"
                    color="textSecondary"
                  >
                    {abstract}
                  </Typography>
                </Stack>
              </ListItemText>
              <ListItemIcon sx={{ width: 1 / 4, flexShrink: 0 }}>
                <Image
                  sx={{
                    aspectRatio: 1,
                    width: 1,
                    height: "auto",
                  }}
                />
              </ListItemIcon>
            </ListItem>
          </List>
        </ListItem>
      ))}
    </List>
  );
}
