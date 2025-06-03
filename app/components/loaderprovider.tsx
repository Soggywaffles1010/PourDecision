// components/PageTransitionProvider.tsx
"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Loader from "./loader";

const PageTransitionProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 500); // adjust duration as needed
    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <>
      {loading && <Loader />}
      {children}
    </>
  );
};

export default PageTransitionProvider;
