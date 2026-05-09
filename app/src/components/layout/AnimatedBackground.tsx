export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Orb 1 - top left */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full animate-float-orb bg-orb-teal" />
      {/* Orb 2 - bottom right */}
      <div className="absolute -bottom-40 -right-40 w-[700px] h-[700px] rounded-full animate-float-orb-slow bg-orb-blue" />
      {/* Orb 3 - center right */}
      <div
        className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full animate-float-orb bg-orb-warm"
        style={{ animationDelay: '-10s' }}
      />
      {/* Orb 4 - bottom left */}
      <div
        className="absolute bottom-1/4 left-0 w-[450px] h-[450px] rounded-full animate-float-orb-slow bg-orb-teal"
        style={{ animationDelay: '-5s' }}
      />
    </div>
  );
}
