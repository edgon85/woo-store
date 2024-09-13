import { Metadata, ResolvingMetadata } from 'next';

type MetadataProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateDynamicMetadata(
  { params }: MetadataProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // Obtén la primera clave del objeto params
  const keys = Object.keys(params);
  const lastKey = keys[keys.length - 1];
  const value = params[lastKey];

  const title = formatTitle(value);
  //   const description = `Explora nuestra selección de ${value} en Tu Sitio. Compra y vende moda de segunda mano de forma fácil y sostenible.`;

  return {
    title,
    // description,
    // Puedes agregar más metadatos aquí según sea necesario
  };
}

export function formatTitle(value: string): string {
  // Divide la cadena por guiones, capitaliza cada palabra y une con espacios
  if (!value) {
    return '';
  }
  
  return value
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Función auxiliar para obtener el último segmento de la ruta
export function getLastRouteSegment(params: { [key: string]: string }): string {
  const keys = Object.keys(params);
  return keys.length > 0 ? params[keys[keys.length - 1]] : '';
}
