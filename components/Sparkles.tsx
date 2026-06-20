// Ambient sparkles. Positions are fixed (not random) so server and client
// markup match and there is no hydration warning.
const SPARKLES = [
  { top: "12%", left: "8%", size: 14, delay: "0s" },
  { top: "22%", left: "82%", size: 10, delay: "1.4s" },
  { top: "40%", left: "48%", size: 8, delay: "2.1s" },
  { top: "62%", left: "16%", size: 12, delay: "0.7s" },
  { top: "74%", left: "88%", size: 9, delay: "1.9s" },
  { top: "33%", left: "30%", size: 7, delay: "2.8s" },
  { top: "84%", left: "55%", size: 11, delay: "1.1s" },
  { top: "16%", left: "64%", size: 8, delay: "3.2s" },
];

export default function Sparkles() {
  return (
    <div className="sparkle-field" aria-hidden="true">
      {SPARKLES.map((s, i) => (
        <svg
          key={i}
          className="sparkle"
          style={{ top: s.top, left: s.left, width: s.size, height: s.size, animationDelay: s.delay }}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 0c.6 6 5.4 11 12 12-6.6 1-11.4 6-12 12-.6-6-5.4-11-12-12 6.6-1 11.4-6 12-12z" />
        </svg>
      ))}
    </div>
  );
}
