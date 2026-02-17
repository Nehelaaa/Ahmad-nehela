import Link from "next/link";

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-slate-800">
      <div className="section-container py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © {currentYear} Ahmad Nehela · Web Developer, Boston MA
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6">
            <Link
              href="#home"
              className="text-sm text-slate-500 hover:text-brand-400 transition-colors py-2 sm:py-0"
            >
              Back to top
            </Link>
            <Link
              href="mailto:topwebdeveloperan@gmail.com"
              className="text-sm text-slate-500 hover:text-brand-400 transition-colors break-all text-center"
            >
              topwebdeveloperan@gmail.com
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
