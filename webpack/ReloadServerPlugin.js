import { setupMaster, on, fork } from 'cluster';
import { resolve } from 'path';

const defaultOptions = {
  script: 'server.js',
};

class ReloadServerPlugin {
  constructor({ script } = defaultOptions) {
    this.done = null;
    this.workers = [];

    setupMaster({
      exec: resolve(process.cwd(), script),
    });

    on('online', (worker) => {
      this.workers.push(worker);

      if (this.done) {
        this.done();
      }
    });
  }

  apply(compiler) {
    compiler.hooks.afterEmit.tap(
      {
        name: 'reload-server',
      },
      (compilation, callback) => {
        this.done = callback;
        this.workers.forEach((worker) => {
          try {
            process.kill(worker.process.pid, 'SIGTERM');
          } catch (e) {
            // eslint-disable-next-line
            console.warn(`Unable to kill process #${worker.process.pid}`);
          }
        });

        this.workers = [];

        fork();
      },
    );
  }
}

export default ReloadServerPlugin;
