import { basicPlanUsageLimit, premiumPlanUsageLimit } from 'constants/index'
import { addYears } from 'date-fns'

export const hasPremiumBillingCycleEnded = (billingCycleDate: string) => {
  const todayDate = new Date()
  const endDateForBilling = addYears(new Date(billingCycleDate), 1)

  return todayDate > endDateForBilling
}

export const hasBasicUsageLimitReached = (usageLimit: number) =>
  usageLimit + 1 > basicPlanUsageLimit

export const hasPremiumUsageLimitReached = (usageLimit: number) =>
  usageLimit + 1 > premiumPlanUsageLimit
