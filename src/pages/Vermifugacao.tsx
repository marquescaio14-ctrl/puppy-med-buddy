import { useState } from "react";
import { Card } from "@/components/ui/card";
import { SearchBar } from "@/components/SearchBar";
import { Shield, AlertTriangle, Calendar, Weight } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import puppyHealthy from "@/assets/puppy-healthy.jpg";

interface Protocolo {
  idade: string;
  vermifugo: string;
  dosagem: string;
  observacoes: string;
}

const protocolos: Protocolo[] = [
  {
    idade: "2-4 semanas",
    vermifugo: "Fenbendazol",
    dosagem: "50 mg/kg por 3 dias consecutivos",
    observacoes: "Primeira vermifugação. Repetir a cada 2 semanas até 12 semanas"
  },
  {
    idade: "6-8 semanas",
    vermifugo: "Pirantel Pamoato",
    dosagem: "5-10 mg/kg dose única",
    observacoes: "Eficaz contra ancilostomídeos e ascarídeos"
  },
  {
    idade: "12 semanas",
    vermifugo: "Ivermectina + Praziquantel",
    dosagem: "Conforme peso do animal",
    observacoes: "Amplo espectro. Repetir mensalmente até 6 meses"
  },
  {
    idade: "6 meses em diante",
    vermifugo: "Manutenção Trimestral",
    dosagem: "Conforme recomendação veterinária",
    observacoes: "Protocolo preventivo de manutenção"
  }
];

const Vermifugacao = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProtocolos = protocolos.filter(
    (p) =>
      p.idade.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.vermifugo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="h-8 w-8 text-accent" />
            <h1 className="text-3xl font-bold text-foreground">Protocolos de Vermifugação</h1>
          </div>
          <p className="text-muted-foreground mb-6">
            Guia completo de vermifugação para filhotes de cães e gatos
          </p>
          
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Pesquisar por idade, vermífugo..."
          />
        </div>

        {/* Hero Image */}
        <div className="mb-8 rounded-lg overflow-hidden shadow-[var(--shadow-large)]">
          <img 
            src={puppyHealthy} 
            alt="Filhote saudável após vermifugação" 
            className="w-full h-64 object-cover"
          />
        </div>

        {/* Alert */}
        <Alert className="mb-8 border-accent bg-accent/10">
          <AlertTriangle className="h-5 w-5 text-accent" />
          <AlertDescription className="text-foreground">
            <strong>Importante:</strong> A vermifugação é essencial para a saúde dos filhotes. 
            Sempre siga as recomendações de um médico veterinário e o protocolo adequado para a idade e peso do animal.
          </AlertDescription>
        </Alert>

        {/* Protocolos */}
        <div className="grid gap-6">
          {filteredProtocolos.map((protocolo, index) => (
            <Card key={index} className="p-6 hover:shadow-[var(--shadow-medium)] transition-all border-2 hover:border-accent">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-accent/10">
                  <Calendar className="h-6 w-6 text-accent" />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground mb-3">{protocolo.idade}</h3>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">Vermífugo</p>
                      <p className="text-foreground font-medium">{protocolo.vermifugo}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">Dosagem</p>
                      <p className="text-foreground font-medium flex items-center gap-2">
                        <Weight className="h-4 w-4 text-accent" />
                        {protocolo.dosagem}
                      </p>
                    </div>
                  </div>

                  <Alert className="border-accent/30 bg-accent/5">
                    <AlertDescription className="text-sm text-foreground">
                      <strong>Observações:</strong> {protocolo.observacoes}
                    </AlertDescription>
                  </Alert>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredProtocolos.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Nenhum protocolo encontrado para sua pesquisa.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Vermifugacao;
