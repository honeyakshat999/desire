import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Track page views
export const usePageView = () => {
  const location = useLocation();

  useEffect(() => {
    const trackPageView = async () => {
      try {
        await fetch("/.netlify/functions/track-event", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: "page_view",
            data: {
              page_path: location.pathname,
              referrer: document.referrer || null,
            },
          }),
        });
      } catch (error) {
        // Silently fail - don't interrupt user experience
        console.debug("Failed to track page view:", error);
      }
    };

    trackPageView();
  }, [location.pathname]);
};

// Track enquiry clicks
export const trackEnquiryClick = async (
  projectId?: string,
  projectName?: string,
  source: string = "unknown"
) => {
  try {
    await fetch("/.netlify/functions/track-event", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "enquiry_click",
        data: {
          project_id: projectId,
          project_name: projectName,
          source,
        },
      }),
    });
  } catch (error) {
    // Silently fail
    console.debug("Failed to track enquiry click:", error);
  }
};
