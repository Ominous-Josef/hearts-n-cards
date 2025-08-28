import { Button } from "~/components/ui/button";
import { WishCardsList } from "~/widgets/wishCards-list";

export function meta() {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <main>
      <section className="bg-primary min-h-[70vh] grid content-center">
        <div className="grid h-full items-center text-center gap-6">
          <div className="block space-y-2 text-white">
            <h1 className="text-xl">Find your inspiration</h1>
            <p className="text-sm">
              Discover card and themes that spark your creativity
            </p>
          </div>
          <div className="flex p-4 bg-white items-center gap-4 w-full rounded-md max-w-md mx-auto">
            <input
              type="text"
              className="text-sm border-none outline-none w-full"
              placeholder="Search by card title or code"
            />
            <Button>Search</Button>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="xl:container mx-auto p-4 space-y-4">
          <h1 className="text-center text-lg font-semibold">
            Check out some of our cards
          </h1>
          <WishCardsList />
        </div>
      </section>
    </main>
  );
}
