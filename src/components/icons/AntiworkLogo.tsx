import React from "react";

type SvgProps = React.SVGProps<SVGSVGElement>;

export const AntiworkLogo: React.FC<SvgProps> = (props) => (
  <svg
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
    {...props}
  >
    <rect x="3" y="3" width="18" height="18" rx="4" fill="currentColor" opacity="0.15" />
    <path d="M7 12h10M12 7v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export default AntiworkLogo;


