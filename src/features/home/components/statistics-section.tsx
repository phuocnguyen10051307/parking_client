import { motion } from 'framer-motion';
import { Building2, CarFront, ParkingCircle, Users } from 'lucide-react';

const statistics = [
  {
    icon: Users,
    value: '25K+',
    label: 'Registered Users',
    color: 'bg-blue-100 text-blue-600',
    bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100',
  },
  {
    icon: Building2,
    value: '18+',
    label: 'Parking Buildings',
    color: 'bg-violet-100 text-violet-600',
    bgColor: 'bg-gradient-to-br from-violet-50 to-violet-100',
  },
  {
    icon: ParkingCircle,
    value: '850+',
    label: 'Parking Slots',
    color: 'bg-emerald-100 text-emerald-600',
    bgColor: 'bg-gradient-to-br from-emerald-50 to-emerald-100',
  },
  {
    icon: CarFront,
    value: '120K+',
    label: 'Vehicles Served',
    color: 'bg-amber-100 text-amber-600',
    bgColor: 'bg-gradient-to-br from-amber-50 to-amber-100',
  },
];

export function StatisticsSection() {
  return (
    <section className="rounded-[36px] bg-gradient-to-br from-slate-50 to-blue-50/50 py-20">
      <div className="mx-auto max-w-5xl px-4">
        <div className="mb-20 flex flex-col items-center">
          <span className="rounded-full border border-blue-200 bg-blue-50 px-5 py-2 text-sm font-medium text-blue-700">
            Our Achievement
          </span>
          <h2 className="mt-6 text-center text-5xl font-bold text-slate-900">
            Trusted by Thousands of Drivers
          </h2>
          <p className="mt-5 max-w-2xl text-center text-lg leading-8 text-slate-500">
            CityPark continuously improves the parking experience with smart technology and reliable
            services.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
          {statistics.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className={`rounded-3xl border border-slate-100 p-8 shadow-lg backdrop-blur-sm transition-shadow hover:shadow-xl ${item.bgColor}`}
              >
                <div
                  className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl ${item.color}`}
                >
                  <Icon size={26} />
                </div>

                <motion.h3
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                  className="text-5xl font-extrabold tracking-tight text-slate-900"
                >
                  {item.value}
                </motion.h3>

                <p className="mt-3 text-sm font-medium text-slate-500">{item.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
