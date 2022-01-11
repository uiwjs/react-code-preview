import React from 'react';
import CodeSandbox, { CodeSandboxProps } from '@uiw/react-codesandbox';
import Codepen from '@uiw/react-codepen';
import { CodePreviewProps } from './';
import './ThirdPartyButton.less';

type ThirdPartyButtonProps = {
  prefixCls?: string;
  codePenOption?: CodePreviewProps['codePenOption'];
  codeSandboxOption?: CodeSandboxProps;
};

const ThirdPartyButton: React.FC<ThirdPartyButtonProps> = (props) => {
  const { codePenOption, codeSandboxOption, prefixCls } = props || {};
  const { includeModule, ...otherCodePenOptions } = codePenOption || {};
  if (otherCodePenOptions && otherCodePenOptions.js) {
    let include = (includeModule || []).join('|');
    otherCodePenOptions.js = otherCodePenOptions.js.replace(/import([\s\S]*?)(?=['"])['"].*['"]( *;|;)?/gm, (str) => {
      // eslint-disable-next-line no-useless-escape
      if (include && new RegExp(`from\\s+['"](${include})['"](\s.+)?;?`).test(str)) {
        return str;
      }
      return `/** ${str} **/`;
    });
  }
  return (
    <div className={`${prefixCls}-thirdparty`}>
      {codePenOption && (
        <Codepen {...otherCodePenOptions}>
          <svg height="12" fill="currentColor" viewBox="0 0 69 69">
            <path d="M68.974125,23.6022271 C68.9669375,23.556228 68.956875,23.5159788 68.951125,23.4728545 C68.9369583,23.3892382 68.9192128,23.3062677 68.8979375,23.2241717 C68.885,23.1752977 68.8663125,23.127861 68.8505,23.0804244 C68.8278442,23.0077868 68.8029153,22.9358778 68.77575,22.8648035 C68.7562939,22.8157401 68.7342205,22.7677555 68.709625,22.7210562 C68.6804108,22.6530301 68.6463004,22.5872128 68.6075625,22.5241224 C68.5816874,22.4766857 68.5515,22.4321241 68.52275,22.386125 C68.4142531,22.2169066 68.2885197,22.0593814 68.1475625,21.9160713 C68.10875,21.8772595 68.0728125,21.8355728 68.0325625,21.8010735 C67.9775701,21.7523865 67.9214935,21.704938 67.864375,21.6587636 C67.818375,21.6242643 67.77525,21.589765 67.72925,21.5581406 L67.680375,21.5207662 L36.1445,0.497723998 C35.1485978,-0.165907999 33.8514022,-0.165907999 32.8555,0.497723998 L1.32106248,21.5207662 L1.27218748,21.5581406 C1.16574994,21.6321432 1.06485681,21.713817 0.970312494,21.8025109 C0.928625004,21.8355728 0.891249961,21.8772595 0.850999999,21.9160713 C0.800687478,21.9678203 0.750375025,22.0224443 0.704374952,22.0770683 C0.618968308,22.1722554 0.543358166,22.275796 0.47868744,22.386125 L0.392437472,22.5241224 C0.355916851,22.587711 0.322339729,22.6529454 0.291812498,22.7196187 C0.235417041,22.8356642 0.187844895,22.9557936 0.149499967,23.0789869 C0.133687434,23.127861 0.11643744,23.1752977 0.103499962,23.2241717 C0.0819374527,23.3046702 0.0675624468,23.3880436 0.0517499808,23.4728545 C0.0431249503,23.5159787 0.0330624597,23.5562279 0.0273124842,23.6022271 C0.0114999508,23.7272873 0,23.8566599 0,23.9874699 L0,45.0105121 C0,45.1398847 0.0115000182,45.2692572 0.0287499444,45.3986298 C0.0330624597,45.4403165 0.0431249503,45.4834407 0.0517499808,45.5265649 C0.0661249867,45.6113758 0.0819374527,45.6918743 0.103499962,45.7752478 C0.11643744,45.8241218 0.133687434,45.8715585 0.149499967,45.918995 C0.172499936,45.9908687 0.195499972,46.0627423 0.227124972,46.1360534 C0.245812493,46.1849275 0.27024999,46.2309267 0.290374971,46.2798007 C0.323437498,46.3459245 0.355062497,46.4106108 0.392437472,46.478172 C0.421187484,46.5227337 0.448499968,46.5687328 0.47868744,46.6132945 C0.585037244,46.7827707 0.710436736,46.9395172 0.852437459,47.0804732 C0.979968483,47.2145679 1.12112666,47.3350078 1.27362494,47.4398414 L1.32106248,47.4786532 L32.8555,68.5016954 C33.8511677,69.1661015 35.1488322,69.1661015 36.1445,68.5016954 L67.680375,47.4786532 L67.72925,47.4412789 C67.77525,47.4096545 67.818375,47.3751552 67.864375,47.3406558 C67.9215088,47.2940078 67.9775854,47.2460798 68.0325625,47.1969085 C68.0728125,47.1609716 68.10875,47.1221599 68.1475625,47.0819107 C68.2902677,46.9406867 68.4161661,46.7834372 68.52275,46.6132945 C68.5515,46.5672953 68.5816874,46.5227337 68.6075625,46.478172 C68.646375,46.4106108 68.6794375,46.3459245 68.7081875,46.2798007 C68.732625,46.2309267 68.7570625,46.1849275 68.77575,46.1360534 C68.8045,46.0641798 68.8275,45.9908687 68.8505,45.918995 C68.8663125,45.8715584 68.885,45.8241218 68.8979375,45.7752478 C68.9195,45.6918743 68.9353125,45.6113759 68.951125,45.5265649 C68.956875,45.4834407 68.9669375,45.4403165 68.974125,45.4000673 C68.991375,45.2706947 69,45.1413222 69,45.0119496 L69,23.9889074 C69,23.8566599 68.991375,23.7272873 68.974125,23.6022271 Z M38,9 L61,24.1907448 L50.7281277,31 L38.0014231,22.5649276 L38.0014231,9 L38,9 Z M30.997154,9 L30.997154,22.5649276 L18.2740828,31 L8,24.1907448 L31,9 L30.997154,9 Z M6,29 L13,34 L6,39 L6,29 L6,29 Z M31,60 L8,44.8082815 L18.2732954,38 L30.9971538,46.434203 L30.9971538,60 L31,60 Z M34.4985607,41 L24,34 L34.4985607,27 L45,34 L34.4985607,41 Z M38,60 L38,46.4333333 L50.7268564,38 L61,44.8073077 L38,60 L38,60 Z M63,39 L56,34 L63,29 L63,39 L63,39 Z" />
          </svg>
        </Codepen>
      )}
      {codeSandboxOption && (
        <CodeSandbox {...codeSandboxOption}>
          <svg height="12" fill="currentColor" viewBox="0 0 69 69">
            <path d="M32,38.2764838 L11,24 L11,35.7160031 L22.0526316,43.2306536 L22.0526316,54.3200601 L32,60 L32,38.2764838 Z M38,38.2764838 L38,60 L47.9473684,54.3200601 L47.9473684,43.2306536 L59,35.7160031 L59,24 L38,38.2764838 Z M46.296506,13 L35.5021904,21.0761293 L24.7078748,13.004586 L15,18.6913552 L35.5021904,33 L56,18.6913552 L46.296506,13.004586 L46.296506,13 Z M37.1676303,0.571217481 L63.7371606,15.5989936 C65.1342563,16.3900364 66,17.8813846 66,19.4990592 L66,49.4964682 C66.0011469,51.1157433 65.1356391,52.6091811 63.7371606,53.4010064 L37.1676303,68.4287825 C35.8224939,69.1904058 34.1819333,69.1904058 32.8367968,68.4287825 L6.26726663,53.4010064 C4.86707992,52.6103421 4,51.1166819 4,49.4964682 L4,19.4990592 C4,17.8813846 4.86574257,16.3900364 6.26283836,15.5989936 L32.8323686,0.571217481 C34.1775051,-0.190405827 35.8180656,-0.190405827 37.1632021,0.571217481 L37.1676303,0.571217481 Z" />
          </svg>
        </CodeSandbox>
      )}
    </div>
  );
};

export default ThirdPartyButton;
