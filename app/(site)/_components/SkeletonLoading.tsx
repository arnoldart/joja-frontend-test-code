const SkeletonLoading = ({className}: {className?: string}) => (
  <div className={`animate-pulse bg-gray-300 bg-opacity-50 rounded ${className}`}></div>
);

export default SkeletonLoading;