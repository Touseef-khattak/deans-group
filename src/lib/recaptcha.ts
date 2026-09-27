type SiteVerifyResponse = {
  success: boolean;
  score?: number;
  action?: string;
  "error-codes"?: string[];
};

/**
 * Verifies a reCAPTCHA v3 token server-side against Google's siteverify
 * endpoint. v3 has no challenge - it returns a 0..1 bot-likelihood score
 * instead, so a "pass" also requires the score to clear a threshold and
 * the action to match what the client requested (stops a token minted for
 * one form being replayed against another).
 */
export async function verifyRecaptcha(
  token: string,
  expectedAction: string,
): Promise<{ ok: boolean; score?: number }> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) {
    throw new Error("RECAPTCHA_SECRET_KEY is not configured — see .env.example.");
  }
  if (!token) return { ok: false };

  const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ secret, response: token }),
  });

  const data = (await res.json()) as SiteVerifyResponse;
  const scoreOk = typeof data.score !== "number" || data.score >= 0.5;
  const ok = Boolean(data.success) && data.action === expectedAction && scoreOk;
  return { ok, score: data.score };
}
