// components/NoteDetail.tsx
import React from "react";
import { Card } from "@/components/ui/card";

export interface NoteDetailProps {
  note: {
    id: string;
    title: string;
    description: string;
    createdAt: Date;
  };
}

const NoteDetail: React.FC<NoteDetailProps> = ({ note }) => {
  return (
    <div className="p-4 md:p-8">
      <Card className="p-6 md:p-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{note.title}</h1>
        <p className="text-sm text-muted-foreground mb-6">
          {new Intl.DateTimeFormat("en-US", {
            dateStyle: "full",
          }).format(new Date(note.createdAt))}
        </p>
        <div className="text-lg leading-relaxed whitespace-pre-line">
          {note.description}
        </div>
      </Card>
    </div>
  );
};

export default NoteDetail;