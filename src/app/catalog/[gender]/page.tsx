type Props = {
  params: { gender: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

/* 
{
    params: { gender },
    searchParams,
  }: 
*/

export default function GenderPage({
  params: { gender },
  searchParams,
}: Props) {
  return (
    <div>
      <h1>{gender} Page</h1>
    </div>
  );
}
