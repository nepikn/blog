import {
  Outlet,
  useActionData,
  useLoaderData,
} from "react-router-dom";
import { Header } from "./header";

export default function Root() {
  const user = useLoaderData();
  const err = useActionData();

  return (
    <>
      <Header user={user} err={err} />
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </>
  );
}
