import { Mail, Instagram, Globe } from "lucide-react";
import AnimateOnScroll from "../ui/AnimateOnScroll";

const contacts = [
  {
    icon: Mail,
    label: "Email",
    value: "neeranigam16@gmail.com",
    href: "mailto:neeranigam16@gmail.com",
  },
  {
    icon: Instagram,
    label: "Instagram",
    value: "@neeras.creations",
    href: "https://instagram.com/neeras.creations",
    external: true,
  },
  {
    icon: Globe,
    label: "Website",
    value: "neeras.netlify.app",
    href: "https://neeras.netlify.app",
    external: true,
  },
];

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 md:py-28 px-6 md:px-12">
      <div className="max-w-3xl mx-auto text-center">
        <AnimateOnScroll>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-warm-gray-800">
            Get in Touch
          </h2>
          <div className="w-12 h-px bg-accent mx-auto mt-4 mb-6" />
          <p className="text-warm-gray-500 max-w-md mx-auto mb-12">
            Interested in a commission, collaboration, or just want to say
            hello? I'd love to hear from you.
          </p>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {contacts.map((contact, i) => (
            <AnimateOnScroll key={contact.label} delay={i * 100}>
              <a
                href={contact.href}
                {...(contact.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="flex flex-col items-center p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow group"
              >
                <contact.icon className="w-6 h-6 text-accent mb-3 group-hover:scale-110 transition-transform" />
                <span className="text-sm text-warm-gray-400 uppercase tracking-wider">
                  {contact.label}
                </span>
                <span className="text-warm-gray-700 font-medium mt-1">
                  {contact.value}
                </span>
              </a>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
