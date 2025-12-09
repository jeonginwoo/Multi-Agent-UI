"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function PaymentSuccessPage() {
    const params = useSearchParams();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleConfirm = async () => {
        setLoading(true);
        const paymentKey = params.get("paymentKey");
        const orderId = params.get("orderId");
        const amount = params.get("amount");

        if (!paymentKey || !orderId || !amount) return;

        await fetch("/api/toss/confirm", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ paymentKey, orderId, amount }),
        });

        router.push("/"); // 확인 누르면 홈으로 이동
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl font-bold mb-4">결제 완료 🎉</h1>
            <p className="mb-4">결제가 정상 처리되었습니다.</p>
            <button
                onClick={handleConfirm}
                className="bg-green-500 px-6 py-2 text-white rounded hover:bg-green-600"
                disabled={loading}
            >
                확인
            </button>
        </div>
    );
}
