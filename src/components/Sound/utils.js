import click1 from "./../../assets/audio/Button 1.m4a";
import click2 from "./../../assets/audio/Button 2.m4a";
import click3 from "./../../assets/audio/Button 3.m4a";
import click4 from "./../../assets/audio/Button 4.m4a";
import click5 from "./../../assets/audio/Button 5.m4a";
import click6 from "./../../assets/audio/Button 6.m4a";
import click7 from "./../../assets/audio/Button 7.m4a";
import click8 from "./../../assets/audio/Collapse.m4a";
import click9 from "./../../assets/audio/Expand.m4a";
import click10 from "./../../assets/audio/Tab 1.m4a";
import click11 from "./../../assets/audio/Tab 2.m4a";
import click12 from "./../../assets/audio/Tab 3.m4a";

const clicks = [
  click1,
  click2,
  click3,
  click4,
  click5,
  click6,
  click7,
  click8,
  click9,
  click10,
  click11,
  click12
];

export const getClick = index => {
  return clicks[index - 1] || clicks[0];
};
