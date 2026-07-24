import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

function OffersHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 py-28">
      {/* Background Glow */}
      <div className="absolute -top-24 left-20 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl animate-pulse"></div>

      <div className="absolute bottom-0 right-20 h-72 w-72 rounded-full bg-orange-500/20 blur-3xl animate-pulse"></div>

      {/* Floating Circles */}
      <div className="absolute top-24 right-1/4 h-4 w-4 rounded-full bg-white/40 animate-bounce"></div>

      <div className="absolute bottom-28 left-1/3 h-3 w-3 rounded-full bg-orange-400 animate-ping"></div>

      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">

        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-block rounded-full bg-orange-500 px-5 py-2 text-sm font-semibold text-white shadow-lg">
            🔥 FLASH SALE
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mt-8 text-5xl md:text-7xl font-black uppercase text-white"
        >
          UP TO
          <span className="block text-orange-400">
            50% OFF
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-gray-300"
        >
          Grab premium sneakers at unbeatable prices.
          Limited-time offers on selected collections.
        </motion.p>

        <motion.a
          href="#offers"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-orange-500 px-8 py-4 font-semibold text-white transition hover:bg-orange-600"
        >
          Explore Deals
          <ArrowDown size={18} />
        </motion.a>

      </div>
    </section>
  );
}

export default OffersHero;