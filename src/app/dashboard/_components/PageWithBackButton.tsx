import { ReactNode } from "react";
import { Button } from "../../../components/ui/button";
import { CaretLeftIcon } from "@radix-ui/react-icons";

import Link from "next/link";

export default function PageWithBackButton({
   backButtonHref,
   pageTitle,
   children,
}: {
   backButtonHref: string;
   pageTitle: string;
   children: ReactNode;
}) {
   // [auto_1fr] left column as small as possible and right column as large as possible
   return (
      <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-8">
         <Button size="icon" className="rounded-full" variant="outline" asChild>
            <Link href={backButtonHref}>
               <div className="sr-only">Back</div>
               <CaretLeftIcon className="size-8" />
            </Link>
         </Button>
         <h1 className="font-semibold text-2xl self-center">{pageTitle}</h1>
         <div className="col-start-2">{children}</div>
      </div>
   );
}
