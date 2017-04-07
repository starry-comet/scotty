import { IBootstrapDependencies } from 'comet-ioc'

import { DockerModule } from './docker'

export const ProvidersModule: IBootstrapDependencies = {
  imports: [
    DockerModule
  ]
}
