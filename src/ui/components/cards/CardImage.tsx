/** @jsxRuntime classic */
/** @jsx jsx */
import Image from "next/image";
import { FunctionComponent } from "react";
import { jsx } from "theme-ui";
import { CardInfo } from "../../../models/card-types";
import { cardImageFilename, cardImageFilenameBack } from "../../card-utils";

type RawProps = { alt: string; src: string };
const RawCardImage: FunctionComponent<RawProps> = ({ alt, src }) => (
  <Image alt={alt} src={src} layout="fill" objectFit="cover" quality={100} />
);

export const BackCardImage: FunctionComponent = () => (
  <RawCardImage alt={"face down card"} src={cardImageFilenameBack} />
);

export const FaceCardImage: FunctionComponent<{ cardInfo: CardInfo }> = ({ cardInfo }) => {
  const alt = `${cardInfo.cardValue} ${cardInfo.cardSuit}`;
  const src = cardImageFilename(cardInfo);
  return <RawCardImage alt={alt} src={src} />;
};
