import { useState, useEffect, useRef } from "react";

export function useTypewriter(
  words: string[],
  typingSpeed = 80,
  deletingSpeed = 45,
  pauseMs = 1800,
): string {
  const [displayText, setDisplayText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const prevFirstWord = useRef(words[0]);

  // Reset when language changes (detected via first word changing)
  useEffect(() => {
    if (prevFirstWord.current !== words[0]) {
      prevFirstWord.current = words[0];
      setDisplayText("");
      setWordIndex(0);
      setIsDeleting(false);
    }
  }, [words]);

  useEffect(() => {
    if (!words.length) return;
    const current = words[wordIndex % words.length];

    if (!isDeleting && displayText === current) {
      const timer = setTimeout(() => setIsDeleting(true), pauseMs);
      return () => clearTimeout(timer);
    }

    if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setWordIndex((i) => (i + 1) % words.length);
      return;
    }

    const timer = setTimeout(() => {
      setDisplayText(
        isDeleting
          ? current.slice(0, displayText.length - 1)
          : current.slice(0, displayText.length + 1),
      );
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseMs]);

  return displayText;
}
