import { LikeButton } from "@/components/LikeButton";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export default async function Home() {
  //console.log(window.location.href);
  const t = await getTranslations("Home");

  return (
    <main className="p-10 max-w-md mx-auto font-serif text-stone-700">
      <h1 className="text-2xl font-bold mb-2">{t("title")}</h1>
      <p className="mb-1">{t("subtitle")}</p>
      <p className="mb-4">{t("counter", { count: 1204 })}</p>
      <Link href="/registro" className="text-rose-700 underline">
        {t("cta")}
      </Link>
      <LikeButton />
    </main>
  );
}
