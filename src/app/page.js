import Link from "next/link";
import Script from "next/script";
import BreadcrumbSchema from "../components/seo/BreadcrumbSchema";
import { Calendar, FileText, CreditCard, Key, BookOpen, GraduationCap, TrendingUp, Clock } from 'lucide-react';



export const metadata = {
  title: "Sarkari Result 27: Latest Govt Jobs, Results, Admit Card",
  description:
    "Sarkari Result 2026 – Get latest govt jobs, results, admit card, syllabus, answer key and exam notifications. Trusted portal for all Sarkari updates.",
  keywords: [
    "Sarkari Result 27",
    "Government Job",
    "Latest Sarkari Job",
    "sarkariresult27",
    "Ssc cgl",
    "Railway banking",
    "bscc",
    "upsc",
    "UG PG admission",
  ],
  alternates: {
    canonical: "https://www.sarkariresult27.com",
  },
  openGraph: {
    title: "Sarkari Result 2026: Govt Jobs, Results, Admit Card",
    description:
      "Latest Sarkari Result 2026 updates for govt jobs, exam results, admit card, syllabus and answer key.",
    url: "https://sarkariresult27.com",
    type: "website",
  }

};

async function getHomeData() {
  const res = await fetch('https://gist.githubusercontent.com/shahidafridi-collab/13807508220c46402eb6dcc6629e1b86/raw/homePage', { cache: "no-cache" });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export default async function Home() {

  const { categories, latestPosts } = await getHomeData();

  const IconMap = {
    FileText: FileText,
    TrendingUp: TrendingUp,
    CreditCard: CreditCard,
    Key: Key,
    BookOpen: BookOpen,
    GraduationCap: GraduationCap,
  };
  const BORDER_COLORS = {
    blue: "border-blue-500",
    green: "border-green-500",
    red: "border-red-500",
    yellow: "border-yellow-500",
    purple: "border-purple-500",
    orange: "border-orange-500",
  };


  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.sarkariresult27.com" }
        ]}
      />
      <Script
        id="website-schema"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {`
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Sarkari Result 27",
            "url": "https://www.sarkariresult27.com",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://www.sarkariresult27.com/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          }
          `}
      </Script>

      <Script
        id="organization-schema"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {`
        {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Sarkari Result 27",
          "url": "https://www.sarkariresult27.com",
          "logo": "https://www.sarkariresult27.com/sarkariresult.jpg",
          "sameAs": [
            "https://www.facebook.com/",
            "https://www.twitter.com/",
            "https://www.instagram.com/"
          ]
        }
        `}
      </Script>




      <div className="min-h-screen bg-gray-50">

        {/* Marquee Section */}
        <div className="  py-2 overflow-hidden text-amber-900">
          <div className="flex items-center">
            <div className="bg-[#FFE5B4] text-blue-950 px-3 py-1 font-bold text-sm mr-4 flex-shrink-0">
              LATEST
            </div>
            <div className="marquee-container flex-1">
              <div className="marquee-content animate-marquee whitespace-nowrap">
                {categories.flatMap(post =>
                  post.items
                    .filter(item => item.latest)
                    .map((item) => (
                      <Link
                        key={item.link}
                        href={item.link}
                        className="inline-block mr-12 text-sm font-medium hover:text-blue-950"
                      >
                        🔥 {item.title}
                      </Link>
                    ))
                )}

              </div>
            </div>
          </div>
        </div>


        {/* Trending componets */}
        <div className="w-full mx-auto max-w-7xl p-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">

            {categories.flatMap(post =>
              post.items
                .filter(item => item.trend === 'true')
                .map(i => (
                  <Link key={i.link} href={i.link}>
                    <div
                      className="
                h-20 sm:h-28
                flex flex-col justify-center items-center
                text-center font-semibold
                px-3
                rounded-lg shadow-md
                transition hover:opacity-90
                cursor-pointer
                 text-black bg-[#FFE5B4]
              "
                    >
                      <p className="text-sm sm:text-base leading-tight">
                        {i.title}
                      </p>

                      {i.subtitle && (
                        <p className="text-xs mt-1 opacity-90">
                          {i.subtitle}
                        </p>
                      )}
                    </div>
                  </Link>
                ))
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-3 py-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
            {categories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <div
                  key={index}
                  className={`
              bg-white rounded-xl border-2
              ${BORDER_COLORS[category.borderColor]}
              shadow-sm hover:shadow-md transition
            `}
                >
                  {/* Header */}
                  <div className="flex items-center gap-2 px-4 py-3 border-b">
                    {/* <IconComponent/> */}
                    <h2 className="text-lg font-semibold text-black">
                      {category.title}
                    </h2>
                  </div>

                  {/* List */}
                  <div className="divide-y">
                    {category.items.map((item, index) => (
                      <Link
                        key={index}
                        href={item.link}
                        className="flex justify-between items-center px-3 py-2 sm:py-3 hover:bg-gray-50"
                      >
                        <div className="flex items-center gap-2">
                          <h2 className="text-sm font-medium text-gray-800">
                            {item.title}
                          </h2>
                        </div>

                        <span className="text-xs text-gray-500">
                          {item.date}
                        </span>
                      </Link>
                    ))}
                  </div>
                  <div className="flex justify-center mt-4">
                    <Link
                      href={category.link}
                      className="
                      inline-flex items-center gap-1
                      text-sm font-semibold
                      text-blue-600
                      hover:text-blue-800
                      hover:underline
                      transition
                    "
                    >
                      View More
                      <span aria-hidden>→</span>
                    </Link>
                  </div>

                </div>
              )
            })}
          </div>
        </div>



        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 my-8">
          {/* Page Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
            Sarkari Results 10+2 Latest Jobs 2026
          </h1>

          {/* Introductory Paragraph */}
          <p className="text-gray-700 text-lg leading-relaxed mb-6 text-center">
            Stay updated with the latest Sarkari Jobs, Test Results, Online and Offline Forms,
            Admit Cards, Syllabus, Admissions, Answer Keys, Scholarships, Notifications,
            <strong className="text-blue-600"> SarkariResult27</strong> and more. For real-time updates on Government Exams,
            Sarkari Results, India Board Results (including UP Board and Bihar Board 10th and 12th Results),
            and the newest job openings, visit <strong className="text-blue-600">sarkariresult27.com</strong> regularly.
            Never miss out on important notifications, exam dates, and career opportunities with Sarkari Result.
          </p>

          <div className="space-y-8">
            {/* Sarkari Results 2026 Section */}
            <section className="bg-blue-50 rounded-xl p-5">
              <h2 className="text-2xl font-bold text-blue-900 mb-4 flex items-center">
                <span className="bg-blue-900 text-white p-2 rounded mr-3">📢</span>
                Sarkari Results 2026 - Latest Government Job Updates
              </h2>
              <p className="text-gray-700 mb-4">
                <strong className="text-blue-700">SarkariResult27</strong> is a popular website in India that provides information on
                government job exams, Sarkari Result 2026, and related updates. It is a well-known platform
                used by many job seekers to find details about government job openings, admit cards, exam dates,
                and results on <strong>sarkariresult27.com</strong>.
              </p>
            </section>

            {/* Sarkari Jobs Section */}
            <section className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-5">
              <h2 className="text-2xl font-bold text-green-900 mb-4 flex items-center">
                <span className="bg-green-900 text-white p-2 rounded mr-3">💼</span>
                Latest Sarkari Jobs on SarkariResult27 2026
              </h2>
              <p className="text-gray-700 mb-4">
                All candidates searching for Sarkari Jobs can find almost all State & Central Government Jobs
                on <strong>sarkariresult27.com</strong>. This is a single Sarkari Job portal for all candidates
                preparing for Sarkari Job Competition. Latest Sarkari Jobs updates:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {[
                  "ITBP, CRPF, SSB, BSF Vacancy: Constable (Tradesman), SI, ASI, Head Constable",
                  "SBI Career: Bank PO, Clerk, Apprentice Engagement & Special Officer (SO)",
                  "Indian Railway (RRB/RRC) Recruitment - Group D, Apprentice, NTPC, ALP & Technician",
                  "SSC All Exams: MTS, CHSL, Constable (GD), CGL, Selection Post, Stenographer",
                  "IBPS All Exams: Clerk, PO, Special Officer, CRP RRB recruitment",
                  "Indian Navy Recruitment: Agniveer MR, SSR, 10+2 (B.Tech) cadet entry",
                  "RPF & RPSF Recruitment: Constable and Sub Inspector (SI)",
                  "Indian Air Force Recruitment: Agniveervayu, AFCAT Exam",
                  "Indian Coast Guard Recruitment: Navik GD/DB, Assistant Commandant",
                  "Indian Army Recruitment: Agniveer Rally, TES, JAG, BSc (Nursing)"
                ].map((job, index) => (
                  <div key={index} className="flex items-start bg-white p-3 rounded-lg shadow-sm">
                    <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded mr-3 mt-1">
                      {index + 1}
                    </span>
                    <span className="text-gray-800 text-sm">{job}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Regional Sections */}

            {/* FAQ Section */}
            <section className="bg-gray-50 rounded-xl p-6 mt-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Frequently Asked Questions - SarkariResult27
              </h3>

              <div className="space-y-6">
                {[
                  {
                    q: "What is Sarkari Result 2026?",
                    a: "Sarkari Result is a free job alert website, where you can find the latest Government Jobs notifications, Sarkari Result, Admit Card, Answer Key, Cut off Marks, Exam Date, Sarkari Yojana and other updates on sarkariresult27.com."
                  },
                  {
                    q: "Why is sarkariresult27.com better than others?",
                    a: "sarkariresult27.com brings information of all Government Jobs and Sarkari Result before other job portals. It also provides Admissions related information and real-time updates for Sarkari Exams 2026."
                  },
                  {
                    q: "How to Check Sarkari Result for Government Jobs 2026?",
                    a: "Visit sarkariresult27.com official page. Here, you will get all the latest Government Jobs Notification as well as Sarkari Result, Rojgar Result, Bharat Result, Rozgar Samachar Link of the particular job."
                  },
                  {
                    q: "Does the Sarkari Result Information update on a daily basis?",
                    a: "Yes, SarkariResult27 is updated daily with all the new updates coming on government jobs and results. Subscribe to our notifications for instant updates."
                  }
                ].map((faq, index) => (
                  <div key={index} className="bg-white p-5 rounded-lg shadow-sm">
                    <h4 className="font-bold text-lg text-blue-700 mb-2 flex items-center">
                      <span className="bg-blue-700 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 text-sm">
                        Q
                      </span>
                      {faq.q}
                    </h4>
                    <p className="text-gray-700 ml-9">
                      <strong className="text-green-700">Ans.</strong> {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Disclaimer */}
            <div className="bg-red-100 border-l-4 border-red-500 p-4 rounded">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">
                    <strong>Important Notice:</strong> This website (sarkariresult27.com) is not affiliated with any official government sites.
                    The information provided is for general informational purposes only. Always verify details from respective official websites.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Section */}

          </div>
        </div>

      </div>

      <Script
        id="faq-schema"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {`
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "What is Sarkari Result 2026?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Sarkari Result is a free job alert website, where you can find the latest Government Jobs notifications, Sarkari Result, Admit Card, Answer Key, Cut off Marks, Exam Date, Sarkari Yojana and other updates on sarkariresult27.com."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Why is sarkariresult27.com better than others?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "sarkariresult27.com brings information of all Government Jobs and Sarkari Result before other job portals. It also provides Admissions related information and real-time updates for Sarkari Exams 2026."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How to Check Sarkari Result for Government Jobs 2026?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Visit sarkariresult27.com official page. Here, you will get all the latest Government Jobs Notification as well as Sarkari Result, Rojgar Result, Bharat Result, Rozgar Samachar Link of the particular job."
                  }
                },
                  {
                  "@type": "Question",
                  "name": "Does the Sarkari Result Information update on a daily basis?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, SarkariResult27 is updated daily with all the new updates coming on government jobs and results. Subscribe to our notifications for instant updates."
                  }
                }
              ]
            }
        `}
      </Script>

    </>

  );
}
