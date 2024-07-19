'use client';
import { memo, useCallback } from 'react';
import { useSidebar } from '@/stores';

const HamburgerIcon = memo(() => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M4 6h16M4 12h16M4 18h16"
    />
  </svg>
));

HamburgerIcon.displayName = 'HamburgerIcon';

export const HamburgerButton = memo(() => {
  const setMenuOpen = useSidebar(
    useCallback((state) => state.onSidebarOpen, [])
  );

  return (
    <button
      className="px-2 rounded-lg inline-block md:hidden hover:bg-gray-200 transition-colors"
      onClick={setMenuOpen}
      aria-label="Abrir menú"
    >
      <HamburgerIcon />
    </button>
  );
});

HamburgerButton.displayName = 'HamburgerButton';
