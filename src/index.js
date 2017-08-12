export default class App {
  constructor(parts) {
    this.currentModel = parts.initialModel;
    this.view = parts.view;
    this.renderer = parts.renderer;
    this.update = parts.update;

    this.dispatch = this.dispatch.bind(this);
  }

  render() {
    this.renderer(this.view(this.currentModel, this.dispatch));
  }

  performUpdate(message) {
    this.currentModel = this.update(this.currentModel, message);
  }

  dispatch(message) {
    this.performUpdate(message);
    this.render();
  }

  start() {
    this.render();
  }
}
