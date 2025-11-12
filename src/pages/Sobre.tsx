import { Card } from "@/components/ui/card";
import { Heart, Shield, BookOpen, Users } from "lucide-react";

export default function Sobre() {
  const features = [
    {
      icon: Heart,
      title: "Cuidado Veterinário",
      description: "Informações baseadas em evidências científicas e melhores práticas veterinárias.",
    },
    {
      icon: Shield,
      title: "Segurança em Primeiro Lugar",
      description: "Sempre com foco na segurança e bem-estar dos filhotes.",
    },
    {
      icon: BookOpen,
      title: "Educação Continuada",
      description: "Conteúdo atualizado com as últimas pesquisas e protocolos veterinários.",
    },
    {
      icon: Users,
      title: "Para Todos",
      description: "Recursos para veterinários, estudantes e tutores responsáveis.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">Sobre o Puppy Guide</h1>
        <p className="text-lg text-muted-foreground">
          Sua fonte confiável de informações veterinárias para cuidados com filhotes
        </p>
      </div>

      <Card className="p-8 mb-8 bg-card">
        <h2 className="text-2xl font-semibold mb-4 text-foreground">Nossa Missão</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          O Puppy Guide foi criado para ser uma plataforma completa e confiável de informações
          veterinárias, focada no cuidado de filhotes caninos e felinos. Nossa missão é fornecer
          informações precisas e atualizadas para profissionais veterinários, estudantes e tutores
          responsáveis.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Baseamos todas as nossas informações em referências científicas e acadêmicas, sempre
          enfatizando a importância da consulta veterinária profissional. A automedicação pode
          ser perigosa e até fatal para filhotes.
        </p>
      </Card>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <Card key={feature.title} className="p-6 hover:shadow-[var(--shadow-medium)] transition-shadow">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2 text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <Card className="p-8 bg-destructive/5 border-destructive/20">
        <h2 className="text-2xl font-semibold mb-4 text-foreground flex items-center gap-2">
          <Shield className="h-6 w-6 text-destructive" />
          Disclaimer Importante
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          ⚠️ As informações aqui contidas são para referência e <strong>NÃO SUBSTITUEM</strong> a
          consulta e o acompanhamento de um médico veterinário. <strong>NUNCA</strong> administre
          medicamentos sem orientação veterinária. A automedicação pode ser <strong>FATAL</strong>{" "}
          para filhotes. Muitos medicamentos seguros para humanos são extremamente tóxicos para
          cães e gatos. Em caso de dúvidas ou emergências, procure imediatamente um profissional
          qualificado.
        </p>
      </Card>
    </div>
  );
}
