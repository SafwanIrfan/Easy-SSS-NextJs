import { eq } from "drizzle-orm";
import { db } from "../../drizzle/db";
import { ProductTable, UserSubscriptionTable } from "../../drizzle/schema";

export function deleteUser(clerkUserId: string) {
   // purpose of batch function is that it goes line by line and
   //  if any of them fail then whole bracket fails
   return db.batch([
      db
         .delete(UserSubscriptionTable)
         .where(eq(UserSubscriptionTable.clerkUserId, clerkUserId)),
      db.delete(ProductTable).where(eq(ProductTable.clerkUserId, clerkUserId)),
   ]);
}
