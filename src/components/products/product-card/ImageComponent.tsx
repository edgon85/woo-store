import Image from 'next/image';
import Link from 'next/link';

type Props = {
  src: string;
  alt: string;
  prodSlug: string;
};

export const ImageComponent = ({ src, alt, prodSlug }: Props) => {
  return (
    <Link href={`/product/${prodSlug}`}>
      <div className="w-full min-h-[300px] mb-2 relative cursor-pointer">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{
            objectFit: 'cover',
          }}
          priority={true}
        />
      </div>
    </Link>
  );
};
