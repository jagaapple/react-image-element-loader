// =============================================================================================================================
// SRC - TYPES DEFINITION
// =============================================================================================================================
/// <reference types="react" />

// For vector images.
declare module "*.svg" {
  const path: string;
  const element: (props: React.SVGAttributes<SVGElement>) => JSX.Element;

  export { path };
  export default element;
}

// For raster images.
interface ImgHTMLAttributesSrc {
  src?: string;
}
type ImgHTMLAttributesWithoutSrc<T> = Pick<
  React.ImgHTMLAttributes<T>,
  Exclude<keyof React.ImgHTMLAttributes<T>, keyof ImgHTMLAttributesSrc>
>;

declare module "*.png" {
  const path: string;
  const element: (props: ImgHTMLAttributesWithoutSrc<HTMLImageElement>) => JSX.Element;

  export { path };
  export default element;
}

declare module "*.jpg" {
  const path: string;
  const element: (props: ImgHTMLAttributesWithoutSrc<HTMLImageElement>) => JSX.Element;

  export { path };
  export default element;
}

declare module "*.jpeg" {
  const path: string;
  const element: (props: ImgHTMLAttributesWithoutSrc<HTMLImageElement>) => JSX.Element;

  export { path };
  export default element;
}

declare module "*.gif" {
  const path: string;
  const element: (props: ImgHTMLAttributesWithoutSrc<HTMLImageElement>) => JSX.Element;

  export { path };
  export default element;
}
