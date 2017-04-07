import { Injectable, Inject } from 'comet-ioc'
import { Logger } from 'comet-logger'
import { ContainerInfo, default as Dockerode } from 'dockerode-ts'

import { DockerodeToken } from './DockerodeToken'
import { $q } from '../../utils/promise'

@Injectable()
export class Container {

  @Inject(DockerodeToken)
  private $dockerode: Dockerode

  @Inject(Logger)
  private $logger: Logger

  public find(): Promise<ContainerInfo[]> {
    return $q<ContainerInfo[]>((resolve, reject): void => {
      this.$logger.info('Find all containers')
      this.$dockerode.listContainers((error: Error, informations: ContainerInfo[]): void => {
        if (error) {
          return reject(error)
        }

        this.$logger.info(`Retrieve informations from ${ informations.length } containers`)
        resolve(informations)
      })
    })
  }
}
