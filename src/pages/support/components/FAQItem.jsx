import { Plus, X } from "lucide-react";

function FAQItem({ question, answer, isOpen, onToggle }) {
  return (
    <article
      dir="rtl"
      className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] transition-colors duration-200"
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className={`
          flex w-full items-center justify-between gap-4
          px-5 py-5 text-right transition-colors duration-200
          focus-visible:outline focus-visible:outline-2
          focus-visible:outline-offset-[-3px]
          focus-visible:outline-[var(--primary)]
          ${isOpen ? "text-[var(--primary)]" : "text-[var(--text)]"}
        `}
      >
        <span className="text-sm font-black leading-6">{question}</span>

        <span className="shrink-0 text-[var(--primary)]">
          {isOpen ? <X size={18} /> : <Plus size={18} />}
        </span>
      </button>

      <div
        className={`
          grid transition-[grid-template-rows,opacity] duration-300 ease-in-out
          ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}
        `}
        aria-hidden={!isOpen}
      >
        <div className="overflow-hidden">
          <div className="mx-5 border-t border-[var(--border)] py-4">
            <p className="text-xs leading-7 text-[var(--muted)]">{answer}</p>
          </div>
        </div>
      </div>
    </article>
  );
}

export default FAQItem;
