import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Material {
  id: string;
  titulo: string;
  autores: string | null;
  tipo: string;
  categoria: string | null;
  ano: number | null;
  revista_ou_fonte: string | null;
  descricao: string | null;
  url: string;
  publico: boolean;
  created_at: string;
  updated_at: string;
}

export function useSearchMaterials(searchTerm: string, debounceMs: number = 500) {
  const [results, setResults] = useState<Material[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (!searchTerm || searchTerm.trim().length === 0) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const { data, error } = await supabase.functions.invoke("search-materials", {
          body: { query: searchTerm },
        });

        if (error) {
          console.error("Search error:", error);
          setResults([]);
        } else {
          setResults(data?.results || []);
        }
      } catch (error) {
        console.error("Search error:", error);
        setResults([]);
      } finally {
        setIsSearching(false);
      }
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [searchTerm, debounceMs]);

  return { results, isSearching };
}
