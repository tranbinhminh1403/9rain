"use client";

import DOMPurify from "dompurify";

type Props = {
  html: string;
  className?: string;
};

export default function SafeHTML({ html, className }: Props) {
  const sanitized = DOMPurify.sanitize(html);

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: sanitized }}
    />
  );
}
