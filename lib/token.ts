import { decrypt } from "./encryption";
import emails from "./emails";

export function validateToken(token: string): string | null {
  try {
    const email = decrypt(token);
    if (emails.includes(email)) {
      return email;
    }
    return null;
  } catch {
    return null;
  }
}
