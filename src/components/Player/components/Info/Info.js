import React from "react";
import Style from "./Info.scss";
import moment from "moment";
import { withProps, withState, withHandlers, compose } from "recompose";
import ArrowDropDown from "./../../../../assets/material-icons/arrow-drop-down.svg";
import Ripple from "./../../../Ripple/Ripple";

const getPublishedAt = date => moment(date).fromNow();
const sliceText = text => text.slice(0, 100) + "...";

const enhance = compose(
  withState("isOpen", "updateOpen", false),
  withHandlers({
    toggleOpen: ({ isOpen, updateOpen }) => event => updateOpen(!isOpen)
  }),
  withProps(props => ({
    ...props,
    description: props.isOpen ? props.description : sliceText(props.description)
  }))
);

const Info = ({ description, title, published, views, toggleOpen, isOpen }) => (
  <Ripple>
    <div className={Style.container} onClick={toggleOpen}>
      <div className={Style.title}>
        {title}

        <div className={isOpen ? Style.fold : Style.expand}>
          <img src={ArrowDropDown} alt="arrow-drop-down" />
        </div>
      </div>
      <div className={Style.published}>
        Publiée {getPublishedAt(published)} - {views} vues
      </div>
      <div className={Style.description}>{description}</div>
    </div>
  </Ripple>
);

export default enhance(Info);
