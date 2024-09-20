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
import { useLoaderData } from "react-router-dom";

export default function Category({ children }) {
  const [posts, actionsByPost] = useLoaderData().map(
    (res) => res.data,
  );

  return (
    <List>
      {posts.map((post, i) => (
        <ListItem key={post.title}>
          <Post post={post} actions={actionsByPost[post.title]} />
        </ListItem>
      ))}
    </List>
  );
}

function Post({ post, actions }) {
  const { author, title, abstract } = post;

  return (
    <Card component={"article"}>
      <CardHeader
        avatar={<Avatar />}
        title={author}
        action={
          <IconButton disabled>
            <MoreVert />
          </IconButton>
        }
      />
      <Stack direction={"row"} sx={{ alignItems: "center" }}>
        <Stack>
          <CardContent component={Typography} variant="h2">
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
            <Actions actions={actions} />
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

function Actions({ actions }) {
  const btns = [
    {
      value: "SentimentSatisfied",
      icons: [SentimentSatisfiedOutlined, EmojiEmotions],
      type: "submit",
    },
    {
      value: "ThumbUp",
      icons: [ThumbUpOutlined, ThumbUp],
      type: "submit",
    },
    {
      value: "ChatBubble",
      icons: [ChatBubbleOutline, ChatBubble],
      disabled: true,
    },
    {
      value: "Bookmark",
      icons: [BookmarkBorder, Bookmark],
      type: "submit",
      isIconButton: true,
      sx: { ml: "auto" },
    },
  ].map(({ value, icons, ...props }) => {
    const reactedUsers = actions[value];

    return {
      ...props,
      value,
      count: reactedUsers.length,
      Icon: icons[reactedUsers.includes("owo") ? 1 : 0],
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
