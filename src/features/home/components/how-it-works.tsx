import { motion } from 'framer-motion';
import { UserPlus, CarFront, CalendarCheck2, Sparkles } from 'lucide-react';

const steps = [
  {
    step: '01',
    icon: UserPlus,
    title: 'Register Account',
    desc: 'Create your free CityPark account in seconds. No paperwork, no hassle — just sign up and get started.',
  },
  {
    step: '02',
    icon: CarFront,
    title: 'Add Vehicle',
    desc: 'Register your vehicles with license plate details so we can recognize you at any CityPark location.',
  },
  {
    step: '03',
    icon: CalendarCheck2,
    title: 'Reserve Parking Slot',
    desc: 'Browse available parking buildings, pick your slot, and reserve it instantly before you leave home.',
  },
  {
    step: '04',
    icon: Sparkles,
    title: 'Park & Enjoy',
    desc: 'Arrive at your reserved spot, park effortlessly, and enjoy peace of mind while we handle the rest.',
  },
];

export function HowItWorksSection() {
  return (
    <section>
      <div className="mb-20 flex flex-col items-center">
        <span className="rounded-full border border-blue-200 bg-blue-50 px-5 py-2 text-sm font-medium text-blue-700">
          How It Works
        </span>

        <h2 className="mt-6 text-center text-5xl font-bold text-slate-900">
          Get Started in Minutes
        </h2>

        <p className="mt-5 max-w-2xl text-center text-lg leading-8 text-slate-500">
          Four simple steps to a seamless parking experience.
        </p>
      </div>

      <div className="relative">
        {/* Dashed connecting line */}
        <div className="absolute left-0 right-0 top-16 hidden h-0.5 lg:block">
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                'repeating-linear-gradient(90deg, #cbd5e1 0, #cbd5e1 8px, transparent 8px, transparent 16px)',
            }}
          />
        </div>

        <div className="grid gap-8 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                whileHover={{ y: -8 }}
                className="relative rounded-3xl border border-slate-100 bg-white p-8 shadow-lg transition-shadow hover:shadow-xl"
              >
                {/* Step circle */}
                <div className="relative z-10 mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-lg shadow-blue-100 ring-1 ring-slate-100">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-500">
                    <Icon size={28} className="text-white" />
                  </div>
                </div>

                {/* Step number */}
                <p className="mb-2 text-center text-sm font-semibold tracking-widest text-blue-500 uppercase">
                  Step {step.step}
                </p>

                <h3 className="text-center text-xl font-bold text-slate-900">{step.title}</h3>

                <p className="mt-3 text-center leading-relaxed text-slate-500">{step.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
