import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, AlertTriangle, Shield, FileText, Download, CheckCircle2, XCircle } from "lucide-react";

const Tutores = () => {
  const navigate = useNavigate();

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
    { titulo: "Protocolo de Emergência", descricao: "O que fazer em casos de intoxicação" },
  ];

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

      <div className="container mx-auto px-4 py-8">
        {/* Alerta Crítico */}
        <Alert className="mb-8 border-destructive bg-destructive/10 shadow-[var(--shadow-medium)]">
          <AlertTriangle className="h-6 w-6 text-destructive" />
          <AlertDescription className="text-foreground">
            <h3 className="text-xl font-bold mb-2">⚠️ ALERTA CRÍTICO</h3>
            <p className="text-lg font-semibold mb-2">
              NUNCA administre medicamentos sem orientação veterinária.
            </p>
            <p>
              A automedicação pode ser FATAL para filhotes. Muitos medicamentos seguros para 
              humanos são extremamente tóxicos para cães e gatos. Em caso de dúvida, sempre 
              consulte um médico veterinário.
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
            {substanciasPerigosas.map((substancia, index) => (
              <li key={index} className="flex gap-3 items-start">
                <XCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                <span className="text-foreground">{substancia}</span>
              </li>
            ))}
          </ul>
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
            {boasPraticas.map((pratica, index) => (
              <li key={index} className="flex gap-3 items-start">
                <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <span className="text-foreground">{pratica}</span>
              </li>
            ))}
          </ul>
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
