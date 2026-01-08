interface Props {
  activeService: string;
  tagline: string;
}

export default function ServiceTabsWithTagline({
  activeService,
  tagline,
}: Props) {
  return (
    <div className="mb-4">
      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-2 p-3 bg-gray-50 rounded-lg">
        {['One Way', 'Round Trip', 'Local'].map((label) => {
          const id = label.toLowerCase().replace(' ', '');
          return (
            <button
              key={id}
              disabled
              className={`px-4 py-1.5 rounded-full text-xs font-medium cursor-default ${
                activeService === id
                  ? 'bg-accent text-gray-900 shadow'
                  : 'bg-white text-gray-500 border'
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Tagline */}
      <div className="text-center py-2">
        <p className="text-sm text-gray-600 font-medium">
          {tagline}
        </p>
      </div>
    </div>
  );
}