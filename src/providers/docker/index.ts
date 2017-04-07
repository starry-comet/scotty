import { IBootstrapDependencies, interfaces } from 'comet-ioc'
import Dockerode from 'dockerode-ts'

import { Container } from './Container'
import { DockerodeToken } from './DockerodeToken'

export const DockerModule: IBootstrapDependencies = {
  declarations: [
    Container
  ],

  providers: [{
    provide: DockerodeToken,
    useFactory(context: interfaces.Context) {
      return new Dockerode({
        socketPath: '/var/run/docker.sock'
      })
    }
  }]
}
