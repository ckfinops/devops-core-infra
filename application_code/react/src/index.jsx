// Polyfill Node globals used by some libraries (AWS Cognito SDK / buffer) so they
// don't crash in the browser environment.
if (typeof window !== "undefined") {
	// Provide `global` for libs that reference it (safe no-op fallback).
	if (typeof window.global === "undefined") {
		// keep this === window so references to global.x work in browser
		window.global = window;
	}

	// Provide Buffer polyfill from the 'buffer' package if available.
	// We import lazily to avoid impacting SSR or environments without window.
	try {
		// eslint-disable-next-line import/no-extraneous-dependencies
		const { Buffer } = require("buffer");
		if (typeof window.Buffer === "undefined") window.Buffer = Buffer;
	} catch (err) {
		// If require isn't available (ESM-only env) try dynamic import as fallback.
		// Failure here is non-fatal; many apps don't need Buffer at runtime.
		(async () => {
			try {
				const mod = await import("buffer");
				if (typeof window.Buffer === "undefined") window.Buffer = mod.Buffer;
			} catch (_e) {
				// ignore
			}
		})();
	}
}

import React from "react";
// Initialize Amplify early
import './lib/amplify'; // ensure Amplify.configure() runs before the app mounts
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/tailwind.css";
import "./styles/index.css";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(<App />);
