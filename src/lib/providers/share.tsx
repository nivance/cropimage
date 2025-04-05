"use client";
import { config } from "@/lib/config";
import {
  TwitterShareButton,
  TwitterIcon,
  FacebookShareButton,
  FacebookIcon,
  RedditShareButton,
  RedditIcon,
  LinkedinShareButton,
  LinkedinIcon,
  PinterestShareButton,
  PinterestIcon,
  TelegramShareButton,
  TelegramIcon,
  LineShareButton,
  LineIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "next-share";

export default function Share({ title, subUrl }: { title: string, subUrl: string }) {
  const shareTitle = "Play " + title + " Online for Free";
  const shareUrl = config.baseUrl + "/" + subUrl
  return (
    <div className="flex flex-row gap-5 py-4">
      <TwitterShareButton url={shareUrl} title={shareTitle}>
        <TwitterIcon size={32} round />
      </TwitterShareButton>
      <FacebookShareButton
        url={shareUrl}
        quote={shareTitle}
        hashtag={"#block-breaker"}
      >
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      <RedditShareButton url={shareUrl} title={shareTitle}>
        <RedditIcon size={32} round />
      </RedditShareButton>
      <PinterestShareButton url={shareUrl} media={shareTitle}>
        <PinterestIcon size={32} round />
      </PinterestShareButton>
      <TelegramShareButton url={shareUrl} title={shareTitle}>
        <TelegramIcon size={32} round />
      </TelegramShareButton>
      <LinkedinShareButton url={shareUrl}>
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>
      <LineShareButton url={shareUrl} title={shareTitle}>
        <LineIcon size={32} round />
      </LineShareButton>
      <WhatsappShareButton
        url={shareUrl}
        title={shareTitle}
        separator=":: "
      >
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>
    </div>
  );
}
