import Router from "../util/router";
import CommentController from "../controllers/comment";

export const router = new Router(new CommentController());

router.post().get().put().delete();
