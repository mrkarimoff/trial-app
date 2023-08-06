"use client";
import React, { useEffect, useState } from "react";

const SuppressHydrationWarning = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <main>{children}</main>;
};

export default SuppressHydrationWarning;
