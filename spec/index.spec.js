import App from '../src/index';

describe('App', () => {
  let app;

  let initialModel = 'initial model';
  let updateFn = jest.fn();
  let viewFn = jest.fn();
  const rendererFn = jest.fn();

  describe('when started', () => {
    viewFn = jest.fn(model => model);

    beforeEach(() => {
      app = new App({
        initialModel,
        update: updateFn,
        view: viewFn,
        renderer: rendererFn,
      });

      app.start();
    });

    it('renders the initial model', () => {
      expect(viewFn).toHaveBeenCalledWith(initialModel, expect.any(Function));
      expect(rendererFn).toHaveBeenCalledWith(initialModel);
    });
  });

  describe('when a message is dispatched', () => {
    let send;
    const message = { type: 'A_MESSAGE' };

    beforeEach(() => {
      updateFn = jest.fn(() => 'new model');

      viewFn = jest.fn((model, dispatch) => {
        send = dispatch;
        return model;
      });

      app = new App({
        initialModel,
        update: updateFn,
        view: viewFn,
        renderer: rendererFn,
      });

      app.start();

      send(message);
    });

    it('calls the update function with the current model and the message', () => {
      expect(updateFn).toHaveBeenCalledWith(initialModel, message);
    });

    it('renders the new model', () => {
      expect(viewFn).toHaveBeenCalledWith('new model', expect.any(Function));
      expect(rendererFn).toHaveBeenCalledWith('new model');
    });
  });

  describe('when several messages are dispatched', () => {
    let send;
    const message = { type: 'INC' };

    beforeEach(() => {
      initialModel = 0;

      updateFn = jest.fn(model => model + 1);

      viewFn = jest.fn((model, dispatch) => {
        send = dispatch;
        return model;
      });

      app = new App({
        initialModel,
        update: updateFn,
        view: viewFn,
        renderer: rendererFn,
      });

      app.start();
    });

    it('repeatedly calls the update function with updated models', () => {
      send(message);
      expect(updateFn).toHaveBeenCalledWith(0, message);

      send(message);
      expect(updateFn).toHaveBeenCalledWith(1, message);

      send(message);
      expect(updateFn).toHaveBeenCalledWith(2, message);
    });
  });
});
