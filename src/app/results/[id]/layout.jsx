export async function generateMetadata({ params }) {
 const { id } = await params;
    const res = await fetch('https://gist.githubusercontent.com/shahidafridi-collab/9fb5f95e93ed95eba1959d1a18ac6bf7/raw/combine_result');

  const result = await res.json();
  const specificresult = result.find(a => a.id === id);

  return {
    title: specificresult.title,
    description: specificresult.description,
    alternates: {
      canonical: `https://www.sarkariresult27.com/results/${id}`,
    },
    openGraph: {
      title: specificresult.title,
      description: specificresult.description,
      url: `https://www.sarkariresult27.com/results/${id}`,
    },
  };
}
export default function ResultSec({ children }) {
  return <section>{children}</section>
}
