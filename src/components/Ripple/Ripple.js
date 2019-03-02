import React, { PureComponent } from "react";
import PropTypes from "prop-types";

const wrapStyleDefault = {
  position: "relative",
  overflow: "hidden"
};

class Ripple extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      rippleStyle: {
        position: "absolute",
        borderRadius: "50%",
        opacity: 0,
        width: 35,
        height: 35,
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
        backgroundColor: props.color
      }
    };
  }

  handleClick = ev => {
    if (ev.stopPropagation) {
      ev.stopPropagation();
    }

    const { onClick, during } = this.props;
    const { currentTarget: { offsetWidth, offsetHeight } } = ev;

    const size = Math.max(offsetWidth, offsetHeight);

    this.ripple.style.top = `0`;
    this.ripple.style.left = `0`;
    this.ripple.style.right = `0`;
    this.ripple.style.bottom = `0`;
    this.ripple.style.margin = "auto";
    this.ripple.style.opacity = 1;
    this.ripple.style.transition = "initial";
    this.ripple.style.transform = `scale(1)`;

    setTimeout(() => {
      this.ripple.style.opacity = 0;
      this.ripple.style.transform = `scale(${size / 9})`;
      this.ripple.style.transition = `all ${during}ms`;

      if (typeof onClick === "function") onClick(ev);
    });

    // if (typeof onClick === "function") onClick(ev);
  };

  render() {
    const { children, style, during, color, ...props } = this.props;

    const { handleClick } = this;

    const wrapStyle = {
      ...style,
      ...wrapStyleDefault
    };

    return (
      <div {...props} style={wrapStyle} onClick={handleClick}>
        {children}
        <div ref={ref => (this.ripple = ref)} style={this.state.rippleStyle} />
      </div>
    );
  }
}

Ripple.propTypes = {
  during: PropTypes.number,
  color: PropTypes.string,

  onClick: PropTypes.func
};

Ripple.defaultProps = {
  color: "rgba(255,255,255, 0.5)",
  during: 1000,
  onClick: /* istanbul ignore next */ () =>
    console.warn("defaultProps: Ripple.onClick()")
};

export default Ripple;
