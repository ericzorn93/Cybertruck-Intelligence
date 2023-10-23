import { VinNumberForm } from "@/components/vin-number";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="w-full">
        <p className="my-3">VIN Number Validator</p>
        <VinNumberForm />
      </div>
    </section>
  );
}
