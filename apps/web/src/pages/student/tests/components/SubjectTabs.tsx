interface SubjectTabsProps {
  subjects: string[];
  activeSubject: string;
  onChange: (subject: string) => void;
}

const SubjectTabs = ({
  subjects,
  activeSubject,
  onChange,
}: SubjectTabsProps) => {
  return (
    <div className="flex border-t border-gray-200 bg-gray-100">
      {subjects.map((subject) => (
        <button
          key={subject}
          onClick={() => onChange(subject)}
          className={`px-6 py-3 font-medium transition ${
            activeSubject === subject
              ? "bg-white border-b-2 border-indigo-600 text-indigo-600"
              : "text-gray-600 hover:bg-gray-200"
          }`}
        >
          {subject}
        </button>
      ))}
    </div>
  );
};

export default SubjectTabs;