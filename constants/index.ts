export const expensesCategory: Record<string, { name: string; emoji: string }> =
  {
    '': { name: 'Select', emoji: ' ' },
    education: { name: 'Education', emoji: '📚' },
    entertainment: { name: 'Entertainment', emoji: '🍿' },
    bills: { name: 'Bills', emoji: '🧾' },
    food: { name: 'Food', emoji: '🍔' },
    cash: { name: 'Cash', emoji: '💵' },
    grocery: { name: 'Grocery', emoji: '🛒' },
    order: { name: 'Online Order', emoji: '📦' },
    other: { name: 'Others', emoji: '🤷🏻‍♂️' },
    emi: { name: 'EMI', emoji: '🤑' },
    upi: { name: 'UPI', emoji: '📲' },
    creditcard: { name: 'Credit Card', emoji: '💳' },
    savings: { name: 'Savings', emoji: '💰' },
    medical: { name: 'Medical', emoji: '🏥' },
    rent: { name: 'Rent', emoji: '🏠' },
    shopping: { name: 'Shopping', emoji: '🛍️' },
    travel: { name: 'Travel', emoji: '✈️' }
  }

export const groupedExpensesCategory: Record<
  string,
  {
    name: string
    list: Record<string, { name: string; emoji: string }>
  }
> = {
  dailyessentials: {
    name: 'Essentials',
    list: {
      food: expensesCategory.food,
      grocery: expensesCategory.grocery,
      medical: expensesCategory.medical
    }
  },
  expenses: {
    name: 'Expenses',
    list: {
      bills: expensesCategory.bills,
      education: expensesCategory.education,
      order: expensesCategory.order,
      rent: expensesCategory.rent
    }
  },
  leisure: {
    name: 'Leisure',
    list: {
      entertainment: expensesCategory.entertainment,
      shopping: expensesCategory.shopping,
      travel: expensesCategory.travel
    }
  },
  payments: {
    name: 'Payments',
    list: {
      cash: expensesCategory.cash,
      creditcard: expensesCategory.creditcard,
      emi: expensesCategory.emi,
      savings: expensesCategory.savings,
      upi: expensesCategory.upi
    }
  }
}

export const incomeCategory: Record<string, string> = {
  '': 'Select',
  ads: 'Ads',
  other: 'Other',
  salary: 'Salary',
  youtube: 'Youtube'
}

export const investmentCategory: Record<string, string> = {
  '': 'Select',
  crypto: 'Crypto Currency',
  indianstock: 'Indian Stock',
  mutualfunds: 'Mutual Funds',
  other: 'Other',
  usstock: 'US Stock'
}

export const datePattern = 'd{2}-d{2}-d{4}'
export const dateFormatStr = 'yyyy-MM-dd'

export const payingKey: Record<string, string> = {
  monthly: 'monthly',
  yearly: 'yearly'
}

export const subscriptionPayment: Record<string, string> = {
  [payingKey.monthly]: 'Month',
  [payingKey.yearly]: 'Year'
}

export const siteUrls: Record<string, string> = {
  app: 'https://app.expense.fyi',
  home: 'expense.fyi',
  signup: 'https://app.expense.fyi/signup',
  signin: 'https://app.expense.fyi/signin',
  local: 'localhost:3000',
  appLocal: 'http://app.localhost:3000',
  localSignup: `http://app.localhost:3000/signup`,
  localSignin: `http://app.localhost:3000/signin`,
  subdomain: '.expense.fyi',
  subdomainLocal: '.localhost:3000',
  githubUrl: 'https://github.com/gokulkrishh/expense.fyi',
  twitterUrl: 'https://twitter.com/gokul_i'
}

const originalPriceMonthly = 400
const originalPriceYearly = 50
const discountPercentage = 40

export const tiers = {
  monthly: {
    basic: 0,
    premium: (originalPriceMonthly / 100) * discountPercentage,
    og: originalPriceMonthly
  },
  yearly: {
    basic: 0,
    premium: (originalPriceYearly / 100) * discountPercentage,
    og: originalPriceYearly
  }
}

export const paymentOptions: Record<string, string> = {
  currency: 'USD',
  locale: 'en'
}

type Tier = {
  key: string
  name: string
  usageLimit?: number
}

export const tierNames: {
  basic: Tier
  premium: Tier
  expired: Tier
} = {
  basic: {
    key: 'basic',
    name: 'Basic',
    usageLimit: 100
  },
  premium: {
    key: 'premium',
    name: 'Premium',
    usageLimit: 2500
  },
  expired: {
    key: 'expired',
    name: 'Expired'
  }
}

export const siteName = 'Expense.fyi'

export const logo = `https://${siteUrls.home}/static/icons/logo.png`

export const basicPlanUsageLimit = 100
export const premiumPlanUsageLimit = 2500

export const sentFromEmailId = 'Gokul from Expense.fyi <hello@expense.fyi>'

export const shortcuts = {
  sidebar: {
    overview: { path: '/', shortcut: 'o' },
    income: { path: '/income', shortcut: 'i' },
    expenses: { path: '/expenses', shortcut: 'e' },
    subscriptions: { path: '/subscriptions', shortcut: 's' },
    investments: { path: '/investments', shortcut: 'v' }
  },
  expenses: { add: { shortcut: 'a' } },
  income: { add: { shortcut: 'a' } },
  subscriptions: { add: { shortcut: 'a' } },
  investments: { add: { shortcut: 'a' } },
  overview: {
    feedback: { shortcut: 'f' }
  }
}
