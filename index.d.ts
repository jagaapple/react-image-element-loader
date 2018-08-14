// =============================================================================================================================
// SRC - TYPES DEFINITION
// =============================================================================================================================
import { ImgHTMLAttributes } from "react";

// For raster images.
interface ImgHTMLAttributesSrc {
  src?: string;
}
type ImgHTMLAttributesWithoutSrc<T> = Pick<
  ImgHTMLAttributes<T>,
  Exclude<keyof ImgHTMLAttributes<T>, keyof ImgHTMLAttributesSrc>
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
