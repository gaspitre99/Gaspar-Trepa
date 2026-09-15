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
import { formatPrice } from '@/lib/format';
import { Course } from '@prisma/client';

type PriceFormProps = {
  initialData: Course;
  courseId: string;
};

const formSchema = z.object({
  price: z.coerce.number().min(0, { message: 'El precio debe ser 0 o superior' }),
});

export default function PriceForm({ courseId, initialData }: PriceFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      price: initialData?.price || undefined,
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
        Precio del curso
        <Button onClick={toggleEdit} variant={'ghost'}>
          {isEditing ? (
            <>Cancelar</>
          ) : (
            <>
              <Pencil className='h-4 w-4 mr-2' />
              Editar precio
            </>
          )}
        </Button>
      </div>
      {!isEditing ? (
        <p className='text-sm mt-2'>{initialData.price !== null ? formatPrice(initialData.price) : 'Sin precio'}</p>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name='price'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="number" disabled={isSubmitting} placeholder='Ej. "15000"' {...field} />
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
