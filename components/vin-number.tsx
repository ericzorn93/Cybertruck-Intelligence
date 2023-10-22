"use client";

import { useRef, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { Button } from "@nextui-org/button";

const VALIDModelYears = [2024].map((modelYear) => ({
  label: modelYear.toString(),
  value: modelYear,
}));

const vinValidationSchema = Yup.object({
  modelYear: Yup.string().length(4, "You must have a valid model year"),
  vinNumber: Yup.string()
    .min(17, "VIN Number must be 17 characters")
    .max(17, "VIN Number must be 17 characters"),
});

export const VinNumberForm = () => {
  const currentYear = useRef<number>(new Date().getFullYear());
  const nextYear = currentYear.current + 1;

  return (
    <article className="w-full">
      <Formik
        initialValues={{
          modelYear: nextYear.toString(),
          vinNumber: "",
        }}
        validationSchema={vinValidationSchema}
        onSubmit={(form) => {
          console.log({ vals: form });
        }}
      >
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          errors,
          touched,
          isValid,
        }) => {
          console.log({ isValid });
          return (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 w-full"
            >
              <Select
                name="modelYear"
                items={VALIDModelYears}
                label="Model Year"
                placeholder="Select a Modal Year You Have"
                variant="bordered"
                defaultSelectedKeys={[nextYear.toString()]}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.modelYear}
              >
                {(modelYear) => (
                  <SelectItem key={modelYear.label} value={modelYear.value}>
                    {modelYear.value.toString()}
                  </SelectItem>
                )}
              </Select>
              <Input
                name="vinNumber"
                variant="bordered"
                label="Please Enter Your VIN Number"
                description="Find and Validate Your Cybertruck Vin Number"
                labelPlacement="inside"
                fullWidth={false}
                size="lg"
                radius="md"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.vinNumber}
                isInvalid={!!touched.vinNumber && !!errors.vinNumber}
                errorMessage={touched.vinNumber && errors.vinNumber}
              />
              <Button type="submit" disabled={!isValid || isSubmitting}>
                Submit
              </Button>
            </form>
          );
        }}
      </Formik>
    </article>
  );
};
