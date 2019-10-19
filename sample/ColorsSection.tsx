import {map, pick} from 'lodash';
import * as React from 'react';

import Colors from 'ququmber-ui/Colors';
import {isDarkColor} from 'ququmber-ui/utils/colorUtils';

const ColorsSubsection = (props: ColorsSubsectionProps) =>
  <div className="ColorSubsection">
    <p className="header">{props.name}</p>
    <div className="swatches">
      {map(props.colors, (hex, name) => {
        const isDark = isDarkColor(hex.substring(1, hex.length));
        return <div className="swatch" style={{background: hex}}>
          <p className={`name ${isDark ? '' : 'light'}`}>{name}</p>
          <p className={`hex ${isDark ? '' : 'light'}`}>{hex}</p>
        </div>;
      })}
    </div>
  </div>;

interface ColorsSubsectionProps {
  name: string;
  colors: {[key: string]: string};
}

const ColorsSection = () =>
  <div className="ColorSection">
    <ColorsSubsection name="Controls" colors={pick(Colors, [
      'CONTROL',
      'CONTROL_HOVER',
      'CONTROL_BORDER',
      'OPTION_HOVER',
      'OPTION_SELECTED',
      'OPTION_SELECTEDHOVER',
      'DISABLED',
    ])} />
    <ColorsSubsection name="Grayscales" colors={pick(Colors, [
      'WHITE',
      'OFFWHITE',
      'SILENT',
      'QUIET',
      'QUQUMBER',
      'BASEFONT',
      'BLACK'
    ])} />
    <ColorsSubsection name="Accents" colors={pick(Colors, [
      'NOTIFY',
      'NOTIFY_HOVER',
      'GO',
      'DEEPRED',
      'RED'
    ])} />
    <ColorsSubsection name="Integrations" colors={pick(Colors, [
      'GOOGLE',
      'FACEBOOK'
    ])} />
  </div>;

export default ColorsSection;
