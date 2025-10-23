-- Criar tabela de materiais de referência
CREATE TABLE public.materiais_referencia (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  titulo TEXT NOT NULL,
  autores TEXT,
  tipo TEXT NOT NULL CHECK (tipo IN ('artigo_cientifico', 'guia_pratico', 'tabela_dosagens', 'protocolo_emergencia', 'outro')),
  descricao TEXT,
  url TEXT NOT NULL,
  ano INTEGER,
  revista_ou_fonte TEXT,
  categoria TEXT CHECK (categoria IN ('vacinacao', 'vermifugacao', 'medicamentos', 'doencas', 'geral')),
  publico BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Adicionar índices para melhor performance
CREATE INDEX idx_materiais_categoria ON public.materiais_referencia(categoria);
CREATE INDEX idx_materiais_tipo ON public.materiais_referencia(tipo);
CREATE INDEX idx_materiais_publico ON public.materiais_referencia(publico);

-- Habilitar RLS (Row Level Security)
ALTER TABLE public.materiais_referencia ENABLE ROW LEVEL SECURITY;

-- Política para leitura pública
CREATE POLICY "Materiais públicos são visíveis para todos"
ON public.materiais_referencia
FOR SELECT
USING (publico = true);

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Trigger para atualizar updated_at
CREATE TRIGGER update_materiais_referencia_updated_at
BEFORE UPDATE ON public.materiais_referencia
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Comentários nas colunas
COMMENT ON TABLE public.materiais_referencia IS 'Armazena materiais de referência científica e educacional para o guia veterinário';
COMMENT ON COLUMN public.materiais_referencia.tipo IS 'Tipo do material: artigo_cientifico, guia_pratico, tabela_dosagens, protocolo_emergencia, outro';
COMMENT ON COLUMN public.materiais_referencia.categoria IS 'Categoria temática: vacinacao, vermifugacao, medicamentos, doencas, geral';
COMMENT ON COLUMN public.materiais_referencia.publico IS 'Indica se o material está disponível publicamente';
