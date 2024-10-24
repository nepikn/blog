import { List, ListItem } from "@mui/material";
import { useLoaderData } from "react-router-dom";
import { Post } from "../../../components/post";

export function Category({ children }) {
  const { data: posts } = useLoaderData();

  return (
    <List sx={{ flexGrow: 1 }}>
      {posts.map((post, i) => (
        <ListItem key={post.title}>
          <Post post={post} />
        </ListItem>
      ))}
    </List>
  );
}
