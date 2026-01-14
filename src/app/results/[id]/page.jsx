

async function getResultData(id) {
  const res = await fetch('https://gist.githubusercontent.com/shahidafridi-collab/9fb5f95e93ed95eba1959d1a18ac6bf7/raw/combine_result', { next: { revalidate: 3600, } });
  if (!res.ok) {
    throw new Error('Failed to Load');
  }
  const resultListings = await res.json();
  const specificResult = resultListings.find(r => r.id === id);
  return specificResult;
}




// Converted to JSX (no TypeScript types, pure JSX syntax)
import React from 'react';
import BreadcrumbSchema from '../../../components/seo/BreadcrumbSchema';
import HowToSchema from '../../../components/seo/HowToSchema';
import Link from 'next/link';
import {
  ArrowLeft,
  Calendar,
  Users,
  Briefcase,
  ExternalLink,
  AlertTriangle,
  CheckCircle,
  Download,
  FileText,
} from 'lucide-react';

/**
 * ResultDetail_Universal.jsx
 * Defensive, data-driven Result Detail page that adapts to 'job' | 'board' | 'admission' | 'mixed'.
 * This rewrite fixes runtime crashes when parts of `result` are null/undefined by using
 * defensive access patterns and safe helpers.
 *
 * Usage (Next.js app router server component):
 * export default async function ResultDetail({ params }) {
 *   const { id } = params;
 *   const result = await getResultData(id); // may return null or partial data
 *   return <UniversalResultPage result={result} />;
 * }
 */

// Safe helpers to avoid errors when data is null/undefined
const fmtDate = (d) => (d ? new Date(d).toLocaleDateString() : 'N/A');
const fmtNum = (n) => (typeof n === 'number' ? n.toLocaleString() : (n ?? 'N/A'));
const safeArray = (v) => (Array.isArray(v) ? v : []);
const safeObjectEntries = (v) => (v && typeof v === 'object' && !Array.isArray(v) ? Object.entries(v) : []);

export default async function UniversalResultPage({ params }) {
  const id = await params.id;
  const result = await getResultData(id);



  // Defensive: if result is falsy (null/undefined) render friendly fallback
  if (!result) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Result Not Found</h1>
          <p className="text-gray-600 mb-6">No data available for this result.</p>
          <Link href="/results" className="inline-flex items-center bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Results
          </Link>
        </div>
      </div>
    );
  }

  // normalize some top-level fields to avoid repeated checks
  const type = result.type || 'mixed';

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.sarkariresult27.com" },
          { name: "Results", url: `https://www.sarkariresult27.com/results` },
          { name: `${result.title}`, url: `https://www.sarkariresult27.com/results/${id}` },
        ]}
      />
      <HowToSchema
        title="How to Check / Steps"
        steps={result.checkSteps}
      />
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 font-sans">
        <div className="max-w-6xl mx-auto">
          <div className="mb-4">
            <Link href="/results" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Results
            </Link>
          </div>

          <main className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            <HeaderSection result={result} type={type} />
            <hr />
            <DescriptionSection result={result} />
            <hr />
            <div className="p-6 md:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left column: downloads / quick facts */}
                <aside className="space-y-6">
                  <DownloadSection files={safeArray(result.downloadLinks)} />
                  <QuickFacts result={result} />
                  <ContactSection contact={result.contact || null} />
                </aside>

                {/* Middle: main content (spans 2 cols on lg) */}
                <section className="lg:col-span-2 space-y-6">
                  {/* Adaptive rendering by type */}
                  {(type === 'job' || type === 'mixed') && (
                    <JobSections result={result} />
                  )}

                  {(type === 'board' || type === 'mixed') && (
                    <BoardSections result={result} />
                  )}

                  {(type === 'admission' || type === 'mixed') && (
                    <AdmissionSections result={result} />
                  )}

                  <CommonSections result={result} />
                </section>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>

  );
}

/* ------------------------- Header ------------------------- */
function HeaderSection({ result, type }) {
  // Guard fields used in header
  const org = result.organization ?? 'Unknown Organization';
  const title = result.title ?? 'Untitled Result';
  const status = result.status ?? 'Declared';

  return (
    <header className="p-6 md:p-8">
      <p className="text-indigo-600 font-semibold mb-1">{org}</p>
      <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">{title}</h1>
      <p className="text-gray-500 mt-2">Status: <span className="font-semibold text-green-600 ml-2">{status}</span></p>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <SmallStat icon={<Calendar className="h-5 w-5 text-indigo-500" />} label="Exam Date" value={fmtDate(result.examDate)} />
        <SmallStat icon={<Briefcase className="h-5 w-5 text-indigo-500" />} label={type === 'board' ? 'Result Session' : 'Result Date'} value={fmtDate(result.declaredDate)} />
        <SmallStat icon={<Users className="h-5 w-5 text-indigo-500" />} label={type === 'board' ? "Student Appeared" : "Vacancies / Seats"} value={fmtNum(result.vacancies ?? result.seats ?? null)} />
      </div>
    </header>
  );
}

function SmallStat({ icon, label, value }) {
  return (
    <div className="bg-gray-50 p-3 rounded-md flex items-center space-x-3 border">
      <div className="p-2 bg-white rounded-full">{icon}</div>
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="font-semibold text-gray-800">{value}</p>
      </div>
    </div>
  );
}

/* ------------------------- Left column sections ------------------------- */
function DownloadSection({ files }) {
  return (
    <CardSection title="Download / Links">
      <div className="space-y-2">
        {files.length > 0 ? (
          files.map((f, i) => (
            <a key={i} href={f?.url ?? '#'} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition">
              <h1 className="truncate">{f?.label ?? `File ${i + 1}`}</h1>
              <ExternalLink className="h-4 w-4 ml-2" />
            </a>
          ))
        ) : (
          <p className="text-gray-600">No downloadable resources provided.</p>
        )}
      </div>

      <div className="mt-3 bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded-r-md">
        <div className="flex items-start">
          <AlertTriangle className="h-5 w-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-xs text-yellow-700">If downloads fail try mirrors or check official portal during off-peak hours.</p>
          </div>
        </div>
      </div>
    </CardSection>
  );
}

function QuickFacts({ result }) {
  // Avoid reading undefined properties directly
  const postName = result?.postName ?? null;
  const organization = result?.organization ?? null;
  const seats = result?.seats;
  const vacancies = result?.vacancies;
  const selectionProcess = result?.selectionProcess ?? null;
  const applyStart = result?.applyStart ?? null;
  const applyEnd = result?.applyEnd ?? null;

  return (
    <CardSection title="Quick Facts">
      <ul className="text-sm text-gray-700 space-y-2">
        {postName && <li><strong>Post:</strong> {postName}</li>}
        {organization && <li><strong>Organization:</strong> {organization}</li>}
        {seats !== undefined && seats !== null && <li><strong>Seats:</strong> {fmtNum(seats)}</li>}
        {vacancies !== undefined && vacancies !== null && <li><strong>Vacancies:</strong> {fmtNum(vacancies)}</li>}
        {selectionProcess && <li><strong>Selection:</strong> {selectionProcess}</li>}
        {applyStart && applyEnd && <li className="text-xs text-gray-500">Application: {fmtDate(applyStart)} - {fmtDate(applyEnd)}</li>}
        {(!postName && !organization && seats === undefined && vacancies === undefined && !selectionProcess) && (
          <li className="text-gray-500">No quick facts available.</li>
        )}
      </ul>
    </CardSection>
  );
}

function ContactSection({ contact }) {
  if (!contact) {
    return (
      <CardSection title="Contact / Helpline">
        <p className="text-gray-600">No contact info provided.</p>
      </CardSection>
    );
  }

  return (
    <CardSection title="Contact / Helpline">
      <div className="text-sm text-gray-700">
        {contact.email && <div><strong>Email:</strong> {contact.email}</div>}
        {contact.phone && <div><strong>Phone:</strong> {contact.phone}</div>}
        {contact.website && <div className="text-xs text-gray-500">Website: {contact.website}</div>}
        {!contact.email && !contact.phone && !contact.website && <div className="text-gray-500">No contact fields provided.</div>}
      </div>
    </CardSection>
  );
}

function DescriptionSection({ result }) {
  // Guard content
  if (!result?.description && !result?.overview && !result?.notes) return null;

  return (
    <section className="px-6 md:px-8 py-6">
      <div className="bg-white border rounded-lg p-5">
        {/* <h2 className="text-lg font-bold text-gray-900 mb-3">
          Description
        </h2> */}

        {result?.description && (
          <div className="text-gray-700 leading-relaxed mb-3">
            <span className="font-semibold text-gray-900 mr-2">
              {result.organization}:
            </span>
            <span>
              {result.description}
            </span>
          </div>
        )}


        {result?.overview && (
          <p className="text-gray-700 leading-relaxed mb-3">
            {result.overview}
          </p>
        )}

        {result?.notes && (
          <p className="text-sm text-gray-600">
            {result.notes}
          </p>
        )}
      </div>
    </section>
  );
}


/* ------------------------- Job-specific sections ------------------------- */
function JobSections({ result }) {
  const cutoffs = safeArray(result.cutoffs);
  const meritList = safeArray(result.meritList);
  const toppers = safeArray(result.toppers);

  return (
    <>
      <CardSection title="Cutoffs & Category-wise Marks">
        {cutoffs.length > 0 ? (
          <div className="overflow-auto">
            <table className="min-w-full text-sm divide-y divide-gray-200">
              <thead className="text-left bg-gray-50">
                <tr className='text-gray-600'>
                  <th className="px-3 py-2">Category</th>
                  <th className="px-3 py-2">Cutoff</th>
                  <th className="px-3 py-2">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {cutoffs.map((c, i) => (
                  <tr key={i} className='text-gray-600'>
                    <td className="px-3 py-2 font-medium">{c?.category ?? '—'}</td>
                    <td className="px-3 py-2">{c?.marks ?? c?.score ?? 'N/A'}</td>
                    <td className="px-3 py-2 text-gray-600">{c?.notes ?? '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-600">Cutoff information not available.</p>
        )}
      </CardSection>

      <CardSection title="Merit List / Selected Candidates">
        {meritList.length > 0 ? (
          <div className="overflow-auto">
            <table className="min-w-full text-sm divide-y divide-gray-200">
              <thead className="text-left bg-gray-50">
                <tr>
                  <th className="px-3 py-2">Rank</th>
                  <th className="px-3 py-2">Reg No.</th>
                  <th className="px-3 py-2">Name</th>
                  <th className="px-3 py-2">Category</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {meritList.slice(0, 50).map((m, i) => (
                  <tr key={i}>
                    <td className="px-3 py-2">{m?.rank ?? '—'}</td>
                    <td className="px-3 py-2">{m?.regNo ?? '—'}</td>
                    <td className="px-3 py-2 font-medium">{m?.name ?? '—'}</td>
                    <td className="px-3 py-2">{m?.category ?? '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {meritList.length > 50 && <div className="mt-2 text-xs text-gray-500">Showing top 50. Use official PDF to view the full list.</div>}
          </div>
        ) : (
          <p className="text-gray-600">Merit list not published.</p>
        )}
      </CardSection>
      <CardSection title="Selection Process">
        {result.selectionPRocess ? (
          <div className="space-y-3">
            {result.selectionPRocess.map((s, i) => (
              <div key={i} className="flex items-start">
                <div className="flex-shrink-0 bg-indigo-100 text-indigo-800 rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold mr-4 mt-0.5">{i + 1}</div>
                <p className="text-gray-700 leading-relaxed">{s}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No steps provided.</p>
        )}
      </CardSection>

      <CardSection title="Counseling / Document Verification">
        {result?.counseling ? (
          <div className="text-sm text-gray-700 space-y-2">
            <div><strong>Mode:</strong> {result.counseling?.mode ?? '—'}</div>
            <div><strong>Dates:</strong> {fmtDate(result.counseling?.start)} - {fmtDate(result.counseling?.end)}</div>
            <div><strong>Venue:</strong> {result.counseling?.venue ?? 'TBD'}</div>
          </div>
        ) : (
          <p className="text-gray-600">No counseling details yet.</p>
        )}
      </CardSection>

    </>
  );
}



/* ------------------------- Board-specific sections ------------------------- */
function BoardSections({ result }) {
  const marksheetEntries = safeObjectEntries(result?.marksheet);
  const toppers = safeArray(result?.toppers);

  return (
    <>
      <CardSection title="Toppers — District / State">
        {toppers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {toppers.map((t, i) => (
              <div key={i} className="p-4 rounded-md border bg-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-800">{t?.name ?? '—'}</p>
                    <p className="text-xs text-gray-500">{t?.school ?? t?.district ?? ''}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-indigo-600 font-bold">{t?.percentage ?? t?.marks ?? '—'}</p>
                    <p className="text-xs text-gray-500">Rank: {t?.rank ?? '—'}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No topper information available.</p>
        )}
      </CardSection>
    </>
  );
}

/* ------------------------- Admission-specific sections ------------------------- */
function AdmissionSections({ result }) {
  const scorecard = result?.scorecard ?? null;
  const sectionScores = safeObjectEntries(result?.sectionScores);
  const cutoffs = safeArray(result?.cutoffs);

  return (
    <>
      {cutoffs && (
        <CardSection title="Cutoff / Counseling Info">
          {cutoffs.length > 0 ? (
            <div className="overflow-auto">
              <table className="min-w-full text-sm divide-y divide-gray-200">
                <thead className="text-left bg-gray-50">
                  <tr className='text-gray-600'>
                    <th className="px-3 py-2">Category</th>
                    <th className="px-3 py-2">Cutoff / Closing Rank</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {cutoffs.map((c, i) => (
                    <tr key={i} className=' text-gray-600'>
                      <td className="px-3 py-2">{c?.category ?? '—'}</td>
                      <td className="px-3 py-2">{c?.marks ?? c?.closingRank ?? 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-600">No cutoff data available.</p>
          )}
        </CardSection>
      )}

      {result.toppers && (
        <section className="bg-white rounded-md shadow-sm border p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Toppers</h3>
          <div>
            {result.toppers?.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {result.toppers.map((t, i) => (
                  <div key={i} className="p-4 rounded-md border bg-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-800">{t?.name ?? '—'}</p>
                        <p className="text-xs text-gray-500">{t?.school ?? t?.district ?? ''}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-indigo-600 font-bold">{t?.percentage ?? t?.score ?? '—'}</p>
                        <p className="text-xs text-gray-500">Rank: {t?.rank ?? '—'}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No topper information available.</p>
            )}
          </div>
        </section>
      )}
    </>
  );
}

/* ------------------------- Common sections for all types ------------------------- */
function CommonSections({ result }) {
  const steps = safeArray(result?.checkSteps);
  const next = safeArray(result?.nextSteps);

  return (
    <>
      
      <CardSection title="How to Check / Steps">
        {steps.length > 0 ? (
          <div className="space-y-3">
            {steps.map((s, i) => (
              <div key={i} className="flex items-start">
                <div className="flex-shrink-0 bg-indigo-100 text-indigo-800 rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold mr-4 mt-0.5">{i + 1}</div>
                <p className="text-gray-700 leading-relaxed">{s}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No steps provided.</p>
        )}
      </CardSection>

      <CardSection title="What's Next / Important Notices">
        {next.length > 0 ? (
          <ul className="space-y-2 text-gray-700">
            {next.map((n, i) => <li key={i}>{n}</li>)}
          </ul>
        ) : (
          <p className="text-gray-600">No further instructions.</p>
        )}
      </CardSection>

    </>
  );
}

/* ------------------------- Small helpers & CardSection ------------------------- */
function CardSection({ title, children }) {
  return (
    <section className="bg-white rounded-md shadow-sm border p-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">{title}</h3>
      <div>{children}</div>
    </section>
  );
}

/* ---------------------- Sample JSON schema (for your API) ----------------------

sampleSchema = {
  id: 'nr01',
  type: 'job' | 'board' | 'admission' | 'mixed',
  organization: 'Board / Organization Name',
  title: 'Result Title',
  status: 'Declared',
  examDate: '2024-12-01',
  declaredDate: '2025-03-02',
  vacancies: 1500, // for job
  seats: 1200, // for admission
  postName: 'Technical Assistant',
  selectionProcess: 'Written -> DV',
  applyStart: '2024-09-01',
  applyEnd: '2024-09-30',
  contact: { email: '', phone: '', website: '' },
  downloadLinks: [ { label: 'Result PDF', url: '...' } ],
  cutoffs: [ { category: 'UR', marks: 78.5, notes: 'General' } ],
  toppers: [ { name: 'A. Kumar', score: 98.7, rank: 1 } ],
  meritList: [ { rank: 1, regNo: '', name: '', category: '' } ],
  marksheet: { 'Maths': { obtained: 95, max: 100 } }, // board
  totalMarks: 480,
  percentage: 96,
  passStatus: 'Pass',
  scorecard: { name: '', regNo: '', air: 123, percentile: 99.8 }, // admission
  sectionScores: { 'Physics': 45, 'Chemistry': 48 },
  checkSteps: ['Open the PDF', 'Search your roll no'],
  nextSteps: ['Download scorecard', 'Attend DV'],
  counseling: { mode: 'Online', start: '', end: '', venue: '' }
}

---------------------------------------------------------------------------------*/

