import { posts } from '@/constants/data';
import { db } from '@/lib/db';
import { UserRole } from '@prisma/client';

async function main() {
  try {
    // Clean database
    await db.post.deleteMany();
    await db.user.deleteMany();
    await db.galleryItem.deleteMany();
    console.log("✓ Base de données vidée.");

    // Seed Posts
    await db.post.createMany({
      data: posts,
    });
    console.log(`✓ ${posts.length} posts ont été insérés !`);

    // Seed Users (without passwords - Better Auth manages authentication)
    const users = [
      {
        name: 'Developer',
        firstName: "Kais",
        email: 'kaisboulakhlas9@gmail.com',
        role: UserRole.ADMIN,
      },
      {
        name: 'Vuidot',
        firstName: "Grégory",
        email: 'gregory.vuidot@gmail.com',
        role: UserRole.ADMIN,
      },
      {
        name: 'Publieur',
        firstName: "1",
        email: 'publisher1@example.com',
        role: UserRole.PUBLISHER,
      },
      {
        name: 'Adherent',
        firstName: "1",
        email: 'adherent1@example.com',
        role: UserRole.ADHERENT,
      },
      {
        name: 'Adherent',
        firstName: "2",
        email: 'adherent2@example.com',
        role: UserRole.ADHERENT,
      },
    ];

    await db.user.createMany({
      data: users,
    });
    console.log(`✓ ${users.length} utilisateurs ont été créés avec succès`);

    // Seed Gallery Items
    const galleryItems = [
      { title: 'Image 1', src: '/images/funakoshi.webp', type: 'image' },
      { title: 'Image 2', src: '/images/daniel.webp', type: 'image' },
      { title: 'Image 7', src: '/video/banner.mp4', type: 'video' },
      { title: 'Image 3', src: '/images/notreclub.webp', type: 'image' },
      { title: 'Image 4', src: '/images/college-giono.webp', type: 'image' },
      { title: 'Image 5', src: '/images/wadoryu.webp', type: 'image' },
      { title: 'Image 6', src: '/images/teachers.webp', type: 'image' },
    ];

    await db.galleryItem.createMany({
      data: galleryItems,
    });
    console.log(`✓ ${galleryItems.length} items de galerie ont été créés avec succès`);

    console.log('\n✅ Seeding completed successfully!');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  } finally {
    await db.$disconnect();
  }
}

main();
