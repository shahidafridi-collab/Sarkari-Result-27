import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";
import BreadcrumbSchema from "../../../components/seo/BreadcrumbSchema";


async function getData(id) {
  const res = await fetch(`https://gist.githubusercontent.com/shahidafridi-collab/c687d6e00dcc0a79bd689a520de733c6/raw/syllabus`);
  if (!res.ok) {
    throw new Error('Failed to Load');
  }
  const resultListings = await res.json();
  const specificResult = resultListings.find(r => r.id === id);
  return specificResult;
}


export default async function SyllabusDetail({ params }) {
  const { id } = await params;
  const syllabus = await getData(id);

  if (!syllabus) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <h1 className="text-xl font-semibold mb-3">
            Syllabus not found
          </h1>
          <Link href="/syllabus" className="text-blue-600">
            Back to Syllabus
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.sarkariresult27.com" },
          { name: "Admission", url: `https://www.sarkariresult27.com/syllabus` },
          { name: `${syllabus.title}`, url: `https://www.sarkariresult27.com/syllabus/${id}` }
        ]}
      />
      <div className="min-h-screen bg-slate-50 py-8">
        <div className="max-w-5xl mx-auto px-4">
          {/* Back */}
          <Link
            href="/syllabus"
            className="inline-flex items-center text-blue-600 mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Syllabus
          </Link>

          {/* Header */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <div className="flex justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {syllabus.title}
                </h1>
                <p className="text-gray-600 mt-1">
                  {syllabus.exam}
                </p>
              </div>
              {syllabus.link &&
                <a
                  href={syllabus.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Download syllabus PDF"
                  className="inline-flex items-center bg-indigo-600 text-white px-4 py-2 rounded-lg"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </a>
              }

            </div>
          </div>

          {/* STAGES */}
          <div className="space-y-10">
            {syllabus.stages.map((stage, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  {stage.stage}
                </h2>

                {/* Exam Pattern */}
                {stage.pattern && (
                  <div className="bg-indigo-50 rounded-lg p-4 mb-6 text-sm text-gray-700">
                    <div className="grid md:grid-cols-4 gap-4">
                      {stage.pattern.mode && (
                        <div><strong>Mode:</strong> {stage.pattern.mode}</div>
                      )}
                      {stage.pattern.duration && (
                        <div><strong>Duration:</strong> {stage.pattern.duration}</div>
                      )}
                      {stage.pattern.totalQuestions && (
                        <div><strong>Questions:</strong> {stage.pattern.totalQuestions}</div>
                      )}
                      {stage.pattern.totalMarks && (
                        <div><strong>Total Marks:</strong> {stage.pattern.totalMarks}</div>
                      )}
                    </div>

                    <div className="mt-3">
                      <strong>Negative Marking:</strong>{" "}
                      {stage.pattern.negativeMarking?.applicable
                        ? stage.pattern.negativeMarking.deduction
                        : "Not Applicable"}
                    </div>
                  </div>
                )}

                {/* Sections */}
                <div className="grid md:grid-cols-2 gap-6">
                  {stage.sections.map((section, idx) => (
                    <div
                      key={idx}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex justify-between mb-2">
                        <h3 className="font-semibold text-gray-800">
                          {section.name}
                        </h3>
                        {section.marks && (
                          <span className="text-sm font-medium text-indigo-600">
                            {section.marks} Marks
                          </span>
                        )}
                      </div>

                      <div className="text-sm text-gray-600 mb-3 space-y-1">
                        {section.questions && (
                          <div>Questions: {section.questions}</div>
                        )}
                        {section.duration && (
                          <div>Duration: {section.duration}</div>
                        )}
                      </div>

                      <ul className="text-sm text-gray-700 space-y-1">
                        {section.topics.map((topic, tIdx) => (
                          <li key={tIdx}>• {topic}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>

  );
}
