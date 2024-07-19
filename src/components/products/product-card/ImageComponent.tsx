import Image from 'next/image';
import Link from 'next/link';

type Props = {
  src: string;
  alt: string;
  prodSlug: string;
};

export const ImageComponent = ({ src, alt, prodSlug }: Props) => {
  return (
    <Link
      href={`/product/${prodSlug}`}
      className="block relative aspect-square w-full overflow-hidden"
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover w-full h-full"
        priority={true}
      />
    </Link>
  );
};
