import { Button } from "~/components/ui/button";
import CreateCardForm from "./widgets/create-card";

export function meta() {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <section className="bg-primary min-h-[70vh] grid content-center">
      <div className="grid h-full items-center text-center gap-6">
        <div className="block space-y-2 text-white">
          <h1 className="text-xl">Find your inspiration</h1>
          <p className="text-sm">
            Discover card and themes that spark your creativity
          </p>
        </div>
        <div className="flex p-4 bg-white items-center gap-4 rounded-md max-w-md mx-auto">
          <input
            type="text"
            className="text-sm border-none outline-none w-full"
            placeholder="Search by card title or code"
          />
          <Button>Search</Button>
        </div>
        <div className="bg-white w-full p-4 text-center">
          <CreateCardForm />
        </div>
      </div>
    </section>
  );
}
