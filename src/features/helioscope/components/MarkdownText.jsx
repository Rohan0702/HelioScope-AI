export default function MarkdownText({ text }) {
  const lines = text.split("\n");

  return (
    <div style={{ fontSize: 13, lineHeight: 1.7, color: "#c8ddf0" }}>
      {lines.map((line, index) => {
        if (!line.trim()) {
          return <div key={index} style={{ height: 8 }} />;
        }

        const parts = line.split(/(\*\*[^*]+\*\*)/g).map((part, partIndex) =>
          part.startsWith("**") ? (
            <strong key={partIndex} style={{ color: "#f4a623" }}>
              {part.slice(2, -2)}
            </strong>
          ) : (
            part
          ),
        );

        return (
          <p key={index} style={{ margin: "4px 0" }}>
            {parts}
          </p>
        );
      })}
    </div>
  );
}
