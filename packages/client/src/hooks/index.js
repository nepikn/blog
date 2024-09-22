import { capitalCase } from "change-case";
import { useEffect, useState } from "react";

export const useToggle = (init = false) => {
  const [toggle, setToggle] = useState(init);

  return [toggle, () => setToggle(true), () => setToggle(false)];
};

export const useTitle = (title) => {
  useEffect(() => {
    const oldTitle = updateTitle();

    return () => updateTitle(oldTitle);

    function updateTitle(
      newTitle = title ??
        document.querySelector("h1")?.textContent,
    ) {
      const [site, oldTitle] = document.title
        .split(" - ")
        .reverse();

      document.title = newTitle
        ? `${capitalCase(newTitle)} - ${site}`
        : site;

      return oldTitle;
    }
  }, [title]);
};
