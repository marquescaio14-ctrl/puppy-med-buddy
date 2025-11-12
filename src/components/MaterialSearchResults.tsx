import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Download, Loader2 } from "lucide-react";

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
}

interface MaterialSearchResultsProps {
  results: Material[];
  isSearching: boolean;
  searchTerm: string;
}

const getTipoBadgeColor = (tipo: string) => {
  switch (tipo) {
    case "artigo_cientifico":
      return "bg-primary/10 text-primary border-primary/20";
    case "guia_pratico":
      return "bg-accent/10 text-accent border-accent/20";
    case "protocolo_emergencia":
      return "bg-destructive/10 text-destructive border-destructive/20";
    default:
      return "bg-secondary/10 text-secondary-foreground border-secondary/20";
  }
};

const getCategoriaLabel = (categoria: string | null) => {
  const labels: Record<string, string> = {
    vacinacao: "Vacinação",
    vermifugacao: "Vermifugação",
    medicamentos: "Medicamentos",
    doencas: "Doenças",
    geral: "Geral",
  };
  return categoria ? labels[categoria] || categoria : "";
};

const getTipoLabel = (tipo: string) => {
  const labels: Record<string, string> = {
    artigo_cientifico: "Artigo Científico",
    guia_pratico: "Guia Prático",
    tabela_dosagens: "Tabela de Dosagens",
    protocolo_emergencia: "Protocolo de Emergência",
    outro: "Outro",
  };
  return labels[tipo] || tipo;
};

export function MaterialSearchResults({ results, isSearching, searchTerm }: MaterialSearchResultsProps) {
  if (!searchTerm || searchTerm.trim().length === 0) {
    return null;
  }

  if (isSearching) {
    return (
      <Card className="p-6 mb-6">
        <div className="flex items-center justify-center gap-3 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" />
          <p>Pesquisando na base de conhecimento...</p>
        </div>
      </Card>
    );
  }

  if (results.length === 0) {
    return (
      <Card className="p-6 mb-6 bg-muted/30">
        <p className="text-muted-foreground text-center">
          Nenhum material encontrado para "{searchTerm}". Tente outros termos de busca.
        </p>
      </Card>
    );
  }

  return (
    <div className="mb-8 space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <FileText className="h-5 w-5 text-primary" />
        <h3 className="text-xl font-semibold text-foreground">
          Materiais Encontrados ({results.length})
        </h3>
      </div>

      {results.map((material) => (
        <Card key={material.id} className="p-6 hover:shadow-[var(--shadow-medium)] transition-all">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-primary/10">
              <FileText className="h-6 w-6 text-primary" />
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-start gap-2 mb-2">
                <h4 className="text-lg font-semibold text-foreground flex-1">
                  {material.titulo}
                </h4>
                <Badge className={getTipoBadgeColor(material.tipo)}>
                  {getTipoLabel(material.tipo)}
                </Badge>
                {material.categoria && (
                  <Badge variant="outline">
                    {getCategoriaLabel(material.categoria)}
                  </Badge>
                )}
              </div>

              {material.autores && (
                <p className="text-sm text-muted-foreground mb-2">
                  <strong>Autores:</strong> {material.autores}
                </p>
              )}

              {material.revista_ou_fonte && (
                <p className="text-sm text-muted-foreground mb-2">
                  <strong>Fonte:</strong> {material.revista_ou_fonte}
                  {material.ano && ` (${material.ano})`}
                </p>
              )}

              {material.descricao && (
                <p className="text-sm text-muted-foreground mb-3">
                  {material.descricao}
                </p>
              )}

              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                asChild
              >
                <a href={material.url} target="_blank" rel="noopener noreferrer">
                  <Download className="h-4 w-4" />
                  Acessar Material
                </a>
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
