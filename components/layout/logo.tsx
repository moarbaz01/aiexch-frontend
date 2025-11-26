"use client";

import Image from "next/image";

interface LogoProps {
  onClick?: () => void;
  settings?: {
    logo?: string;
    siteName?: string;
  };
}

export default function Logo({ onClick, settings }: LogoProps) {
  return (
    <div
      onClick={onClick}
      className="flex cursor-pointer items-center gap-3 min-w-0"
    >
      {/* Logo */}
      <div className="h-8">
        {settings?.logo && (
          <Image
            src={settings.logo}
            alt="Logo"
            height={32}
            width={200}
            className="h-full w-full "
          />
        )}
      </div>

      {/* Brand Name */}
      {!settings?.logo && (
        <div className="min-w-0  hover:opacity-80 transition-opacity">
          <h1 className="text-lg sm:text-xl font-bold text-primary">
            {settings?.siteName}
          </h1>
        </div>
      )}
    </div>
  );
}
