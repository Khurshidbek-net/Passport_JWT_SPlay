enum BillingStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  REFUNDED = "REFUNDED"
}

export class CreateBillingHistoryDto {
  user_id: number          
  subscription_id: number  
  payment_method_id: number
  amount: number            
  date: Date     
  status: BillingStatus
}
