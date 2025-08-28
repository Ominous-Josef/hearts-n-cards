"use client";

import type { FC } from "react";
import { Button } from "~/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";

export const WishCard: FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Happy Birthday</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-3 font-dancing-script">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem facere
          inventore vel obcaecati eveniet quos minus, quas voluptas voluptates!
          Quaerat quas laboriosam quod molestiae, qui iusto quae aspernatur
          vitae provident!
        </p>
      </CardContent>
      <CardFooter>
        <Button variant={"secondary"}>View card</Button>
      </CardFooter>
    </Card>
  );
};
