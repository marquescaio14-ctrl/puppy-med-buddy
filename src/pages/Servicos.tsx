import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { 
  Syringe, 
  Shield, 
  Calculator, 
  BookOpen, 
  FileText,
  Users 
} from "lucide-react";

export default function Servicos() {
  const navigate = useNavigate();

  const services = [
    {
      icon: Syringe,
      title: "Protocolos de Vacinação",
      description: "Cronogramas completos de vacinação para filhotes caninos e felinos, com informações sobre cada vacina, doses recomendadas e períodos de aplicação.",
      path: "/vacinas",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: Shield,
      title: "Protocolos de Vermifugação",
      description: "Guias detalhados de vermifugação por idade, incluindo vermífugos recomendados, dosagens e observações importantes para cada fase.",
      path: "/vermifugacao",
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      icon: Calculator,
      title: "Calculadora de Doses",
      description: "Ferramenta profissional para cálculo preciso de dosagens de medicamentos baseadas no peso do animal (área profissional).",
      path: "/profissional",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: Users,
      title: "Guia para Tutores",
      description: "Informações essenciais sobre segurança na administração de medicamentos, substâncias perigosas, boas práticas e erros comuns a evitar.",
      path: "/tutores",
      color: "text-destructive",
      bgColor: "bg-destructive/10",
    },
    {
      icon: FileText,
      title: "Base de Referências",
      description: "Acesso a artigos científicos, materiais educativos e referências acadêmicas atualizadas sobre medicina veterinária de filhotes.",
      path: "/artigo",
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      icon: BookOpen,
      title: "Materiais Educativos",
      description: "Recursos para download, tabelas de referência rápida e materiais didáticos para estudantes e profissionais.",
      path: "/tutores",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">Nossos Serviços</h1>
        <p className="text-lg text-muted-foreground">
          Ferramentas e recursos completos para cuidados veterinários de filhotes
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <Card 
              key={service.title} 
              className="p-6 hover:shadow-[var(--shadow-medium)] transition-all hover:border-primary cursor-pointer group"
              onClick={() => navigate(service.path)}
            >
              <div className="flex flex-col h-full">
                <div className="flex items-start gap-4 mb-4">
                  <div className={`p-3 rounded-lg ${service.bgColor} group-hover:scale-110 transition-transform`}>
                    <Icon className={`h-6 w-6 ${service.color}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-xl mb-2 text-foreground">{service.title}</h3>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 flex-1">
                  {service.description}
                </p>
                <Button 
                  variant="outline" 
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                >
                  Acessar Serviço
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      <Card className="p-8 bg-primary/5 border-primary/20">
        <h2 className="text-2xl font-semibold mb-4 text-foreground">Compromisso com a Qualidade</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Todos os nossos serviços são baseados em evidências científicas e melhores práticas
          veterinárias. Mantemos nossa base de dados constantemente atualizada com as mais
          recentes pesquisas e protocolos aprovados.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Nosso objetivo é fornecer informações precisas e confiáveis para auxiliar
          profissionais, estudantes e tutores no cuidado adequado de filhotes, sempre
          enfatizando a importância do acompanhamento veterinário profissional.
        </p>
      </Card>
    </div>
  );
}
