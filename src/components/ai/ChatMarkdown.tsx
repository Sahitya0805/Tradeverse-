import React from 'react';

// Renders the small markdown subset chat replies use (**bold**, *italic*, `code`, headings, bullet and
// numbered lists) as React elements, so model output is never injected as raw HTML.

function renderInline(text: string, keyPrefix: string): React.ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*\s][^*]*\*|`[^`]+`)/g);
  return parts.filter(Boolean).map((part, i) => {
    const key = `${keyPrefix}-${i}`;
    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) return <strong key={key}>{part.slice(2, -2)}</strong>;
    if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
      return <code key={key} className="px-1 rounded bg-[#F6F4F0] text-[11px]">{part.slice(1, -1)}</code>;
    }
    if (part.startsWith('*') && part.endsWith('*') && part.length > 2) return <em key={key}>{part.slice(1, -1)}</em>;
    return <React.Fragment key={key}>{part}</React.Fragment>;
  });
}

export const ChatMarkdown: React.FC<{ text: string }> = ({ text }) => {
  const blocks: React.ReactNode[] = [];
  let list: { ordered: boolean; items: string[] } | null = null;

  const flushList = () => {
    if (!list) return;
    const key = `list-${blocks.length}`;
    const items = list.items.map((item, i) => <li key={i}>{renderInline(item, `${key}-${i}`)}</li>);
    blocks.push(list.ordered
      ? <ol key={key} className="list-decimal pl-5 space-y-0.5">{items}</ol>
      : <ul key={key} className="list-disc pl-5 space-y-0.5">{items}</ul>);
    list = null;
  };

  text.split('\n').forEach((rawLine, idx) => {
    const line = rawLine.trimEnd();
    const bullet = line.match(/^\s*(?:[-*•])\s+(.*)$/);
    const numbered = line.match(/^\s*\d+[.)]\s+(.*)$/);
    const heading = line.match(/^#{1,4}\s+(.*)$/);

    if (bullet || numbered) {
      const ordered = Boolean(numbered);
      if (list && list.ordered !== ordered) flushList();
      list ??= { ordered, items: [] };
      list.items.push((bullet || numbered)![1]);
      return;
    }
    flushList();
    if (line.trim() === '') return;
    if (heading) {
      blocks.push(<div key={`h-${idx}`} className="font-bold">{renderInline(heading[1], `h-${idx}`)}</div>);
    } else {
      blocks.push(<p key={`p-${idx}`}>{renderInline(line, `p-${idx}`)}</p>);
    }
  });
  flushList();

  return <div className="space-y-1.5">{blocks}</div>;
};
