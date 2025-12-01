import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Microscope, AlertTriangle, ShieldCheck } from "lucide-react";

const Estudante = () => {
  const navigate = useNavigate();

  // -----------------------------
  // Zoonoses Acadêmicas
  // -----------------------------
  const zoonoses = [
    {
      titulo: "Raiva",
      agente: "Vírus da raiva (Rhabdovirus – gênero Lyssavirus)",
      sinais: [
        "Mudanças comportamentais",
        "Agressividade ou apatia",
        "Hipersalivação",
        "Dificuldade de deglutição",
        "Paralisia",
      ],
      tratamento:
        "A raiva possui letalidade extremamente alta após o início dos sinais clínicos.",
      profilaxia: [
        "Vacinação de rotina em cães e gatos",
        "Evitar contato com animais silvestres",
        "Notificação imediata de casos suspeitos",
      ],
    },

    {
      titulo: "Toxoplasmose",
      agente: "Protozoário Toxoplasma gondii",
      sinais: [
        "Letargia",
        "Diarreia",
        "Perda de peso",
        "Sintomas respiratórios ou neurológicos em casos graves",
      ],
      tratamento:
        "O tratamento envolve medicamentos específicos, sempre acompanhado por médico veterinário.",
      profilaxia: [
        "Evitar oferecimento de carne crua",
        "Limpeza adequada de caixas de areia",
        "Higienização de verduras e utensílios",
      ],
    },

    {
      titulo: "Leptospirose",
      agente: "Bactérias do gênero Leptospira",
      sinais: [
        "Febre",
        "Letargia",
        "Alterações renais ou hepáticas",
        "Hemorragias",
      ],
      tratamento:
        "Acompanhamento clínico e suporte adequado são essenciais em casos suspeitos.",
      profilaxia: [
        "Vacinação anual de cães",
        "Controle de roedores",
        "Evitar contato com água contaminada",
      ],
    },

    {
      titulo: "Leishmaniose",
      agente: "Protozoário Leishmania infantum transmitido por flebotomíneos",
      sinais: [
        "Perda de peso progressiva",
        "Lesões cutâneas",
        "Crescimento exagerado das unhas",
        "Alterações renais",
      ],
      tratamento:
        "Exige acompanhamento de médico veterinário com protocolos autorizados.",
      profilaxia: [
        "Uso de coleiras repelentes",
        "Vacinação",
        "Controle vetorial",
      ],
    },

    {
      titulo: "Brucelose",
      agente: "Brucella abortus (bovinos) e Brucella canis (cães)",
      sinais: [
        "Abortos",
        "Infertilidade",
        "Febre intermitente",
        "Alterações reprodutivas",
      ],
      tratamento:
        "Há protocolos específicos e regulamentados para manejo dos animais positivos.",
      profilaxia: [
        "Vacinação obrigatória em bovinos",
        "Testagem periódica",
        "Controle reprodutivo",
      ],
    },

    {
      titulo: "Salmonelose",
      agente: "Bactérias do gênero Salmonella",
      sinais: [
        "Diarreia",
        "Febre",
        "Vômito",
        "Quadros sistêmicos em jovens",
      ],
      tratamento:
        "Envolve manejo clínico adequado e medidas sanitárias de suporte.",
      profilaxia: [
        "Higienização rigorosa",
        "Isolamento de animais suspeitos",
        "Cuidados com alimentação",
      ],
    },

    {
      titulo: "Esquistossomose",
      agente: "Trematódeo Schistosoma mansoni",
      sinais: ["Diarreia", "Emagrecimento", "Aumento de fígado e baço"],
      tratamento:
        "Acompanhamento veterinário é essencial para definição de condutas.",
      profilaxia: [
        "Controle de caramujos",
        "Saneamento adequado",
        "Evitar contato com água contaminada",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" onClick={() => navigate("/")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>

          <h1 className="text-2xl font-bold text-foreground mt-2">
            Material para Estudantes
          </h1>
          <p className="text-sm text-muted-foreground">
            Conteúdo acadêmico de Medicina Veterinária — zoonoses, biossegurança
            e conceitos essenciais.
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-5xl space-y-10">
        {/* Seção geral */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <Microscope className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">
              Zoonoses — Conceito Geral
            </h2>
          </div>

          <Card className="p-6 shadow-[var(--shadow-medium)]">
            <p className="text-muted-foreground leading-relaxed">
              Zoonoses são doenças transmitidas entre animais e seres humanos.
              Entender seus agentes, formas de transmissão e prevenção é
              fundamental para estudantes e para a saúde pública.
            </p>
          </Card>
        </section>

        {/* Classificação das Zoonoses */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <Microscope className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold">Classificação das Zoonoses</h2>
          </div>

          <Card className="p-6 space-y-3">
            <p>
              <strong>Antropozoonoses:</strong> Animal → Humano (ex.: raiva).
            </p>
            <p>
              <strong>Zooantroponoses:</strong> Humano → Animal (ex.:
              tuberculose).
            </p>
            <p>
              <strong>Amfixenoses:</strong> Transmissão bidirecional (ex.:
              dermatofitose).
            </p>
            <p>
              <strong>Sapronoses:</strong> Transmitidas a partir do ambiente.
            </p>
          </Card>
        </section>

        {/* Formas de transmissão */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <Microscope className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold">Formas de Transmissão</h2>
          </div>

          <Card className="p-6 space-y-2">
            <ul className="list-disc ml-6 space-y-1">
              <li>Transmissão vetorial (mosquitos, carrapatos etc.)</li>
              <li>Contato direto com secreções ou feridas</li>
              <li>Transmissão indireta via água, solo ou objetos</li>
              <li>Alimentar (ingestão de alimentos contaminados)</li>
              <li>Aerógena (gotículas, poeira)</li>
            </ul>
          </Card>
        </section>

        {/* Biossegurança */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <ShieldCheck className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold">Biossegurança</h2>
          </div>

          <Card className="p-6 space-y-2">
            <ul className="list-disc ml-6 space-y-1">
              <li>Uso adequado de EPIs</li>
              <li>Lavagem de mãos obrigatória</li>
              <li>Desinfecção de superfícies e equipamentos</li>
              <li>Isolamento de animais suspeitos</li>
              <li>Descarte correto de resíduos biológicos</li>
            </ul>
          </Card>
        </section>

        {/* Vacinas de interesse acadêmico */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <ShieldCheck className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold">Vacinas de Interesse</h2>
          </div>

          <Card className="p-6 space-y-3">
            <p className="font-semibold">Cães e gatos:</p>
            <ul className="list-disc ml-6 space-y-1">
              <li>Vacina antirrábica</li>
              <li>Vacinas polivalentes</li>
              <li>Leptospirose (quando indicada)</li>
            </ul>

            <p className="font-semibold mt-3">Bovinos:</p>
            <ul className="list-disc ml-6 space-y-1">
              <li>Vacinação contra brucelose (animais jovens)</li>
              <li>Vacinas para clostridioses</li>
            </ul>

            <p className="font-semibold mt-3">Equinos:</p>
            <ul className="list-disc ml-6 space-y-1">
              <li>Raiva</li>
              <li>Tétano</li>
              <li>Influenza</li>
            </ul>
          </Card>
        </section>

        {/* Doenças de notificação obrigatória */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="h-6 w-6 text-destructive" />
            <h2 className="text-2xl font-bold text-destructive">
              Doenças de Notificação Obrigatória
            </h2>
          </div>

          <Card className="p-6 space-y-2">
            <ul className="list-disc ml-6 space-y-1">
              <li>Raiva</li>
              <li>Brucelose</li>
              <li>Tuberculose</li>
              <li>Leishmaniose</li>
              <li>Influenza Aviária</li>
              <li>Febre Aftosa</li>
            </ul>
          </Card>
        </section>

        {/* Zoonoses detalhadas */}
        {zoonoses.map((z, index) => (
          <Card
            key={index}
            className="p-6 shadow-[var(--shadow-medium)] space-y-4"
          >
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" />
              {z.titulo}
            </h2>

            <div>
              <h3 className="font-semibold mb-1">Agente Etiológico:</h3>
              <p className="text-muted-foreground">{z.agente}</p>
            </div>

            <div>
              <h3 className="font-semibold mb-1">Sinais e Sintomas:</h3>
              <ul className="list-disc ml-6 text-muted-foreground space-y-1">
                {z.sinais.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-1">Tratamento:</h3>
              <p className="text-muted-foreground">{z.tratamento}</p>
            </div>

            <div>
              <h3 className="font-semibold mb-1">Profilaxia:</h3>
              <ul className="list-disc ml-6 text-muted-foreground space-y-1">
                {z.profilaxia.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>
          </Card>
        ))}

        {/* Aviso acadêmico */}
        <section>
          <Card className="p-6 shadow-[var(--shadow-medium)] border-destructive">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="h-6 w-6 text-destructive" />
              <h2 className="text-xl font-bold text-destructive">
                Aviso Importante
              </h2>
            </div>

            <p className="text-muted-foreground">
              Este conteúdo tem finalidade exclusivamente acadêmica. Para casos
              reais, protocolos oficiais e supervisão de médicos veterinários
              devem ser seguidos.
            </p>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Estudante;
