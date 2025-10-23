import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, Calculator, Pill, AlertTriangle } from "lucide-react";
import { SearchBar } from "@/components/SearchBar";
import medicationsImage from "@/assets/medications.jpg";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Medicamento {
  nome: string;
  dosagem: string;
  intervalo: string;
  avisos: string;
}

const medicamentos: Medicamento[] = [
  {
    nome: "Amoxicilina + Clavulanato",
    dosagem: "12,5 mg/kg",
    intervalo: "a cada 12h",
    avisos: "Monitorar função hepática em tratamentos prolongados",
  },
  {
    nome: "Cefalexina",
    dosagem: "15-30 mg/kg",
    intervalo: "a cada 12h",
    avisos: "Administrar com alimento para melhor absorção",
  },
  {
    nome: "Metronidazol",
    dosagem: "10-15 mg/kg",
    intervalo: "a cada 12h",
    avisos: "Pode causar náusea; administrar com alimento",
  },
  {
    nome: "Omeprazol",
    dosagem: "0,5-1 mg/kg",
    intervalo: "a cada 24h",
    avisos: "Administrar em jejum, 30 minutos antes da alimentação",
  },
  {
    nome: "Dipirona",
    dosagem: "25 mg/kg",
    intervalo: "a cada 8-12h",
    avisos: "Uso prolongado pode causar alterações hematológicas",
  },
];

const Profissional = () => {
  const navigate = useNavigate();
  const [peso, setPeso] = useState("");
  const [medicamentoSelecionado, setMedicamentoSelecionado] = useState("");
  const [doseCalculada, setDoseCalculada] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const calcularDose = () => {
    if (!peso || !medicamentoSelecionado) return;

    const pesoNum = parseFloat(peso);
    const med = medicamentos.find((m) => m.nome === medicamentoSelecionado);
    
    if (!med) return;

    // Extract dosage range
    const dosageMatch = med.dosagem.match(/(\d+(?:\.\d+)?)-?(\d+(?:\.\d+)?)?/);
    if (!dosageMatch) return;

    const minDose = parseFloat(dosageMatch[1]);
    const maxDose = dosageMatch[2] ? parseFloat(dosageMatch[2]) : minDose;

    const doseMin = (minDose * pesoNum).toFixed(2);
    const doseMax = maxDose !== minDose ? (maxDose * pesoNum).toFixed(2) : null;

    setDoseCalculada(
      doseMax 
        ? `${doseMin} - ${doseMax} mg ${med.intervalo}` 
        : `${doseMin} mg ${med.intervalo}`
    );
  };

  const filteredMedicamentos = medicamentos.filter(
    (m) =>
      m.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.avisos.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <h1 className="text-2xl font-bold text-foreground">Área Profissional</h1>
          <p className="text-sm text-muted-foreground">
            Dosagens e calculadora para veterinários e estudantes
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Search Bar */}
        <div className="mb-6">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Pesquisar medicamentos..."
          />
        </div>

        {/* Hero Image */}
        <div className="mb-8 rounded-lg overflow-hidden shadow-[var(--shadow-large)]">
          <img 
            src={medicationsImage} 
            alt="Medicamentos veterinários" 
            className="w-full h-48 object-cover"
          />
        </div>
        {/* Calculadora de Doses */}
        <Card className="mb-8 p-6 shadow-[var(--shadow-medium)]">
          <div className="flex items-center gap-2 mb-4">
            <Calculator className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">Calculadora de Doses</h2>
          </div>

          <Alert className="mb-6 border-accent bg-accent/10">
            <AlertTriangle className="h-4 w-4 text-accent" />
            <AlertDescription className="text-foreground">
              <strong>Atenção:</strong> Esta calculadora é apenas uma ferramenta de referência. 
              Sempre consulte um médico veterinário antes de administrar qualquer medicamento.
            </AlertDescription>
          </Alert>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <Label htmlFor="peso">Peso do Filhote (kg)</Label>
              <Input
                id="peso"
                type="number"
                placeholder="Ex: 5.5"
                value={peso}
                onChange={(e) => setPeso(e.target.value)}
                step="0.1"
                min="0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="medicamento">Medicamento</Label>
              <Select value={medicamentoSelecionado} onValueChange={setMedicamentoSelecionado}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o medicamento" />
                </SelectTrigger>
                <SelectContent>
                  {medicamentos.map((med) => (
                    <SelectItem key={med.nome} value={med.nome}>
                      {med.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            onClick={calcularDose} 
            className="w-full bg-gradient-to-r from-primary to-primary/90"
            disabled={!peso || !medicamentoSelecionado}
          >
            Calcular Dose
          </Button>

          {doseCalculada && (
            <Alert className="mt-4 border-primary bg-primary/10">
              <Calculator className="h-4 w-4 text-primary" />
              <AlertDescription className="text-foreground">
                <strong>Dose Calculada:</strong> {doseCalculada}
              </AlertDescription>
            </Alert>
          )}
        </Card>

        {/* Lista de Medicamentos */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Pill className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">Dosagens de Medicações</h2>
          </div>

          {filteredMedicamentos.map((med) => (
            <Card key={med.nome} className="p-6 hover:shadow-[var(--shadow-medium)] transition-all border-2 hover:border-accent">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-accent/10">
                  <Pill className="h-6 w-6 text-accent" />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground mb-3">{med.nome}</h3>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-3">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Dosagem</p>
                      <p className="text-foreground font-medium">{med.dosagem}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Intervalo</p>
                      <p className="text-foreground font-medium">{med.intervalo}</p>
                    </div>
                  </div>

                  <Alert className="border-accent/30 bg-accent/5">
                    <AlertTriangle className="h-4 w-4 text-accent" />
                    <AlertDescription className="text-sm text-foreground">
                      <strong>Avisos:</strong> {med.avisos}
                    </AlertDescription>
                  </Alert>
                </div>
              </div>
            </Card>
          ))}
          
          {filteredMedicamentos.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Nenhum medicamento encontrado para sua pesquisa.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profissional;
