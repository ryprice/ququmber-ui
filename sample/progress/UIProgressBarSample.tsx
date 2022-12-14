import Colors from 'ququmber-ui/Colors';
import UIProgressBar from 'ququmber-ui/progress/UIProgressBar';
import Editor from '../Editor';

const UIProgressBarSample = () => {
  return <div>
    <h1>UIProgress</h1>
    <Editor
      scope={{UIProgressBar, Colors}}
      code={
`<>
  <UIProgressBar
    style={{
      width: '350px',
      marginBottom: '1em',
    }}
    value={0.4}
  />
  <UIProgressBar
    style={{
      width: '350px',
      marginBottom: '1em',
    }}
    value={0.4}
    filledColor={Colors.LIGHTGREEN}
  />
  <UIProgressBar
    style={{
      width: '350px',
    }}
    value={0.2}
    filledColor={Colors.LIGHTYELLOW}
  />
</>`
      }
    />
  </div>;
};

export default UIProgressBarSample;
