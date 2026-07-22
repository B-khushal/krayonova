export default function Loading() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-bg-gray/50 backdrop-blur-sm p-4">
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-12 w-12 rounded-2xl bg-white border border-black/10 shadow-sm flex items-center justify-center animate-pulse">
          <div className="w-6 h-6 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        </div>
        <div className="h-4 w-32 bg-black/5 rounded-full animate-pulse" />
      </div>
    </div>
  );
}
