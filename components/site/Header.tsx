"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Logo } from "@/components/ui/Logo";
import { Button, CtaDot } from "@/components/ui/Button";
import { nav } from "@/lib/content";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500 ease-[var(--ease-out-quint)] ${
        scrolled || open
          ? "bg-paper/88 backdrop-blur-xl supports-[backdrop-filter]:bg-paper/72"
          : "bg-paper"
      }`}
    >
      {/* hairline + page progress: the rail motif, at the top of the page */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 bottom-0 h-px transition-opacity duration-500 ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="h-full w-full bg-rule" />
        <motion.div
          className="absolute inset-y-0 left-0 w-full origin-left bg-tartan"
          style={{ scaleX: progress }}
        />
      </div>

      <div
        className={`shell flex items-center justify-between transition-[height] duration-500 ease-[var(--ease-out-quint)] ${
          scrolled ? "h-[4.25rem]" : "h-[5.5rem]"
        }`}
      >
        <div className="flex items-center gap-3">
          <Logo height={scrolled ? 19 : 22} priority className="transition-all" />
          <span className="sr-only">NexBrix — hospitality operations software</span>
        </div>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.links.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="group relative flex h-9 items-center px-3.5 text-[0.9375rem] text-ink-70 transition-colors duration-200 hover:text-ink"
                >
                  {link.label}
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 scale-0 rounded-[1px] bg-tartan transition-transform duration-300 ease-[var(--ease-out-quint)] group-hover:scale-100"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href={nav.login.href}
            className="hidden h-9 items-center px-3 text-[0.9375rem] text-ink-70 transition-colors hover:text-ink sm:inline-flex"
          >
            {nav.login.label}
          </Link>
          <Button
            href={nav.cta.href}
            variant="solid"
            size="md"
            className="hidden sm:inline-flex"
            trailing={<CtaDot />}
          >
            {nav.cta.label}
          </Button>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="relative flex h-11 w-11 items-center justify-center rounded-[5px] border border-rule text-ink transition-colors hover:border-tartan lg:hidden"
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span aria-hidden="true" className="flex h-3 w-4 flex-col justify-between">
              <span
                className={`h-px w-full bg-ink transition-transform duration-300 ease-[var(--ease-out-quint)] ${
                  open ? "translate-y-[5.5px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-px w-full bg-ink transition-opacity duration-200 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`h-px w-full bg-ink transition-transform duration-300 ease-[var(--ease-out-quint)] ${
                  open ? "-translate-y-[5.5px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            ref={menuRef}
            key="menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-rule bg-paper lg:hidden"
          >
            <nav aria-label="Mobile" className="shell py-7">
              <ul className="flex flex-col">
                {nav.links.map((link, i) => (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 + i * 0.045, duration: 0.4 }}
                    className="border-b border-rule-soft"
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline justify-between py-4"
                    >
                      <span className="display-3">{link.label}</span>
                      <span className="label-mono-sm text-ink-40">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-7 flex flex-col gap-3">
                <Button
                  href={nav.cta.href}
                  variant="solid"
                  size="lg"
                  className="w-full"
                  onClick={() => setOpen(false)}
                  trailing={<CtaDot />}
                >
                  {nav.cta.label}
                </Button>
                <Button
                  href={nav.login.href}
                  variant="outline"
                  size="lg"
                  className="w-full"
                  onClick={() => setOpen(false)}
                >
                  {nav.login.label}
                </Button>
              </div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
