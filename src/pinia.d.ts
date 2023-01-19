import 'pinia'
import { RouteNamedMap } from 'vue-router/auto/routes'
import {RouterTyped} from 'vue-router/auto'
declare module 'pinia' {
  export interface PiniaCustomProperties {
    router : RouterTyped<RouteNamedMap>
    
  }
}