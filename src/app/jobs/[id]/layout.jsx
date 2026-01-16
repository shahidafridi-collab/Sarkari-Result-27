export async function generateMetadata({ params }) {
  const { id } = await params;
  const res = await fetch('https://gist.githubusercontent.com/shahidafridi-collab/3d4fa23aadd9be02be79a58e46009126/raw/gistfile1.txt', {next:{revalidate:3600}});


  const jobs = await res.json();
  const specificjobs = jobs.find(a => a.id === id);

  return {
    title: specificjobs.title,
    description: specificjobs.description,
    alternates: {
      canonical: `https://www.sarkariresult27.com/jobs/${id}`,
    },
    openGraph: {
      title: specificjobs.title,
      description: specificjobs.description,
      url: `https://www.sarkariresult27.com/jobs/${id}`,
    },
  };
}
export default function jobsSec({ children }) {
  return <section>{children}</section>
}
