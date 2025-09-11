import React from "react";
import "./skeletonLoader.css";

const SkeletonLoader = () => {
    const test = [1, 2, 3, 4];
    return (
        <div className="skeleton-loader">
            {test.map((t) => (
                <div className="box-loader-line">
                    <SkeletonLoaderBox />
                    <SkeletonLoaderLine />
                </div>
            ))}
        </div>
    );
};

export default SkeletonLoader;

export function SkeletonLoaderLine({className}) {
    return <div className={className + " skeleton-loader-line"}></div>;
}
export function SkeletonLoaderBox({className}) {
    return <div className={className + " skeleton-loader-box"}></div>;
} 
