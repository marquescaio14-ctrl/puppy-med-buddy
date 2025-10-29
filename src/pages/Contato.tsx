import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Contato() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    assunto: "",
    mensagem: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação básica
    if (!formData.nome || !formData.email || !formData.mensagem) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    // Aqui você pode adicionar a lógica de envio do formulário
    toast({
      title: "Mensagem enviada!",
      description: "Obrigado pelo contato. Retornaremos em breve.",
    });

    // Limpar formulário
    setFormData({
      nome: "",
      email: "",
      assunto: "",
      mensagem: "",
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      content: "contato@puppymedbuddy.com",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: Phone,
      title: "Telefone",
      content: "+55 (11) 1234-5678",
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      icon: MapPin,
      title: "Localização",
      content: "São Paulo, SP - Brasil",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">Entre em Contato</h1>
        <p className="text-lg text-muted-foreground">
          Estamos aqui para ajudar. Envie sua mensagem ou sugestão
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {contactInfo.map((info) => {
          const Icon = info.icon;
          return (
            <Card key={info.title} className="p-6 text-center hover:shadow-[var(--shadow-medium)] transition-shadow">
              <div className={`inline-flex p-4 rounded-full ${info.bgColor} mb-4`}>
                <Icon className={`h-6 w-6 ${info.color}`} />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-foreground">{info.title}</h3>
              <p className="text-muted-foreground">{info.content}</p>
            </Card>
          );
        })}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="p-8">
          <h2 className="text-2xl font-semibold mb-6 text-foreground">Envie uma Mensagem</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="nome">Nome Completo *</Label>
              <Input
                id="nome"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                placeholder="Seu nome"
                required
              />
            </div>

            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="seu@email.com"
                required
              />
            </div>

            <div>
              <Label htmlFor="assunto">Assunto</Label>
              <Input
                id="assunto"
                value={formData.assunto}
                onChange={(e) => setFormData({ ...formData, assunto: e.target.value })}
                placeholder="Sobre o que você quer falar?"
              />
            </div>

            <div>
              <Label htmlFor="mensagem">Mensagem *</Label>
              <Textarea
                id="mensagem"
                value={formData.mensagem}
                onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
                placeholder="Escreva sua mensagem aqui..."
                rows={6}
                required
              />
            </div>

            <Button type="submit" className="w-full" size="lg">
              <Send className="h-4 w-4 mr-2" />
              Enviar Mensagem
            </Button>
          </form>
        </Card>

        <div className="space-y-6">
          <Card className="p-8 bg-primary/5 border-primary/20">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Horário de Atendimento</h2>
            <div className="space-y-3 text-muted-foreground">
              <p className="flex justify-between">
                <span className="font-medium">Segunda a Sexta:</span>
                <span>8h - 18h</span>
              </p>
              <p className="flex justify-between">
                <span className="font-medium">Sábado:</span>
                <span>9h - 13h</span>
              </p>
              <p className="flex justify-between">
                <span className="font-medium">Domingo:</span>
                <span>Fechado</span>
              </p>
            </div>
          </Card>

          <Card className="p-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">FAQ</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  Quanto tempo leva para responder?
                </h3>
                <p className="text-muted-foreground text-sm">
                  Respondemos todas as mensagens em até 24 horas úteis.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  Posso fazer consultas veterinárias?
                </h3>
                <p className="text-muted-foreground text-sm">
                  Não realizamos consultas online. Para emergências, procure um veterinário imediatamente.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  Como posso contribuir?
                </h3>
                <p className="text-muted-foreground text-sm">
                  Entre em contato conosco para saber como colaborar com conteúdo científico.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
