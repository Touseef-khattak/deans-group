// Plain inline-styled HTML — email clients don't reliably support external
// or even <style>-block CSS, so every rule here is inlined by hand.
const BRAND_GREEN = "#00a650";
const CREAM = "#fff6e8";
const BORDER = "#d6d7d9";
const TEXT_SECONDARY = "#303030";
const TEXT_MUTED = "#898f98";

function escapeHtml(s: string): string {
  return s.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ]!,
  );
}

function emailShell(title: string, bodyHtml: string): string {
  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(title)}</title>
  </head>
  <body style="margin:0; padding:0; background-color:#f4f4f2; font-family: Arial, Helvetica, sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f2; padding:24px 0;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" style="max-width:560px; background-color:#ffffff; border:1px solid ${BORDER};" cellpadding="0" cellspacing="0">
            <tr>
              <td style="background-color:${BRAND_GREEN}; padding:20px 32px;">
                <span style="color:${CREAM}; font-size:20px; font-weight:bold; letter-spacing:0.5px;">Deans Group of Companies</span>
              </td>
            </tr>
            <tr>
              <td style="padding:32px;">
                ${bodyHtml}
              </td>
            </tr>
            <tr>
              <td style="background-color:${CREAM}; padding:20px 32px; font-size:12px; color:${TEXT_SECONDARY};">
                <p style="margin:0 0 4px;">Deans Group of Companies</p>
                <p style="margin:0 0 4px;">contact@deansgroupofcompanies.com &middot; WhatsApp: +92 316 3632738</p>
                <p style="margin:0; color:${TEXT_MUTED};">This is an automated message from deansgroupofcompanies.com</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export type EmailField = { label: string; value: string };

/** Internal notification sent to ADMIN_EMAIL with the full submission. */
export function adminNotificationEmail(params: {
  formTitle: string;
  submittedAt: Date;
  fields: EmailField[];
}): string {
  const rows = params.fields
    .filter((f) => f.value)
    .map(
      (f) => `
      <tr>
        <td style="padding:10px 0; border-bottom:1px solid ${BORDER}; font-size:13px; color:${TEXT_MUTED}; width:160px; vertical-align:top; white-space:nowrap;">${escapeHtml(f.label)}</td>
        <td style="padding:10px 0 10px 16px; border-bottom:1px solid ${BORDER}; font-size:14px; color:#000000; vertical-align:top;">${escapeHtml(f.value).replace(/\n/g, "<br />")}</td>
      </tr>`,
    )
    .join("");

  const body = `
    <p style="margin:0 0 8px; font-size:12px; letter-spacing:0.5px; color:${BRAND_GREEN}; text-transform:uppercase;">New submission</p>
    <h1 style="margin:0 0 20px; font-size:22px; color:#000000;">${escapeHtml(params.formTitle)}</h1>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      ${rows}
    </table>
    <p style="margin:20px 0 0; font-size:12px; color:${TEXT_MUTED};">Submitted ${escapeHtml(
      params.submittedAt.toLocaleString("en-GB", {
        dateStyle: "medium",
        timeStyle: "short",
      }),
    )}</p>
  `;
  return emailShell(`New ${params.formTitle}`, body);
}

/** Confirmation sent back to the person who filled out the form. */
export function customerConfirmationEmail(params: {
  customerName: string;
  formTitle: string;
  intro?: string;
}): string {
  const intro =
    params.intro ??
    `Your ${escapeHtml(params.formTitle.toLowerCase())} has reached our team — expect a reply within one working day.`;
  const body = `
    <h1 style="margin:0 0 16px; font-size:22px; color:#000000;">Thank you, ${escapeHtml(params.customerName)}.</h1>
    <p style="margin:0 0 16px; font-size:15px; line-height:1.6; color:${TEXT_SECONDARY};">
      ${intro}
    </p>
    <p style="margin:0; font-size:15px; line-height:1.6; color:${TEXT_SECONDARY};">
      In the meantime, if it&rsquo;s urgent, WhatsApp us directly at
      <a href="https://wa.me/923163632738" style="color:${BRAND_GREEN};">+92 316 3632738</a>.
    </p>
  `;
  return emailShell("We've received your message", body);
}
