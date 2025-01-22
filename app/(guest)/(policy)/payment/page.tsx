import PolicyContent from "@/components/common/policy";

const paymentPolicyContent = {
  title: "Payment Policy",
  sections: [
    {
      heading: "Accepted Payment Methods",
      content: [
        "Credit/Debit Cards (Visa, MasterCard, American Express)",
        "PayPal",
        "Bank Transfers",
      ],
    },
    {
      heading: "Payment Terms",
      content: [
        "All payments must be made in full at the time of purchase.",
        "We do not offer payment plans or credit terms.",
      ],
    },
    {
      heading: "Security",
      content: [
        "We use industry-standard encryption to protect your payment information.",
        "Your security is our priority.",
      ],
    },
  ],
};

const paymentPolicy = () => {
  return (
    <div>
      <PolicyContent content={paymentPolicyContent} />
    </div>
  );
};

export default paymentPolicy;
