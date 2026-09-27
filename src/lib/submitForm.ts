export type SubmitFormResult = { ok: true } | { ok: false; error: string };

/** POSTs a form's FormData (already carrying formType + recaptchaToken) to the shared submit-form API route. */
export async function submitForm(formData: FormData): Promise<SubmitFormResult> {
  try {
    const res = await fetch("/api/submit-form", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (!res.ok || !data.ok) {
      return {
        ok: false,
        error:
          typeof data?.error === "string"
            ? data.error
            : "Something went wrong. Please try again.",
      };
    }
    return { ok: true };
  } catch {
    return {
      ok: false,
      error: "Network error — please check your connection and try again.",
    };
  }
}
