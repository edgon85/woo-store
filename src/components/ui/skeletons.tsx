const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export function CardSkeleton() {
  return (
    <div
      className={`${shimmer} bg-white rounded-lg shadow-md p-4 animate-pulse`}
    >
      <div className="w-full aspect-square bg-gray-300 mb-4"></div>
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
    </div>
  );
}

export function CardsSkeleton() {
  return (
    <>
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </>
  );
}

export function ButtonSkeleton() {
  return (
    <div className={`${shimmer} h-10 bg-gray-200 rounded animate-pulse`}></div>
  );
}

export const ShippingServiceSkeleton = () => {
  return (
    <div className="animate-pulse flex space-x-4">
      <div className="rounded-full bg-gray-300 h-10 w-10"></div>
      <div className="flex-1 space-y-6 py-1">
        <div className="h-2 bg-gray-300 rounded"></div>
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-4">
            <div className="h-2 bg-gray-300 rounded col-span-2"></div>
            <div className="h-2 bg-gray-300 rounded col-span-1"></div>
          </div>
          <div className="h-2 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default function ProductsSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="border p-4 rounded-lg shadow-md animate-pulse">
          <div className="bg-gray-300 h-48 w-full mb-2"></div>
          <div className="bg-gray-300 h-4 w-3/4 mb-2"></div>
          <div className="bg-gray-300 h-4 w-1/2"></div>
        </div>
      ))}
    </div>
  );
}
