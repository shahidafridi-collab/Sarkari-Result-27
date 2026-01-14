export async function generateMetadata({ params }) {
  const { id } = await params;
  const res = await fetch(
    `https://gist.githubusercontent.com/shahidafridi-collab/2203569eeb7046f824f7eddb7613d065/raw/gistfile1.txt`);

  const admission = await res.json();
  const specificAdmission = admission.find(a => a.id === id);

  return {
    title: specificAdmission.title,
    description: specificAdmission.description,
    alternates: {
      canonical: `https://www.sarkariresult27.com/admissions/${id}`,
    },
    openGraph: {
      title: specificAdmission.specificAdmission,
      description: specificAdmission.description,
      url: `https://www.sarkariresult27.com/admissions/${id}`,
    },
  };
}
export default function AdmissionSec({ children }) {
  return <section>{children}</section>
}
