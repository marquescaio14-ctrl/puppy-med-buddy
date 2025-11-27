import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, Calculator, Pill, AlertTriangle } from "lucide-react";
import { SearchBar } from "@/components/SearchBar";
import { useSearchMaterials } from "@/hooks/useSearchMaterials";
import { MaterialSearchResults } from "@/components/MaterialSearchResults";
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
  {
    nome: "Prednisolona",
    dosagem: "0,5–1 mg/kg",
    intervalo: "a cada 24h (anti-inflamatório) ou a cada 12h (imunossupressor)",
    avisos: "Evitar em casos de infecção ativa; monitorar glicemia; não usar com AINEs",
  },
  {
    nome: "Enrofloxacina",
    dosagem: "5–10 mg/kg",
    intervalo: "a cada 24h",
    avisos: "Contraindicada em animais jovens (risco ortopédico); pode causar retinopatia em felinos em altas doses",
  },
  {
    nome: "Doxiciclina",
    dosagem: "5 mg/kg",
    intervalo: "a cada 12h",
    avisos: "Administrar com água/ comida para evitar esofagite em gatos; fotossensibilidade",
  },
  {
    nome: "Ivermectina",
    dosagem: "0,2–0,4 mg/kg",
    intervalo: "dose única ou conforme protocolo",
    avisos: "Contraindicada para Collies e raças MDR1; cuidado com intoxicação",
  },
  {
    nome: "Meloxicam",
    dosagem: "0,1 mg/kg (dose inicial), depois 0,05 mg/kg",
    intervalo: "a cada 24h",
    avisos: "Contraindicado em animais desidratados ou com doença renal; nunca associar a corticoides",
  },
  {
    nome: "Tramadol",
    dosagem: "2–4 mg/kg",
    intervalo: "a cada 8–12h",
    avisos: "Pode causar sedação; potencializa opioides e sedativos",
  },
  {
    nome: "Gabapentina",
    dosagem: "5–10 mg/kg",
    intervalo: "a cada 8–12h",
    avisos: "Pode causar sonolência; usar com cautela em doenças renais",
  },
  {
    nome: "Furosemida",
    dosagem: "1–2 mg/kg",
    intervalo: "a cada 8–12h",
    avisos: "Monitorar eletrólitos; risco de desidratação",
  },
  {
    nome: "Cloridrato de tramadol",
    dosagem: "2–5 mg/kg",
    intervalo: "a cada 8h",
    avisos: "Evitar em associação com antidepressivos (risco de síndrome serotoninérgica)",
  },
  {
    nome: "Cetoprofeno",
    dosagem: "1–2 mg/kg",
    intervalo: "a cada 24h",
    avisos: "Evitar em animais com doença gastrointestinal ou renal; não usar com corticoide",
  },
  {
    nome: "Maropitant (Cerenia)",
    dosagem: "1 mg/kg",
    intervalo: "a cada 24h",
    avisos: "Pode causar dor na aplicação subcutânea; excelente antiemético",
  },
  {
    nome: "Butorfanol",
    dosagem: "0,2–0,4 mg/kg",
    intervalo: "a cada 2–4h",
    avisos: "Ótimo antitussígeno; sedação comum; analgesia leve a moderada",
  },
  {
    nome: "Ranitidina",
    dosagem: "2 mg/kg",
    intervalo: "a cada 12h",
    avisos: "Menos utilizado hoje; pode causar alterações gastrointestinais",
  },
  {
    nome: "Ondansetrona",
    dosagem: "0,1–0,2 mg/kg",
    intervalo: "a cada 8–12h",
    avisos: "Antiemético potente; usar com cuidado em animais cardiopatas",
  },
  {
    nome: "Dipirona (Metamizol)",
    dosagem: "25–50 mg/kg",
    intervalo: "a cada 8h",
    avisos: "Pode causar hipotensão se aplicada IV muito rápido",
  },
  {
    nome: "Acepromazina",
    dosagem: "0,02–0,05 mg/kg",
    intervalo: "conforme necessidade",
    avisos: "Evitar em braquicefálicos e animais hipotensos; sedativo sem analgesia",
  },
  {
    nome: "Cetirizina",
    dosagem: "1 mg/kg",
    intervalo: "a cada 24h",
    avisos: "Antialérgico; pode causar leve sonolência",
  }
];

const Profissional = () => {
  const navigate = useNavigate();
  const [peso, setPeso] = useState("");
  const [medicamentoSelecionado, setMedicamentoSelecionado] = useState("");
  const [doseCalculada, setDoseCalculada] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { results: materialResults, isSearching } = useSearchMaterials(searchTerm);
  const [medicalSearch, setMedicalSearch] = useState('');
  const calcularDose = () => {
    if (!peso || !medicamentoSelecionado) return;

    const pesoNum = parseFloat(peso);
    const med = medicamentos.find((m) => m.nome === medicamentoSelecionado);

    if (!med) return;

    // Extrai todos os números da dosagem
    let numbers = med.dosagem.replace(",", ".").match(/\d+(?:\.\d+)?/g);

    if (!numbers || numbers.length === 0) return;

    const minDose = parseFloat(numbers[0]);
    const maxDose = numbers[1] ? parseFloat(numbers[1]) : minDose;

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
      m.nome.toLowerCase().includes(medicalSearch.toLowerCase()) ||
      m.avisos.toLowerCase().includes(medicalSearch.toLowerCase())
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
            placeholder="Pesquisar artigos científicos..."
          />
        </div>

        {/* Material Search Results */}
        <MaterialSearchResults
          results={materialResults}
          isSearching={isSearching}
          searchTerm={searchTerm}
        />

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

          <div className="mb-6">
            <SearchBar
              value={medicalSearch}
              onChange={setMedicalSearch}
              placeholder="Pesquisar medicamentos..."
            />
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
