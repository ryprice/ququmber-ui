import * as React from 'react';

const SampleParagraph = () =>
  <p>
    To the extent that this software may be used to reproduce, modify, publish or distribute materials,
    it is licensed to you only for reproduction, modification, publication and distribution of
    non-copyrighted materials, materials in which you own the copyright, or materials you are authorized
    or legally permitted to reproduce, modify, publish or distribute. If you are uncertain about your
    right to copy, modify, publish or distribute any material, you should contact your legal advisor.
  </p>;

const TypographySection = () =>
  <div className="TypographySection">
    <h1>Heading 1</h1>
    <SampleParagraph />

    <h2>Heading 2</h2>
    <SampleParagraph />

    <h3>Heading 3</h3>
    <SampleParagraph />

    <h2>Hyperlink</h2>
    <p>
      Here in this paragraph is a hyperlink.&nbsp;
      <a href="https://listlab.io/">Go to ListLab</a>.
      Note that it is blue when dropped into a text block such as here.
      You have probably never&nbsp;
      <a href={`https://listlab.io/${Math.random()}`}>been here</a>.
    </p>
  </div>;

export default TypographySection;
