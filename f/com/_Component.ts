import m from "../html/Mithril.ts";

export default abstract class Component<T> {
  //model data of this component
  model: T;

  //create component with model
  constructor(model?: T) {
    this.model = model || this.defaultModel();
  }

  //initialize default model
  defaultModel(): T {
    return <T> {};
  }

  //render self via Mithril
  abstract render(): any;
}
