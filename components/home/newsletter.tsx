"use client";

import { useActionState } from "react";
import { Envelope } from "@phosphor-icons/react";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import {
  newsletterInitialState,
  subscribeToNewsletter,
} from "@/lib/actions/newsletter";

export function Newsletter() {
  const [state, formAction, pending] = useActionState(
    subscribeToNewsletter,
    newsletterInitialState,
  );

  return (
    <section className="bg-white py-2.5">
      <Container>
        <Reveal
          from="bottom"
          className="mt-2 flex flex-col items-center gap-8 px-4 sm:px-6 lg:flex-row lg:justify-between lg:gap-12 lg:px-12"
        >
          {/* Label */}
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center">
              <Envelope className="h-10 w-10 text-brand" weight="fill" />
            </span>

            <div className="flex items-end gap-2">
              <p className="text-[20px] font-semibold text-brand">
                Stay Updated
              </p>

              <p className="mb-0.5 text-[12.5px] text-muted">
                Subscribe for the latest updates and stories.
              </p>
            </div>
          </div>

          {/* Form */}
          <form
            action={formAction}
            className="flex w-full max-w-md flex-col gap-2 sm:flex-row sm:items-center"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>

            <input
              id="newsletter-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="Enter your email address"
              aria-describedby={
                state.status === "idle" ? undefined : "newsletter-status"
              }
              aria-invalid={state.status === "error"}
              className="h-11 min-w-0 flex-1 rounded-xl bg-white px-4 text-sm text-ink placeholder:text-muted/70 focus:border-brand/40 focus:outline-2 focus:outline-offset-2 focus:outline-brand/30"
            />

            <Button
              type="submit"
              variant="primary"
              disabled={pending}
              className="cursor-pointer rounded-xl px-7 py-4 disabled:opacity-60"
            >
              {pending ? "Subscribing…" : "Subscribe"}
            </Button>
          </form>
        </Reveal>

        <p
          id="newsletter-status"
          role="status"
          aria-live="polite"
          className={`mt-3 px-4 text-center text-[12.5px] lg:px-8 lg:text-right ${state.status === "error" ? "text-dot-red" : "text-brand"
            }`}
        >
          {state.message}
        </p>
      </Container>
    </section>
  );
}
