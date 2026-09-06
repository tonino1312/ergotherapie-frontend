import { getServicios, type Servicio } from "@/lib/api";
import { HeaderClient } from "@/components/HeaderClient";

async function loadServicios(): Promise<Servicio[]> {
  try {
    return await getServicios();
  } catch {
    return [];
  }
}

export async function Header() {
  const servicios = await loadServicios();
  return <HeaderClient servicios={servicios} />;
}
