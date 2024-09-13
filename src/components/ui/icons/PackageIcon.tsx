type IconProps = {
  className?: string;
};

export const PackageIcon = ({
  className = 'w-6 h-6 text-gray-500',
}: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      fill="currentColor" // Permite que el color sea controlado por CSS
      className={className} // Permite personalizar el color y el tamaño
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path d="M56,81.29a1.5,1.5,0,0,1-.45-2.93l16.46-5.15a1.5,1.5,0,0,1,.9,2.86L56.49,81.22A1.41,1.41,0,0,1,56,81.29Z"></path>
        <path d="M56,74.29a1.5,1.5,0,0,1-.45-2.93l10.53-3.29A1.5,1.5,0,1,1,67,70.93L56.49,74.22A1.41,1.41,0,0,1,56,74.29Z"></path>
        <path d="M23.32,54.08h0Z"></path>
        <path d="M23.26,30.08A.94.94,0,0,0,23,30a.05.05,0,0,0,0,0h.06A1.37,1.37,0,0,1,23.26,30.08Z"></path>
        <path d="M37.74,35.48a1.41,1.41,0,0,0-.37.8,1,1,0,0,1,.05-.3,1.59,1.59,0,0,1,.22-.43Z"></path>
        <path d="M89.37,28a.51.51,0,0,0,0-.17.84.84,0,0,0,0-.17,1.11,1.11,0,0,0-.07-.16,1.24,1.24,0,0,0-.31-.42L88.77,27a1.22,1.22,0,0,0-.29-.17l-.08,0-26.06-11L50.87,10.94l-.09,0a1.29,1.29,0,0,0-.26-.08,1.38,1.38,0,0,0-.64,0,1.29,1.29,0,0,0-.26.08l-.06,0-38,15.8h0a1.3,1.3,0,0,0-.26.14h0a.66.66,0,0,0-.15.14.24.24,0,0,0-.1.1,1.43,1.43,0,0,0-.34.6,1.34,1.34,0,0,0-.06.4V76.87A1.49,1.49,0,0,0,11.7,78.3L49.16,90h0l1.42.17L70,84.11h0l18.27-5.72a1.48,1.48,0,0,0,1-1.43V28.19A1.09,1.09,0,0,0,89.37,28ZM48.54,86.67l-34.9-10.9V30.14l7.28,2.28V52.66a1.51,1.51,0,0,0,1,1.42l.23.08.12,0h0l.1,0a1.09,1.09,0,0,0,.26,0h.11a.18.18,0,0,0,.1,0,.4.4,0,0,0,.15,0l.23-.07,0,0h0a.6.6,0,0,0,.15-.09.61.61,0,0,0,.16-.12l.08-.07,6.82-6,7,10.92.09.15a1.51,1.51,0,0,0,1,.68h.44a.28.28,0,0,0,.13,0,.19.19,0,0,0,.1,0l.12,0a1,1,0,0,0,.23-.12l0,0a1.24,1.24,0,0,0,.22-.18L40,59a1.09,1.09,0,0,0,.13-.17.94.94,0,0,0,.14-.26,1.31,1.31,0,0,0,.09-.28,1.53,1.53,0,0,0,0-.3V38.5l8.18,2.55ZM38.37,35l-.1.07-.53.4a1.41,1.41,0,0,0-.37.8,1.09,1.09,0,0,0,0,.18V52.88l-5.2-8.14a.25.25,0,0,0,0-.08,1,1,0,0,0-.13-.18,1.8,1.8,0,0,0-.21-.19.79.79,0,0,0-.23-.14l-.14-.07a.64.64,0,0,0-.18-.06L31,44a1.27,1.27,0,0,0-.39,0l-.21,0a1.19,1.19,0,0,0-.35.15l-.2.14,0,0-.12.11-5.83,5.16V32.81a.92.92,0,0,0,.27-.08l16.57-6.89,9.42,4.26Zm11.8,3.41-6.94-2.18,11.3-4.7.24-.13a1.24,1.24,0,0,0,.22-.18,1.39,1.39,0,0,0,.33-.46s0,0,0,0a1.13,1.13,0,0,0,.08-.24.15.15,0,0,0,0-.07,1.09,1.09,0,0,0,0-.26,1.47,1.47,0,0,0-.07-.46s0-.09-.05-.13a2,2,0,0,0-.1-.21l-.13-.18a1.26,1.26,0,0,0-.2-.2l-.07,0a.87.87,0,0,0-.26-.16L41.51,22.89h-.07a1.43,1.43,0,0,0-1.23,0L23.06,30a1.37,1.37,0,0,1,.2.13A.94.94,0,0,0,23,30a.05.05,0,0,0,0,0,.31.31,0,0,0-.13-.06l-6.33-2,33.66-14,11,4.63L83.52,28ZM86.38,75.85,69.16,81.24,51.54,86.75V41.13l34.84-10.9Z"></path>
        <path d="M23.26,30.08A.94.94,0,0,0,23,30h0A1.37,1.37,0,0,1,23.26,30.08Z"></path>
        <path d="M37.74,35.48a1.41,1.41,0,0,0-.37.8,1.09,1.09,0,0,0,0,.18v.27a1.46,1.46,0,0,1,.28-1.18Z"></path>
        <path d="M23.31,54.08h0Z"></path>
      </g>
    </svg>
  );
};
