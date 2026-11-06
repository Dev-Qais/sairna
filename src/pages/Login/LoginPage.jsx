import { useState } from "react";

function LoginPage() {
    const [inputForm, setInputForm] = useState({
        email: '',
        password: ''
    });
    return ( 
        <div className="container">
            <form className="flex flex-col gap-[12px] max-w-[400px] mx-auto">
                <input type="email" placeholder="البريد الالكتروني" className="border border-[var(--border)] rounded-[3px] px-4 py-2 text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary)] transition-colors" />
                <input type="password" placeholder="كلمة المرور" className="border border-[var(--border)] rounded-[3px] px-4 py-2 text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary)] transition-colors" />
                <button type="submit" className="bg-[var(--primary)] rounded-[3px] text-white hover:bg-[var(--bg-hover)] transition-colors cursor-pointer px-4 py-2">تسجيل الدخول</button>
            </form>
        </div>
     );
}

export default LoginPage;