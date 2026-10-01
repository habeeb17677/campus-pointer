import { useEffect } from "react";

const SITE_URL = "https://campus-pointer.pages.dev";

function SEO({
  title = "CampusPointer — Student Tools",
  description = "CampusPointer provides simple student tools for GPA, CGPA, attendance, budgeting, study planning, and exam preparation.",
  path = "/",
}) {
  useEffect(() => {
    const canonicalUrl = `${SITE_URL}${path}`;

    document.title = title;

    const setMeta = (selector, attribute, value) => {
      let element = document.head.querySelector(selector);

      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, selector.match(/content="([^"]*)"/)?.[1] || "");
        document.head.appendChild(element);
      }

      element.setAttribute("content", value);
    };

    const setProperty = (property, content) => {
      let element = document.head.querySelector(
        `meta[property="${property}"]`,
      );

      if (!element) {
        element = document.createElement("meta");
        element.setAttribute("property", property);
        document.head.appendChild(element);
      }

      element.setAttribute("content", content);
    };

    const setName = (name, content) => {
      let element = document.head.querySelector(
        `meta[name="${name}"]`,
      );

      if (!element) {
        element = document.createElement("meta");
        element.setAttribute("name", name);
        document.head.appendChild(element);
      }

      element.setAttribute("content", content);
    };

    setName("description", description);

    setProperty("og:title", title);
    setProperty("og:description", description);
    setProperty("og:type", "website");
    setProperty("og:url", canonicalUrl);
    setProperty(
      "og:image",
      `${SITE_URL}/og-image.svg`,
    );
    setProperty("og:site_name", "CampusPointer");

    setProperty("twitter:card", "summary_large_image");
    setProperty("twitter:title", title);
    setProperty("twitter:description", description);
    setProperty(
      "twitter:image",
      `${SITE_URL}/og-image.svg`,
    );

    let canonical = document.head.querySelector(
      'link[rel="canonical"]',
    );

    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }

    canonical.setAttribute("href", canonicalUrl);
  }, [title, description, path]);

  return null;
}

export default SEO;