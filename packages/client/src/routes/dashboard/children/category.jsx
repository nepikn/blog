import {
  BookmarkBorderOutlined,
  ChatBubbleOutlineOutlined,
  Image,
  MoreVert,
  SentimentSatisfiedOutlined,
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
  const btns = [
    {
      StartIcon: SentimentSatisfiedOutlined,
      children: "380",
    },
    {
      StartIcon: ThumbUpOutlined,
      children: "121",
    },
    {
      StartIcon: ChatBubbleOutlineOutlined,
      children: "12",
      disabled: true,
    },
  ];

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
            <Actions btns={btns} />
            <IconButton sx={{ ml: "auto" }}>
              <BookmarkBorderOutlined />
            </IconButton>
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

function Actions({ btns }) {
  return (
    <>
      {btns.map(({ StartIcon, children, ...props }, i) => {
        const value = StartIcon.name;

        return (
          <Button
            key={value}
            name="intent"
            value={value}
            startIcon={<StartIcon />}
            {...props}
          >
            {children}
          </Button>
        );
      })}
    </>
  );
}
