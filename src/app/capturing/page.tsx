'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import EXIF from 'exif-js';

interface ExifData {
  ISO: number | string;
  셔터스피드: string;
  화각: number | string;
  제조사: string;
  기종: string;
}

interface Photo {
  src: string;
  alt: string;
  width: number;
  height: number;
}

const photos: Photo[] = [
  { src: '/jw.jpg', alt: '사진 1', width: 800, height: 600 },
  { src: '/wave.jpg', alt: '사진 2', width: 800, height: 600 },
  { src: '/cats.jpg', alt: '사진 3', width: 800, height: 600 },
  // 더 많은 사진을 추가할 수 있습니다.
];

export default function CapturingPage() {
  const [exifData, setExifData] = useState<(ExifData | null)[]>(Array(photos.length).fill(null));
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    if (hoveredIndex !== null) {
      const img = new window.Image();
      img.src = photos[hoveredIndex].src;
      img.onload = function() {
        EXIF.getData(img as any, function(this: any) {
          const exif = EXIF.getAllTags(this);
          const newExifData = [...exifData];
          newExifData[hoveredIndex] = {
            ISO: exif.ISOSpeedRatings || '알 수 없음',
            셔터스피드: exif.ExposureTime ? `1/${Math.round(1 / exif.ExposureTime)}` : '알 수 없음',
            화각: exif.FocalLength ? `${exif.FocalLength}mm` : '알 수 없음',
            제조사: exif.Make || '알 수 없음',
            기종: exif.Model || '알 수 없음'
          };
          setExifData(newExifData);
        });
      };
    }
  }, [hoveredIndex]);

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4 text-white">사진 갤러리</h1>
      <div className="grid grid-cols-3 gap-4">
        {photos.map((photo, index) => (
          <div 
            key={index} 
            className="relative group"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              className="w-full h-auto object-cover rounded-lg group-hover:opacity-75 transition-opacity duration-300"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            />
            {hoveredIndex === index && exifData[index] && (
              <div className="absolute inset-0 bg-black bg-opacity-50 text-white p-2 flex flex-col justify-center items-center rounded-lg">
                <p>ISO {exifData[index]?.ISO}</p>
                <p>{exifData[index]?.셔터스피드}</p>
                <p>{exifData[index]?.화각}</p>
                <p>{exifData[index]?.제조사} {exifData[index]?.기종}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}