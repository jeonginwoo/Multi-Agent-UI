"use client";

import { useEffect } from "react";

export default function SubscribePage() {
    useEffect(() => {
        if (!(window as any).TossPayments) {
            const script = document.createElement("script");
            script.src = "https://js.tosspayments.com/v1";
            script.async = true;
            document.body.appendChild(script);
        }
    }, []);

    const handleSubscribe = async () => {
        if (!(window as any).TossPayments) {
            alert("토스 결제 스크립트가 아직 로드되지 않았습니다.");
            return;
        }

        try {
            const tossPayments = (window as any).TossPayments(
                process.env.TOSS_CLIENT_KEY
            );

            const orderId = `sub_${Date.now()}`;
            const amount = 10000;

            // 브라우저에서 현재 호스트 가져오기
            const BASE_URL = window.location.origin;

            await tossPayments.requestPayment("카드", {
                amount,
                orderId,
                orderName: "프리미엄 구독",
                customerName: "사용자",
                successUrl: `${BASE_URL}/payment/success?orderId=${orderId}&amount=${amount}`,
                failUrl: `${BASE_URL}/payment/fail?orderId=${orderId}&amount=${amount}`,
            });
        } catch (err) {
            console.error("결제창 호출 중 오류 발생:", err);
            alert("결제창 호출 중 오류가 발생했습니다.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl font-bold mb-4">프리미엄 구독 결제</h1>
            <p className="mb-6">구독 서비스를 이용하려면 아래 버튼을 눌러 결제하세요.</p>
            <button
                onClick={handleSubscribe}
                className="bg-green-500 px-6 py-3 rounded text-white text-lg hover:bg-green-600"
            >
                구독 결제하기
            </button>
        </div>
    );
}
