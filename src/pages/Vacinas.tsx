import { useState } from "react";
import { Card } from "@/components/ui/card";
import { SearchBar } from "@/components/SearchBar";
import { Syringe, AlertTriangle, Calendar, ShieldCheck } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import puppyVaccine from "@/assets/puppy-vaccine.jpg";

interface Vacina {
  nome: string;
  idade: string;
  doencas: string[];
  doses: string;
  observacoes: string;
  tipo: "essencial" | "recomendada" | "opcional";
}

const vacinas: Vacina[] = [
  {
    nome: "V8 ou V10 (Polivalente)",
    idade: "6-8 semanas (1ª dose)",
    doencas: ["Cinomose", "Parvovirose", "Hepatite", "Parainfluenza", "Leptospirose", "Coronavirose"],
    doses: "3-4 doses com intervalo de 21-30 dias",
    observacoes: "Vacina essencial. Protege contra as doenças mais graves em filhotes",
    tipo: "essencial"
  },
  {
    nome: "Antirrábica",
    idade: "16 semanas",
    doencas: ["Raiva"],
    doses: "Dose única anual",
    observacoes: "Obrigatória por lei. Aplicar após completar série de V8/V10",
    tipo: "essencial"
  },
  {
    nome: "Gripe Canina (Tosse dos Canis)",
    idade: "8 semanas (1ª dose)",
    doencas: ["Bordetella bronchiseptica", "Parainfluenza"],
    doses: "2 doses com intervalo de 21-30 dias",
    observacoes: "Essencial para cães que frequentam creches, hotéis ou parques",
    tipo: "recomendada"
  },
];

const Vacinas = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredVacinas = vacinas.filter(
    (v) =>
      v.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.doencas.some(d => d.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getTipoBadgeColor = (tipo: string) => {
    switch (tipo) {
      case "essencial":
        return "bg-destructive/10 text-destructive border-destructive/30";
      case "recomendada":
        return "bg-accent/10 text-accent border-accent/30";
      default:
        return "bg-primary/10 text-primary border-primary/30";
    }
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Syringe className="h-8 w-8 text-accent" />
            <h1 className="text-3xl font-bold text-foreground">Calendário de Vacinação</h1>
          </div>
          <p className="text-muted-foreground mb-6">
            Guia completo de vacinação para filhotes de cães
          </p>
          
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Pesquisar por vacina ou doença..."
          />
        </div>

        {/* Hero Image */}
        <div className="mb-8 rounded-lg overflow-hidden shadow-[var(--shadow-large)]">
          <img 
            src={puppyVaccine} 
            alt="Filhote recebendo vacina" 
            className="w-full h-64 object-cover"
          />
        </div>

        {/* Alert */}
        <Alert className="mb-8 border-accent bg-accent/10">
          <ShieldCheck className="h-5 w-5 text-accent" />
          <AlertDescription className="text-foreground">
            <strong>Protocolo de Vacinação:</strong> As vacinas são fundamentais para proteger seu filhote. 
            Siga rigorosamente o cronograma recomendado pelo médico veterinário e mantenha a carteira de vacinação atualizada.
          </AlertDescription>
        </Alert>

        {/* Vacinas */}
        <div className="grid gap-6">
          {filteredVacinas.map((vacina, index) => (
            <Card key={index} className="p-6 hover:shadow-[var(--shadow-medium)] transition-all border-2 hover:border-accent">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-accent/10">
                  <Syringe className="h-6 w-6 text-accent" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-semibold text-foreground">{vacina.nome}</h3>
                    <span className={`text-xs font-medium px-3 py-1 rounded-full border ${getTipoBadgeColor(vacina.tipo)}`}>
                      {vacina.tipo.toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1 flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Idade Recomendada
                      </p>
                      <p className="text-foreground font-medium">{vacina.idade}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">Doses</p>
                      <p className="text-foreground font-medium">{vacina.doses}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-medium text-muted-foreground mb-2">Protege Contra:</p>
                    <div className="flex flex-wrap gap-2">
                      {vacina.doencas.map((doenca, idx) => (
                        <span key={idx} className="text-xs bg-accent/10 text-accent px-3 py-1 rounded-full border border-accent/30">
                          {doenca}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Alert className="border-accent/30 bg-accent/5">
                    <AlertTriangle className="h-4 w-4 text-accent" />
                    <AlertDescription className="text-sm text-foreground">
                      <strong>Observações:</strong> {vacina.observacoes}
                    </AlertDescription>
                  </Alert>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredVacinas.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Nenhuma vacina encontrada para sua pesquisa.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Vacinas;
