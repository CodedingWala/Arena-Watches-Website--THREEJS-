/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useContext } from "react";
import { LenisContext } from "../components/providers/SmoothScrollProvider";
import Lenis from "lenis";

/**
 * Custom hook to consume the active Lenis smooth scroll instance.
 * Allows custom triggers, anchoring, or pausing the scroll in sub-components.
 */
export function useLenis(): Lenis | null {
  return useContext(LenisContext);
}
