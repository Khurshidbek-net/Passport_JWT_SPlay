export class CreateSubscriptionDto {
  profile_id: number
  plan_id: number
  start_date: Date
  end_date: Date
  auto_renew: boolean
  is_active: boolean
  last_amount_paid: number
  subscription_source: string
}
