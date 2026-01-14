export async function generateMetadata({ params }) {
  const { id } = await params;
  const res = await fetch(
    `https://gist.githubusercontent.com/shahidafridi-collab/d6610e1b9fb8e2617c2999d1edc0851c/raw/gistfile1.txt`,{
    next: { revalidate: 3600 },
});

  const admitCard = await res.json();
  const specificAdmitCard = admitCard.find(a => a.id === id);

  return {
    title: specificAdmitCard.title,
    description: specificAdmitCard.description,
    alternates: {
      canonical: `https://www.sarkariresult27.com/admit-cards/${id}`,
    },
    openGraph: {
      title: specificAdmitCard.title,
      description: specificAdmitCard.description,
      url: `https://www.sarkariresult27.com/admit-cards/${id}`,
    },
  };
}
export default function AdmitCardSec({ children }) {
  return <section>{children}</section>
}
