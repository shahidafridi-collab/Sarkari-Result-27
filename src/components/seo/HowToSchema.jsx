export default function HowToSchema({ title, steps }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: title,
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
