import type { FC } from "react";
import CreateCardForm from "~/widgets/create-card";
import { AppLogo } from "./app-logo";

export const AppHeader: FC = () => {
  return (
    <header className="w-full sticky top-0 left-0 backdrop-blur-2xl">
      <div className="xl:container mx-auto p-4 flex items-center justify-between">
        <AppLogo />

        <CreateCardForm />
      </div>
    </header>
  );
};
