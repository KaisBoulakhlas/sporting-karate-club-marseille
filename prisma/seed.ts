import { posts } from '@/constants/data';
import { db } from '@/lib/db';
import { Post, User } from '@/types/types';
import { UserRole } from '@prisma/client';
import bcrypt from 'bcryptjs';

async function main() {
  await db.post.deleteMany();
  await db.user.deleteMany();
  await db.galleryItem.deleteMany();
  console.log("Base de données vidée.");

  await db.post.createMany({
    data: posts,
  });

  console.log("Les posts ont été insérés !");

   const password = await bcrypt.hash('password123', 10);

   const users: User[] = [
    { 
      name: 'Admin User',
      firstName:"test",
      email: 'admin@example.com',
      password,
      role: UserRole.ADMIN,
    },
    {
      name: 'Publisher One',
      firstName:"test2",
      email: 'publisher1@example.com',
      password,
      role: UserRole.PUBLISHER,
    },
    {
      name: 'Publisher Two',
      firstName:"test3",
      email: 'publisher2@example.com',
      password,
      role: UserRole.PUBLISHER,
    },
    {
      name: 'Adherent One',
      firstName:"test4",
      email: 'adherent1@example.com',
      password,
      role: UserRole.ADHERENT,
    },
    {
      name: 'Adherent Two',
      firstName:"test5",
      email: 'adherent2@example.com',
      password,
      role: UserRole.ADHERENT,
    },
  ];

  await db.user.createMany({
    data: users,
  });

   console.log('5 utilisateurs ont été créés avec succès');
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
  console.log('10 items de galerie ont été créés avec succès');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
