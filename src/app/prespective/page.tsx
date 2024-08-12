import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import exampleImage from '../../images/prespectiveImage.avif'; 



const Prespective: React.FC = () => {
  return (
    <div className="flex items-center justify-start bg-white p-4 mt-2">
    <Link href="/nothing">
    
      <Image src={exampleImage} alt="Example" width={40} height={40} className="object-cover" />
      
    </Link>
    </div>
  );
}

export default Prespective;