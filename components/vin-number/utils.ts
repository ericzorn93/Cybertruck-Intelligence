export function getValidModelYears(): number[] {
  const now = new Date();
  const thisYear = now.getFullYear();
  const nextYear = thisYear + 1;

  return [nextYear];
}

export function getModelYearOptions() {
  const activeModelYears = getValidModelYears();

  return activeModelYears.map((modelYear) => ({
    label: modelYear.toString(),
    value: modelYear,
  }));
}

export class CyberTruckVinNumberValidator {
  private vinNumber: string;

  private isValid: boolean;

  constructor(vinNumber: string) {
    this.vinNumber = vinNumber.toLowerCase();
    this.isValid = true;
  }

  private markValid(isValid: boolean): void {
    if (!this.isValid) return;
    this.isValid = isValid;
  }

  public validateVINLength(): CyberTruckVinNumberValidator {
    this.markValid(this.vinNumber.length === 17);
    return this;
  }

  public validateIsVINTeslaTruck(): CyberTruckVinNumberValidator {
    this.markValid(/7G2/i.test(this.vinNumber));
    return this;
  }

  public validIsCyberTruck(): CyberTruckVinNumberValidator {
    const fourthChar = this.vinNumber.charAt(4 - 1);
    this.markValid(fourthChar.toUpperCase() === "C");
    return this;
  }

  public validIsChassisType(): CyberTruckVinNumberValidator {
    const fifthChar = this.vinNumber.charAt(5 - 1);
    this.markValid(/B|E/i.test(fifthChar));

    return this;
  }

  /**
   * Validates whether the truck is (G) Class G
   * Greater than 3629 kg. to 4082 kg. (8,001-9,000 Ibs.) or
   * (H) Class H Greater than 4082 kg. to 4536 kg. (9,001-10,000 Ibs.)
   */
  public validWeight(): CyberTruckVinNumberValidator {
    const sixthChar = this.vinNumber.charAt(6 - 1);
    this.markValid(/G|H/i.test(sixthChar));

    return this;
  }

  public validFuelType(): CyberTruckVinNumberValidator {
    const seventhChar = this.vinNumber.charAt(7 - 1);
    this.markValid(seventhChar.toUpperCase() === "E");

    return this;
  }

  /**
   * Validates whether the truck is (D) Dual Motor or (E)
   * Tri Motor. More motor types to come.
   */
  public validMotorDriveUnitBreaking(): CyberTruckVinNumberValidator {
    const eigthChar = this.vinNumber.charAt(8 - 1);
    this.markValid(/D|E/i.test(eigthChar));

    return this;
  }

  public validCheckDigit(): CyberTruckVinNumberValidator {
    // TODO: Update when known by Tesla
    this.markValid(true);

    return this;
  }

  public validModelYear(): CyberTruckVinNumberValidator {
    const tenthChar = this.vinNumber.charAt(10 - 1);
    this.markValid(/R/i.test(tenthChar));

    return this;
  }

  /**
   * Validates whether the truck has been been built in
   * (N) Reno, NV or (A) Austin, TX
   */
  public validPlantOfManufacture(): CyberTruckVinNumberValidator {
    const eleventhCharacter = this.vinNumber.charAt(11 - 1);
    this.markValid(/N|A/i.test(eleventhCharacter));

    return this;
  }

  /**
   * Serial number must be all numeric
   */
  public validSerialNumber(): CyberTruckVinNumberValidator {
    const serialNumber = this.vinNumber.substring(12 - 1);
    this.markValid(/[0-9]{6}/.test(serialNumber));

    return this;
  }

  public validate(): boolean {
    return this.isValid;
  }
}
