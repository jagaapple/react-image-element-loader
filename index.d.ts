/// <reference types="react" />

// For vector images.
declare module "*.svg" {
  const path: string;
  const element: (props: React.SVGAttributes<SVGElement>) => JSX.Element;

  export { element };
  export default path;
}

// For raster images.
type ImgHTMLAttributesSrc = {
  src?: string;
};
type ImgHTMLAttributesWithoutSrc<T> = Pick<
  React.ImgHTMLAttributes<T>,
  Exclude<keyof React.ImgHTMLAttributes<T>, keyof ImgHTMLAttributesSrc>
>;

declare module "*.png" {
  const path: string;
  const element: (props: ImgHTMLAttributesWithoutSrc<HTMLImageElement>) => JSX.Element;

  export { element };
  export default path;
}

declare module "*.jpg" {
  const path: string;
  const element: (props: ImgHTMLAttributesWithoutSrc<HTMLImageElement>) => JSX.Element;

  export { element };
  export default path;
}

declare module "*.jpeg" {
  const path: string;
  const element: (props: ImgHTMLAttributesWithoutSrc<HTMLImageElement>) => JSX.Element;

  export { element };
  export default path;
}

declare module "*.gif" {
  const path: string;
  const element: (props: ImgHTMLAttributesWithoutSrc<HTMLImageElement>) => JSX.Element;

  export { element };
  export default path;
}
