import { Suspense } from "react";
import VerifyOTPForm from "./VerifyOTPForm";

export default function VerifyOTPPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-black">
          <div className="text-white">Loading...</div>
        </div>
      }
    >
      <VerifyOTPForm />
    </Suspense>
  );
}
