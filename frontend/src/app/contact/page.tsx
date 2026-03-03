"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Header } from "../../components/Header";
import { FooterSection } from "../../components/FooterSection";
import { FAQSection } from "../../components/FAQSection";

const contactSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  organization: z.string().optional(),
  email: z.string().email("Please enter a valid email address"),
  interestArea: z.string().min(1, "Please select an interest area"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setSubmitStatus({ type: null, message: "" });

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },
        body: JSON.stringify(data),
        signal: controller.signal,
        credentials: "same-origin",
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        let errorMessage = "Failed to send message. Please try again.";
        try {
          const errorResult = await response.json();
          errorMessage = errorResult.error || errorMessage;
        } catch {
          errorMessage = `Server error (${response.status}). Please try again.`;
        }
        setSubmitStatus({ type: "error", message: errorMessage });
        return;
      }

      setSubmitStatus({
        type: "success",
        message: "Thank you! Your message has been sent successfully.",
      });
      reset();
    } catch (error) {
      clearTimeout(timeoutId);

      let errorMessage = "Network error. Please check your connection and try again.";
      if (error instanceof Error) {
        if (error.name === "AbortError") {
          errorMessage = "Request timed out. Please try again.";
        } else if (error.message.includes("fetch")) {
          errorMessage = "Connection failed. Please check your internet connection.";
        }
      }

      setSubmitStatus({ type: "error", message: errorMessage });
    }
  };

  const inputClass = (hasError: boolean) =>
    `w-full rounded-xl border px-5 py-4 text-sm text-white placeholder-zinc-500 bg-zinc-900 outline-none transition focus:border-zinc-500 ${
      hasError ? "border-red-500" : "border-zinc-700"
    }`;

  return (
    <main className="relative w-full overflow-x-hidden text-sm text-zinc-200">
      <Header />

      <section className="bg-black">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 md:px-10 lg:px-0">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">

            {/* Left */}
            <div className="flex flex-col justify-center">
              <h1 className="text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
                Partnership
                <br />
                &amp;{" "}
                <span className="text-[#c5f018]">Collaboration</span>
                <br />
                Enquiries
              </h1>
              <p className="mt-8 max-w-lg text-sm leading-relaxed text-white">
                If you are exploring collaboration across research, secure data
                environments, or venture initiatives, I welcome the opportunity
                to connect.
              </p>
            </div>

            {/* Right — Form */}
            <div className="flex flex-col gap-4">

              {/* Status message */}
              {submitStatus.type && (
                <div
                  className={`rounded-xl border p-4 text-sm ${
                    submitStatus.type === "success"
                      ? "border-green-500/30 bg-green-900/20 text-green-400"
                      : "border-red-500/30 bg-red-900/20 text-red-400"
                  }`}
                >
                  {submitStatus.message}
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

                {/* Full Name */}
                <div>
                  <input
                    {...register("fullName")}
                    type="text"
                    placeholder="Full Name"
                    className={inputClass(!!errors.fullName)}
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-xs text-red-400">{errors.fullName.message}</p>
                  )}
                </div>

                {/* Organization */}
                <div>
                  <input
                    {...register("organization")}
                    type="text"
                    placeholder="Organization"
                    className={inputClass(false)}
                  />
                </div>

                {/* Email */}
                <div>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="Email"
                    className={inputClass(!!errors.email)}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>
                  )}
                </div>

                {/* Interest Area */}
                <div>
                  <select
                    {...register("interestArea")}
                    defaultValue=""
                    className={`${inputClass(!!errors.interestArea)} appearance-none`}
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23a1a1aa' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 1.25rem center",
                      backgroundSize: "1rem",
                    }}
                  >
                    <option value="" disabled>Interest Area</option>
                    <option value="research">Research Collaboration</option>
                    <option value="governance">Governance & Compliance</option>
                    <option value="product">Product & Innovation</option>
                    <option value="venture">Venture Alignment</option>
                  </select>
                  {errors.interestArea && (
                    <p className="mt-1 text-xs text-red-400">{errors.interestArea.message}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <textarea
                    {...register("message")}
                    placeholder="Message"
                    rows={6}
                    className={`${inputClass(!!errors.message)} resize-y`}
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-red-400">{errors.message.message}</p>
                  )}
                </div>

                {/* Submit */}
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center gap-2 rounded-lg bg-[#c5f018] px-10 py-3 text-sm font-semibold text-black transition hover:bg-[#d4ff2a] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-black/20 border-t-black" />
                        Sending...
                      </>
                    ) : (
                      "Submit"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <FAQSection />
      <FooterSection />
    </main>
  );
}