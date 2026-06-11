import { motion } from 'framer-motion'
import { Section } from '../../../shared/components/layout/Section'
import { WaitlistForm } from './WaitlistForm'

export function Waitlist() {
  return (
    <Section className="text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
          Get early access
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-white/50">
          Be the first to experience cinematic AI video generation. Join the waitlist for exclusive early access.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="mt-10"
      >
        <WaitlistForm />
      </motion.div>
    </Section>
  )
}
