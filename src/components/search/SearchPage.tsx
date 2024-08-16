'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useFilterStore } from '@/stores';
import { generateFilterURL, getSearchProducts } from '@/utils';
import { Filter } from '@/interfaces';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const filters = useFilterStore((state) => state.filters);
  const setFilters = useFilterStore((state) => state.setFilters);

  useEffect(() => {
    const term = searchParams.get('q') || '';
    setSearchTerm(term);

    // Recuperar filtros de la URL
    const urlFilters: Filter[] = [];
    searchParams.forEach((value, key) => {
      if (key.endsWith('[]')) {
        const type = key.slice(0, -2);
        value.split(',').forEach((slug) => {
          urlFilters.push({ type, slug, title: slug });
        });
      }
    });
    setFilters(urlFilters);

    // Realizar la búsqueda
    performSearch(term, urlFilters);
  }, [searchParams, setFilters]);

  const performSearch = async (term: string, currentFilters: Filter[]) => {
    
  };

  return (
    <div className="">
      {results.map((product: any) => (
        <div key={product.id} className="border p-4 rounded">
          <h3>{product.name}</h3>
          <p>Precio: ${product.price}</p>
          {/* Añadir más detalles del producto aquí */}
        </div>
      ))}
    </div>
  );
}
