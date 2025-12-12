import type { DehydratedState } from "@tanstack/react-query";

declare global {
  interface Window {
    // We make it optional (?) because it won't exist during the very first render pass or if SSR failed
    __REACT_QUERY_STATE__?: DehydratedState;
  }
}
