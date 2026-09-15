"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";

const locales = ["es", "en"] as const;

export function LocaleSwitcher() {
  const pathname = usePathname();
  const currentLocale = useLocale();

  return (
    <div className="flex gap-2 text-xs">
      {locales.map((loc) => {
        const newPath = pathname.replace(`/${currentLocale}`, `/${loc}`);
        return (
          <Link
            key={loc}
            href={newPath}
            className={
              loc === currentLocale
                ? "font-bold underline"
                : "text-stone-500 hover:underline"
            }
          >
            {loc.toUpperCase()}
          </Link>
        );
      })}
    </div>
  );
}
