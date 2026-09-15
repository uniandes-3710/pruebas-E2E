import { getTranslations } from "next-intl/server";

type BienvenidaPageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function BienvenidaPage({
  searchParams,
}: BienvenidaPageProps) {
  const params = await searchParams;
  const gato = (params.gato as string) || "tu gato";
  const dueno = (params.dueno as string) || "";
  const tipo = (params.tipo as string) || "curioso";

  const t = await getTranslations("Bienvenida");

  return (
    <main className="p-10 max-w-md mx-auto font-serif text-stone-700">
      <h1 className="text-2xl font-bold mb-2">{t("heading", { dueno })}</h1>
      <p>{t("body", { gato, tipo })}</p>
    </main>
  );
}
