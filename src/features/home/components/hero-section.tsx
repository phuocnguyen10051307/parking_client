import { motion } from 'framer-motion';
import { ArrowRight, BadgeCheck, Clock3, Play, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function HeroSection() {
  const navigate = useNavigate();

  return (
    <section
      className="
        relative
        left-1/2
        w-screen
        -translate-x-1/2
        overflow-hidden
        bg-gradient-to-br
        from-slate-50
        via-white
        to-blue-50
      "
    >
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-56 top-0 h-[900px] w-[900px] rounded-full bg-blue-500/10 blur-[180px]" />

        <div className="absolute right-[-220px] top-16 h-[800px] w-[800px] rounded-full bg-cyan-400/10 blur-[180px]" />

        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-400/5 blur-[150px]" />
      </div>

      <div className="relative mx-auto flex min-h-[92vh] w-full max-w-[1700px] items-center px-8 lg:px-20">
        <div className="grid w-full items-center gap-16 lg:grid-cols-[46%_54%]">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-6 py-2.5 text-sm font-medium text-blue-700 shadow-sm">
              <BadgeCheck size={16} />
              Smart Parking Management
            </div>

            {/* Heading */}
            <h1 className="mt-8 text-[84px] font-extrabold leading-[0.98] tracking-[-3px] text-slate-900">
              Find, Reserve &
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
                Park with Ease
              </span>
            </h1>

            {/* Description */}
            <p className="mt-8 max-w-[650px] text-[21px] leading-10 text-slate-500">
              Reserve parking spaces instantly, monitor parking sessions, manage your vehicles and
              enjoy a smarter parking experience anywhere.
            </p>

            {/* Buttons */}
            <div className="mt-12 flex flex-wrap gap-5">
              <button
                onClick={() => navigate('/user/create-reservation')}
                className="group flex items-center gap-2 rounded-2xl bg-blue-600 px-10 py-5 text-lg font-semibold text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700"
              >
                Reserve Now
                <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => navigate('/user/pricing')}
                className="flex items-center gap-2 rounded-2xl border-2 border-blue-500 bg-white px-10 py-5 text-lg font-semibold text-blue-600 transition-all duration-300 hover:bg-blue-600 hover:text-white"
              >
                <Play size={18} />
                View Pricing
              </button>
            </div>

            {/* Features */}
            <div className="mt-16 flex items-center justify-between max-w-[760px]">
              {/* Real-time */}
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100">
                  <Clock3 className="text-blue-600" size={22} />
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-slate-900">Real-time</h4>

                  <p className="text-base text-slate-500">Slot availability</p>
                </div>
              </div>

              <div className="h-10 w-px bg-slate-300" />

              {/* Secure */}
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100">
                  <ShieldCheck className="text-green-600" size={22} />
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-slate-900">Secure</h4>

                  <p className="text-base text-slate-500">24/7 monitoring</p>
                </div>
              </div>

              <div className="h-10 w-px bg-slate-300" />

              {/* Convenient */}
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100">
                  <BadgeCheck className="text-orange-500" size={22} />
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-slate-900">Convenient</h4>

                  <p className="text-base text-slate-500">Easy reservation</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center lg:justify-end"
          >
            <motion.img
              src="/images/auth-bg.png"
              alt="Parking Illustration"
              animate={{
                y: [0, -12, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="w-full max-w-[930px] object-contain"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
