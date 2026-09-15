type TestearPageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function TestearPage({ searchParams }: TestearPageProps) {
  const params = await URLSearchParams;
  return <div>{params.toString()}</div>;
}
