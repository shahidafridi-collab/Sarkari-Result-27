import Link from 'next/link';
import { Key, Eye } from 'lucide-react';
// import { answerKeyListings } from '../../data/answerkeyListings';

async function answerKey() {
  const res = await fetch('https://gist.githubusercontent.com/shahidafridi-collab/3d4fa23aadd9be02be79a58e46009126/raw/gistfile1.txt');

  if(!res.ok){
    throw new Error(error);
  }
  const answerKeys = await res.json();
  return answerKeys;
}

const AnswerKeysPage = async () => {
  const answerKeyListings = await answerKey();
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Key className="h-8 w-8 text-purple-600 mr-3" />
          <h1 className="text-2xl font-bold text-gray-800">All Latest Answer Keys</h1>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Table Header */}
          <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-6">
                <h3 className="text-sm font-medium text-gray-700">Post Title</h3>
              </div>
              <div className="col-span-3">
                <h3 className="text-sm font-medium text-gray-700">Post Date</h3>
              </div>
              <div className="col-span-3">
                <h3 className="text-sm font-medium text-gray-700">Actions</h3>
              </div>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-200">
            {answerKeyListings.map((answerKey) => (
              <div key={answerKey.id} className="px-6 py-4 hover:bg-gray-50 transition-colors duration-200">
                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-6">
                    <Link 
                      href={`/answer-keys/${answerKey.id}`}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      {answerKey.title}
                    </Link>
                    {(answerKey.id.includes('jee') || answerKey.id.includes('gate')) && (
                      <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        NEW
                      </span>
                    )}
                  </div>
                  <div className="col-span-3">
                    <span className="text-gray-600">{answerKey.releaseDate}</span>
                  </div>
                  <div className="col-span-3">
                    <Link
                      href={`/answer-keys/${answerKey.id}`}
                      className="inline-flex items-center px-3 py-1.5 bg-gray-800 text-white text-sm font-medium rounded hover:bg-gray-900 transition-colors duration-200"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnswerKeysPage;