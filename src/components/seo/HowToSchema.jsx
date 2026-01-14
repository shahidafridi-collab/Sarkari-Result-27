import Script from "next/script";

export default function HowToSchema({ title, steps = [] }) {
  // ✅ Ensure steps is an array (not a Promise)
  if (!Array.isArray(steps) || steps.length === 0) {
    return null;
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: title,
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step
    }))
  };

  return (
    <Script
      id="howto-schema"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema)
      }}
    />
  );
}
