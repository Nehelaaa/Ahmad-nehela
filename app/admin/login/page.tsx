import { Suspense } from "react";
import AdminLoginForm from "./AdminLoginForm";

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-surface text-paper/40">
          Loading…
        </div>
      }
    >
      <AdminLoginForm />
    </Suspense>
  );
}
