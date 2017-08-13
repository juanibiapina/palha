// @flow

type UpdateFn<Model, Message> = (Model, Message) => Model;
type ViewFn<Model, Message, View> = (Model, DispatchFn<Message>) => View;

type RendererFn<View> = (View) => void;

type DispatchFn<Message> = (Message) => void;

type Parts<Model, Message, View> = {
  initialModel: Model,
  update: UpdateFn<Model, Message>,
  view: ViewFn<Model, Message, View>,
  renderer: RendererFn<View>,
};

export default class App<Model, Message, View> {
  currentModel: Model;

  update: UpdateFn<Model, Message>;
  view: ViewFn<Model, Message, View>;

  renderer: RendererFn<View>;

  dispatch: DispatchFn<Message>;

  constructor(parts: Parts<Model, Message, View>) {
    this.currentModel = parts.initialModel;

    this.view = parts.view;
    this.renderer = parts.renderer;
    this.update = parts.update;

    this.dispatch = this.dispatch.bind(this);
  }

  render() {
    this.renderer(this.view(this.currentModel, this.dispatch));
  }

  performUpdate(message: Message) {
    this.currentModel = this.update(this.currentModel, message);
  }

  dispatch(message: Message) {
    this.performUpdate(message);
    this.render();
  }

  start() {
    this.render();
  }
}
