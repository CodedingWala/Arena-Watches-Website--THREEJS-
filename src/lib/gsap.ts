/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger globally once
gsap.registerPlugin(ScrollTrigger);

// Set default ease for luxury feel: slow deceleration, no bounce, pure confidence
gsap.defaults({
  ease: "power3.out",
  duration: 1.0,
});

export { gsap, ScrollTrigger };
