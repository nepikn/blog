import { useEffect, useState } from "react";

export const useToggle = (init = false) => {
  const [toggle, setToggle] = useState(init);

  return [toggle, () => setToggle(true), () => setToggle(false)];
};

export const useTitle = (title) => {
  const updateTitle = (
    title = document.querySelector("h1").textContent
  ) => {
    const oldTitle = document.title;
    const site = oldTitle.match(/[^-]+$/)[0].trim();
    document.title = `${title} - ${site}`;

    return oldTitle;
  };

  useEffect(() => {
    const oldTitle = updateTitle(title);

    return () => updateTitle(oldTitle);
  }, []);
};
