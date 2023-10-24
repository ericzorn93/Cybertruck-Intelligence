"use client";

import { FC, useRef, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";

import {
  CyberTruckVinNumberValidator,
  getModelYearOptions,
  getMotorType,
  getSerialNumber,
} from "./utils";
import { Card, CardBody, CardHeader } from "@nextui-org/card";

// Constants
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

export const VinNumberForm: FC = () => {
  const activeModelYearOptions = useRef(getModelYearOptions());
  const [vinNumberErrorMessage, setVinNumberErrorMessage] = useState<
    string | null
  >(null);
  const [vinNumberSuccessMessage, setVinNumberSuccessMessage] = useState<
    string | null
  >(null);

  return (
    <article className="w-full">
      <Formik
        initialValues={{
          modelYear: NEXT_YEAR.toString(),
          vinNumber: "",
        }}
        validationSchema={vinValidationSchema}
        onSubmit={(vals, form) => {
          form.setSubmitting(true);

          // Validate VIN Number
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
            setVinNumberErrorMessage("CyberTruck VIN Number Invalid");
            setVinNumberSuccessMessage(null);
            return;
          }

          // Reset Form State
          form.setSubmitting(false);
          form.resetForm();

          const motorType = getMotorType(vals.vinNumber);
          const serialNumber = getSerialNumber(vals.vinNumber);
          setVinNumberSuccessMessage(
            `This is a ${motorType} with Serial Number ${serialNumber}`
          );
          setVinNumberErrorMessage(null);
        }}
      >
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          resetForm,
          isSubmitting,
          errors,
          touched,
          isValid,
          dirty,
        }) => {
          const isDisabled = !isValid || isSubmitting || !dirty;

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
              <div className="flex gap-2 justify-between">
                <Button
                  className="flex-1"
                  type="submit"
                  disabled={isDisabled}
                  style={{ cursor: isDisabled ? "not-allowed" : "pointer" }}
                >
                  Submit
                </Button>
                <Button
                  type="button"
                  variant="bordered"
                  onClick={() => {
                    resetForm();
                    setVinNumberErrorMessage(null);
                    setVinNumberSuccessMessage(null);
                  }}
                >
                  Reset
                </Button>
              </div>
            </form>
          );
        }}
      </Formik>

      {/* SHOW FORM MESSAGES */}
      {vinNumberErrorMessage && (
        <Card className="mt-3">
          <CardHeader>Sorry, please enter a different VIN number.</CardHeader>
          <Divider />
          <CardBody>
            <p className="text-red-500">{vinNumberErrorMessage}</p>
          </CardBody>
        </Card>
      )}

      {vinNumberSuccessMessage && (
        <Card className="mt-3">
          <CardHeader>Yay, this is a valid Cybertruck Vin Number!</CardHeader>
          <Divider />
          <CardBody>
            <p className="text-green-500">{vinNumberSuccessMessage}</p>
          </CardBody>
        </Card>
      )}
    </article>
  );
};
