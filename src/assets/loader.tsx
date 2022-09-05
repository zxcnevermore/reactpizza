import ContentLoader from 'react-content-loader';
import React from 'react';

const Skeleton: React.FC = () => {
    return (
        <ContentLoader
            speed={2}
            width={400}
            height={500}
            viewBox="0 0 400 500"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb">
            <circle cx="127" cy="127" r="127" />
            <rect x="0" y="269" rx="3" ry="3" width="260" height="24" />
            <rect x="0" y="303" rx="10" ry="10" width="260" height="85" />
            <rect x="473" y="152" rx="8" ry="8" width="32" height="32" />
            <rect x="0" y="399" rx="0" ry="0" width="89" height="27" />
            <rect x="110" y="396" rx="30" ry="30" width="155" height="40" />
        </ContentLoader>
    );
};

export default Skeleton;
