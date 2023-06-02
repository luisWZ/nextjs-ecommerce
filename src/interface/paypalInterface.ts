export interface PaypalOAuthTokenResponse {
  scope: string;
  access_token: string;
  token_type: string;
  app_id: string;
  expires_in: number;
  nonce: string;
}

export interface PaypalOrderStatusResponse {
  id: string;
  intent: string;
  status: PaypalOrderStatus;
  payment_source: PaymentSource;
  purchase_units: PurchaseUnit[];
  payer: Pay;
  create_time: string;
  update_time: string;
  links: Link[];
}

export type PaypalOrderBodyResponse = {
  id: string;
  status: PaypalOrderStatus;
};

type PaypalOrderStatus =
  | 'CREATED'
  | 'SAVED'
  | 'APPROVED'
  | 'VOIDED'
  | 'COMPLETED'
  | 'PAYER_ACTION_REQUIRED';

interface Link {
  href: string;
  rel: string;
  method: string;
}

interface Pay {
  name: PayerName;
  email_address: string;
  payer_id?: string;
  address: PayerAddress;
  account_id?: string;
}

interface PayerAddress {
  country_code: string;
}

interface PayerName {
  given_name: string;
  surname: string;
}

interface PaymentSource {
  paypal: Pay;
}

interface PurchaseUnit {
  reference_id: string;
  amount: Amount;
  payee: Payee;
  soft_descriptor: string;
  shipping: Shipping;
  payments: Payments;
}

interface Amount {
  currency_code: string;
  value: string;
}

interface Payee {
  email_address: string;
  merchant_id: string;
}

interface Payments {
  captures: Capture[];
}

interface Capture {
  id: string;
  status: string;
  amount: Amount;
  final_capture: boolean;
  seller_protection: SellerProtection;
  seller_receivable_breakdown: SellerReceivableBreakdown;
  links: Link[];
  create_time: string;
  update_time: string;
}

interface SellerProtection {
  status: string;
  dispute_categories: string[];
}

interface SellerReceivableBreakdown {
  gross_amount: Amount;
  paypal_fee: Amount;
  net_amount: Amount;
}

interface Shipping {
  name: ShippingName;
  address: ShippingAddress;
}

interface ShippingAddress {
  address_line_1: string;
  address_line_2: string;
  admin_area_2: string;
  admin_area_1: string;
  postal_code: string;
  country_code: string;
}

interface ShippingName {
  full_name: string;
}
