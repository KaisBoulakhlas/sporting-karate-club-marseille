"use client";
import Form from "@/components/Contact/Form";
import MapComponent from "@/components/Map/MapComponent";
import Spinner from "@/components/UI/Spinner";
import { locations } from "@/constants/data";
import dynamic from "next/dynamic";
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
    <div className="contact">
      <Form />
      <div className="contact__map">
        <Map locations={locations} />
      </div>
    </div>
  );
};

export default Contact;
