"use-client";

import { auth } from "@clerk/nextjs/server";
import { getProduct } from "../../../../../server/db/products";
import { notFound } from "next/navigation";
import PageWithBackButton from "../../../_components/PageWithBackButton";
import { Tabs, TabsList, TabsTrigger } from "../../../../../components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import {
   Card,
   CardContent,
   CardHeader,
   CardTitle,
} from "../../../../../components/ui/card";
import ProductDetailsForm from "../../../_components/forms/ProductDetailsForm";

export default async function EditProductPage({
   params: { productId },
   searchParams: { tab = "details" },
}: {
   params: { productId: string };
   searchParams: { tab?: string };
}) {
   const { userId, redirectToSignIn } = await auth();
   if (userId == null) return redirectToSignIn();

   const product = await getProduct({ id: productId, userId });

   console.log(product);

   if (product == null) return notFound();

   return (
      <PageWithBackButton backButtonHref="/dashboard/products" pageTitle="Edit">
         <Tabs defaultValue={tab}>
            <TabsList className="bg-background/60">
               <TabsTrigger value="details">Details</TabsTrigger>
               <TabsTrigger value="country">Country</TabsTrigger>
               <TabsTrigger value="customization">Customization</TabsTrigger>
            </TabsList>
            <TabsContent value="details">
               <DetailsTab product={product} />
            </TabsContent>
            <TabsContent value="country">Country</TabsContent>
            <TabsContent value="customization">Customization</TabsContent>
         </Tabs>
      </PageWithBackButton>
   );
}

function DetailsTab({
   product,
}: {
   product: {
      id: string;
      name: string;
      description: string | null;
      url: string;
   };
}) {
   return (
      <Card>
         <CardHeader>
            <CardTitle className="text-xl">Product Details</CardTitle>
         </CardHeader>
         <CardContent>
            <ProductDetailsForm product={product} />
         </CardContent>
      </Card>
   );
}
