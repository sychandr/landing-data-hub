import {
  createInquiry,
  type Inquiry,
} from '../repositories/inquiries.repository.js';
import type { CreateInquiryBody } from '../schemas/inquiries.schema.js';

export async function submitInquiry(
  input: CreateInquiryBody,
): Promise<Inquiry> {
  return createInquiry(input);
}
