import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import { ReactNode } from 'react'
import { IconType } from "react-icons";

export interface NavLink {
  title: string
  link: string
  visible: UserRole[]
}

export interface TrainerProps {
  fullname: string;
  profession:string;
  description:string;
  image:string;
  reversed?:boolean;
  index?:number;
}

export interface HeadingType {
  title: string
  desc: string | any
}

export interface ContentType {
  title: string
  children: string | React.ReactElement
}

export interface TitleProps {
  title: string
  classModifier?: string;
}

export interface ToggleProps {
  toggle: boolean
  handleClick: () => void
}

export interface ButtonProps {
  size?: 'small' | 'large'
  text?: string
  icon?: ReactNode
  type?: 'button' | 'submit' | 'reset'
  onClick?: () => void
}

export interface ImageComponentProps {
  src: string | StaticImport
  alt: string
  loading?: 'eager' | 'lazy'
  width?: number
  height?: number
  hasLink: boolean
  className?:string
}

export interface BenefitsProps {
  icon: IconType
  desc: string
  iconColorClass: string
}

export interface FadeInSectionProps {
  children: ReactNode
}

export interface UseFadeInSectionProps {
  threshold?: number
}

export interface TestimonialProps {
  fullname: string;
  commentary: string;
}

export interface Post {
  id?: string;
  title: string;
  summary: string;
  content: string;
  imageUrl: string;
  publishedAt?: Date;
  author: string;
  slug:string;
}

export interface PricingPlanProps {
  price: string;
  title: string;
  summary:string;
  index:number;
}

export type OpeningHoursDataType = {
  days: string;
  hourBegin: string;
  hourEnd: string;
  minutesBegin?:string;
  minutesEnd?:string;
};

export type OpeningHoursByCategory = Record<"children" | "adults", OpeningHoursDataType[]>;

export interface VideoItem {
  id?: string;
  title?: string | null;
  src: string;
  type: "video" | string;
}

export interface ImageItem extends Omit<ImageComponentProps, "hasLink"> {
  id?: string;
  title?: string | null;
  src: string;
  type: "image" | string;
}


export type GalleryItemProps = ImageItem | VideoItem;


export function isImageItem(item: GalleryItemProps): item is ImageItem {
  return item.type === "image";
}

export function isVideoItem(item: GalleryItemProps): item is VideoItem {
  return item.type === "video";
}

export interface ModalProps {
  item: GalleryItemProps; 
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

type UserRole = "ADMIN" | "PUBLISHER" | "ADHERENT";

export interface User {
  id?:string;
  firstName: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  image?: string;
}
