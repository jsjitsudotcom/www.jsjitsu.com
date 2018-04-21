import React from "react";
import Style from "./Carousel.scss";

const wrapWithPadding = (children = [], padding = 5) =>
  children.map((element, index) => (
    <div
      key={index}
      style={{
        paddingLeft: padding,
        paddingRight: padding,
        flexShrink: 0
      }}
    >
      {element}
    </div>
  ));

const Carousel = ({
  description,
  title,
  children,
  padding = 5,
  marginTop = 0
}) => (
  <div className={Style.container} style={{ marginTop }}>
    <div className={Style.title} style={{ paddingLeft: padding }}>
      {title}
    </div>
    <div className={Style.description} style={{ paddingLeft: padding }}>
      {description}
    </div>
    <div className={Style.items} style={{ paddingLeft: padding - 5 }}>
      {wrapWithPadding(children)}
    </div>
  </div>
);

export default Carousel;
