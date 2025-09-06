import React from "react";

type SvgProps = React.SVGProps<SVGSVGElement>;

export const TscircuitLogo: React.FC<SvgProps> = (props) => (
  <svg
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
    {...props}
  >
    <path d="M5 12h8M13 12a3 3 0 106 0 3 3 0 00-6 0z" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="5" cy="12" r="2" fill="currentColor" />
    <circle cx="19" cy="12" r="2" fill="currentColor" opacity="0.2" />
  </svg>
);

export default TscircuitLogo;


