// =============================================================================================================================
// SRC - TYPES DEFINITION
// =============================================================================================================================
/// <reference types="react" />

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
  const component: (props: ImgHTMLAttributesWithoutSrc<HTMLImageElement>) => JSX.Element;

  export { path };
  export default component;
}

declare module "*.jpg" {
  const path: string;
  const component: (props: ImgHTMLAttributesWithoutSrc<HTMLImageElement>) => JSX.Element;

  export { path };
  export default component;
}

declare module "*.jpeg" {
  const path: string;
  const component: (props: ImgHTMLAttributesWithoutSrc<HTMLImageElement>) => JSX.Element;

  export { path };
  export default component;
}

declare module "*.gif" {
  const path: string;
  const component: (props: ImgHTMLAttributesWithoutSrc<HTMLImageElement>) => JSX.Element;

  export { path };
  export default component;
}
