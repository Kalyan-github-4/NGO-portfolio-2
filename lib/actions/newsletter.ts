"use server";

export type NewsletterState = {
  status: "idle" | "success" | "error";
  message: string;
};

export const newsletterInitialState: NewsletterState = {
  status: "idle",
  message: "",
};

// Deliberately simple: catches typos without rejecting valid-but-unusual
// addresses. Real verification happens when the confirmation email lands.
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function subscribeToNewsletter(
  _previous: NewsletterState,
  formData: FormData,
): Promise<NewsletterState> {
  const email = String(formData.get("email") ?? "").trim();

  if (!email) {
    return { status: "error", message: "Please enter your email address." };
  }

  if (!emailPattern.test(email)) {
    return { status: "error", message: "That email address looks incomplete." };
  }

  // TODO: persist the subscriber and send a double opt-in confirmation once the
  // database and mail provider are wired up. Until then nothing is stored, so
  // the success message below is the only thing that happens.
  return {
    status: "success",
    message: "Thanks — we'll be in touch with our next update.",
  };
}
