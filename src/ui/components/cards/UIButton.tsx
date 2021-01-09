import { ButtonProps } from "@theme-ui/components";
import React, { FunctionComponent } from "react";
import { Button, SxStyleProp } from "theme-ui";

export const UIButton: FunctionComponent<ButtonProps> = (props) => {
  let sx: SxStyleProp = { ...(props.sx ?? {}) };
  if (props.disabled) {
    sx = { ...sx, bg: "gray" };
  }
  return <Button {...props} sx={sx} />;
};
