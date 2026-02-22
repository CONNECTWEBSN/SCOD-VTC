"use client";

import * as React from "react";
import { motion } from "framer-motion";

const COMPANIES = [
  { name: "Company 1", logo: "/images/logos/company-1.svg" },
  { name: "Company 2", logo: "/images/logos/company-2.svg" },
  { name: "Company 3", logo: "/images/logos/company-3.svg" },
  { name: "Company 4", logo: "/images/logos/company-4.svg" },
  { name: "Company 5", logo: "/images/logos/company-5.svg" },
  { name: "Company 6", logo: "/images/logos/company-6.svg" },
];

export function EntreprisesTrust() {
  return (
    <section className="relative overflow-hidden bg-white py-16 lg:py-20">
      <div className="container px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="font-sans text-sm font-semibold uppercase tracking-widest text-grey-400">
            Ils nous font confiance
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mx-auto mt-12 grid max-w-5xl grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6"
        >
          {COMPANIES.map((company, index) => (
            <div
              key={company.name}
              className="flex items-center justify-center grayscale transition-all duration-300 hover:grayscale-0"
            >
              <div className="flex h-16 w-full items-center justify-center rounded-lg bg-grey-50 px-4">
                <span className="font-sans text-xs font-bold text-grey-400">
                  {company.name}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
