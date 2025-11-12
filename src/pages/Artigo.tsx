import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Download, ExternalLink, FileText } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { SearchBar } from "@/components/SearchBar";
import { useSearchMaterials } from "@/hooks/useSearchMaterials";
import { MaterialSearchResults } from "@/components/MaterialSearchResults";

export default function Artigo() {
  const [searchTerm, setSearchTerm] = useState("");
  const { results: materialResults, isSearching } = useSearchMaterials(searchTerm);

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">Artigos Científicos</h1>
        <p className="text-lg text-muted-foreground">
          Base de conhecimento científico sobre medicina veterinária de filhotes
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Pesquisar artigos, protocolos, guias práticos..."
        />
      </div>

      {/* Material Search Results */}
      <MaterialSearchResults 
        results={materialResults}
        isSearching={isSearching}
        searchTerm={searchTerm}
      />

      <Alert className="mb-8 bg-primary/5 border-primary/20">
        <BookOpen className="h-5 w-5 text-primary" />
        <AlertDescription className="text-muted-foreground">
          Todos os artigos são de fontes acadêmicas confiáveis e revisados por pares.
          As informações aqui contidas são para fins educacionais e de referência.
        </AlertDescription>
      </Alert>

      <Card className="p-8 mb-6">
        <div className="flex items-start gap-4 mb-6">
          <div className="p-4 rounded-lg bg-accent/10">
            <FileText className="h-8 w-8 text-accent" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-semibold text-foreground mb-2">
              Parvovirose canina: atualização do conhecimento
            </h2>
            <p className="text-muted-foreground mb-4">
              Artigo de revisão sobre a parvovirose canina, uma das doenças mais importantes
              em medicina veterinária de pequenos animais.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                Virologia
              </span>
              <span className="px-3 py-1 bg-accent/10 text-accent text-sm rounded-full">
                Patologia
              </span>
              <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                Filhotes
              </span>
            </div>
          </div>
        </div>

        <div className="bg-secondary/30 rounded-lg p-6 mb-6">
          <h3 className="font-semibold text-lg mb-4 text-foreground">Resumo</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            A parvovirose canina é uma doença viral altamente contagiosa que afeta principalmente
            filhotes. O vírus causa enterite hemorrágica grave, levando a alta morbidade e mortalidade
            em animais não vacinados.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Este artigo revisa os aspectos mais importantes da doença, incluindo etiologia, 
            epidemiologia, patogenia, sinais clínicos, diagnóstico, tratamento e prevenção.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            A vacinação adequada permanece como a principal medida preventiva contra a parvovirose,
            sendo essencial seguir os protocolos vacinais recomendados para garantir proteção efetiva.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-card border border-border rounded-lg">
            <h4 className="font-semibold mb-2 text-foreground">Publicação</h4>
            <p className="text-sm text-muted-foreground">Nature and Conservation</p>
          </div>
          <div className="p-4 bg-card border border-border rounded-lg">
            <h4 className="font-semibold mb-2 text-foreground">Ano</h4>
            <p className="text-sm text-muted-foreground">2020</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <Button className="flex-1 min-w-[200px]" asChild>
            <a 
              href="https://sustenere.inf.br/index.php/naturalresources/article/view/6110/3210"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Ler Artigo Completo
            </a>
          </Button>
          <Button variant="outline" className="flex-1 min-w-[200px]" asChild>
            <a 
              href="https://sustenere.inf.br/index.php/naturalresources/article/view/6110/3210"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </a>
          </Button>
        </div>
      </Card>

      <Card className="p-8">
        <h2 className="text-2xl font-semibold mb-4 text-foreground">Outros Recursos</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-secondary/30 rounded-lg">
            <BookOpen className="h-6 w-6 text-primary flex-shrink-0" />
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">Protocolos de Vacinação</h3>
              <p className="text-sm text-muted-foreground">
                Cronogramas atualizados de vacinação para filhotes
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={() => window.location.href = '/vacinas'}>
              Ver Mais
            </Button>
          </div>

          <div className="flex items-center gap-4 p-4 bg-secondary/30 rounded-lg">
            <BookOpen className="h-6 w-6 text-accent flex-shrink-0" />
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">Protocolos de Vermifugação</h3>
              <p className="text-sm text-muted-foreground">
                Guias completos de vermifugação por idade
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={() => window.location.href = '/vermifugacao'}>
              Ver Mais
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
