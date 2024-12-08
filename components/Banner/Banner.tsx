import React from "react";
import Heading from "@/components/Banner/Heading/Heading";

const Banner: React.FC = () => {
  return (
    <div className="banner">
      <div className="banner-background">
        <video
          src="/video/banner.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="banner-video"></video>
      </div>
      <Heading
        title="Sporting Karaté Club"
        desc="Ecole de karaté, depuis 1983"
      />
    </div>
  );
};

export default Banner;
