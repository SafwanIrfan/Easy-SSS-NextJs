import { db } from "../../drizzle/db";
import { UserSubscriptionTable } from "../../drizzle/schema";

export default function createUserSubscription(
   data: typeof UserSubscriptionTable.$inferInsert // $inferInsert means we can add whatever data from this table
) {
   return db.insert(UserSubscriptionTable).values(data).onConflictDoNothing({
      target: UserSubscriptionTable.clerkUserId,
   });
}
