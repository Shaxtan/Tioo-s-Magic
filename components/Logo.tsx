const LOGO_CSS = `
.cl-blink{transform-box:fill-box;transform-origin:center;animation:clBlink 4.2s ease-in-out infinite}
@keyframes clBlink{0%,92%,100%{transform:scaleY(1)}95%{transform:scaleY(.06)}}
.cl-ponyL{transform-box:fill-box;transform-origin:100% 20%;animation:clSwayL 3s ease-in-out infinite}
@keyframes clSwayL{0%,100%{transform:rotate(0)}50%{transform:rotate(-7deg)}}
.cl-ponyR{transform-box:fill-box;transform-origin:0% 20%;animation:clSwayR 3s ease-in-out infinite}
@keyframes clSwayR{0%,100%{transform:rotate(0)}50%{transform:rotate(7deg)}}
.cl-clip{transform-box:fill-box;transform-origin:center;animation:clTwinkle 2.2s ease-in-out infinite}
@keyframes clTwinkle{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.18);opacity:.85}}
@media (prefers-reduced-motion: reduce){.cl-blink,.cl-ponyL,.cl-ponyR,.cl-clip{animation:none}}
`;

export default function Logo({ size = 40 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="198 102 284 284"
      role="img"
      aria-label="Charmlings logo"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block", flexShrink: 0 }}
    >
      <style dangerouslySetInnerHTML={{ __html: LOGO_CSS }} />

      {/* badge backdrop */}
      <circle cx="340" cy="232" r="150" fill="#ffe7f1" />

      {/* PIGTAIL LEFT */}
      <g className="cl-ponyL">
        <path d="M284 150 C250 120 220 126 213 153 C205 180 206 210 221 235 C229 251 247 253 251 238 C245 232 241 214 249 196 C257 176 268 160 284 150 Z" fill="#5e4435" />
        <path d="M270 160 C248 180 240 207 250 231" stroke="#7a5a46" strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.55" />
        <ellipse cx="247" cy="244" rx="11" ry="8" transform="rotate(-28 247 244)" fill="#4f3a2c" />
      </g>

      {/* PIGTAIL RIGHT */}
      <g className="cl-ponyR">
        <path d="M400 150 C434 120 464 126 471 153 C479 180 478 210 463 235 C455 251 437 253 433 238 C439 232 443 214 435 196 C427 176 416 160 400 150 Z" fill="#5e4435" />
        <path d="M414 160 C436 180 444 207 434 231" stroke="#7a5a46" strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.55" />
        <ellipse cx="437" cy="244" rx="11" ry="8" transform="rotate(28 437 244)" fill="#4f3a2c" />
      </g>

      {/* shirt */}
      <path d="M296 332 Q318 319 340 323 Q362 319 384 332 Q387 355 340 360 Q293 355 296 332 Z" fill="#ffd9e1" />
      <path d="M324 323 L340 340 L356 323" stroke="#ffb3c6" strokeWidth="2.5" fill="none" />
      <ellipse cx="296" cy="338" rx="14" ry="12" fill="#ffd9e1" />
      <ellipse cx="384" cy="338" rx="14" ry="12" fill="#ffd9e1" />

      {/* neck */}
      <rect x="323" y="306" width="34" height="28" rx="9" fill="#fbdcc8" />
      <ellipse cx="340" cy="312" rx="17" ry="6" fill="#f0c4ad" opacity="0.55" />

      {/* head */}
      <ellipse cx="340" cy="238" rx="100" ry="97" fill="#fde8d8" />

      {/* ears */}
      <ellipse cx="244" cy="246" rx="13" ry="17" fill="#fde8d8" />
      <ellipse cx="244" cy="246" rx="7" ry="10" fill="#f6c3b6" />
      <ellipse cx="436" cy="246" rx="13" ry="17" fill="#fde8d8" />
      <ellipse cx="436" cy="246" rx="7" ry="10" fill="#f6c3b6" />

      {/* fringe shadow */}
      <ellipse cx="340" cy="212" rx="88" ry="20" fill="#f6d3bf" opacity="0.5" />

      {/* eyebrows */}
      <path d="M285 223 Q302 217 319 222" stroke="#6e4d38" strokeWidth="2.6" fill="none" strokeLinecap="round" />
      <path d="M361 222 Q378 217 395 223" stroke="#6e4d38" strokeWidth="2.6" fill="none" strokeLinecap="round" />

      {/* eyes */}
      <g className="cl-blink">
        <ellipse cx="302" cy="252" rx="22" ry="26" fill="#ffffff" />
        <circle cx="302" cy="254" r="19" fill="#4e3320" />
        <circle cx="302" cy="254" r="16" fill="#8a5836" />
        <circle cx="302" cy="255" r="12" fill="#6e4528" />
        <ellipse cx="302" cy="262" rx="10" ry="6" fill="#f0b870" opacity="0.6" />
        <circle cx="302" cy="254" r="8" fill="#2c1b10" />
        <circle cx="295" cy="246" r="6.5" fill="#ffffff" />
        <circle cx="308" cy="259" r="3.6" fill="#ffffff" opacity="0.9" />
        <circle cx="306" cy="247" r="2" fill="#ffffff" />
        <ellipse cx="378" cy="252" rx="22" ry="26" fill="#ffffff" />
        <circle cx="378" cy="254" r="19" fill="#4e3320" />
        <circle cx="378" cy="254" r="16" fill="#8a5836" />
        <circle cx="378" cy="255" r="12" fill="#6e4528" />
        <ellipse cx="378" cy="262" rx="10" ry="6" fill="#f0b870" opacity="0.6" />
        <circle cx="378" cy="254" r="8" fill="#2c1b10" />
        <circle cx="371" cy="246" r="6.5" fill="#ffffff" />
        <circle cx="384" cy="259" r="3.6" fill="#ffffff" opacity="0.9" />
        <circle cx="382" cy="247" r="2" fill="#ffffff" />
      </g>

      {/* lashes */}
      <path d="M278 248 Q302 226 326 248 Q302 237 278 248 Z" fill="#3a2418" />
      <path d="M354 248 Q378 226 402 248 Q378 237 354 248 Z" fill="#3a2418" />
      <path d="M278 248 Q271 243 268 247 Q273 247 278 250 Z" fill="#3a2418" />
      <path d="M402 248 Q409 243 412 247 Q407 247 402 250 Z" fill="#3a2418" />

      {/* nose + mouth */}
      <path d="M337 268 Q340 273 343 268" stroke="#e8b49e" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M330 282 Q340 297 350 282 Q341 289 330 282 Z" fill="#cf566f" />
      <path d="M335 286 Q340 291 345 286 Q340 289 335 286 Z" fill="#ff9bb3" />

      {/* fringe */}
      <path d="M242 206 Q235 138 300 121 Q340 113 380 121 Q445 138 438 206 Q418 186 396 196 Q380 178 360 192 Q349 201 340 183 Q331 201 320 192 Q300 178 284 196 Q262 186 242 206 Z" fill="#5e4435" />
      <path d="M286 150 Q316 132 350 138" stroke="#7a5a46" strokeWidth="7" fill="none" strokeLinecap="round" opacity="0.55" />

      {/* side locks */}
      <path d="M243 202 Q231 252 246 300 Q254 268 251 232 Q249 214 243 202 Z" fill="#5e4435" />
      <path d="M437 202 Q449 252 434 300 Q426 268 429 232 Q431 214 437 202 Z" fill="#5e4435" />

      {/* star clip */}
      <g className="cl-clip">
        <polygon points="289,170 293,180 304,180 295,187 298,198 289,191 280,198 283,187 274,180 285,180" fill="#f6c453" stroke="#e8a93a" strokeWidth="1" />
        <circle cx="289" cy="182" r="3" fill="#fff3d4" />
      </g>

      {/* bows */}
      <g>
        <path d="M284 150 C272 140 260 141 266 152 C260 163 272 164 284 150 Z" fill="#ff8fab" />
        <path d="M284 150 C296 140 308 141 302 152 C308 163 296 164 284 150 Z" fill="#ff8fab" />
        <circle cx="284" cy="151" r="5" fill="#e84e73" />
      </g>
      <g>
        <path d="M400 150 C388 140 376 141 382 152 C376 163 388 164 400 150 Z" fill="#ff8fab" />
        <path d="M400 150 C412 140 424 141 418 152 C424 163 412 164 400 150 Z" fill="#ff8fab" />
        <circle cx="400" cy="151" r="5" fill="#e84e73" />
      </g>

      {/* necklace charm */}
      <path d="M315 333 Q340 351 365 333" stroke="#8a6a52" strokeWidth="1.6" fill="none" />
      <path d="M340 349 C340 346 337 344 334.5 344 C332 344 330 346.5 330 349 C330 353 340 360 340 360 C340 360 350 353 350 349 C350 346.5 348 344 345.5 344 C343 344 340 346 340 349Z" fill="#ff6f91" />
    </svg>
  );
}
