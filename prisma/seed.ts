import { posts } from '@/constants/data';
import { db } from '@/lib/db';
import { auth } from '@/lib/auth-better';
import { UserRole } from '@prisma/client';
import bcryptjs from 'bcryptjs';

async function main() {
  try {
    // Clean database
    await db.post.deleteMany();
    await db.account.deleteMany();
    await db.session.deleteMany();
    await db.user.deleteMany();
    await db.galleryItem.deleteMany();
    console.log("✓ Base de données vidée.");

    // Seed Posts
    await db.post.createMany({
      data: posts,
    });
    console.log(`✓ ${posts.length} posts ont été insérés !`);

    // Seed Users with passwords via Better Auth
    const testUsers = [
      {
        email: 'kaisboulakhlas9@gmail.com',
        password: 'Kais12345!',
        name: 'Developer',
        firstName: 'Kais',
        role: UserRole.ADMIN,
      },
      {
        email: 'gregory.vuidot@gmail.com',
        password: 'Gregory12345!',
        name: 'Vuidot',
        firstName: 'Grégory',
        role: UserRole.ADMIN,
      },
      {
        email: 'publisher1@example.com',
        password: 'Publisher12345!',
        name: 'Publieur',
        firstName: '1',
        role: UserRole.PUBLISHER,
      },
      {
        email: 'adherent1@example.com',
        password: 'Adherent12345!',
        name: 'Adherent',
        firstName: '1',
        role: UserRole.ADHERENT,
      },
      {
        email: 'adherent2@example.com',
        password: 'Adherent12345!',
        name: 'Adherent',
        firstName: '2',
        role: UserRole.ADHERENT,
      },
    ];

    // Create users with password hashing
    for (const testUser of testUsers) {
      try {
        // Hash the password
        const hashedPassword = await bcryptjs.hash(testUser.password, 10);

        // Create user directly with Prisma
        const user = await db.user.create({
          data: {
            email: testUser.email,
            name: testUser.name,
            firstName: testUser.firstName,
            role: testUser.role,
          },
        });

        // Create Account record with hashed password for Better Auth
        await db.account.create({
          data: {
            userId: user.id,
            accountId: testUser.email,
            providerId: "credential",
            password: hashedPassword,
          },
        });

        console.log(`✓ ${testUser.email} (${testUser.role}) créé`);
      } catch (error) {
        console.error(`✗ Erreur création ${testUser.email}:`, error);
      }
    }

    console.log(`✓ ${testUsers.length} utilisateurs ont été créés avec succès`);

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
