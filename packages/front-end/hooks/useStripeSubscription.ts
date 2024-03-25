import { useFeature } from "@growthbook/growthbook-react";
import { SubscriptionQuote } from "back-end/types/organization";
import { useEffect, useState } from "react";
import { getValidDate } from "shared/dates";
import { useAuth } from "@front-end/services/auth";
import { useUser } from "@front-end/services/UserContext";
import usePermissions from "./usePermissions";

export default function useStripeSubscription() {
  const selfServePricingEnabled = useFeature("self-serve-billing").on;
  const showSeatOverageBanner = useFeature(
    "self-serve-billing-overage-warning-banner"
  ).on;

  const { organization, license } = useUser();

  //TODO: Remove this once we have moved the license off the organization
  const stripeSubscription =
    organization?.subscription || license?.stripeSubscription;

  const freeSeats = organization?.freeSeats || 3;

  const [quote, setQuote] = useState<SubscriptionQuote | null>(null);

  const { apiCall } = useAuth();
  const permissions = usePermissions();

  useEffect(() => {
    if (!permissions.manageBilling) return;

    apiCall<{ quote: SubscriptionQuote }>(`/subscription/quote`)
      .then((data) => {
        setQuote(data.quote);
      })
      .catch((e) => console.error(e));
  }, [freeSeats, permissions.manageBilling]);

  const activeAndInvitedUsers = quote?.activeAndInvitedUsers || 0;

  const subscriptionStatus = stripeSubscription?.status;

  const hasPaymentMethod = stripeSubscription?.hasPaymentMethod;

  // We will treat past_due as active so as to not interrupt users
  const hasActiveSubscription = ["active", "trialing", "past_due"].includes(
    subscriptionStatus || ""
  );

  const nextBillDate = new Date(
    (stripeSubscription?.current_period_end || 0) * 1000
  ).toDateString();

  const dateToBeCanceled = new Date(
    (stripeSubscription?.cancel_at || 0) * 1000
  ).toDateString();

  const cancelationDate = new Date(
    (stripeSubscription?.canceled_at || 0) * 1000
  ).toDateString();

  const pendingCancelation =
    stripeSubscription?.status !== "canceled" &&
    stripeSubscription?.cancel_at_period_end;

  const disableSelfServeBilling =
    organization?.disableSelfServeBilling || false;

  // eslint-disable-next-line
  let trialEnd = (stripeSubscription?.trialEnd || null) as any;
  if (typeof trialEnd === "number") {
    trialEnd = getValidDate(trialEnd * 1000);
  }

  return {
    freeSeats,
    quote: quote,
    nextBillDate,
    dateToBeCanceled,
    cancelationDate,
    subscriptionStatus,
    hasPaymentMethod,
    pendingCancelation,
    activeAndInvitedUsers,
    hasActiveSubscription,
    trialEnd: trialEnd as null | Date,
    showSeatOverageBanner,
    loading: !quote || !organization,
    canSubscribe:
      !disableSelfServeBilling &&
      !organization?.enterprise && //TODO: Remove this once we have moved the license off the organization
      license?.plan != "enterprise" &&
      selfServePricingEnabled &&
      !hasActiveSubscription,
  };
}
