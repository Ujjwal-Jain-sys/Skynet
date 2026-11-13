// repositories/inquiries.ts
// Data access for the `contact_inquiries` table. No HTTP/Better Auth types.
// user_id is nullable (visitor submissions allowed).
import { sql } from "@/lib/db";

export interface InquiryRow {
  id: string;
  name: string;
  email: string;
  message: string;
  user_id: string | null;
  status: string;
  created_at: string;
}

export async function createInquiry(data: {
  name: string;
  email: string;
  message: string;
  userId: string | null;
}): Promise<InquiryRow> {
  const rows = await sql`
    INSERT INTO contact_inquiries (name, email, message, user_id, status)
    VALUES (${data.name}, ${data.email}, ${data.message}, ${data.userId}, 'new')
    RETURNING id, name, email, message, user_id, status, created_at
  `;
  return rows[0] as InquiryRow;
}