import {
   Card,
   CardContent,
   CardHeader,
   CardTitle,
} from "../../../../components/ui/card";
import ProductDetailsForm from "../../_components/forms/ProductDetailsForm";
import PageWithBackButton from "../../_components/PageWithBackButton";

export default function NewProductsPage() {
   return (
      <PageWithBackButton
         backButtonHref="/dashboard/products"
         pageTitle="Create Product"
      >
         <Card>
            <CardHeader>
               <CardTitle className="text-xl">Product Details</CardTitle>
            </CardHeader>
            <CardContent>
               <ProductDetailsForm />
            </CardContent>
         </Card>
      </PageWithBackButton>
   );
}
