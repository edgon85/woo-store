import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type Props = {
  src: string;
  alt: string;
  prodSlug: string;
};

export const ImageComponent = ({ src, alt, prodSlug }: Props) => {
  // const router = useRouter();

  return (
    <Link href={`/product/${prodSlug}`}>
      <div
        // onClick={() => router.push(`/product/${prodSlug}`)}
        className="w-full min-h-[300px] mb-2 relative cursor-pointer"
      >
        <Image
          src={src}
          alt={alt}
          fill
          // className="rounded-md"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{
            objectFit: 'cover',
          }}
        />
      </div>
    </Link>
  );
};
