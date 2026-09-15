"use client";
import { useEffect, useState } from "react";

export function LikeButton() {
  useEffect(() => {
    console.log("window sí existe aquí:", window.location.href);
  }, []);

  const [likes, setLikes] = useState<number>(0);
  console.log("Renderizando LikeButton, likes:", likes);

  return (
    <button
      onClick={() => setLikes((prev_state) => prev_state + 1)}
      // Cambiar a prueba de estado demorado
      className="mt-4 px-4 py-2 rounded bg-stone-700 text-white"
    >
      🐾 Me gusta ({likes})
    </button>
  );
}
