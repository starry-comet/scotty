import { bootstrap, interfaces } from 'comet-ioc'
import { LoggerModule, LayerToken, layers } from 'comet-logger'
import { RedisModule, RedisToken, RedisFactory, Redis } from 'comet-redis'
import { isMaster, isWorker, worker } from 'cluster'

import { Scotty } from './Scotty'

import { ProvidersModule } from './providers'

// ----------------------------------------------------------------------------
// label
let label: string = 'master'
if (isWorker) {
  label = `worker-${ worker.id }`
}

// ----------------------------------------------------------------------------
// bootstrap
const scotty: Scotty = bootstrap<Scotty>(Scotty, {
  imports: [
    LoggerModule,
    RedisModule,
    ProvidersModule
  ],

  constants: [{
    provide: LayerToken,
    useValue: new layers.Console({
      timestamp: true,
      colorize: true,
      colors: true,
      prettyPrint: true,
      showLevel: true,
      label
    })
  }],

  providers: [{
    provide: RedisToken,
    useFactory(context: interfaces.Context): Redis {
      return RedisFactory()
    }
  }]
})

// ----------------------------------------------------------------------------
// cluster
if (isMaster) {
  scotty.master()
} else {
  scotty.worker()
}
