import {css} from '@emotion/react';
import * as React from 'react';
import Colors from 'ququmber-ui/Colors';
import {eventHasControlKey} from 'listlab-api/utils/EventUtils';

const styles = {
  root: css`
    background: transparent;
    color: ${Colors.QUIET};
    padding-left: 0;
    padding-right: 20px;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: bold;
    
    &:hover,
    &:active,
    &:visited,
    &:focus {
      background: transparent;
    }
  `,
  selected: css`
    color: ${Colors.QUQUMBER};
  `
};

const UILightTab = (props: UILightTabProps) => {
  const {id, selected, onClick, name, className, href} = props;
  return <button
    css={[styles.root, selected ? styles.selected : null]}
    className={className}
    key={id}
    onClick={(e) => {
      if (eventHasControlKey(e) && href) {
        window.open(href, '_blank');
      } else {
        onClick(id);
      }
    }}>
    {name}
  </button>;
};

type UILightTabProps = {
  name: React.ReactNode;
  id: string;
  onClick: (key: string) => void;
  selected: boolean;
  className?: string;
  href?: string;
};

export default UILightTab;
