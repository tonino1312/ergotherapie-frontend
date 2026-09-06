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

export type CategoriaImagen = "CARRUSEL_INICIO" | "HERO" | "SERVICIOS" | "GENERAL";

export type Imagen = {
  id: number;
  categoria: CategoriaImagen;
  url: string;
  textoAlternativo: string;
  orden: number;
};

export async function getImagenes(categoria: CategoriaImagen): Promise<Imagen[]> {
  const res = await fetch(`${API_URL}/api/imagenes?categoria=${categoria}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Error al cargar imágenes: ${res.status}`);
  }

  const imagenes: Imagen[] = await res.json();
  return imagenes.map((img) => ({ ...img, url: `${API_URL}${img.url}` }));
}
