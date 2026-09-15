"use client";
import { useRouter } from "next/navigation";
import { useReducer } from "react";
import { useTranslations } from "next-intl";

type TipoMaullido = "curioso" | "hambriento" | "molesto" | "cariñoso";

type State = {
  nombreGato: string;
  nombreDueno: string;
  email: string;
  tipoMaullido: TipoMaullido;
  errors: Record<string, string>;
  enviado: boolean;
};

type Action =
  | { type: "SET_FIELD"; field: keyof State; value: string }
  | { type: "SET_ERROR"; field: string; error: string }
  | { type: "SUBMIT" }
  | { type: "RESET" };

const initialState: State = {
  nombreGato: "",
  nombreDueno: "",
  email: "",
  tipoMaullido: "curioso",
  errors: {},
  enviado: false,
};

function registroReducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "SET_ERROR":
      return {
        ...state,
        errors: { ...state.errors, [action.field]: action.error },
      };
    case "SUBMIT":
      return { ...state, enviado: true };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

function validate(field: string, value: string): string {
  switch (field) {
    case "nombreGato":
      return value.length >= 2 ? "" : "minLength";
    case "email":
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "" : "invalidEmail";
    default:
      return "";
  }
}

export default function RegistroPage() {
  const t = useTranslations("Registro");
  const router = useRouter();
  const [state, dispatch] = useReducer(registroReducer, initialState);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    dispatch({
      type: "SET_FIELD",
      field: e.target.name as keyof State,
      value: e.target.value,
    });
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    const error = validate(name, value);
    dispatch({ type: "SET_ERROR", field: name, error });
  }

  function handleSubmit() {
    const params = new URLSearchParams({
      gato: state.nombreGato,
      dueno: state.nombreDueno,
      tipo: state.tipoMaullido,
    });
    router.push(`/bienvenida?${params.toString()}`);
  }

  return (
    <main className="p-10 max-w-md mx-auto font-serif text-stone-700">
      <h1 className="text-2xl font-bold mb-4">{t("heading")}</h1>

      <label className="block text-sm font-medium mb-1">{t("catName")}</label>
      <input
        name="nombreGato"
        value={state.nombreGato}
        onChange={handleChange}
        onBlur={handleBlur}
        className="w-full border border-stone-300 rounded px-3 py-2"
        data-cy="input-nombreGato"
      />
      {state.errors.nombreGato && (
        <p className="text-red-600 text-xs mb-3" data-cy="error-nombreGato">
          {t(`errors.${state.errors.nombreGato}`)}
        </p>
      )}

      <label className="block text-sm font-medium mb-1">{t("ownerName")}</label>
      <input
        name="nombreDueno"
        value={state.nombreDueno}
        onChange={handleChange}
        className="w-full border border-stone-300 rounded px-3 py-2 mb-3"
      />

      <label className="block text-sm font-medium mb-1">{t("email")}</label>
      <input
        name="email"
        value={state.email}
        onChange={handleChange}
        onBlur={handleBlur}
        className="w-full border border-stone-300 rounded px-3 py-2 mb-3"
      />
      {state.errors.email && (
        <p className="text-red-600 text-xs mb-3">
          {t(`errors.${state.errors.email}`)}
        </p>
      )}

      <label className="block text-sm font-medium mb-1">{t("mood")}</label>
      <select
        name="tipoMaullido"
        value={state.tipoMaullido}
        onChange={handleChange}
        className="w-full border border-stone-300 rounded px-3 py-2 mb-4"
      >
        <option value="curioso">{t("moods.curioso")}</option>
        <option value="hambriento">{t("moods.hambriento")}</option>
        <option value="molesto">{t("moods.molesto")}</option>
        <option value="cariñoso">{t("moods.cariñoso")}</option>
      </select>

      <button
        onClick={handleSubmit}
        data-cy="submit-registro"
        className="px-4 py-2 rounded bg-rose-700 text-white"
      >
        {t("submit")}
      </button>
    </main>
  );
}
