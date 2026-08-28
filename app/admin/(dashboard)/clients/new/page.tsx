import Link from "next/link";
import NewClientForm from "@/components/admin/NewClientForm";

export default function NewClientPage() {
  return (
    <>
      <header className="border-b border-line px-6 py-5 lg:px-8">
        <Link href="/admin/clients" className="text-xs text-paper/40 hover:text-gold-400">
          ← Clients
        </Link>
        <h1 className="font-display text-2xl font-bold text-paper mt-2">
          Add client & website
        </h1>
        <p className="text-paper/40 text-sm mt-1">
          One form — the business and their site project together
        </p>
      </header>

      <div className="p-6 lg:p-8">
        <NewClientForm />
      </div>
    </>
  );
}
