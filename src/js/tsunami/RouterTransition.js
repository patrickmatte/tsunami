export default class RouterTransition {
  constructor(router, name) {
    this.router = router;
    this.name = name;
    this.branches = [];
    this.tasks = [];
  }

  start() {
    let promise = Promise.resolve();
    if (this.branches.length > 0) {
      promise = new Promise((resolve, reject) => {
        let nextTask;
        for (let i = this.tasks.length - 1; i > -1; i--) {
          const task = this.tasks[i];
          task.router = this.router;
          task.branches = this.branches.slice();
          if (nextTask) {
            task.onComplete = nextTask.start.bind(nextTask);
          } else {
            task.onComplete = resolve;
          }
          nextTask = task;
        }
        const firstTask = this.tasks[0];
        firstTask.start();
      });
    }
    return promise;
  }
}
