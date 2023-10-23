"use client";

import { useState } from "react";
import { Card, CardBody } from "@nextui-org/card";

import { VinNumberForm } from "@/components/vin-number";

export default function Home() {
  const [messageCard, setMessageCard] = useState<"error" | "success" | null>(
    null
  );

  const handleMessageCardShow = (isValid: boolean | null) => {
    if (isValid == null) {
      setMessageCard(null);
      return;
    }

    if (!isValid) {
      setMessageCard("error");
    } else {
      setMessageCard("success");
    }
  };

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      Tesla Cybertruck Details
      <VinNumberForm handleMessageCardShow={handleMessageCardShow} />
      {messageCard === "error" && (
        <Card>
          <CardBody className="text-red-400">VIN Number is Incorred</CardBody>
        </Card>
      )}
      {messageCard === "success" && (
        <Card>
          <CardBody className="text-green-400">VIN Number is Correct</CardBody>
        </Card>
      )}
    </section>
  );
}
