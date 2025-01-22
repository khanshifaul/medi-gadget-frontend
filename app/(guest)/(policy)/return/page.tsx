import PolicyContent from "@/components/common/policy";

const returnPolicyContent = {
  title: "Returns Policy",
  sections: [
    {
      heading: "Return Period",
      content: [
        "You can return products within 30 days of receipt for a full refund or exchange.",
      ],
    },
    {
      heading: "Conditions for Return",
      content: [
        "Products must be returned in their original condition, unused, and with all packaging intact.",
        "Proof of purchase is required.",
      ],
    },
    {
      heading: "How to Return",
      content: [
        "To initiate a return, please contact our customer service team with your order details.",
      ],
    },
  ],
};

const returnPolicy = () => {
  return (
    <div>
      <PolicyContent content={returnPolicyContent} />
    </div>
  );
};

export default returnPolicy;
