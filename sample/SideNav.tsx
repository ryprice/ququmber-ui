import {css} from '@emotion/react';
import UITextInput from 'ququmber-ui/input/UITextInput';
import {useCallback} from 'react';

const styles = {
  root: css`
    min-width: 200px;
    flex-grow: 0;
    flex-shrink: 0;
    padding: 20px;

    p {
      margin: 8px;

      &.header {
        margin-top: 24px;
        font-weight: bold;
      }
    }

    a {
      cursor: pointer;
      color: #222222;

      &:hover {
        text-decoration: underline;
      }
    }
  `
};

export type SideNavSectionConfig = Array<string | [string, string | JSX.Element]>;

type SideNavProps = {
  sections: SideNavSectionConfig;
  onFilterKeyPress: (nextFilter: string) => void;
};

const SideNav = (props: SideNavProps) => {
  const {sections} = props;
  const propsOnFilterKeyPress = props.onFilterKeyPress;
  const onFilterKeyPress = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    propsOnFilterKeyPress(e.target.value);
  }, [propsOnFilterKeyPress]);

  return <div css={styles.root}>
    <UITextInput placeholder="filter" onChange={onFilterKeyPress} />
    {sections.map((s) => {
      if (typeof s === 'string') {
        return <p className="header" key={s}>{s}</p>;
      } else {
        const pathParts = (s[0] as string).split('/');

        return <p key={pathParts[pathParts.length - 1]}><a href={`#${s[0]}`}>
          {pathParts[pathParts.length - 1]}
        </a></p>;
      }
    })}
  </div>;
};

export default SideNav;
