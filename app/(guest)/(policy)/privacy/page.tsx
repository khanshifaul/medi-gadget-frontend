import PolicyContent from "@/components/common/policy";

const privacyPolicyContent = {
  title: "Privacy Policy",
  sections: [
    {
      heading: "Information We Collect",
      content: [
        "We collect information that you provide to us directly, such as when you create an account, make a purchase, or contact us.",
      ],
    },
    {
      heading: "How We Use Your Information",
      content: [
        "We use your information to process transactions, provide customer support, and improve our services.",
      ],
    },
    {
      heading: "Sharing Your Information",
      content: [
        "We do not sell your personal information to third parties.",
        "We may share your information with service providers to assist with our operations.",
      ],
    },
    {
      heading: "Your Rights",
      content: [
        "You have the right to access, update, or delete your personal information.",
      ],
    },
  ],
};

const privacyPolicy = () => {
  return (
    <div>
      <PolicyContent content={privacyPolicyContent} />
    </div>
  );
};

export default privacyPolicy;
