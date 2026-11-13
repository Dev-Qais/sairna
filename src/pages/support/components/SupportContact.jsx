import { Headphones, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

function SupportContact() {
  const navigate = useNavigate();

  return (
    <aside dir="rtl" className="h-fit rounded-2xl bg-[var(--soft-teal)] p-6">
      <Headphones
        size={29}
        strokeWidth={1.8}
        className="text-[var(--primary)]"
      />

      <h2 className="mt-4 text-xl font-black text-[var(--text)]">
        بحاجة لمساعدة؟
      </h2>

      <p className="mt-3 text-xs leading-7 text-[var(--muted)]">
        هذا الموقع نموذج وواجهات تعليمية، ويمكن تطويره لاحقاً ليضيف نظام دعم
        حقيقي.
      </p>

      <button
        type="button"
        onClick={() => navigate("/")}
        className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-5 py-3 text-xs font-black text-white transition hover:bg-[var(--bg-hover)]"
      >
        رجوع للرئيسية
        <ArrowRight size={15} />
      </button>
    </aside>
  );
}

export default SupportContact;
