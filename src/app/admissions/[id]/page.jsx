
import Link from 'next/link';
import { ArrowLeft, Calendar, Users, FileCheck, Bell } from 'lucide-react';
import { notFound } from 'next/navigation';
import BreadcrumbSchema from '../../../components/seo/BreadcrumbSchema';
import HowToSchema from '../../../components/seo/HowToSchema';


async function getAdmissionData(id) {

  const res = await fetch('https://gist.githubusercontent.com/shahidafridi-collab/2203569eeb7046f824f7eddb7613d065/raw/gistfile1.txt', { cache: "force-cache" });

  if (!res.ok) {

    throw new Error('Failed to fetch data');
  }

  const data = await res.json();
  const specificAdmission = data.find(a => a.id === id);

  if (!specificAdmission) {
    notFound();
  }

  return specificAdmission;
}

export default async function AdmissionDetail({ params }) {
  // const params = useParams();
  // const { id } = params; 
  // const [admission, setAdmission] = useState(null);
  // const [isLoading, setisLoading] = useState(false);
  // useEffect(() => {
  //   const GIST_URL = 'https://gist.githubusercontent.com/shahidafridi-collab/2203569eeb7046f824f7eddb7613d065/raw/gistfile1.txt';

  //   fetch(GIST_URL)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       // 3. Find the specific item *after* the data has been fetched.
  //       const specificAdmission = data.find(a => a.id === id);
  //       setAdmission(specificAdmission);
  //       setisLoading(true);
  //     });
  // // Add `id` as a dependency to refetch if it changes.
  // }, [id]);

  const { id } = await params;
  const admission = await getAdmissionData(id);
  // console.log(admission);

  // THIS IS THE DEBUGGING STEP
  console.log('--- Server Log ---');
  console.log('ID from URL params:', id);
  // console.log('Found Admission Data:', admission);
  // console.log('------------------');


  if (!admission) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Admission not found</h1>
          <Link href="/admissions" className="text-blue-600 hover:text-blue-800">
            ← Back to Admissions wait
          </Link>
          <h3>data is loadng...</h3>
        </div>
      </div>
    );
  }

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.sarkariresult27.com" },
          { name: "Admission", url: `https://www.sarkariresult27.com/admissions` },
          { name: `${admission.title}`, url: `https://www.sarkariresult27.com/admissions/${id}` },
        ]}
      />
      <HowToSchema
        title="How to Complete Counselling Process 2026"
        process={process}
      />

      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Link
              href="/admissions"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Admissions
            </Link>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">{admission.title}</h1>
                  <p className="text-gray-600">{admission.organization}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">Posted on</div>
                  <div className="font-semibold text-gray-900">{admission.postedDate}</div>
                </div>
              </div>

              {/* Counselling Dates */}
              {admission.counsellingDates && (
                <div className="bg-teal-50 border border-teal-200 rounded-lg p-6 mb-8">
                  <div className="flex items-center mb-4">
                    <Calendar className="h-6 w-6 text-teal-600 mr-3" />
                    <h3 className="text-xl font-semibold text-teal-800">Counselling Schedule</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {admission.counsellingDates.start && (
                      <div className="text-center">
                        <div className="text-lg font-bold text-teal-800">{admission.counsellingDates.start}</div>
                        <div className="text-sm text-teal-600">Start Date</div>
                      </div>
                    )}
                    {admission.counsellingDates.end && (
                      <div className="text-center">
                        <div className="text-lg font-bold text-teal-800">{admission.counsellingDates.end}</div>
                        <div className="text-sm text-teal-600">End Date</div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Counselling Process */}
                {admission.process && admission.process.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Counselling Process</h3>
                    <div className="space-y-3">
                      {admission.process.map((step, index) => (
                        <div key={index} className="flex items-start">
                          <div className="bg-teal-100 text-teal-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">
                            {index + 1}
                          </div>
                          <p className="text-gray-700">{step}</p>
                        </div>
                      ))}
                    </div>

                    <button className="w-full mt-6 bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors duration-200 flex items-center justify-center">
                      <Users className="h-5 w-5 mr-2" />
                      Start Registration
                    </button>
                  </div>
                )}

                {/* Documents Required */}
                {admission.documentsRequired && admission.documentsRequired.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Documents Required</h3>
                    <div className="space-y-3">
                      {admission.documentsRequired.map((doc, index) => (
                        <div key={index} className="flex items-center p-3 bg-gray-50 border border-gray-200 rounded-lg">
                          <FileCheck className="h-5 w-5 text-gray-600 mr-3" />
                          <span className="text-gray-700">{doc}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-800 mb-2">📋 Document Checklist</h4>
                      <p className="text-blue-700 text-sm">Ensure all documents are original and carry photocopies. Any missing document may lead to disqualification.</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Important Updates */}
              {admission.updates && admission.updates.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Latest Updates</h3>
                  <div className="space-y-3">
                    {admission.updates.map((update, index) => (
                      <div key={index} className="flex items-start p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <Bell className="h-5 w-5 text-yellow-600 mr-3 mt-0.5" />
                        <div>
                          <p className="text-gray-700">{update}</p>
                          <span className="text-xs text-gray-500">Updated recently</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}