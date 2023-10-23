"use client";

import { Formik } from "formik";
import * as Yup from "yup";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { Button } from "@nextui-org/button";
import {
  CyberTruckVinNumberValidator,
  getModelYearOptions,
  getValidModelYears,
} from "./utils";
import { useRef } from "react";

const NOW = new Date();
const NEXT_YEAR = NOW.getFullYear() + 1;

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
  const activeModelYearOptions = useRef(getModelYearOptions());

  return (
    <article className="w-full">
      <Formik
        initialValues={{
          modelYear: NEXT_YEAR.toString(),
          vinNumber: "",
        }}
        validationSchema={vinValidationSchema}
        onSubmit={(vals, form) => {
          const validator = new CyberTruckVinNumberValidator(vals.vinNumber);
          const isValid = validator
            .validateVINLength()
            .validateIsVINTeslaTruck()
            .validIsCyberTruck()
            .validIsChassisType()
            .validWeight()
            .validWeight()
            .validFuelType()
            .validMotorDriveUnitBreaking()
            .validCheckDigit()
            .validModelYear()
            .validPlantOfManufacture()
            .validSerialNumber()
            .validate();

          if (!isValid) {
            form.setSubmitting(false);
            form.setErrors({
              modelYear: "Must Be a Valid Model Year",
              vinNumber: "Must Be a Valid VIN Number",
            });
            return;
          }

          form.setSubmitting(false);
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
        }) => {
          const isDisabled = !isValid || isSubmitting;
          console.log({ isValid, isSubmitting });

          return (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 w-full"
            >
              <Select
                name="modelYear"
                items={activeModelYearOptions.current}
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
                value={values.vinNumber.toUpperCase()}
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
