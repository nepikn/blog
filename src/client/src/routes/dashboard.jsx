import { Divider, Link, Stack, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { H1 } from "../components/util";
import { titleCase } from "title-case";

export default function Dashboard({ children }) {
  //

  return (
    <>
      <Stack
        direction={"row"}
        divider={<Divider orientation="vertical" />}
        sx={{ height: "57.25rem" }}
      >
        <Stack>
          <NavTabs />
        </Stack>
      </Stack>
      <H1>following</H1>
    </>
  );
}

function NavTabs({ children }) {
  const tabs = [
    "following",
    "trending",
    "artificial-intelligence",
    "hollywood-happen",
    "horoscope",
  ].map((key) => ({
    key,
    label: titleCase(key.replaceAll("-", " ")),
    href: `#${key}`,
  }));
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Tabs value={value} onChange={handleChange}>
        {tabs.map(({ key, label, href }, i) => (
          <Tab
            key={key}
            label={label}
            component={Link}
            href={href}
          ></Tab>
        ))}
      </Tabs>
    </>
  );
}
