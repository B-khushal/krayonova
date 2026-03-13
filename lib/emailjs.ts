import emailjs from "@emailjs/browser";

export type ContactEmailPayload = {
  name: string;
  email: string;
  phone: string;
  company?: string;
  projectType?: string;
  budget?: string;
  timeline?: string;
  description: string;
};

function getEmailJsConfig() {
  const serviceId = process.env.EMAILJS_SERVICE_ID || process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = process.env.EMAILJS_TEMPLATE_ID || process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.EMAILJS_PUBLIC_KEY || process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    throw new Error("Email service is not configured. Please set EmailJS environment variables.");
  }

  return { serviceId, templateId, publicKey };
}

export async function sendContactEmail(payload: ContactEmailPayload) {
  const { serviceId, templateId, publicKey } = getEmailJsConfig();

  const templateParams = {
    from_name: payload.name,
    from_email: payload.email,
    phone: payload.phone,
    company: payload.company || "N/A",
    project_type: payload.projectType || "N/A",
    budget: payload.budget || "N/A",
    timeline: payload.timeline || "N/A",
    message: payload.description,
  };

  await emailjs.send(serviceId, templateId, templateParams, { publicKey });
}
