import { EmptyStarIcon, FillStarIcon } from '../ui';

interface IRating {
  overallAverage: number;
  numberOfRatings: number;
}

type Props = {
  data: IRating;
  message?: string;
};

export const RatingComponent = ({ data, message }: Props) => {
  if (!data) return <p className="text-gray-500">{message}</p>;

  const renderStars = () => {
    if (!data) return null;

    const filledStars = Math.floor(data.overallAverage);
    const emptyStars = 5 - filledStars;

    return (
      <>
        {[...Array(filledStars)].map((_, index) => (
          <FillStarIcon key={index} className="w-4 h-4 text-cerise-red-500" />
        ))}
        {[...Array(emptyStars)].map((_, index) => (
          <EmptyStarIcon key={index} className="w-4 h-4 text-cerise-red-500" />
        ))}
        <span className="text-sm text-gray-500">({data.numberOfRatings})</span>
      </>
    );
  };

  return (
    <div className="flex items-center space-x-1">
      {data ? renderStars() : <p className="text-red-500">{message}</p>}
    </div>
  );
};
