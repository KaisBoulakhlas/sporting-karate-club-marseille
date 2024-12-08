"use server"
import { db } from "@/lib/db";
import { ContactFormDataServer, contactFormSchemaServer } from "@/app/schemas/contactFormSchema";
import { Resend } from "resend";
import { ContactEmailTemplate } from "@/app/emails/ContactEmailTemplate";
import { render } from "@react-email/render";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitContactForm(data: ContactFormDataServer) {
  try {

    const parsedData = contactFormSchemaServer.safeParse(data);

    if (!parsedData.success) {
        return { error: "Champs invalides !" };
    }

    const { firstName, lastName, email, phone, description } = parsedData.data;

    const contact = await db.contact.create({
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
      html: await render(
        ContactEmailTemplate({
          firstName,
          lastName,
          description,
          email,
          phone,
        })
      ),
    });

    return { success: true };
  } catch (error) {
    console.error(
      "Erreur lors de la sauvegarde des données ou de l'envoi de l'email.",
      error
    );
    return { error: "Erreur lors de la soumission du formulaire." };
  }
}
