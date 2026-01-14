export async function generateMetadata({ params }) {
  const { id } = await params;
  const res = await fetch('https://gist.githubusercontent.com/shahidafridi-collab/3d4fa23aadd9be02be79a58e46009126/raw/gistfile1.txt', {next: {revalidate:3600}});

  const answerKey = await res.json();
  const specificanswerKey = answerKey.find(a => a.id === id);

  return {
    title: specificanswerKey.title,
    description: specificanswerKey.description,
    alternates: {
      canonical: `https://www.sarkariresult27.com/answer-keys/${id}`,
    },
    openGraph: {
      title: specificanswerKey.title,
      description: specificanswerKey.description,
      url: `https://www.sarkariresult27.com/answer-keys/${id}`,
    }
  };
}
export default function AnswerKeySec({ children }) {
  return <section>{children}</section>
}
