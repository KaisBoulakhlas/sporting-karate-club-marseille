"use client";
import Form from "@/components/Contact/Form";
import { Loader } from "@/components/UI/Loading/Loader";
import { locations } from "@/constants/data";
import dynamic from "next/dynamic";
import Head from "next/head";
import React from "react";

const Map = dynamic(() => import("@/components/Map/MapComponent"), {
  loading: () => <Loader />,
  ssr: false,
});

const Contact = () => {
  return (
    <>
      <Head>
        <title>Nous contacter</title>
        <meta name="description" content="Notre section pour nous contacter." />
      </Head>
      <div className="contact">
        <Form />
      </div>
      <div className="contact__map">
        <Map locations={locations} />
      </div>
    </>
  );
};

export default Contact;
