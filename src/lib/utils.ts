/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Merges conditional class names into a single space-separated string.
 * A lightweight alternative to clsx/tailwind-merge.
 */
export function cn(...inputs: (string | boolean | undefined | null | {[key: string]: boolean})[]): string {
  const classes: string[] = [];

  for (const input of inputs) {
    if (!input) continue;

    if (typeof input === "string") {
      classes.push(input);
    } else if (typeof input === "object") {
      for (const [key, value] of Object.entries(input)) {
        if (value) {
          classes.push(key);
        }
      }
    }
  }

  return classes.filter(Boolean).join(" ");
}

/**
 * Throttles a function call.
 */
export function throttle<T extends (...args: any[]) => any>(func: T, limit: number): (...args: Parameters<T>) => void {
  let inThrottle = false;
  return function(this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
