import Link from "next/link";
import { BookOpen, Eye } from "lucide-react";

async function getSyllabusData() {
  const res = await fetch(
    "https://gist.githubusercontent.com/shahidafridi-collab/c687d6e00dcc0a79bd689a520de733c6/raw/syllabus",
    { cache: "no-store" } // ✅ FIX 1
  );

  if (!res.ok) {
    throw new Error("Failed to load syllabus data");
  }

  const data = await res.json();

  // ✅ FIX 2: ensure array
  return Array.isArray(data) ? data : data.data || [];
}

export default async function SyllabusPage() {
  const syllabusListings = await getSyllabusData();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <BookOpen className="h-7 w-7 text-indigo-600" />
          <h1 className="text-2xl font-bold text-gray-800">
            All Latest Syllabus
          </h1>
        </div>

        {/* Table Wrapper */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">

          {/* Table Header */}
          <div className="hidden sm:block bg-gray-50 border-b px-6 py-3">
            <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-700">
              <div className="col-span-6">Post Title</div>
              <div className="col-span-3">Post Date</div>
              <div className="col-span-3">Actions</div>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y">
            {syllabusListings.map((syllabus) => (
              <div
                key={syllabus.id}
                className="px-6 py-4 hover:bg-gray-50 transition"
              >
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">

                  {/* Title */}
                  <div className="sm:col-span-6">
                    <Link
                      href={`/syllabus/${syllabus.id}`}
                      className="text-blue-600 hover:underline font-medium"
                    >
                      {syllabus.title}
                    </Link>
                  </div>

                  {/* Date */}
                  <div className="sm:col-span-3 text-sm text-gray-600">
                    {syllabus.date ?? "Latest"}
                  </div>

                  {/* Action */}
                  <div className="sm:col-span-3">
                    <Link
                      href={`/syllabus/${syllabus.id}`}
                      className="
                        inline-flex items-center gap-1
                        text-sm font-semibold
                        text-blue-700
                        hover:text-blue-900
                        hover:underline
                      "
                    >
                      <Eye className="h-4 w-4" />
                      View
                    </Link>
                  </div>

                </div>
              </div>
            ))}

            {syllabusListings.length === 0 && (
              <p className="p-6 text-center text-gray-500">
                No syllabus available.
              </p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
