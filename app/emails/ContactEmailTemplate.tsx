import * as React from "react";
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Heading,
  Text,
} from "@react-email/components";
import { ReactElement } from "react";

interface ContactEmailProps {
  firstName: string;
  lastName: string;
  description: string;
  email: string;
  phone?: string;
}

export const ContactEmailTemplate = ({
  firstName,
  lastName,
  description,
  email,
  phone,
}: ContactEmailProps): ReactElement => {
  return (
    <Html>
      <Head />
      <Preview>
        Nouveau message de {firstName || "Prénom inconnu"}{" "}
        {lastName || "Nom inconnu"}
      </Preview>
      <Body>
        <Container>
          <Heading>
            Nouveau message de {firstName || "Prénom inconnu"}{" "}
            {lastName || "Nom inconnu"}
          </Heading>
          <Text>Email: {email || "Email inconnu"}</Text>
          {phone && <Text>Téléphone: {phone || "Téléphone inconnu"}</Text>}
          <Text>Vous avez reçu un nouveau message :</Text>
          <Text>{description || "Aucune description fournie."}</Text>
        </Container>
      </Body>
    </Html>
  );
};

export default ContactEmailTemplate;
