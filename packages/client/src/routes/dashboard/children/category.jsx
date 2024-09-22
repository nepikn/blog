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
import { useFetcher, useLoaderData } from "react-router-dom";

export default function Category({ children }) {
  const [posts, reactionsByPost] = useLoaderData().map(
    (res) => res.data,
  );

  return (
    <List>
      {posts.map((post, i) => (
        <ListItem key={post.title}>
          <Post
            post={post}
            reactions={reactionsByPost[post.title]}
          />
        </ListItem>
      ))}
    </List>
  );
}

function Post({ post: { author, title, abstract }, reactions }) {
  const fetcher = useFetcher();

  return (
    <Card component={fetcher.Form}>
      <input hidden name="title" defaultValue={title} />
      <CardHeader
        avatar={<Avatar />}
        title={author}
        action={
          <IconButton disabled>
            <MoreVert />
          </IconButton>
        }
      />
      <Stack
        direction={"row"} /* sx={{ alignItems: "center" }} */
      >
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
            <Reactions reactions={reactions} />
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

function Reactions({ reactions }) {
  const defaultProps = {
    type: "submit",
    formMethod: "put",
  };

  const btns = [
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
  ].map(({ icons, ...props }) => {
    /** @type {Set} */
    const reactedUsers = reactions[props.value];

    return {
      count: reactedUsers.size,
      Icon: icons[!reactedUsers.has("owo") ? 0 : 1],
      ...defaultProps,
      ...props,
    };
  });

  return btns.map(
    ({ value, Icon, isIconButton, count, ...props }) => {
      const Component = isIconButton ? IconButton : Button;

      return (
        <Component
          key={value}
          name="intent"
          value={value}
          // todo: fix complaining startIcon
          startIcon={isIconButton ? undefined : <Icon />}
          {...props}
        >
          {isIconButton ? <Icon /> : count}
        </Component>
      );
    },
  );
}
