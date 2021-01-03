/** @jsxRuntime classic */
/** @jsx jsx */
import { FunctionComponent } from "react";
import { AspectRatio, Card, jsx } from "theme-ui";

export interface UICardProps {
  faceUp: boolean;
}

export const UICard: FunctionComponent<UICardProps> = ({ faceUp, children }) => {
  return (
    <Card
      variant="primary"
      sx={{
        maxWidth: 256,
        minWidth: 100,
        mx: "auto",
        my: "auto",
        backgroundColor: faceUp ? "white" : "gray",
      }}
    >
      <AspectRatio
        ratio={62 / 88}
        sx={{
          p: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {faceUp ? children : null}
      </AspectRatio>
    </Card>
  );
};
