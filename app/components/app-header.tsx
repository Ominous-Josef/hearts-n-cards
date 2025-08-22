import type { FC } from "react";
import { AppLogo } from "./app-logo";
import { Button } from "./ui/button";

export const AppHeader: FC = () => {
  return (
    <header className="w-full sticky top-0 left-0 backdrop-blur-2xl">
      <div className="xl:container mx-auto p-4 flex items-center justify-between">
        <AppLogo />

        <Button>Create a card</Button>
      </div>
    </header>
  );
};
