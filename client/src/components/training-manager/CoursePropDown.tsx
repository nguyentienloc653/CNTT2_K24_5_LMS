import { useEffect, useRef, useState } from "react";

type CourseOption = "React.js" | "Node.js" | "Web Frontend Fundamental";

const options: CourseOption[] = ["React.js", "Node.js", "Web Frontend Fundamental"];

function CourseDropdown() {
  const [open, setOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<CourseOption>("React.js");

  const ref = useRef<HTMLDivElement | null>(null);

  // đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const el = ref.current;
      const target = e.target as Node | null;

      if (el && target && !el.contains(target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="course-dropdown" ref={ref}>
      <button
        type="button"
        className="course-trigger"
        onClick={() => setOpen((o) => !o)}
      >
        <span className="course-trigger-text">{selected}</span>
        <span className="course-caret">▾</span>
      </button>

      {open && (
        <div className="course-menu">
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              className={"course-option" + (opt === selected ? " active" : "")}
              onClick={() => {
                setSelected(opt);
                setOpen(false);
              }}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default CourseDropdown;
