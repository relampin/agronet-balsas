import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Check, Loader2 } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { InternetPlan } from '@/lib/types';
import { FaWhatsapp } from 'react-icons/fa';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface LeadFormProps {
  plans: InternetPlan[];
}

const formSchema = z.object({
  name: z.string().min(3, { message: 'O nome é obrigatório' }),
  phone: z.string().regex(/^\(\d{2}\)\s\d{5}-\d{4}$|^\d{10,11}$/, {
    message: 'Formato: (00) 00000-0000',
  }),
  planId: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const LeadForm = ({ plans }: LeadFormProps) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phone: '',
      planId: '',
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: FormValues) => {
      return apiRequest('POST', '/api/leads', values);
    },
    onSuccess: (_, variables) => {
      setIsSubmitted(true);
      setTimeout(() => {
        // Redirect to WhatsApp
        const phone = '559991557588';
        const message = encodeURIComponent(
          `Olá! Estou interessado nos planos de internet da AGRONET. Meu nome é ${variables.name}.`
        );
        window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
      }, 2000);
    },
    onError: (error) => {
      toast({
        title: 'Erro ao enviar formulário',
        description: (error as Error).message || 'Tente novamente mais tarde',
        variant: 'destructive',
      });
    },
  });

  // Format phone as (00) 00000-0000
  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length <= 11) {
      let formatted = digits;
      if (digits.length > 2) {
        formatted = `(${digits.substring(0, 2)}) ${digits.substring(2)}`;
      }
      if (digits.length > 7) {
        formatted = formatted.substring(0, 10) + '-' + formatted.substring(10);
      }
      return formatted;
    }
    return value;
  };

  const onSubmit = (values: FormValues) => {
    mutate(values);
  };

  return (
    <section id="lead-form" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-xl p-6 md:p-8 border-2 border-primary">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Solicite seu plano agora mesmo
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Preencha os dados abaixo e entraremos em contato com você!
          </p>

          {!isSubmitted ? (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Nome completo*</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Digite seu nome completo"
                          className="px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary"
                          {...field}
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
                      <FormLabel className="text-gray-700">Telefone*</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="(00) 00000-0000"
                          className="px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary"
                          {...field}
                          onChange={(e) => {
                            field.onChange(formatPhone(e.target.value));
                          }}
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
                      <FormLabel className="text-gray-700">Plano de interesse</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary">
                            <SelectValue placeholder="Selecione um plano (opcional)" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {plans.map((plan) => (
                            <SelectItem key={plan.id} value={plan.id}>
                              {plan.type} {plan.speed} MEGAS - R${Number(plan.price).toFixed(2).replace('.', ',')}
                            </SelectItem>
                          ))}
                          <SelectItem value="outro">Outro / Não tenho certeza</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="pt-4">
                  <Button
                    type="submit"
                    className="w-full bg-accent hover:bg-accent/90 text-white font-bold py-4 px-6 rounded-md transition duration-300 text-lg"
                    disabled={isPending}
                  >
                    {isPending ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        FALAR COM CONSULTOR <FaWhatsapp className="ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          ) : (
            <div className="bg-green-50 border border-green-200 text-green-700 rounded-md p-4 mt-6">
              <div className="flex">
                <Check className="text-green-500 h-6 w-6 mr-3" />
                <div>
                  <h3 className="font-semibold">Solicitação enviada com sucesso!</h3>
                  <p className="mt-1">Redirecionando para o WhatsApp do nosso consultor...</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default LeadForm;
