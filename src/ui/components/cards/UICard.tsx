/** @jsxRuntime classic */
/** @jsx jsx */
import { FunctionComponent } from "react";
import { AspectRatio, Card, jsx } from "theme-ui";
import { RenderFnVoid } from "../../types";

export interface UICardProps {
  faceUp: boolean;
  renderUp: RenderFnVoid;
  renderDown: RenderFnVoid;
  withBorder?: boolean;
  onClick?: () => void;
}

export const UICard: FunctionComponent<UICardProps> = ({ faceUp, withBorder, renderUp, renderDown, onClick }) => {
  return (
    <Card
      variant="primary"
      sx={{
        border: 0,
        padding: 0,
        maxWidth: 256,
        minWidth: 100,
        mx: "auto",
        my: "auto",
      }}
      onClick={onClick}
    >
      <AspectRatio
        ratio={40 / 56}
        sx={{
          p: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderColor: "primary",
          borderStyle: "solid",
          ...(withBorder ? { borderWidth: "10px" } : { border: 0 }),
        }}
      >
        {faceUp ? renderUp() : renderDown()}
      </AspectRatio>
    </Card>
  );
};
