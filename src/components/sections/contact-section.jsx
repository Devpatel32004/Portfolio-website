"use client";

import { useState, useRef } from "react";
import { Dialog } from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Phone, ExternalLink, FolderLock, Send, Sparkles, CheckCircle, AlertCircle, Loader2, User, MessageSquare, Eye } from "lucide-react";
import emailjs from "@emailjs/browser";
import { SectionHeading } from "@/components/section-heading";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { profile } from "@/data/portfolio";

const quickActions = [
  { label: "View Resume", icon: ExternalLink, href: profile.resumeVaultUrl, external: true },
  { label: "Open Recruiter Vault", icon: FolderLock, href: "#vault", external: false },
];

export function ContactSection() {
  const formRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(null); // 'success' | 'error' | 'config-error' | null
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [showPreview, setShowPreview] = useState(false);
  const [configError, setConfigError] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";
    if (formData.message.length < 10) newErrors.message = "Message must be at least 10 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitClick = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Check if EmailJS is configured
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setConfigError(true);
      setStatus("config-error");
      return;
    }

    // Show preview dialog
    setShowPreview(true);
  };

  const handleConfirmSend = async () => {
    setShowPreview(false);
    setIsLoading(true);
    setStatus(null);

    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      await emailjs.sendForm(
        serviceId,
        templateId,
        formRef.current,
        publicKey
      );
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("EmailJS Error:", error);
      setStatus("error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <section id="contact" className="scroll-mt-24 py-16 md:py-20">
      <div className="mx-auto w-[min(1100px,95%)]">
        <SectionHeading
          title="Contact"
          subtitle="Open to internships and full-time opportunities in frontend and full-stack engineering."
        />

        {/* Open To Work Banner */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card className="border-emerald-300/20 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-400/20">
                  <span className="relative flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-400"></span>
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-emerald-200">Open To Work</h3>
                  <p className="text-sm text-zinc-300">Available for Full Stack & Frontend roles</p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Contact Form */}
          <Card className="transition-all duration-300 hover:border-cyan-300/20">
            <form ref={formRef} onSubmit={handleSubmitClick} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">Your Name</label>
                <Input 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe" 
                  className={errors.name ? "border-red-400/50" : ""}
                />
                {errors.name && (
                  <p className="text-xs text-red-400">{errors.name}</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">Your Email</label>
                <Input 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@company.com" 
                  type="email" 
                  className={errors.email ? "border-red-400/50" : ""}
                />
                {errors.email && (
                  <p className="text-xs text-red-400">{errors.email}</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">Message</label>
                <Textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="I'm interested in discussing opportunities..." 
                  rows={5} 
                  className={errors.message ? "border-red-400/50" : ""}
                />
                {errors.message && (
                  <p className="text-xs text-red-400">{errors.message}</p>
                )}
              </div>
              
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center justify-center gap-2 rounded-lg border border-emerald-300/30 bg-emerald-400/10 py-3 text-emerald-200"
                  >
                    <CheckCircle size={18} />
                    <span className="text-sm font-medium">Message sent successfully!</span>
                  </motion.div>
                ) : status === "error" ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center justify-center gap-2 rounded-lg border border-red-300/30 bg-red-400/10 py-3 text-red-200"
                  >
                    <AlertCircle size={18} />
                    <span className="text-sm font-medium">Failed to send. Please try again.</span>
                  </motion.div>
                ) : status === "config-error" ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center justify-center gap-2 rounded-lg border border-amber-300/30 bg-amber-400/10 px-4 py-3 text-amber-200"
                  >
                    <AlertCircle size={18} />
                    <span className="text-sm font-medium text-center">Email service not configured. Contact: {profile.email}</span>
                  </motion.div>
                ) : (
                  <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                    <Button 
                      type="submit" 
                      className="w-full"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 size={16} className="mr-2 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={16} className="mr-2" />
                          Send Inquiry
                        </>
                      )}
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>

          </Card>

          {/* Recruiter Quick Actions & Links */}
          <div className="space-y-4">
            {/* Quick Actions */}
            <Card className="transition-all duration-300 hover:border-cyan-300/20">
              <div className="mb-4 flex items-center gap-2">
                <Sparkles size={18} className="text-cyan-300" />
                <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-cyan-200">
                  Recruiter Quick Actions
                </h3>
              </div>
              <div className="space-y-2">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <motion.a
                      key={action.label}
                      href={action.href}
                      target={action.external ? "_blank" : undefined}
                      rel={action.external ? "noopener noreferrer" : undefined}
                      className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:border-cyan-300/30 hover:bg-cyan-400/5"
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: -4 }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-400/10 transition-colors duration-300 group-hover:bg-cyan-400/20">
                          <Icon size={18} className="text-cyan-300" />
                        </div>
                        <span className="font-medium text-white">{action.label}</span>
                      </div>
                    </motion.a>
                  );
                })}
              </div>
            </Card>

            {/* Contact Info */}
            <Card className="transition-all duration-300 hover:border-cyan-300/20">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-zinc-400">
                Contact Details
              </h3>
              <div className="space-y-3 text-zinc-300">
                <a
                  className="group flex items-center gap-3 rounded-lg p-2 transition-all duration-200 hover:bg-white/5 hover:text-cyan-200"
                  href={`mailto:${profile.email}`}
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5">
                    <Mail size={14} className="text-cyan-300" />
                  </div>
                  <span className="text-sm">{profile.email}</span>
                </a>
                <div className="flex items-center gap-3 rounded-lg p-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5">
                    <Phone size={14} className="text-cyan-300" />
                  </div>
                  <span className="text-sm">{profile.phone}</span>
                </div>
                <div className="flex items-center gap-3 rounded-lg p-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5">
                    <MapPin size={14} className="text-cyan-300" />
                  </div>
                  <span className="text-sm">{profile.location}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Preview Dialog */}
      <Dialog
        open={showPreview}
        onClose={() => setShowPreview(false)}
        title={
          <span className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-cyan-400" />
            Confirm Your Message
          </span>
        }
      >
        <p className="mb-4 text-sm text-zinc-400">
          Please review your information before sending.
        </p>

          <div className="space-y-4 py-4">
            {/* Name */}
            <div className="flex items-start gap-3 rounded-lg border border-zinc-700/50 bg-zinc-800/50 p-3">
              <User className="mt-0.5 h-5 w-5 text-cyan-400" />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-zinc-500 uppercase">Name</p>
                <p className="text-sm text-white truncate">{formData.name}</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-3 rounded-lg border border-zinc-700/50 bg-zinc-800/50 p-3">
              <Mail className="mt-0.5 h-5 w-5 text-cyan-400" />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-zinc-500 uppercase">Email</p>
                <p className="text-sm text-white truncate">{formData.email}</p>
              </div>
            </div>

            {/* Message */}
            <div className="flex items-start gap-3 rounded-lg border border-zinc-700/50 bg-zinc-800/50 p-3">
              <MessageSquare className="mt-0.5 h-5 w-5 text-cyan-400" />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-zinc-500 uppercase">Message</p>
                <p className="text-sm text-white whitespace-pre-wrap break-words max-h-32 overflow-y-auto">
                  {formData.message}
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setShowPreview(false)}
              className="flex-1 border-zinc-600 text-zinc-300 hover:bg-zinc-800"
            >
              Edit
            </Button>
            <Button
              onClick={handleConfirmSend}
              disabled={isLoading}
              className="flex-1 bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-400 hover:to-violet-400"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Send Now
                </>
              )}
            </Button>
          </div>
      </Dialog>
    </section>
  );
}
