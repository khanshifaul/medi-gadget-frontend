import NewsletterForm from "./form-newsletter";

const newsletterContent = {
  heading: "Stay Updated with MediGadget Innovations!",
  paragraph1:
    "Be the first to know about our latest medical gadgets, health tips, and exclusive offers.",
  paragraph2: "Subscribe to our newsletter today!",
};

const NewsletterSection = () => {
  return (
    <div className="md:container mx-auto my-12">
      <div className="bg-accent md:flex justify-between items-center gap-5 p-4">
        <div className="flex flex-col gap-5">
          <h2 className="text-accent-foreground font-semibold text-2xl">
            {newsletterContent.heading}
          </h2>
          <p className="text-foreground/35 text-lg">
            <span>{newsletterContent.paragraph1}</span>
            <br />
            <span>{newsletterContent.paragraph2}</span>
          </p>
        </div>
        <NewsletterForm />
      </div>
    </div>
  );
};

export default NewsletterSection;
