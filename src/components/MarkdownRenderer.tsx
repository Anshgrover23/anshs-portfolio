"use client"
import React from 'react';

interface MarkdownRendererProps {
  content: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const renderContent = () => {
    const lines = content.split('\n');
    const elements: JSX.Element[] = [];
    let inCodeBlock = false;
    let codeBlockContent: string[] = [];
    let codeBlockLang = '';

    lines.forEach((line, index) => {
      // Code blocks
      if (line.startsWith('```')) {
        if (!inCodeBlock) {
          inCodeBlock = true;
          codeBlockLang = line.slice(3).trim();
          codeBlockContent = [];
        } else {
          elements.push(
            <div key={`code-${index}`} className="my-4 rounded-lg overflow-hidden">
              <div className="bg-gray-800 px-4 py-2 text-xs text-gray-400 border-b border-gray-700">
                {codeBlockLang || 'code'}
              </div>
              <pre className="bg-gray-900 p-4 overflow-x-auto">
                <code className="text-sm text-gray-300">{codeBlockContent.join('\n')}</code>
              </pre>
            </div>
          );
          inCodeBlock = false;
          codeBlockContent = [];
          codeBlockLang = '';
        }
        return;
      }

      if (inCodeBlock) {
        codeBlockContent.push(line);
        return;
      }

      if (line.startsWith('# ')) {
        elements.push(
          <h1 key={index} className="text-4xl font-bold mt-8 mb-4 text-white">
            {line.slice(2)}
          </h1>
        );
      } else if (line.startsWith('## ')) {
        elements.push(
          <h2 key={index} className="text-3xl font-bold mt-6 mb-3 text-white">
            {line.slice(3)}
          </h2>
        );
      } else if (line.startsWith('### ')) {
        elements.push(
          <h3 key={index} className="text-2xl font-bold mt-4 mb-2 text-white">
            {line.slice(4)}
          </h3>
        );
      } else if (line.startsWith('- ')) {
        const content = line.slice(2);
        const formatted = formatInlineMarkdown(content);
        elements.push(
          <li key={index} className="ml-6 mb-2 text-gray-300 list-disc">
            {formatted}
          </li>
        );
      } else if (line.trim() !== '') {
        const formatted = formatInlineMarkdown(line);
        elements.push(
          <p key={index} className="mb-4 text-gray-300 leading-relaxed">
            {formatted}
          </p>
        );
      } else {
        elements.push(<div key={index} className="h-2" />);
      }
    });

    return elements;
  };

  const formatInlineMarkdown = (text: string): React.ReactNode => {
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    
    const boldRegex = /\*\*(.*?)\*\*/g;
    const codeRegex = /`(.*?)`/g;
    const combinedRegex = /\*\*(.*?)\*\*|`(.*?)`/g;
    
    let match;
    while ((match = combinedRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }
      
      if (match[1] !== undefined) {
        parts.push(
          <strong key={match.index} className="font-bold text-white">
            {match[1]}
          </strong>
        );
      } else if (match[2] !== undefined) {
        parts.push(
          <code key={match.index} className="bg-gray-800 text-blue-400 px-2 py-1 rounded text-sm">
            {match[2]}
          </code>
        );
      }
      
      lastIndex = match.index + match[0].length;
    }
    
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }
    
    return parts.length > 0 ? <>{parts}</> : text;
  };

  return (
    <div className="prose prose-invert max-w-none">
      {renderContent()}
    </div>
  );
};
