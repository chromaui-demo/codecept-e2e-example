import React from 'react';
import Image from 'next/image';

export const Images: React.FC = () => {
  return (
    <div>
      <div
        style={{
          background: 'black',
          width: '240px',
          height: '15px',
          position: 'absolute',
          zIndex: 1000,
        }}
      ></div>
      <Image
        src="./test_run_success.png"
        alt="baseline_image"
        width={240}
        height={320}
      />
    </div>
  );
};

// JSON object
// Key is the name of the file
// Value is coordinates for ignore regions
// Our script would look for the ignore regions and add absolute coordinates to the image with the divs we've defined
// export const ignoreRegions = {
//   'Images.tsx': [
//     {
//       x: 0,
//       y: 0,
//       width: 240,
//     },
//   ],
// };
