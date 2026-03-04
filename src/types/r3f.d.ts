// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { ThreeElements } from "@react-three/fiber";

declare module "react" {
    namespace JSX {
        // eslint-disable-next-line @typescript-eslint/no-empty-object-type
        interface IntrinsicElements extends ThreeElements { }
    }
}

export { };
