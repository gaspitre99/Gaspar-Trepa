'use client';
import React, { useState } from 'react';
import * as z from 'zod';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Pencil } from 'lucide-react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { Course } from '@prisma/client';

type ExternalCheckoutFormProps = {
  initialData: Course;
  courseId: string;
};

const formSchema = z.object({
  externalCheckoutUrl: z.string().url({ message: 'Debe ser una URL válida' }).or(z.literal('')),
});

export default function ExternalCheckoutForm({ courseId, initialData }: ExternalCheckoutFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      externalCheckoutUrl: initialData?.externalCheckoutUrl || '',
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const toggleEdit = () => setIsEditing((current) => !current);
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success('Curso actualizado');
      toggleEdit();
      router.refresh();
    } catch {
      toast.error('Algo salió mal');
    }
  };
  return (
    <div className='mt-6 boder bg-slate-100 rounded-md p-4'>
      <div className='font-medium flex items-center justify-between gapy1'>
        URL de Pago Externo (ej. Mercado Pago)
        <Button onClick={toggleEdit} variant={'ghost'}>
          {isEditing ? (
            <>Cancelar</>
          ) : (
            <>
              <Pencil className='h-4 w-4 mr-2' />
              Editar URL
            </>
          )}
        </Button>
      </div>
      {!isEditing ? (
        <p className='text-sm mt-2'>{initialData.externalCheckoutUrl || 'Sin URL configurada'}</p>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name='externalCheckoutUrl'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input disabled={isSubmitting} placeholder='Ej. "https://mpago.la/..."' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex items-center mt-2 gap-x-2'>
              <Button disabled={!isValid || isSubmitting}>Guardar</Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
}
