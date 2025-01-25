// PolicyPage.tsx

interface PolicyContent {
  title: string;
  sections: {
    heading: string;
    content: string[];
  }[];
}

const PolicyContent = ({ content }: { content: PolicyContent }) => {
  return (
    <div className="w-full container mx-auto p-6 light:bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-4 border-b-2">{content.title}</h1>
      {content.sections.map((section, index) => (
        <div key={index} className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">{section.heading}</h2>
          <ul className="list-disc list-inside">
            {section.content.map((item, idx) => (
              <li key={idx} className="text-lg">
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default PolicyContent;
