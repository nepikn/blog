import { Image } from "@mui/icons-material";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import { useLoaderData } from "react-router-dom";

export default function Category({ children }) {
  const { data: posts } = useLoaderData();

  return (
    <List>
      {posts.map((post, i) => (
        <ListItem key={post.title}>
          <Post post={post} />
        </ListItem>
      ))}
    </List>
  );
}

function Post({ post }) {
  const { author, title, abstract } = post;

  return (
    <Card component={"article"}>
      <CardHeader avatar={<Avatar />} title={author} />
      <Stack direction={"row"} sx={{ alignItems: "center" }}>
        <CardContent>
          <Stack spacing={2}>
            <Typography variant="h2">{title}</Typography>
            <Typography variant="body1" color="textSecondary">
              {abstract}
            </Typography>
          </Stack>
        </CardContent>
        <CardMedia sx={{ width: 1 / 3, flexShrink: 0 }}>
          <Image
            sx={{
              aspectRatio: 1,
              width: 1,
              height: "auto",
            }}
          />
        </CardMedia>
      </Stack>
    </Card>
  );
}
