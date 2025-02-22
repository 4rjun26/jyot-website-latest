import { useEffect } from "react";
import gsap from "gsap";
import ScrollSmoother from "gsap/ScrollSmoother";

const useSmoothScroll = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollSmoother);

    ScrollSmoother.create({
      smooth: 1.5, // Adjust smoothness (higher = more inertia)
      effects: true, // Apply smoothing effect on elements
    });

  }, []);
};

export default useSmoothScroll;
