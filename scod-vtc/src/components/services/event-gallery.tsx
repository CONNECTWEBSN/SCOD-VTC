"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const GALLERY_IMAGES = [
  {
    src: "/images/events/wedding-car-1.jpg",
    alt: "Véhicule décoré pour mariage",
    aspect: "tall",
  },
  {
    src: "/images/events/corporate-event.jpg",
    alt: "Navette événement corporate",
    aspect: "wide",
  },
  {
    src: "/images/events/gala-night.jpg",
    alt: "Transport VIP soirée de gala",
    aspect: "square",
  },
  {
    src: "/images/events/wedding-car-2.jpg",
    alt: "Mercedes décorée pour cérémonie",
    aspect: "square",
  },
  {
    src: "/images/events/conference-shuttle.jpg",
    alt: "Navette congrès",
    aspect: "wide",
  },
  {
    src: "/images/events/wedding-car-3.jpg",
    alt: "Tesla Model S pour événement",
    aspect: "tall",
  },
];

export function EventGallery() {
  return (
    <section className="relative overflow-hidden bg-white py-20 lg:py-28">
      <div className="container px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-sans text-sm font-bold uppercase tracking-widest text-accent"
          >
            Galerie
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-3 font-sans text-4xl font-bold text-grey-900 md:text-5xl"
          >
            Nos plus beaux{" "}
            <span className="bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">
              événements
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 font-sans text-lg text-grey-600"
          >
            Découvrez notre flotte en action lors d&apos;événements prestigieux
          </motion.p>
        </div>

        {/* Masonry grid */}
        <div className="mx-auto mt-16 max-w-6xl">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {GALLERY_IMAGES.map((image, index) => (
              <motion.div
                key={image.src}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={`group relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl ${
                  image.aspect === "tall"
                    ? "row-span-2"
                    : image.aspect === "wide"
                    ? "sm:col-span-2"
                    : ""
                }`}
              >
                <div className="relative aspect-square overflow-hidden">
                  <div
                    className="h-full w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{
                      backgroundImage: `url(${image.src})`,
                    }}
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 via-brand-dark/0 to-brand-dark/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  {/* Caption on hover */}
                  <div className="absolute bottom-0 left-0 right-0 translate-y-full p-4 transition-transform duration-300 group-hover:translate-y-0">
                    <p className="font-sans text-sm font-semibold text-white">
                      {image.alt}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center font-sans text-sm text-grey-400"
        >
          +200 événements organisés avec succès depuis 2020
        </motion.p>
      </div>
    </section>
  );
}
