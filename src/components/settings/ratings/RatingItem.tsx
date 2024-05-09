'use client';
import { EmptyStar, FillStar } from '@/components/ui';
import { RatingState, useRatingStore } from '@/stores/rating.store';

type Props = {
  title: string;
  aspect: keyof RatingState; // Aspecto de la valoración (por ejemplo, "rapidez", "comunicacion", "envio")
};

export const RatingItem = ({ title, aspect }: Props) => {
  const rating = useRatingStore((state) => state[aspect]);
  const setRating = useRatingStore(
    (state: any) =>
      state[
        aspect ? `set${aspect.charAt(0).toUpperCase() + aspect.slice(1)}` : ''
      ]
  );

  const handleStarClick = (index: number) => {
    setRating(index + 1); // Sumamos 1 al índice para obtener una valoración de 1 a 5
  };

  return (
    <div className="flex justify-between items-center">
      <p className="text-gray-500 text-base font-semibold">{title}</p>
      <div>
        <div className="flex items-center">
          {[...Array(5)].map((_, index) => (
            <span
              key={index}
              onClick={() => handleStarClick(index)}
              style={{ cursor: 'pointer' }}
            >
              {/* {index < rating ? <FillStar /> : <EmptyStar />} */}
              {typeof rating === 'number' && index < rating ? (
                <FillStar />
              ) : (
                <EmptyStar />
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
