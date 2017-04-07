import { cpus } from 'os'
import { fork, worker } from 'cluster'
import { Injectable, Inject } from 'comet-ioc'
import { Logger } from 'comet-logger'

import { Container } from './providers/docker/Container'

@Injectable()
export class Scotty {

  @Inject(Logger)
  private $logger: Logger

  public master(): void {
    this.$logger.info('Start master thread')

    cpus().forEach(() => fork())
  }

  public worker(): void {
    this.$logger.info(`Start worker ${ worker.id } thread`)
  }
}
