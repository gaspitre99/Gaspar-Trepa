const { PrismaClient } = require('@prisma/client');

const database = new PrismaClient();

async function main() {
  try {
    const defaultUserId = process.env.SEED_USER_ID || 'system_seed_user';

    await database.category.createMany({
      data: [
        { name: 'Finanzas Personales' },
        { name: 'Inversiones' },
        { name: 'Economía' },
        { name: 'Trading' }
      ],
      skipDuplicates: true
    });

    const category1 = await database.category.findUnique({
      where: { name: 'Inversiones' }
    });

    if (category1) {
      await database.course.create({
        data: {
          userId: defaultUserId,
          title: 'Inversión Inicial: Plazos Fijos, Cauciones y Money Market',
          description: 'Aprende los fundamentos para hacer crecer tu capital con instrumentos conservadores del mercado local.',
          price: 15000,
          isPublished: true,
          categoryId: category1.id,
        }
      });

      await database.course.create({
        data: {
          userId: defaultUserId,
          title: 'Renta Variable y Cobertura: CEDEARs y Obligaciones Negociables',
          description: 'Domina los conceptos de renta variable y cómo proteger tu poder adquisitivo mediante CEDEARs.',
          price: 25000,
          isPublished: true,
          categoryId: category1.id,
        }
      });
    }

    console.log('Success seeding database with Argentine Finance Courses');
  } catch (error) {
    console.log('Error seeding the database categories/courses', error);
  } finally {
    await database.$disconnect();
  }
}

main();