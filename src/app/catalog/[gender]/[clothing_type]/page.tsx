type Props = {
  params: { gender: string; clothing_type: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function ClothingTypePage({
  params: { gender, clothing_type },
  searchParams,
}: Props) {
  return (
    <div>
      <h1>
        {gender}/{clothing_type}
      </h1>
    </div>
  );
}
