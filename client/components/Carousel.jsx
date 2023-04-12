import React from "react";
import Image from "next/image";
import { CCarousel, CCarouselItem, CCarouselCaption } from "@coreui/react";

import Company from "../public/images/Carousel/img1.jpeg";
import Image2 from "../public/images/Carousel/img2.jpg";
import Image3 from "../public/images/Carousel/img3.jpg";

export default function Carousel() {
  return (
    <>
      <CCarousel controls indicators style={{ height: "70vh" }}>
        <CCarouselItem style={{ height: "65vh" }}>
          <Image className="d-block w-100" src={Company} alt="slide 1" />
          <CCarouselCaption className="d-none d-md-block">
            <h5>First slide label</h5>
            <p>Some representative placeholder content for the first slide.</p>
          </CCarouselCaption>
        </CCarouselItem>
        <CCarouselItem style={{ height: "65vh" }}>
          <Image className="d-block w-100" src={Image2} alt="slide 2" />
          <CCarouselCaption className="d-none d-md-block">
            <h5>Second slide label</h5>
            <p>Some representative placeholder content for the first slide.</p>
          </CCarouselCaption>
        </CCarouselItem>
        <CCarouselItem style={{ height: "65vh" }}>
          <Image className="d-block w-100" src={Image3} alt="slide 3" />
          <CCarouselCaption className="d-none d-md-block">
            <h5>Third slide label</h5>
            <p>Some representative placeholder content for the first slide.</p>
          </CCarouselCaption>
        </CCarouselItem>
      </CCarousel>
    </>
  );
}
