"use client";

import { useRef } from "react";

interface OTPInputProps {
  length?: number;
  value: string[];
  onChange: (value: string[]) => void;
}

export default function OTPInput({
  length = 6,
  value,
  onChange,
}: OTPInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, val: string) => {
    if (!/^\d?$/.test(val)) return;

    const newValue = [...value];
    newValue[index] = val;

    onChange(newValue);

    if (val && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace") {
      if (value[index]) {
        const newValue = [...value];
        newValue[index] = "";
        onChange(newValue);
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }

    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (e.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, length);

    if (!pasted) return;

    const newValue = Array(length).fill("");

    pasted.split("").forEach((digit, index) => {
      newValue[index] = digit;
    });

    onChange(newValue);

    inputRefs.current[Math.min(pasted.length - 1, length - 1)]?.focus();
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "12px",
        width: "100%",
        marginBottom: "20px",
      }}
    >
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[index] || ""}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          style={{
            width: "52px",
            height: "52px",
            minWidth: "52px",
            maxWidth: "52px",
            minHeight: "52px",
            maxHeight: "52px",
            flex: "0 0 52px",
            borderRadius: "50%",
            border: "2px solid #475569",
            backgroundColor: "#1e293b",
            color: "white",
            textAlign: "center",
            fontSize: "20px",
            fontWeight: "700",
            outline: "none",
            padding: "0",
            boxSizing: "border-box",
          }}
        />
      ))}
    </div>
  );
}
