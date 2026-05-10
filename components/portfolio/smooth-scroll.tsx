"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";

export const scrollOffset = -96;

export function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        anchors: {
          offset: scrollOffset,
        },
      }}
    >
      {children}
    </ReactLenis>
  );
}
