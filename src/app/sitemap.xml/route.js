export async function GET() {
  const BASE_URL = "https://www.sarkariresult27.com";

  try {
    // 🔹 All Gist sources (add/remove anytime)
    const GISTS = [
      {
        url: "https://gist.githubusercontent.com/shahidafridi-collab/9fb5f95e93ed95eba1959d1a18ac6bf7/raw/combine_result",
        type: "results"
      },
      {
        url: "https://gist.githubusercontent.com/shahidafridi-collab/3d4fa23aadd9be02be79a58e46009126/raw/gistfile1.txt",
        type: "jobs"
      },
      {
        url: "https://gist.githubusercontent.com/shahidafridi-collab/d6610e1b9fb8e2617c2999d1edc0851c/raw/gistfile1.txt",
        type: "admit-cards"
      },
      {
        url: "https://gist.githubusercontent.com/shahidafridi-collab/2203569eeb7046f824f7eddb7613d065/raw/gistfile1.txt",
        type: "admissions"
      },
      {
        url: "https://gist.githubusercontent.com/shahidafridi-collab/c687d6e00dcc0a79bd689a520de733c6/raw/syllabus",
        type: "syllabus"
      },
      {
        url: "https://gist.githubusercontent.com/shahidafridi-collab/d5e219d111e2acb930b89d68beb44d92/raw/answerKey",
        type: "answer-keys"
      }
    ];

    // 🔹 Fetch all gists in parallel
    const responses = await Promise.all(
      GISTS.map((g) =>
        fetch(g.url, { cache: "no-store" }).then((res) => res.json())
      )
    );

    // 🔹 Collect URLs
    const dynamicUrls = [];

    responses.forEach((data, index) => {
      const gistType = GISTS[index].type;

      // Case 1: homepage-style categories
      if (data.categories) {
        data.categories.forEach((cat) => {
          if (cat.link) {
            dynamicUrls.push(cat.link);
          }
          cat.items?.forEach((item) => {
            if (item.link) {
              dynamicUrls.push(item.link);
            }
          });
        });
      }

      // Case 2: flat array (results, syllabus, etc.)
      if (Array.isArray(data)) {
        data.forEach((item) => {
          if (item.id) {
            dynamicUrls.push(`/${gistType}/${item.id}`);
          } else if (item.link) {
            dynamicUrls.push(item.link);
          }
        });
      }
    });

    // 🔹 Remove duplicates
    const uniqueUrls = [...new Set(dynamicUrls)];

    // 🔹 Static URLs
    const staticUrls = [
      "",
      "/jobs",
      "/results",
      "/admit-cards",
      "/answer-keys",
      "/admissions",
      "/syllabus"
    ];

    // 🔹 Build XML
    const urlsXml = [...staticUrls, ...uniqueUrls]
      .map(
        (path) => `
        <url>
          <loc>${BASE_URL}${path}</loc>
          <changefreq>daily</changefreq>
          <priority>${path === "" ? "1.0" : "0.8"}</priority>
        </url>`
      )
      .join("");

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
  ${urlsXml}
</urlset>`;

    return new Response(sitemap, {
      headers: { "Content-Type": "application/xml" }
    });

  } catch (error) {
    return new Response("Failed to generate sitemap", { status: 500 });
  }
}
