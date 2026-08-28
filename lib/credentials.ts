import { createCipheriv, createDecipheriv, randomBytes, scryptSync } from "crypto";

function getEncryptionKey(): Buffer {
  const secret =
    process.env.CREDENTIALS_ENCRYPTION_KEY ||
    process.env.ADMIN_SESSION_SECRET ||
    "";
  if (secret.length < 16) {
    throw new Error(
      "Set CREDENTIALS_ENCRYPTION_KEY or ADMIN_SESSION_SECRET (16+ chars) to store passwords"
    );
  }
  return scryptSync(secret, "ahmadnehela-site-credentials", 32);
}

/** Encrypt a site login password for storage in Neon. */
export function encryptPassword(plaintext: string): string {
  if (!plaintext.trim()) return "";
  const key = getEncryptionKey();
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", key, iv);
  const encrypted = Buffer.concat([
    cipher.update(plaintext, "utf8"),
    cipher.final(),
  ]);
  const tag = cipher.getAuthTag();
  return [iv, tag, encrypted]
    .map((b) => b.toString("base64url"))
    .join(".");
}

/** Decrypt a stored site login password (admin-only). */
export function decryptPassword(stored: string): string {
  if (!stored) return "";
  const parts = stored.split(".");
  if (parts.length !== 3) return "";
  const [ivB, tagB, dataB] = parts;
  const key = getEncryptionKey();
  const decipher = createDecipheriv(
    "aes-256-gcm",
    key,
    Buffer.from(ivB, "base64url")
  );
  decipher.setAuthTag(Buffer.from(tagB, "base64url"));
  return Buffer.concat([
    decipher.update(Buffer.from(dataB, "base64url")),
    decipher.final(),
  ]).toString("utf8");
}
