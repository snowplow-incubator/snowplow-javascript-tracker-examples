import { useRouter } from "next/router";
import { tracker } from "@/lib/snowplow";
import { useEffect } from "react";

export function PageTracker() {
  const router = useRouter();

  useEffect(() => {
    tracker?.trackPageView();

    router.events.on("routeChangeComplete", () => {
      tracker?.trackPageView();
    });

    return () => {
      router.events.off("routeChangeComplete", () => {
        tracker?.trackPageView();
      });
    };
  }, [router.events]);

  return null;
}
