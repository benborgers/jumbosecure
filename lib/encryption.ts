import { randomBytes, createCipheriv, createDecipheriv } from "crypto";

const ENCRYPTION_KEY = Buffer.from("jumbocode_rocks!jumbocode_rocks!", "utf-8"); // 32 bytes
const IV_LENGTH = 12; // 96 bits for GCM

export function encrypt(plaintext: string): string {
  const iv = randomBytes(IV_LENGTH);
  const cipher = createCipheriv("aes-256-gcm", ENCRYPTION_KEY, iv);
  let encrypted = cipher.update(plaintext, "utf8", "base64");
  encrypted += cipher.final("base64");
  const tag = cipher.getAuthTag();
  // Return iv, tag, and encrypted data, all base64-encoded and joined
  return [iv.toString("base64"), tag.toString("base64"), encrypted].join(".");
}

export function decrypt(ciphertext: string): string {
  const [ivB64, tagB64, encrypted] = ciphertext.split(".");
  const iv = Buffer.from(ivB64, "base64");
  const tag = Buffer.from(tagB64, "base64");
  const decipher = createDecipheriv("aes-256-gcm", ENCRYPTION_KEY, iv);
  decipher.setAuthTag(tag);
  let decrypted = decipher.update(encrypted, "base64", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}
