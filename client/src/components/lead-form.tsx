import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { insertLeadSchema } from '@shared/schema';

interface LeadFormProps {
  plans?: Array<{
    id: string;
    name: string;
    type: string;
    speed: number;
    price: number;
  }>;
}

const phoneRegex = new RegExp(
  /^(?:\(\d{2}\)\s?)?\d{4,5}-?\d{4}$/
);

const formSchema = insertLeadSchema.extend({
  name: z.string().min(3, {
    message: "O nome deve ter pelo menos 3 caracteres.",
  }),
  phone: z.string().refine((val) => phoneRegex.test(val), {
    message: "Formato de telefone inválido. Use (XX) XXXXX-XXXX ou XXXXX-XXXX.",
  }),
});

const LeadForm = ({ plans = [] }: LeadFormProps) => {
  const { toast } = useToast();
  const [showSuccess, setShowSuccess] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      planId: "",
    },
  });

  const submitMutation = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      return apiRequest('POST', '/api/leads', data);
    },
    onSuccess: () => {
      setShowSuccess(true);
      form.reset();
      
      // Redirect to WhatsApp after 2 seconds
      setTimeout(() => {
        const name = form.getValues().name;
        const phone = "559991557588";
        const message = encodeURIComponent(`Olá! Estou interessado nos planos de internet da AGRONET. Meu nome é ${name}.`);
        window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
      }, 2000);
    },
    onError: (error) => {
      toast({
        title: "Erro ao enviar formulário",
        description: error.message || "Ocorreu um erro ao enviar seus dados. Tente novamente.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    submitMutation.mutate(data);
  };

  // Format phone as user types
  const formatPhone = (value: string) => {
    let cleaned = value.replace(/\D/g, '');
    
    if (cleaned.length <= 11) {
      let formatted = cleaned;
      
      if (cleaned.length > 2) {
        formatted = `(${cleaned.substring(0, 2)}) ${cleaned.substring(2)}`;
      }
      
      if (cleaned.length > 7) {
        // Handle both 8 and 9 digit numbers
        const separator = cleaned.length >= 11 ? 7 : 6;
        formatted = formatted.substring(0, separator + 4) + '-' + formatted.substring(separator + 4);
      }
      
      return formatted;
    }
    
    return value;
  };

  return (
    <div className="container mx-auto px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-xl p-6 md:p-8 border-2 border-agro-green">
        <h2 className="text-3xl font-bold text-center text-agro-dark mb-6">
          Solicite seu plano agora mesmo
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Preencha os dados abaixo e entraremos em contato com você!
        </p>
        
        {!showSuccess ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome completo*</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Digite seu nome completo" 
                          {...field} 
                          className="px-4 py-3"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefone*</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="(XX) XXXXX-XXXX" 
                          {...field} 
                          onChange={e => {
                            field.onChange(formatPhone(e.target.value));
                          }}
                          className="px-4 py-3"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="planId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Plano de interesse</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="px-4 py-3">
                            <SelectValue placeholder="Selecione um plano (opcional)" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {plans.length > 0 ? (
                            plans.map(plan => (
                              <SelectItem key={plan.id} value={plan.id}>
                                {plan.type} {plan.speed} MEGAS - R${plan.price.toFixed(2).replace('.', ',')}
                              </SelectItem>
                            ))
                          ) : (
                            <>
                              <SelectItem value="fibra-300">FIBRA 300 MEGAS - R$99,90</SelectItem>
                              <SelectItem value="fibra-400">FIBRA 400 MEGAS - R$119,90</SelectItem>
                              <SelectItem value="radio-50">RÁDIO 50 MEGAS - R$119,90</SelectItem>
                              <SelectItem value="outro">Outro / Não tenho certeza</SelectItem>
                            </>
                          )}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="pt-4">
                <Button 
                  type="submit" 
                  className="w-full bg-agro-orange hover:bg-amber-600 text-white font-bold py-7 px-6 rounded-md transition duration-300 text-lg h-auto"
                  disabled={submitMutation.isPending}
                >
                  {submitMutation.isPending ? (
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      FALAR COM CONSULTOR <i className="fab fa-whatsapp ml-2"></i>
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        ) : (
          <div className="bg-green-50 border border-green-200 text-green-700 rounded-md p-4 mt-6">
            <div className="flex">
              <CheckCircle2 className="text-green-500 text-xl mr-3" />
              <div>
                <h3 className="font-semibold">Solicitação enviada com sucesso!</h3>
                <p className="mt-1">Redirecionando para o WhatsApp do nosso consultor...</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeadForm;
