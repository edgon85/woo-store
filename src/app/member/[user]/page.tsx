export default function UserMemberPage({
  params: { user },
}: {
  params: { user: string };
}) {
  return (
    <div className="">
      <p>Hola que hace { user }</p>
    </div>
  );
}
