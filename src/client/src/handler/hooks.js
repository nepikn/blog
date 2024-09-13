import { useEffect, useState } from "react";

export const useToggle = (init = false) => {
  const [toggle, setToggle] = useState(init);

  return [toggle, () => setToggle(true), () => setToggle(false)];
};

export const useTitle = () => {
  useEffect(() => {
    const oldTitle = updateTitle();

    return () => updateTitle(oldTitle);

    function updateTitle(
      title = document.querySelector("h1").textContent
    ) {
      const [site, oldTitle] = document.title
        .split(" - ")
        .reverse();

      document.title = `${title} - ${site}`;

      return oldTitle;
    }
  }, []);
};
