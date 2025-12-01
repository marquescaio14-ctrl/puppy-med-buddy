import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Stethoscope, GraduationCap, Heart } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const userTypes = [
    {
      title: "Para Veterinários",
      description: "Acesse dosagens de medicações e calculadora de doses profissional",
      icon: Stethoscope,
      path: "/profissional",
      gradient: "from-primary to-primary/80",
    },
    {
      title: "Para Estudantes",
      description: "Ferramentas e informações para estudantes de medicina veterinária",
      icon: GraduationCap,
      path: "/estudantes",
      gradient: "from-accent/80 to-accent",
    },
    {
      title: "Para Tutores Responsáveis",
      description: "Informações de segurança e boas práticas na administração de medicamentos",
      icon: Heart,
      path: "/tutores",
      gradient: "from-destructive to-destructive/80",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <Stethoscope className="h-8 w-8 text-accent" />
            <div>
            <h1 className="text-2xl font-bold text-foreground">Puppy Guide</h1>
              <p className="text-sm text-muted-foreground">Guia Veterinário para Filhotes</p>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="mx-auto max-w-3xl text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Bem-vindo ao Puppy Guide
          </h2>
          <p className="text-lg text-muted-foreground">
            Guia veterinário completo com informações precisas para profissionais, estudantes e tutores responsáveis.
          </p>
        </div>

        {/* User Type Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {userTypes.map((type) => {
            const Icon = type.icon;
            return (
              <Card
                key={type.title}
                className="group relative overflow-hidden border-2 hover:border-primary transition-all duration-300 cursor-pointer hover:shadow-[var(--shadow-medium)]"
                onClick={() => navigate(type.path)}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${type.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                
                <div className="relative p-8 flex flex-col items-center text-center space-y-4">
                  <div className={`p-4 rounded-2xl bg-gradient-to-br ${type.gradient} shadow-[var(--shadow-soft)]`}>
                    <Icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-foreground">
                    {type.title}
                  </h3>
                  
                  <p className="text-muted-foreground">
                    {type.description}
                  </p>
                  
                  <Button 
                    className="w-full mt-4 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-[var(--shadow-soft)]"
                  >
                    Acessar
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 backdrop-blur-sm mt-20">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>© 2025 Puppy Guide. Todos os direitos reservados.</p>
          <p className="mt-2">
            Informações de referência. Sempre consulte um médico veterinário qualificado.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
