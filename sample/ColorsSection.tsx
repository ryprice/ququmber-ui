import {css} from '@emotion/react';
import {map, pick} from 'lodash';

import Colors from 'ququmber-ui/Colors';
import {isDarkColor} from 'ququmber-ui/utils/colorUtils';

const styles = {
  header: css`
    font-size: 20px;
  `,
  swatch: css`
    width: 200px;
    height: 200px;
    position: relative;
    float: left;
    border: 1px #eeeeee solid;
    margin: 0 40px 40px 0;
  `,
  name: css`
    position: absolute;
    left: 20px;
    bottom: 20px;
    color: ${Colors.WHITE};
    font-size: 14px;
    opacity: .8;

    &.light {
      color: ${Colors.BLACK};
    }
  `,
  hex: css`
    position: absolute;
    left: 20px;
    bottom: 40px;
    color: ${Colors.WHITE};
    font-size: 20px;

    &.light {
      color: ${Colors.BLACK};
    }
  `,
  colorsSubsection: css`
    clear: both;
    overflow: auto;
    margin-top: 60px;
  `,
};

const ColorsSubsection = (props: ColorsSubsectionProps) =>
  <div css={styles.colorsSubsection}>
    <p css={styles.header}>{props.name}</p>
    <div>
      {map(props.colors, (hex, name) => {
        const isDark = isDarkColor(hex.substring(1, hex.length));
        return <div css={styles.swatch} style={{background: hex}}>
          <p css={styles.name} className={`${isDark ? '' : 'light'}`}>{name}</p>
          <p css={styles.hex} className={`${isDark ? '' : 'light'}`}>{hex}</p>
        </div>;
      })}
    </div>
  </div>;

type ColorsSubsectionProps = {
  name: string;
  colors: {[key: string]: string};
};

const ColorsSection = () =>
  <div>
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
      'RED',
      'LIGHTRED',
      'LIGHTYELLOW',
      'LIGHTGREEN',
      'LIGHTBLUE',
    ])} />
    <ColorsSubsection name="Integrations" colors={pick(Colors, [
      'GOOGLE',
      'FACEBOOK'
    ])} />
  </div>;

export default ColorsSection;
