import { eq } from "drizzle-orm";
import { db } from "../../drizzle/db";
import { ProductTable, UserSubscriptionTable } from "../../drizzle/schema";
import { CACHE_TAGS, revalidateDbCache } from "../../lib/cache";

export async function deleteUser(clerkUserId: string) {
   // purpose of batch function is that it goes line by line and
   //  if any of them fail then whole bracket fails
   const [userSubscriptions, products] = await db.batch([
      db
         .delete(UserSubscriptionTable)
         .where(eq(UserSubscriptionTable.clerkUserId, clerkUserId))
         .returning({ id: UserSubscriptionTable.id }),
      db
         .delete(ProductTable)
         .where(eq(ProductTable.clerkUserId, clerkUserId))
         .returning({ id: ProductTable.id }),
   ]);

   userSubscriptions.forEach((sub) => {
      revalidateDbCache({
         tag: CACHE_TAGS.subscription,
         id: sub.id,
         userId: clerkUserId,
      });
   });

   products.forEach((pro) => {
      revalidateDbCache({
         tag: CACHE_TAGS.products,
         id: pro.id,
         userId: clerkUserId,
      });
   });

   return [userSubscriptions, products];
}
