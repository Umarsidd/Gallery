import { useEffect, useState } from 'react';
import type { ImgHTMLAttributes } from 'react';
import type { Pet } from '../types/pet';
import { createPetFallbackImage, normalizeImageUrl } from '../utils/petPresentation';

interface PetImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'> {
  pet: Pet;
}

export function PetImage({ pet, ...imageProps }: PetImageProps) {
  const [imageSource, setImageSource] = useState(() => normalizeImageUrl(pet.image_url));

  useEffect(() => {
    setImageSource(normalizeImageUrl(pet.image_url));
  }, [pet.image_url]);

  return (
    <img
      {...imageProps}
      src={imageSource}
      alt={pet.title}
      onError={() => {
        setImageSource(createPetFallbackImage(pet));
      }}
    />
  );
}
