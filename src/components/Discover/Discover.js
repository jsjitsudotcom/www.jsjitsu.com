import React, { PureComponent } from "react";
import Style from "./Discover.scss";
import PropTypes from "prop-types";

import Menu from "./../Menu/Menu";
import Carousel from "./../Carousel/Carousel";
import Serie from "./../Serie/Serie";
import PlayBack from "./../PlayBack/PlayBack";
import Onboarding from "./../Onboarding/Onboarding";

import School from "./../../assets/material-icons/school.svg";

class Discover extends PureComponent {
  render() {
    return (
      <div>
        <Menu title="JSJITSU" />
        <div className={Style.container}>
          {/* <Onboarding
            title="Apprennez le Javascript"
            icon={School}
            description="Avec Jsjitsu, vous pouvez n’importe où et à n’importe quel moment, apprendre de nouvelles choses sur le Javascript. L’application et les vidéos sont disponible même sans connexion internet."
          /> */}

          <Carousel
            title="Les nouvelles sorties"
            description="Toutes catégories confondues"
            padding={15}
            marginTop={10}
          >
            {this.props.series.map(({ illustration, title, id }) => (
              <Serie key={id} illustration={illustration} title={title} />
            ))}
          </Carousel>

          {/* <Carousel
            title="Les épisodes enregistrés"
            description="Tous les épisodes disponible en mode hors ligne"
            padding={15}
            marginTop={10}
          >
            {this.props.releases.map(({ illustration, title, id }) => (
              <Serie key={id} illustration={illustration} title={title} />
            ))}
          </Carousel> */}

          {/* <Carousel
            title="Reprendre"
            description="Revoir ou reprendre là où vous vous êtes arrêté"
            padding={15}
            marginTop={10}
          >
            {this.props.releases.map(
              ({ illustration, description, title, id }) => (
                <PlayBack
                  key={id}
                  description={description}
                  illustration={illustration}
                  title={title}
                />
              )
            )}
          </Carousel> */}

          {/* <Carousel
            title="Catégories: Javascript"
            description="Toutes les vidéos sur le Javascript"
            padding={15}
            marginTop={10}
          >
            {this.props.releases.map(({ illustration, title, id }) => (
              <Serie key={id} illustration={illustration} title={title} />
            ))}
          </Carousel> */}
        </div>
      </div>
    );
  }
}

Discover.propTypes = {
  releases: PropTypes.array
};

Discover.defaultProps = {
  releases: []
};

export default Discover;
