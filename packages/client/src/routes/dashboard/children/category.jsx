import {
  Bookmark,
  BookmarkBorder,
  ChatBubble,
  ChatBubbleOutline,
  EmojiEmotions,
  Image,
  MoreVert,
  SentimentSatisfiedOutlined,
  ThumbUp,
  ThumbUpOutlined,
} from "@mui/icons-material";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import { useFetcher, useLoaderData } from "react-router-dom";
import Auth from "../../../contexts/auth";

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

function Post({ post: { author, title, abstract, reactions } }) {
  const fetcher = useFetcher();
  const user = useContext(Auth);

  return (
    <Card component={fetcher.Form}>
      <input hidden name="title" defaultValue={title} />
      <input hidden name="username" defaultValue={user.name} />
      <CardHeader
        avatar={<Avatar />}
        title={author}
        action={
          <IconButton disabled>
            <MoreVert />
          </IconButton>
        }
      />
      <Stack direction={"row"}>
        <Stack>
          <CardContent
            component={Typography}
            variant="h2"
            sx={{ fontWeight: "bold" }}
          >
            {title}
          </CardContent>
          <CardContent
            component={Typography}
            variant="body1"
            color="textSecondary"
          >
            {abstract}
          </CardContent>
          <CardActions disableSpacing>
            <Reactions reactions={reactions} user={user} />
          </CardActions>
        </Stack>
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

function Reactions({ reactions, user }) {
  const defaultProps = {
    type: "submit",
    formMethod: "put",
  };

  return [
    {
      value: "SentimentSatisfied",
      icons: [SentimentSatisfiedOutlined, EmojiEmotions],
    },
    {
      value: "ThumbUp",
      icons: [ThumbUpOutlined, ThumbUp],
    },
    {
      value: "ChatBubble",
      icons: [ChatBubbleOutline, ChatBubble],
      type: "button",
      disabled: true,
    },
    {
      value: "Bookmark",
      icons: [BookmarkBorder, Bookmark],
      isIconButton: true,
      sx: { ml: "auto" },
    },
  ].map(({ icons, isIconButton, value, ...props }) => {
    /** @type {Set} */
    const reactedUsers = reactions[value];
    const Icon = icons[!reactedUsers.has(user.name) ? 0 : 1];
    const Component = isIconButton ? IconButton : Button;

    return (
      <Component
        key={value}
        name="reaction"
        value={value}
        {...defaultProps}
        {...(isIconButton || { startIcon: <Icon /> })}
        {...props}
      >
        {isIconButton ? <Icon /> : reactedUsers.size}
      </Component>
    );
  });
}
