import Image from 'next/image';

interface Photo {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface GalleryProps {
  photos: Photo[];
}

export default function Gallery({ photos }: GalleryProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {photos.map((photo, index) => (
        <div key={index} className="relative aspect-square">
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover rounded-lg"
          />
        </div>
      ))}
    </div>
  );
}