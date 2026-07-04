import { Mail, MapPin, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#0F172A] text-slate-300">
      <div className="mx-auto max-w-7xl px-8 py-16">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.8fr]">
          {/* LEFT */}
          <div>
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 shadow-lg">
                <span className="text-3xl font-bold text-white">P</span>
              </div>

              <h2 className="text-5xl font-extrabold tracking-tight">
                <span className="text-white">City</span>
                <span className="text-blue-500">Park</span>
              </h2>
            </div>

            <p className="mt-8 max-w-md text-lg leading-9 text-slate-400">
              Smart Parking Management System providing fast, secure and convenient parking
              reservation services.
            </p>
          </div>

          {/* RIGHT */}
          <div>
            <div className="text-3xl font-bold text-white">Contact Us</div>

            <div className="mt-3 h-1 w-16 rounded-full bg-blue-500" />

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {/* Email */}
              <div className="rounded-3xl border border-slate-700 bg-slate-800/40 p-6 transition hover:border-blue-500 hover:bg-slate-800">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600/20">
                  <Mail className="text-blue-400" size={26} />
                </div>

                <div className="text-xl font-semibold text-white">Email</div>

                <p className="mt-2 text-slate-400">support@citypark.com</p>
              </div>

              {/* Phone */}
              <div className="rounded-3xl border border-slate-700 bg-slate-800/40 p-6 transition hover:border-blue-500 hover:bg-slate-800">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600/20">
                  <Phone className="text-blue-400" size={26} />
                </div>

                <div className="text-xl font-semibold text-white">Phone</div>

                <p className="mt-2 text-slate-400">+84 123 456 789</p>
              </div>

              {/* Address */}
              <div className="rounded-3xl border border-slate-700 bg-slate-800/40 p-6 transition hover:border-blue-500 hover:bg-slate-800">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600/20">
                  <MapPin className="text-blue-400" size={26} />
                </div>

                <div className="text-xl font-semibold text-white">Address</div>

                <p className="mt-2 text-slate-400">
                  FPT University,
                  <br />
                  Ho Chi Minh City
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-slate-700 pt-8 text-sm text-slate-500 md:flex-row">
          <span>© {new Date().getFullYear()} CityPark. All rights reserved.</span>

          <div className="flex items-center gap-5">
            <span className="transition hover:text-white cursor-pointer">Privacy Policy</span>

            <span className="h-1 w-1 rounded-full bg-blue-500" />

            <span className="transition hover:text-white cursor-pointer">Terms of Service</span>

            <span className="h-1 w-1 rounded-full bg-blue-500" />

            <span className="transition hover:text-white cursor-pointer">Contact</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
