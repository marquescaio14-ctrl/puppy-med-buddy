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
import { ArrowLeft, AlertTriangle, Shield, FileText, Download, CheckCircle2, XCircle, Scale, Calendar, Info } from "lucide-react";
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
              A administração de medicamentos pode ser FATAL para filhotes. Muitos medicamentos seguros para
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

        <Card className="mb-8 p-6 shadow-[var(--shadow-medium)]">
          <div className="flex items-center gap-2 mb-4">
            <Info className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">Curiosidades – Raças de Cães e Gatos</h2>
          </div>

          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full text-left border-collapse">
              <thead className="bg-muted">
                <tr>
                  <th className="px-4 py-3 font-semibold text-foreground">Espécie</th>
                  <th className="px-4 py-3 font-semibold text-foreground">Raça</th>
                  <th className="px-4 py-3 font-semibold text-foreground">Curiosidade</th>
                </tr>
              </thead>

              <tbody className="divide-y">
                <tr className="hover:bg-muted/30 transition">
                  <td className="px-4 py-3">Cão</td>
                  <td className="px-4 py-3">Golden Retriever</td>
                  <td className="px-4 py-3">Extremamente dócil e inteligente, é uma das raças mais usadas como cão-guia.</td>
                </tr>

                <tr className="hover:bg-muted/30 transition">
                  <td className="px-4 py-3">Cão</td>
                  <td className="px-4 py-3">Bulldog Francês</td>
                  <td className="px-4 py-3">Tem baixa tolerância ao calor por ser braquicefálico.</td>
                </tr>

                <tr className="hover:bg-muted/30 transition">
                  <td className="px-4 py-3">Cão</td>
                  <td className="px-4 py-3">Border Collie</td>
                  <td className="px-4 py-3">Considerado o cão mais inteligente do mundo.</td>
                </tr>

                <tr className="hover:bg-muted/30 transition">
                  <td className="px-4 py-3">Gato</td>
                  <td className="px-4 py-3">Siamês</td>
                  <td className="px-4 py-3">Conhecido por “conversar” muito e criar forte vínculo com o tutor.</td>
                </tr>

                <tr className="hover:bg-muted/30 transition">
                  <td className="px-4 py-3">Gato</td>
                  <td className="px-4 py-3">Maine Coon</td>
                  <td className="px-4 py-3">Uma das maiores raças de gatos, extremamente dócil e curiosa.</td>
                </tr>

                <tr className="hover:bg-muted/30 transition">
                  <td className="px-4 py-3">Gato</td>
                  <td className="px-4 py-3">Persa</td>
                  <td className="px-4 py-3">Possui focinho achatado e requer escovação frequente.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="mb-8 p-6 shadow-[var(--shadow-medium)]">
          <div className="flex items-center gap-2 mb-4">
            <Info className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">FIV e FeLV — O Que São?</h2>
          </div>

          <p className="text-muted-foreground mb-4">
            A FIV (Vírus da Imunodeficiência Felina) e a FeLV (Vírus da Leucemia Felina)
            são doenças virais que afetam exclusivamente gatos. Ambas comprometem o
            sistema imunológico, tornando o animal mais suscetível a infecções.
          </p>

          <ul className="space-y-3">
            <li className="p-3 bg-primary/5 rounded-lg border border-primary/20">
              <strong>FIV:</strong> transmitida principalmente através de mordidas profundas.
            </li>
            <li className="p-3 bg-primary/5 rounded-lg border border-primary/20">
              <strong>FeLV:</strong> transmitida por saliva, secreções e contato prolongado.
            </li>
            <li className="p-3 bg-primary/5 rounded-lg border border-primary/20">
              Não há cura, mas há tratamento de suporte e boa qualidade de vida com cuidados adequados.
            </li>
            <li className="p-3 bg-primary/5 rounded-lg border border-primary/20">
              Testes rápidos são recomendados para gatos adotados, resgatados ou em convívio múltiplo.
            </li>
          </ul>
        </Card>

        {/* Cuidados com filhotes recém-nascidos */}
        <Card className="mb-8 p-6 shadow-[var(--shadow-medium)]">
          <div className="flex items-center gap-2 mb-4">
            <Info className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">Cuidados com Filhotes Recém-Nascidos</h2>
          </div>

          <ul className="space-y-3">
            <li className="p-3 bg-accent/5 rounded-lg border border-accent/20">
              Filhotes precisam de aquecimento constante — eles não regulam temperatura sozinhos.
            </li>
            <li className="p-3 bg-accent/5 rounded-lg border border-accent/20">
              O ideal é que permaneçam com a mãe até pelo menos 45 dias de vida.
            </li>
            <li className="p-3 bg-accent/5 rounded-lg border border-accent/20">
              Alimentação deve ser feita com leite específico para pets, nunca leite de vaca.
            </li>
            <li className="p-3 bg-accent/5 rounded-lg border border-accent/20">
              Filhotes precisam ser estimulados para urinar e defecar — a mãe faz isso lambendo.
            </li>
          </ul>
        </Card>

        <Card className="mb-8 p-6 shadow-[var(--shadow-medium)]">
          <div className="flex items-center gap-2 mb-4">
            <Info className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">Importância de Ter o Documento do Animal</h2>
          </div>

          <p className="text-muted-foreground mb-4">
            O documento do animal (carteirinha de vacinação ou registro) é essencial para:
          </p>

          <ul className="space-y-3">
            <li className="p-3 bg-secondary/5 rounded-lg border border-secondary/20">
              Provar vacinação atualizada em viagens, pet shops e parques.
            </li>
            <li className="p-3 bg-secondary/5 rounded-lg border border-secondary/20">
              Garantir atendimento rápido em emergências veterinárias.
            </li>
            <li className="p-3 bg-secondary/5 rounded-lg border border-secondary/20">
              Facilitar identificação e posse responsável em casos de perda.
            </li>
          </ul>
        </Card>

        {/* Importância da socialização */}
        <Card className="mb-8 p-6 shadow-[var(--shadow-medium)]">
          <div className="flex items-center gap-2 mb-4">
            <Info className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">Importância da Socialização</h2>
          </div>

          <ul className="space-y-3">
            <li className="p-3 bg-primary/5 rounded-lg border border-primary/20">
              Animais bem socializados são mais confiantes e menos propensos a comportamentos agressivos.
            </li>
            <li className="p-3 bg-primary/5 rounded-lg border border-primary/20">
              A socialização precoce melhora a convivência com pessoas, outros animais e ambientes.
            </li>
            <li className="p-3 bg-primary/5 rounded-lg border border-primary/20">
              Reduz estresse em consultas veterinárias, passeios e transporte.
            </li>
          </ul>
        </Card>

        <Card className="mb-8 p-6 shadow-[var(--shadow-medium)]">
          <div className="flex items-center gap-2 mb-4">
            <Info className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">Cuidados Pós-Vacina</h2>
          </div>

          <ul className="space-y-3">
            <li className="p-3 bg-accent/5 rounded-lg border border-accent/20">
              Após a vacina, evitar exercícios intensos por 24–48 horas.
            </li>
            <li className="p-3 bg-accent/5 rounded-lg border border-accent/20">
              Monitorar possíveis inchaços, febre ou apatia — comuns, mas devem ser leves.
            </li>
            <li className="p-3 bg-accent/5 rounded-lg border border-accent/20">
              O animal só deve ir a parques e locais públicos após concluir TODO o protocolo vacinal.
            </li>
            <li className="p-3 bg-accent/5 rounded-lg border border-accent/20">
              Em caso de vômito persistente, dificuldade para respirar ou inchaço no rosto, procurar veterinário imediatamente.
            </li>
          </ul>
        </Card>
        <Card className="mb-8 p-6 shadow-[var(--shadow-medium)]">
          <div className="flex items-center gap-2 mb-4">
            <Info className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">Ectoparasitas — Pulgas, Carrapatos e Sarnas</h2>
          </div>

          <p className="text-muted-foreground mb-4">
            Ectoparasitas são parasitas externos que se fixam na pele e pelos dos animais, podendo transmitir doenças,
            causar alergias graves e anemia — especialmente em filhotes. Os principais são: <strong>pulgas</strong>,
            <strong> carrapatos</strong>, <strong>ácaros de sarna</strong> e <strong>piolhos</strong>.
          </p>

          {/* Tipos de Ectoparasitas */}
          <h3 className="text-xl font-semibold text-foreground mt-4 mb-3">Principais Tipos</h3>
          <ul className="space-y-3">
            <li className="p-3 bg-primary/5 rounded-lg border border-primary/20">
              <strong>Pulgas (Ctenocephalides felis):</strong> causam coceira intensa, alergias (DAPP) e podem transmitir vermes.
            </li>
            <li className="p-3 bg-primary/5 rounded-lg border border-primary/20">
              <strong>Carrapatos (Rhipicephalus sanguineus):</strong> podem transmitir doenças graves como Erliquiose e Babesiose.
            </li>
            <li className="p-3 bg-primary/5 rounded-lg border border-primary/20">
              <strong>Sarna Sarcóptica:</strong> altamente contagiosa, provoca coceira severa, crostas e queda de pelos.
            </li>
            <li className="p-3 bg-primary/5 rounded-lg border border-primary/20">
              <strong>Sarna Demodécica:</strong> relacionada a baixa imunidade; causa lesões localizadas ou generalizadas.
            </li>
            <li className="p-3 bg-primary/5 rounded-lg border border-primary/20">
              <strong>Piolhos:</strong> comuns em animais resgatados; podem causar irritações e dermatites.
            </li>
          </ul>

          {/* Sinais de Infestação */}
          <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Sinais de Infestação</h3>
          <ul className="space-y-3">
            <li className="p-3 bg-accent/5 rounded-lg border border-accent/20">
              Coceira intensa, principalmente na base da cauda (pulgas)
            </li>
            <li className="p-3 bg-accent/5 rounded-lg border border-accent/20">
              Feridas, vermelhidão e crostas na pele
            </li>
            <li className="p-3 bg-accent/5 rounded-lg border border-accent/20">
              Carrapatos visíveis aderidos à pele
            </li>
            <li className="p-3 bg-accent/5 rounded-lg border border-accent/20">
              Queda excessiva de pelos e áreas sem pelagem
            </li>
            <li className="p-3 bg-accent/5 rounded-lg border border-accent/20">
              Restos escuros na pele (“sujeirinhas”) indicam fezes de pulga
            </li>
          </ul>

          {/* Tratamento Seguro */}
          <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Tratamento Seguro</h3>
          <p className="text-muted-foreground mb-2">
            O tratamento deve SEMPRE ser supervisionado por um veterinário, pois cada animal, idade e peso
            exigem um protocolo específico.
          </p>

          <ul className="space-y-3">
            <li className="p-3 bg-green-500/5 rounded-lg border border-green-500/20">
              <strong>Antipulgas e carrapaticidas:</strong> comprimidos, pipetas (spot-on) e coleiras específicas.
            </li>
            <li className="p-3 bg-green-500/5 rounded-lg border border-green-500/20">
              <strong>Banhos medicamentosos:</strong> recomendados especialmente em casos de sarna.
            </li>
            <li className="p-3 bg-green-500/5 rounded-lg border border-green-500/20">
              <strong>Limpeza do ambiente:</strong> 95% das pulgas ficam no ambiente, não no animal.
            </li>
            <li className="p-3 bg-green-500/5 rounded-lg border border-green-500/20">
              <strong>Atenção a filhotes:</strong> produtos comuns podem ser tóxicos; o uso é restrito por idade e peso.
            </li>
          </ul>

          {/* Prevenção */}
          <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Prevenção</h3>
          <ul className="space-y-3">
            <li className="p-3 bg-yellow-500/5 rounded-lg border border-yellow-500/20">
              Use antipulgas regularmente, conforme orientação veterinária.
            </li>
            <li className="p-3 bg-yellow-500/5 rounded-lg border border-yellow-500/20">
              Lave caminhas, cobertores e brinquedos com frequência.
            </li>
            <li className="p-3 bg-yellow-500/5 rounded-lg border border-yellow-500/20">
              Aspire o ambiente toda semana (ovos e larvas ficam no chão).
            </li>
            <li className="p-3 bg-yellow-500/5 rounded-lg border border-yellow-500/20">
              Evite levar o pet em locais com alta infestação como matas e gramados altos.
            </li>
          </ul>

          {/* Alerta */}
          <Alert className="mt-6 border-destructive bg-destructive/10">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <AlertDescription className="text-foreground">
              <strong>IMPORTANTE:</strong> nunca utilize produtos caseiros ou inseticidas de uso doméstico no animal —
              isso pode causar envenenamento grave e até morte. Filhotes têm tolerância muito menor a antiparasitários.
            </AlertDescription>
          </Alert>
        </Card>

        {/* Zoonoses */}
        <Card className="mb-8 p-6 shadow-[var(--shadow-medium)]">
          <div className="flex items-center gap-2 mb-4">
            <Info className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">Zoonoses</h2>
          </div>

          <p className="text-muted-foreground mb-4">
            Zoonoses são doenças que podem ser transmitidas dos animais para os seres humanos.
            A prevenção é fundamental para a saúde de toda a família e envolve cuidados básicos
            com vacinação, higiene e controle parasitário.
          </p>

          {/* Raiva */}
          <h3 className="text-xl font-semibold mt-6 mb-2">Raiva</h3>
          <ul className="space-y-3 mb-4">
            <li className="p-3 bg-destructive/5 rounded-lg border border-destructive/20">
              <strong>Causa:</strong> vírus transmitido principalmente pela mordida de animais infectados.
            </li>
            <li className="p-3 bg-destructive/5 rounded-lg border border-destructive/20">
              <strong>Sinais:</strong> alterações comportamentais, agressividade, salivação excessiva,
              dificuldade para engolir, convulsões e paralisia.
            </li>
            <li className="p-3 bg-accent/5 rounded-lg border border-accent/20">
              <strong>Prevenção:</strong> vacinação anual obrigatória; evitar contato com animais
              desconhecidos ou silvestres; procurar atendimento imediato após qualquer mordida.
            </li>
          </ul>

          {/* Toxoplasmose */}
          <h3 className="text-xl font-semibold mt-6 mb-2">Toxoplasmose</h3>
          <ul className="space-y-3">
            <li className="p-3 bg-primary/5 rounded-lg border border-primary/20">
              <strong>Causa:</strong> protozoário <em>Toxoplasma gondii</em>, transmitido principalmente
              pela ingestão de alimentos contaminados ou contato com fezes infectadas.
            </li>
            <li className="p-3 bg-primary/5 rounded-lg border border-primary/20">
              <strong>Sinais nos animais:</strong> na maioria das vezes são assintomáticos, mas podem
              apresentar febre, apatia, diarreia ou problemas respiratórios.
            </li>
            <li className="p-3 bg-accent/5 rounded-lg border border-accent/20">
              <strong>Prevenção:</strong> higienizar corretamente a caixa de areia dos gatos, evitar
              oferecer carne crua aos animais, manter boa higiene das mãos e dos alimentos.
            </li>
          </ul>
        </Card>

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
