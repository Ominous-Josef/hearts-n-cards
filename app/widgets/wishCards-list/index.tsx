"use client";

import type { FC } from "react";
import { WishCard } from "~/components/wishCard";

export const WishCardsList: FC = () => {
  return (
    <div className="relative">
      <div className="grid lg:grid-cols-4">
        <WishCard />
      </div>
    </div>
  );
};
