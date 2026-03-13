import Link from "next/link";
import { MyInsightIndex } from "../lib/myInsight";

const CalendarIcon = () => (
  <svg className="h-4 w-4 shrink-0" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 4h12v10H2V4zM2 6v8h8V6H2zM4 2v2M12 2v2M2 2h2v2H2V2zM12 2h2v2h-2V2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function BlogCard({
  insight,
  size = "default",
}: {
  insight: MyInsightIndex;
  size?: "default" | "large";
}) {
  const imgSrc = insight.image || "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800";
  const initials = (insight.author || "?").split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

  return (
    <Link
      href={`/myinsight/${insight.slug}`}
      className={`group flex overflow-hidden rounded-2xl border border-zinc-800/60 bg-zinc-950 transition hover:border-[#c5f018]/40 ${
        size === "large" ? "min-h-[280px] flex-row" : "min-h-[200px] flex-col sm:flex-row"
      }`}
    >
      <div className={`relative shrink-0 overflow-hidden ${size === "large" ? "w-1/2" : "h-40 w-full sm:h-auto sm:min-h-[200px] sm:w-[40%]"}`}>
        <img
          src={imgSrc}
          alt={insight.title}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col justify-center p-6">
        <h3 className={`line-clamp-2 font-semibold leading-tight text-white ${size === "large" ? "text-xl md:text-2xl" : "text-base"}`}>
          {insight.title}
        </h3>
        <div className={`mt-3 flex flex-wrap items-center gap-x-4 gap-y-1`}>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-700 text-xs font-medium text-[#c5f018]">
              {initials}
            </div>
            <span className="text-sm font-medium text-[#c5f018]">{insight.author || "Author"}</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-zinc-400">
            <CalendarIcon />
            <span>{insight.date}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function InsightsPreviewSection({ myInsights }: { myInsights: MyInsightIndex[] }) {
  const [featured, ...rest] = myInsights.slice(0, 3);

  return (
    <section className="border-b border-zinc-900/60 bg-black">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:px-10 md:py-24 lg:px-0">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-2 py-2">
              <span
                className="h-2 w-2 shrink-0 rounded-full bg-[#c5f018]"
                style={{ animation: "dotPulse 1s ease-in-out infinite" }}
              />
              <span className="text-sm text-zinc-400 md:text-base">Our blogs</span>
            </div>
            <h2 className="text-3xl font-semibold leading-tight text-white md:text-5xl lg:text-6xl">
              Expert advisory <span className="text-[#c5f018]">updates</span>
            </h2>
          </div>
          <Link
            href="/myinsights"
            className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-[#c5f018] px-5 py-3 text-sm font-semibold text-black transition hover:bg-[#d4ff2a]"
          >
            View all
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 13L13 3M13 3H5M13 3V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        {/* Blog cards */}
        <div className="mt-12 flex flex-col gap-6">
          {featured && (
            <BlogCard insight={featured} size="large" />
          )}
          <div className="grid gap-6 sm:grid-cols-2">
            {rest.map((insight) => (
              <BlogCard key={insight.slug} insight={insight} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
