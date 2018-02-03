import React, { PureComponent } from "react";
import Style from "./ModalSubmitFeed.scss";
import PropTypes from "prop-types";
import Amplitude from "./../../utils/amplitude";
import SuccessIcon from "./../../assets/images/success.svg";

export default class ModalSubmitFeed extends PureComponent {
  state = { step: "form", value: "" };

  onSubmit() {
    if (this.state.value.length === 0) return false;

    Amplitude.logEvent("SUBMIT_FEED_SEND", {
      url: this.state.value
    });

    this.setState({ value: "", step: "success" });

    setTimeout(() => {
      this.setState({ step: "form" });
      this.props.onClose();
    }, 2000);
  }

  onChange(e) {
    this.setState({ value: e.target.value });
  }

  render() {
    const { open } = this.props;
    const styleContainer = open ? Style.containerOpen : Style.container;

    return (
      <div className={styleContainer}>
        <div className={Style.menu}>
          <div className={Style.overlay} onClick={this.props.onClose} />
          {this.state.step === "form" && (
            <Form
              value={this.state.value}
              onChange={this.onChange.bind(this)}
              onSubmit={this.onSubmit.bind(this)}
            />
          )}
          {this.state.step === "success" && <Success />}
        </div>
      </div>
    );
  }
}

const Form = ({ onChange, value, onSubmit }) => (
  <div className={Style.wrapper}>
    <div className={Style.title}>Demander l'ajout d'une nouvelle source</div>

    <div className={Style.description}>
      Plusieurs sources seront ajoutées régulièrement, cependant, vous avez
      sûrement des sources que vous aimeriez retrouver ici. Vous pouvez nous
      proposer de nouvelles sources en remplissant le champs ci-dessous.
    </div>

    <div className={Style.footer}>
      <input
        className={Style.input}
        placeholder="Ajouter une source"
        value={value}
        onChange={onChange}
      />
      <div className={Style.submit} onClick={onSubmit}>
        Valider
      </div>
    </div>
  </div>
);

const Success = () => (
  <div className={Style.wrapperSuccess}>
    <div className={Style.title}>BRAVO !</div>

    <div className={Style.description}>Merci d'avoir contribué !</div>

    <div className={Style.image}>
      <img src={SuccessIcon} alt="success" />
    </div>
  </div>
);

ModalSubmitFeed.propTypes = {
  open: PropTypes.bool
};

ModalSubmitFeed.defaultProps = {
  open: false,
  onClose: () => false
};
