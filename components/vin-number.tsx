"use client";

import { useRef, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { Button } from "@nextui-org/button";

const NOW = new Date();
const NEXT_YEAR = NOW.getFullYear() + 1;

const VALIDModelYears = [NEXT_YEAR].map((modelYear) => ({
  label: modelYear.toString(),
  value: modelYear,
}));

const vinValidationSchema = Yup.object({
  modelYear: Yup.string()
    .matches(/^\d{4}$/, `You must have a valid model year i.e. ${NEXT_YEAR}`)
    .required(`4 Digit Model Is Required i.e. ${NEXT_YEAR}`),
  vinNumber: Yup.string()
    .matches(
      /^[a-z0-9]{17}$/i,
      "VIN Number must be 17 Alpha-Numeric Characters"
    )
    .required("VIN Number Is Required"),
});

export const VinNumberForm = () => {
  return (
    <article className="w-full">
      <Formik
        initialValues={{
          modelYear: NEXT_YEAR.toString(),
          vinNumber: "",
        }}
        validationSchema={vinValidationSchema}
        onSubmit={(vals, form) => {
          console.log({ vals });
          form.resetForm();
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
          dirty,
        }) => {
          const isDisabled = !isValid || !dirty || isSubmitting;

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
                defaultSelectedKeys={[NEXT_YEAR.toString()]}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.modelYear}
                isInvalid={!!touched.modelYear && !!errors.modelYear}
                errorMessage={touched.modelYear || errors.modelYear}
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
              <Button
                type="submit"
                disabled={isDisabled}
                style={{ cursor: isDisabled ? "not-allowed" : "pointer" }}
              >
                Submit
              </Button>
            </form>
          );
        }}
      </Formik>
    </article>
  );
};
