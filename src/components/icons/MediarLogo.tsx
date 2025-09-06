import React from "react";

type SvgProps = React.SVGProps<SVGSVGElement>;

export const MediarLogo: React.FC<SvgProps> = (props) => (
  <svg
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
    {...props}
  >
    <rect x="4" y="6" width="16" height="12" rx="2" fill="currentColor" opacity="0.15" />
    <circle cx="9" cy="12" r="2" fill="currentColor" />
    <circle cx="15" cy="12" r="2" fill="currentColor" />
  </svg>
);

export default MediarLogo;


