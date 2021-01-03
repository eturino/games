/** @jsxRuntime classic */
/** @jsx jsx */
import Link from "next/link";
import { FunctionComponent } from "react";
import { jsx } from "theme-ui";

const About: FunctionComponent = () => {
  return (
    <div sx={{ color: "red" }}>
      Welcome to the about page. Go to the{" "}
      <Link href="/">
        <a>Home</a>
      </Link>{" "}
      page.
    </div>
  );
};

export default About;
