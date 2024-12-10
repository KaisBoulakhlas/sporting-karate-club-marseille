"use client";
import Form from "@/components/Contact/Form";
import Spinner from "@/components/UI/Spinner";
import { locations } from "@/constants/data";
import dynamic from "next/dynamic";
import Head from "next/head";
import React, { useMemo } from "react";

const Contact = () => {
  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/Map/MapComponent"), {
        loading: () => <Spinner />,
        ssr: false,
      }),
    []
  );
  return (
    <>
      <Head>
        <title>Nous contacter</title>
        <meta name="description" content="Notre section pour nous contacter." />
      </Head>
      <div className="contact">
        <Form />
        <div className="contact__map">
          <Map locations={locations} />
        </div>
      </div>
    </>
  );
};

export default Contact;
