const API_URL = process.env.API_URL ?? "http://localhost:8080";

export type Servicio = {
  id: number;
  nombre: string;
  descripcion: string | null;
  idioma: "ALEMAN" | "ESPANOL" | "INGLES";
  duracionMinutos: number;
  activo: boolean;
};

type Page<T> = {
  content: T[];
  totalElements: number;
};

export async function getServicios(): Promise<Servicio[]> {
  const res = await fetch(`${API_URL}/api/servicios?size=50`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Error al cargar servicios: ${res.status}`);
  }

  const page: Page<Servicio> = await res.json();
  return page.content;
}
