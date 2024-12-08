import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { contactFormSchemaServer } from '@/app/schemas/contactFormSchema';
import { Resend } from 'resend';
import { ContactEmailTemplate } from '@/app/emails/ContactEmailTemplate';
import { render } from '@react-email/render';

const prisma = new PrismaClient();
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();

    const parsedData = contactFormSchemaServer.safeParse(body);

    if (!parsedData.success) {
      return NextResponse.json({ error: parsedData.error.errors }, { status: 400 });
    }

    const { firstName, lastName, email, phone, description } = parsedData.data;

    const contact = await prisma.contact.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        description,
      },
    });

    await resend.emails.send({
      from: process.env.EMAIL_FROM || "",
      to: process.env.EMAIL_TO || "",
      subject: `Sporting Karaté Club: Nouveau message de ${firstName} ${lastName}`,
      html: await render(ContactEmailTemplate({ firstName, lastName, description, email, phone })),
    });

    return NextResponse.json({ contact, message: 'Email envoyé avec succès.' }, { status: 201 });
  } catch (error) {
    console.error('Erreur lors de la sauvegarde des données ou de l\'envoi de l\'email.', error);
    return NextResponse.json({ error: 'Erreur lors de la soumission du formulaire ou de l\'envoi de l\'email.' }, { status: 500 });
  }
}
