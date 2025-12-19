"use client";

import React from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

interface QuillEditorProps {
  value: string;
  onChange: (value: string) => void;
  modules?: any;
  placeholder?: string;
}

const QuillEditor: React.FC<QuillEditorProps> = ({
  value,
  onChange,
  modules,
  placeholder
}) => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div style={{ height: "200px" }}>Chargement de l'éditeur...</div>;
  }

  return (
    <ReactQuill
      value={value}
      onChange={onChange}
      theme="snow"
      modules={modules}
      placeholder={placeholder}
    />
  );
};

export default QuillEditor;
