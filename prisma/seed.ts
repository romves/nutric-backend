import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const commonAllergies = [
    {
      name: 'Lactose',
      description: 'Intolerance to lactose found in dairy products',
    },
    {
      name: 'Gluten',
      description:
        'Allergy or sensitivity to gluten found in wheat and related grains',
    },
    { name: 'Peanut', description: 'Allergy to peanuts' },
    {
      name: 'Shellfish',
      description: 'Allergy to shellfish such as shrimp, crab, and lobster',
    },
    { name: 'Soy', description: 'Allergy to soy and soy products' },
    { name: 'Egg', description: 'Allergy to eggs or egg proteins' },
    {
      name: 'Tree nut',
      description: 'Allergy to tree nuts such as almonds, cashews, and walnuts',
    },
    { name: 'Wheat', description: 'Allergy to wheat' },
    {
      name: 'Fish',
      description: 'Allergy to fish like salmon, tuna, and other seafood',
    },
  ];

  for (const allergy of commonAllergies) {
    await prisma.allergy.create({
      data: {
        name: allergy.name,
        description: allergy.description,
      },
    });
  }

  console.log('Allergies seeded successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding allergies:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
