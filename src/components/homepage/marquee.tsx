'use client';

const items = [
  'SaaS Development',
  'AI Automations',
  'Website Building',
  'Growth Systems',
  'Auto Craft',
  'Indrapuram · Ghaziabad',
];

export default function Marquee() {
  const doubled = [...items, ...items];

  return (
    <>
      <div
        className="marquee-wrapper overflow-hidden border-b border-[#222] bg-black py-5"
        aria-hidden="true"
      >
        <div className="marquee-track flex w-max whitespace-nowrap">
          {doubled.map((item, i) => (
            <div key={i} className="flex shrink-0 items-center">
              <span className="px-12 text-[0.6rem] uppercase tracking-[0.3em] text-white opacity-70">
                {item}
              </span>
              <span className="px-1 text-[0.5rem] text-white opacity-30">
                ◆
              </span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .marquee-wrapper {
          position: relative;
        }

        .marquee-track {
          animation: marquee 22s linear infinite;
        }

        .marquee-wrapper:hover .marquee-track {
          animation-play-state: paused;
        }

        @keyframes marquee {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </>
  );
}
