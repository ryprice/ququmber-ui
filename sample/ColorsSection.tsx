import {map, pick} from 'lodash';
import * as React from 'react';

import * as Colors from 'ququmber-ui/Colors';
import {isDarkColor} from 'ququmber-ui/utils/colorUtils';

const ColorsSubsection = (props: ColorsSubsectionProps) =>
  <div className="ColorSubsection">
    <p className="header">{props.name}</p>
    {map(props.colors, (hex, name) => {
      const isDark = isDarkColor(hex.substring(1, hex.length));
      return <div className="tile" style={{background: hex}}>
        <p className={`name ${isDark ? '' : 'light'}`}>{name}</p>
        <p className={`hex ${isDark ? '' : 'light'}`}>{hex}</p>
      </div>;
    })}
  </div>;

interface ColorsSubsectionProps {
  name: string;
  colors: {[key: string]: string};
}

const ColorsSection = () =>
  <div className="ColorSection">
    <ColorsSubsection name="Ququmber" colors={pick(Colors, [
      'WHITE',
      'OFFWHITE',
      'CONTROL',
      'SELECTED',
      'QUIET',
      'DISABLED',
      'BASEFONT'
    ])} />
    <ColorsSubsection name="Accents" colors={pick(Colors, [
      'QUQUMBER',
      'NOTIFY',
      'GO'
    ])} />
    <ColorsSubsection name="Integrations" colors={pick(Colors, [
      'GOOGLE',
      'FACEBOOK'
    ])} />
  </div>;

export default ColorsSection;
