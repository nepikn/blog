import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { default as route } from "../routes";

const router = createBrowserRouter([route]);

export default function Router() {
  return <RouterProvider router={router} />;
}
