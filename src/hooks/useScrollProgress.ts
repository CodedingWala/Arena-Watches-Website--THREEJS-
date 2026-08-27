/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useContext } from "react";
import { ScrollProgressContext } from "../components/providers/ScrollProgressProvider";

/**
 * Custom hook to retrieve the current normalized scroll progress (value between 0 and 1).
 * Perfect for drawing progress rings, top progress lines, or driving parallax states.
 */
export function useScrollProgress(): number {
  return useContext(ScrollProgressContext);
}
