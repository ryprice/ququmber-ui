import UIButton from 'ququmber-ui/button/UIButton';
import Editor from '../Editor';

const UIButtonSample = () =>
  <div>
    <Editor
      code={
`<div>
  <UIButton style={({width: '200px'})}>
    Default Color
  </UIButton>
  <br />
  <UIButton
    style={{width: '200px'}}
    styling={Stylings.GO}>
    Go
  </UIButton>
  <br />
  <UIButton
    style={{width: '200px'}}
    styling={Stylings.FACEBOOK}>
    Facebook
  </UIButton>
  <br />
  <UIButton
    style={{width: '200px'}}
    styling={Stylings.GOOGLE}>
    Google
  </UIButton>
  <br />
  <UIButton
    style={{width: '200px'}}
    styling={Stylings.RED}>
    Red
  </UIButton>
  <br />
  <UIButton
    style={{width: '200px'}}
    styling={Stylings.GO}
    loading={true}>
    Loading
  </UIButton>
  <br />
  <UIButton
    style={{fontSize: '20px'}}
    styling={Stylings.FACEBOOK}>
    20px Large Button
  </UIButton>
  <br />
  <UIButton
    style={{width: '200px'}}
    styling={Stylings.OUTLINE}>
    Outline
  </UIButton>
  <br />
  <UIButton
    style={{width: '200px'}}
    styling={Stylings.LINK}>
    Link
  </UIButton>
</div>`
      }
      scope={{UIButton}}
    />
  </div>;

export default UIButtonSample;
