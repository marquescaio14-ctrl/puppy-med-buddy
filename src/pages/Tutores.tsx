import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SearchBar } from "@/components/SearchBar";
import { useSearchMaterials } from "@/hooks/useSearchMaterials";
import { MaterialSearchResults } from "@/components/MaterialSearchResults";
import { ArrowLeft, AlertTriangle, Shield, FileText, Download, CheckCircle2, XCircle, Scale, Calendar } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Tutores = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [pesoFilhote, setPesoFilhote] = useState("");
  const [idadeFilhote, setIdadeFilhote] = useState("");
  const { results: materialResults, isSearching } = useSearchMaterials(searchTerm);

  const substanciasPerigosas = [
    "Paracetamol - Extremamente tóxico para cães e gatos, pode causar insuficiência hepática fatal",
    "Ibuprofeno - Causa úlceras gastrointestinais graves e insuficiência renal",
    "Aspirina - Pode causar sangramento gastrointestinal e toxicidade",
    "Dipirona - Só deve ser usada sob prescrição veterinária com dosagem específica",
    "Medicamentos para resfriado - Muitos contêm substâncias tóxicas para pets",
  ];

  const boasPraticas = [
    "Sempre consulte um veterinário antes de administrar qualquer medicamento",
    "Pese o animal corretamente para garantir a dosagem precisa",
    "Siga rigorosamente a prescrição veterinária",
    "Observe reações adversas e comunique imediatamente ao veterinário",
    "Mantenha medicamentos em local seguro, fora do alcance dos animais",
    "Não interrompa o tratamento sem orientação profissional",
  ];

  const errosComuns = [
    "Usar medicamentos humanos sem orientação veterinária",
    "Calcular doses baseadas em peso humano ou 'achismo'",
    "Interromper tratamento quando o animal aparenta melhora",
    "Compartilhar medicamentos entre animais diferentes",
    "Armazenar medicamentos de forma inadequada",
  ];

  const materiais = [
    { titulo: "Guia Prático Completo", descricao: "PDF com todas as dosagens e protocolos" },
    { titulo: "Artigo Científico", descricao: "Embasamento científico das recomendações" },
    { titulo: "Tabela de Dosagens", descricao: "Referência rápida para consulta" },
  ];

  const getRecomendacaoPorPeso = () => {
    const peso = parseFloat(pesoFilhote);
    if (!peso) return null;
    
    if (peso < 2) return "Filhote muito pequeno (< 2kg): Cuidados intensivos necessários. Consulte veterinário urgentemente.";
    if (peso < 5) return "Filhote pequeno (2-5kg): Atenção especial à dosagem de medicamentos e frequência de alimentação.";
    if (peso < 10) return "Filhote médio (5-10kg): Siga protocolos padrão de vacinação e vermifugação.";
    return "Filhote grande (> 10kg): Atenção ao crescimento rápido e necessidades nutricionais aumentadas.";
  };

  const getRecomendacaoPorIdade = () => {
    if (!idadeFilhote) return null;
    
    const [valor, unidade] = idadeFilhote.split('-');
    const num = parseInt(valor);
    
    if (unidade === 'semanas') {
      if (num < 4) return "Período crítico: aleitamento materno essencial. Não separar da mãe.";
      if (num < 8) return "Início da socialização e primeira vermifugação. Manter com mãe e irmãos.";
      if (num < 12) return "Período de vacinação e desmame gradual. Socialização controlada.";
      return "Completar série de vacinas e intensificar socialização.";
    } else if (unidade === 'meses') {
      if (num < 4) return "Fase de vacinação e desenvolvimento. Evitar locais com muitos cães até completar vacinas.";
      if (num < 6) return "Período de crescimento rápido. Atenção à alimentação e exercícios moderados.";
      return "Filhote em desenvolvimento. Manter rotinas de saúde preventiva.";
    }
    return null;
  };

  const filteredContent = (items: string[]) => {
    if (!searchTerm) return items;
    return items.filter(item => 
      item.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-2"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <h1 className="text-2xl font-bold text-foreground">Para Tutores Responsáveis</h1>
          <p className="text-sm text-muted-foreground">
            Informações essenciais de segurança e boas práticas
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Search Bar */}
        <div className="mb-6">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Pesquisar informações, artigos científicos, guias práticos..."
          />
        </div>

        {/* Material Search Results */}
        <MaterialSearchResults 
          results={materialResults}
          isSearching={isSearching}
          searchTerm={searchTerm}
        />

        {/* Filtro de Peso/Idade */}
        <Card className="mb-8 p-6 shadow-[var(--shadow-medium)]">
          <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Scale className="h-5 w-5 text-accent" />
            Cuidados Específicos para seu Filhote
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <Label htmlFor="peso">Peso do Filhote (kg)</Label>
              <Input
                id="peso"
                type="number"
                placeholder="Ex: 3.5"
                value={pesoFilhote}
                onChange={(e) => setPesoFilhote(e.target.value)}
                step="0.1"
                min="0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="idade">Idade do Filhote</Label>
              <Select value={idadeFilhote} onValueChange={setIdadeFilhote}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a idade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2-semanas">2 semanas</SelectItem>
                  <SelectItem value="4-semanas">4 semanas</SelectItem>
                  <SelectItem value="6-semanas">6 semanas</SelectItem>
                  <SelectItem value="8-semanas">8 semanas</SelectItem>
                  <SelectItem value="10-semanas">10 semanas</SelectItem>
                  <SelectItem value="12-semanas">12 semanas</SelectItem>
                  <SelectItem value="4-meses">4 meses</SelectItem>
                  <SelectItem value="6-meses">6 meses</SelectItem>
                  <SelectItem value="8-meses">8 meses</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {(getRecomendacaoPorPeso() || getRecomendacaoPorIdade()) && (
            <div className="space-y-3">
              {getRecomendacaoPorPeso() && (
                <Alert className="border-accent bg-accent/10">
                  <Scale className="h-4 w-4 text-accent" />
                  <AlertDescription className="text-foreground">
                    <strong>Baseado no peso:</strong> {getRecomendacaoPorPeso()}
                  </AlertDescription>
                </Alert>
              )}
              
              {getRecomendacaoPorIdade() && (
                <Alert className="border-accent bg-accent/10">
                  <Calendar className="h-4 w-4 text-accent" />
                  <AlertDescription className="text-foreground">
                    <strong>Baseado na idade:</strong> {getRecomendacaoPorIdade()}
                  </AlertDescription>
                </Alert>
              )}
            </div>
          )}
        </Card>
        {/* Disclaimer e Alerta Crítico */}
        <Alert className="mb-8 border-destructive bg-destructive/10 shadow-[var(--shadow-large)]">
          <AlertTriangle className="h-6 w-6 text-destructive" />
          <AlertDescription className="text-foreground">
            <h3 className="text-xl font-bold mb-3">⚠️ DISCLAIMER IMPORTANTE</h3>
            <p className="text-base font-semibold mb-3 text-destructive">
              As informações aqui contidas são para referência e NÃO SUBSTITUEM a consulta e o acompanhamento de um médico veterinário.
            </p>
            <p className="text-lg font-bold mb-2">
              NUNCA administre medicamentos sem orientação veterinária.
            </p>
            <p className="mb-2">
              A automedicação pode ser FATAL para filhotes. Muitos medicamentos seguros para 
              humanos são extremamente tóxicos para cães e gatos.
            </p>
            <p className="font-semibold">
              Em caso de dúvidas ou emergências, procure imediatamente um profissional qualificado.
            </p>
          </AlertDescription>
        </Alert>

        {/* Substâncias Perigosas */}
        <Card className="mb-8 p-6 shadow-[var(--shadow-medium)]">
          <div className="flex items-center gap-2 mb-4">
            <XCircle className="h-6 w-6 text-destructive" />
            <h2 className="text-2xl font-bold text-foreground">Substâncias Perigosas</h2>
          </div>
          <p className="text-muted-foreground mb-4">
            NUNCA administre os seguintes medicamentos sem prescrição veterinária:
          </p>
          <ul className="space-y-3">
            {filteredContent(substanciasPerigosas).map((substancia, index) => (
              <li key={index} className="flex gap-3 items-start p-3 bg-destructive/5 rounded-lg border border-destructive/20">
                <XCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                <span className="text-foreground">{substancia}</span>
              </li>
            ))}
          </ul>
          
          {filteredContent(substanciasPerigosas).length === 0 && (
            <p className="text-muted-foreground text-center py-4">Nenhum resultado encontrado.</p>
          )}
        </Card>

        {/* Boas Práticas */}
        <Card className="mb-8 p-6 shadow-[var(--shadow-medium)]">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 className="h-6 w-6 text-accent" />
            <h2 className="text-2xl font-bold text-foreground">Boas Práticas</h2>
          </div>
          <p className="text-muted-foreground mb-4">
            Diretrizes para administração segura de medicamentos:
          </p>
          <ul className="space-y-3">
            {filteredContent(boasPraticas).map((pratica, index) => (
              <li key={index} className="flex gap-3 items-start p-3 bg-accent/5 rounded-lg border border-accent/20">
                <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <span className="text-foreground">{pratica}</span>
              </li>
            ))}
          </ul>
          
          {filteredContent(boasPraticas).length === 0 && (
            <p className="text-muted-foreground text-center py-4">Nenhum resultado encontrado.</p>
          )}
        </Card>

        {/* Erros Comuns */}
        <Card className="mb-8 p-6 shadow-[var(--shadow-medium)]">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">Erros Comuns a Evitar</h2>
          </div>
          <ul className="space-y-3">
            {errosComuns.map((erro, index) => (
              <li key={index} className="flex gap-3 items-start p-3 bg-destructive/5 rounded-lg border border-destructive/20">
                <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                <span className="text-foreground">{erro}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Materiais para Download */}
        <Card className="p-6 shadow-[var(--shadow-medium)]">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">Materiais para Download</h2>
          </div>
          
          <Alert className="mb-6 border-primary bg-primary/10">
            <AlertTriangle className="h-4 w-4 text-primary" />
            <AlertDescription className="text-foreground">
              Estes materiais são recursos educativos gratuitos para consulta offline. 
              <strong> Não substituem a consulta com um médico veterinário.</strong>
            </AlertDescription>
          </Alert>

          <div className="grid md:grid-cols-2 gap-4">
            {materiais.map((material, index) => (
              <div
                key={index}
                className="p-4 border-2 border-border rounded-lg hover:border-primary transition-colors bg-card"
              >
                <div className="flex items-start gap-3">
                  <Download className="h-5 w-5 text-primary shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{material.titulo}</h3>
                    <p className="text-sm text-muted-foreground">{material.descricao}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-sm text-muted-foreground mt-6 text-center">
            Os materiais para download estarão disponíveis em breve. 
            Entre em contato para mais informações.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Tutores;
