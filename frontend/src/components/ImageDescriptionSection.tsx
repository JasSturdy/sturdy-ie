export function ImageDescriptionSection() {
  return (
    <section className="border-b border-zinc-900/60 bg-gradient-to-b from-black to-slate-950">
      <div className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-20 lg:px-0">
        <div className="overflow-hidden rounded-3xl border border-zinc-800">
          <div className="h-64 w-full bg-[url('https://images.pexels.com/photos/1181567/pexels-photo-1181567.jpeg?auto=compress&cs=tinysrgb&w=1200')] bg-cover bg-center md:h-80" />
        </div>
        <div className="mt-8 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <p className="max-w-3xl text-sm leading-relaxed text-zinc-300">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer congue,
            justo eget efficitur rhoncus, nulla velit consectetur nibh, non interdum
            neque libero nec velit. Phasellus commodo suscipit mauris, vitae dapibus
            velit vulputate a.
          </p>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full bg-[#c5f018] px-6 py-3 text-sm font-semibold text-black shadow-md shadow-lime-300/30 transition hover:-translate-y-[1px] hover:bg-lime-300"
          >
            <span>Contact Us</span>
            <span className="text-xs">↗</span>
          </button>
        </div>
      </div>
    </section>
  );
}

