const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "NguyLuky",
  url: "https://about.nguyluky.site",
  jobTitle: "Software Developer",
  description:
    "Software developer focused on backend systems, APIs, reverse engineering, and embedded development.",
  sameAs: [
    "https://github.com/nguyluky",
    "https://www.facebook.com/NguyLuky/",
  ],
  knowsAbout: [
    "Backend Development",
    "API Design",
    "Embedded Systems",
    "Reverse Engineering",
    "TypeScript",
    "Node.js",
  ],
};

export default function Head() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
    </>
  );
}
