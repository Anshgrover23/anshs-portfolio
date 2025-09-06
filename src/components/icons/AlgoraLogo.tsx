import React from "react";

type SvgProps = React.SVGProps<SVGSVGElement>;

export const AlgoraLogo: React.FC<SvgProps> = (props) => (
  <svg
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
    {...props}
  >
    <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.15" />
    <path
      d="M7 17 L12 7 L17 17 M17 7 V17"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default AlgoraLogo;


