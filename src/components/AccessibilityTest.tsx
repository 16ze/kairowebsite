import { useEffect } from "react";
import ReactDOM from "react-dom";
import React from "react";

export function AccessibilityTest() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      // Dynamiquement importer axe-core
      import("@axe-core/react").then((axeModule) => {
        const axe = axeModule.default;
        axe(React, ReactDOM, 1000);
      });
    }
  }, []);

  return null;
}
