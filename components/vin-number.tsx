"use client";

import { Input } from "@nextui-org/input";
import { useState } from "react";

export const VinNumber = () => {
  const [vinNumber, setVinNumber] = useState<string>("");

  return (
    <Input
      variant="bordered"
      label="Please Enter Your VIN Number"
      description="Find and Validate Your Cybertruck Vin Number"
      labelPlacement="inside"
      fullWidth={false}
      size="lg"
      radius="md"
      onChange={(e) => setVinNumber(e.target.value)}
      value={vinNumber}
    />
  );
};
