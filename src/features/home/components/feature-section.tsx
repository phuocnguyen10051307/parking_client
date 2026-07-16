import { motion } from 'framer-motion';
import { MapPinned, ShieldCheck, Coins, Clock3 } from 'lucide-react';

const whyChooseItems = [
  {
    icon: ShieldCheck,
    title: 'Secure & Safe',
    description:
      'Your vehicle is protected with 24/7 surveillance, access control systems, and dedicated security personnel.',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    icon: Clock3,
    title: 'Save Time',
    description:
      'Reserve your parking slot in advance and skip the hassle of searching for a spot. Arrive, park, and go.',
    color: 'bg-violet-100 text-violet-600',
  },
  {
    icon: Coins,
    title: 'Transparent Pricing',
    description:
      'No hidden fees. View all parking rates upfront based on vehicle type and duration before you book.',
    color: 'bg-emerald-100 text-emerald-600',
  },
  {
    icon: MapPinned,
    title: 'Multiple Locations',
    description:
      'Access parking buildings across the city. Choose the one closest to your destination and reserve instantly.',
    color: 'bg-amber-100 text-amber-600',
  },
];

export function FeatureSection() {
  return (
    <section>
      <div className="mb-20 flex flex-col items-center">
        <h2 className="mt-6 text-center text-5xl font-bold text-slate-900">Why Choose CityPark?</h2>
        <p className="mt-5 max-w-2xl text-center text-lg leading-8 text-slate-500">
          We provide the best parking experience for you.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
        {whyChooseItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="rounded-3xl border border-slate-100 bg-white p-8 shadow-lg transition-shadow hover:shadow-xl"
            >
              <div
                className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl ${item.color}`}
              >
                <Icon size={26} />
              </div>

              <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>

              <p className="mt-3 leading-relaxed text-slate-500">{item.description}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
