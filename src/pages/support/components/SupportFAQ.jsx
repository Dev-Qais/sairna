import { useState } from "react";
import FAQItem from "./FAQItem";

const faqs = [
  {
    id: 1,
    question: "كيف بحجز رحلة؟",
    answer:
      "حدد المحافظة اللي بدك تنطلق منها والمحافظة اللي بدك توصل إلها، بعدين اختار التاريخ والشركة والرحلة المناسبة، وأكّد الحجز.",
  },
  {
    id: 2,
    question: "في دفع إلكتروني حقيقي؟",
    answer:
      "الموقع يتيح تجربة عملية الحجز، لكن الدفع الإلكتروني الفعلي غير متاح حالياً.",
  },
  {
    id: 3,
    question: "الخريطة بتعرض مكان الباص الحقيقي؟",
    answer:
      "الخريطة بتعرض مسار الطريق التقريبي بين نقطتي الانطلاق والوصول. التتبع المباشر لموقع الباص يحتاج إلى بيانات GPS من شركة النقل.",
  },
  {
    id: 4,
    question: "وين بلاقي حجوزاتي؟",
    answer:
      "من صفحة حجوزاتي، فيك تشوف تفاصيل حجوزاتك والرحلات والمقاعد المرتبطة فيها.",
  },
  {
    id: 5,
    question: "هل في حسابات حقيقية؟",
    answer:
      "التسجيل وتسجيل الدخول يعملان من خلال واجهة المشروع المرتبطة بالـ API، أما الدفع الإلكتروني الفعلي فغير متاح حالياً.",
  },
];

function SupportFAQ() {
  const [openFAQ, setOpenFAQ] = useState(1);

  const handleToggle = (id) => {
    setOpenFAQ((current) => (current === id ? null : id));
  };

  return (
    <section dir="rtl" className="w-full">
      <div className="space-y-2.5">
        {faqs.map((faq) => (
          <FAQItem
            key={faq.id}
            question={faq.question}
            answer={faq.answer}
            isOpen={openFAQ === faq.id}
            onToggle={() => handleToggle(faq.id)}
          />
        ))}
      </div>
    </section>
  );
}

export default SupportFAQ;
