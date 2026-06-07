import React from "react";

interface PlaybookRefCardProps {
  title: string;
  children: React.ReactNode;
}

export const PlaybookRefCard: React.FC<PlaybookRefCardProps> = ({
  title,
  children,
}) => (
  <li>
    <article className="card playbook-ref-card">
      <h2 className="playbook-ref-title">{title}</h2>
      {children}
    </article>
  </li>
);

interface PlaybookBulletListProps {
  items: string[];
}

export const PlaybookBulletList: React.FC<PlaybookBulletListProps> = ({
  items,
}) => (
  <ul className="playbook-ref-bullets">
    {items.map((item) => (
      <li key={item}>{item}</li>
    ))}
  </ul>
);
