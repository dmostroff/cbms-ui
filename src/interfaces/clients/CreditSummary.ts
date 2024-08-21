export default interface CreditSummary {
  client_id: number | null
  client_code?: string | null
  client_name: string | null
  cc_account_count: string | null
  loan_count: string | null
  checking_count: string | null
  email: string | null
  phone: string | null
  min_open_date: string | null
  total_credit_limit: string | null
  credit_limit: string | null
}
