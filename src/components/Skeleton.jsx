const Skeleton = () => {
  return (
    <div className="bg-gray-200 rounded-xl p-4 h-full w-full shadow">
      <div className="w-full h-full mx-auto space-y-2 overflow-hidden *:animate-pulse *:bg-gray-400 *:rounded">
        <div className="w-44 h-32"></div>
        <div className="w-4/5 h-4"></div>
        <div className="w-3/5 h-4"></div>
        <div className="w-2/5 h-4"></div>
        <div className="w-4/6 h-4"></div>
      </div>
    </div>
  );
};

export default Skeleton;
