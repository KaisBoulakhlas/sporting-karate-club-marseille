import {
  FaHandshake,
  FaHeadSideVirus,
  FaHeart,
  FaHeartbeat,
  FaMeh,
  FaPersonBooth,
  FaRegHandshake,
  FaRegHeart,
} from 'react-icons/fa'

// import { images } from "@/constants/images";
import { BenefitsProps, GalleryItemProps, OpeningHoursByCategory, OpeningHoursDataType, Post, PricingPlanProps, TrainerProps } from '@/types/types';
import { Location } from '@/components/Map/MapComponent';
import { UserRole } from '@prisma/client';

export const links = [
  {
    title: 'Blog',
    link:'/blog',
    visible:[]
  },
  {
    title: 'Galerie',
    link:'/galerie',
    visible:[]
  },
  {
    title: 'Cours',
    link:'/cours',
    visible:[]
  },
  {
    title: 'Contact',
    link:'/contact',
    visible:[]
  },
  {
    title: 'Back-office',
    link:'/back-office',
    visible:[UserRole.ADMIN,UserRole.PUBLISHER]
  },
]

export const trainers: TrainerProps[] = [
  {fullname:"Grégory Vuidot", profession:"Ceinture noire 4ème dan", description:"Lorem ipsum gkgldfgkdlfldglkfd", image:"/images/test.png"},
  {fullname:"Grégory Vuidot", profession:"Ceinture noire 3ème dan", description:"Lorem ipsum gkgldfgkdlfldglkfd", image:"/images/test.png"},
]
export const locations: Location[] = [
  { id: 1, name: "Collège Jean Giono", coordinates: [43.33537, 5.43568] },
  { id: 2, name: "Gymnase Parette Mazenode", coordinates: [43.286554, 5.430142] },
];


export const benefits: BenefitsProps[] = [
  {
    desc: 'Amélioration de la capacité cardio-vasculaire',
    icon: FaHeartbeat,
    iconColorClass: 'icon-red',
  },
  {
    desc: 'Augmentation de la capacité de concentration',
    icon: FaHeadSideVirus,
    iconColorClass: 'icon-blue',
  },
  {
    desc: 'Accroissement de la confiance en soi',
    icon: FaRegHandshake,
    iconColorClass: 'icon-gold',
  },
  {
    desc: 'Facilité à gérer le stress',
    icon: FaMeh,
    iconColorClass: 'icon-black',
  },
]

export const testimonials = [
  {
    fullname:"Kaïs Boulakhlas",
    commentary: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis reprehenderit cum nam fugiat laborum provident quam sit et nihil quidem, excepturi nobis odit placeat a! Debitis delectus alias dolore incidunt.',
  },
  {
    fullname:"Test Boulakhlas",
    commentary: 'Lorem ipsum dolor sit amDebitis delectus alias dolore incidunt.',
  },
  {
    fullname:"Test2 Boulakhlas",
    commentary: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis reprehenderit cum nam fugiat laborum provident quam sit et nihil quidem, excepturi nobis odit placeat a! Debitis delectus alias dolore incidunt.',
  }
]

export const posts: Post[] = [
  {
    title: "Post 1 Title",
    summary: "This is a summary of the first post.",
    content: "This is the content of the first post.",
    imageUrl: "/images/funakoshi.webp",
    author: "Author 1",
    slug:"post-1-title"
  },
  {
    title: "Post 2 Title",
    summary: "This is a summary of the second post.",
    content: "This is the content of the second post.",
    imageUrl: "/images/funakoshi.webp",
    author: "Author 2",
    slug:"post-2-title"
  },
  {
    title: "Post 3 Title",
    summary: "This is a summary of the third post.",
    content: "This is the content of the third post.",
    imageUrl: "/images/funakoshi.webp",
    author: "Author 3",
    slug:"post-3-title"
  },
  {
    title: "Post 4 Title",
    summary: "This is a summary of the fourth post.",
    content: "This is the content of the fourth post.This is the content of the first post.This is the content of the first post.This is the content of the first post.This is the content of the first post.This is the content of the first post.This is the content of the first post.This is the content of the first post.This is the content of the first post.This is the content of the first post.This is the content of the first post.This is the content of the first post.This is the content of the first post.This is the content of the first post.This is the content of the first post.This is the content of the first post.This is the content of the first post.This is the content of the first post.This is the content of the first post.This is the content of the first post.This is the content of the first post.This is the content of the first post.This is the content of the first post.This is the content of the first post.This is the content of the first post.This is the content of the first post.",
    imageUrl: "/images/funakoshi.webp",
    author: "Author 4",
    slug:"post-4-title"
  }
]

export const items: GalleryItemProps[] = [
  { src: "/images/funakoshi.webp", type: "image", alt:"funakoshi"},
  { src: "/images/wadoryu.webp", type: "image", alt:"funakoshi"},
  { src: "/video/banner.mp4", type: "video"},
  { src: "/images/funakoshi.webp", type: "image", alt:"funakoshi"},
  { src: "/images/wadoryu.webp", type: "image", alt:"funakoshi"},
  { src: "/video/banner.mp4", type: "video"},
  { src: "/images/funakoshi.webp", type: "image", alt:"funakoshi"},
  { src: "/images/wadoryu.webp", type: "image", alt:"funakoshi"},
  { src: "/video/banner.mp4", type: "video"},
  { src: "/images/funakoshi.webp", type: "image", alt:"funakoshi"},
  { src: "/images/wadoryu.webp", type: "image", alt:"funakoshi"},
  { src: "/video/banner.mp4", type: "video"},
  { src: "/images/funakoshi.webp", type: "image", alt:"funakoshi"},
  { src: "/images/wadoryu.webp", type: "image", alt:"funakoshi"},
  { src: "/video/banner.mp4", type: "video"},
  { src: "/images/funakoshi.webp", type: "image", alt:"funakoshi"},
  { src: "/images/wadoryu.webp", type: "image", alt:"funakoshi"},
  { src: "/video/banner.mp4", type: "video"},
  { src: "/images/funakoshi.webp", type: "image", alt:"funakoshi"},
  { src: "/images/wadoryu.webp", type: "image", alt:"funakoshi"},
  { src: "/video/banner.mp4", type: "video"},
  { src: "/images/funakoshi.webp", type: "image", alt:"funakoshi"},
  { src: "/images/wadoryu.webp", type: "image", alt:"funakoshi"},
  { src: "/video/banner.mp4", type: "video"},
]

export const pricingPlans : PricingPlanProps[] = [
  {
    price: "15.00€",
    title: "Enfants",
    summary: "- This is a summary of the first post.- This is a summary of the first post.- This is a summary of the first post.",
    index:0
  },
  {
    price: "20.00€",
    title: "Adulte",
    summary: "- This is a summary of the first post.- This is a summary of the first post.- This is a summary of the first post.",
    index:1
  },
]

export const openingHoursData: OpeningHoursByCategory = {
  children: [
    {
      days: "Lundi - Mercredi",
      hourBegin: "18",
      hourEnd:"19"
    }
  ],
  adults: [
    {
      days: "Lundi - Mercredi",
      hourBegin: "19",
      hourEnd:"20",
      minutesEnd: "30"
    }
  ],
};


  
