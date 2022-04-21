export default function M<T extends Object>(data: T): T {
  const proxy = new Proxy<T>(data, {
    set: function (target, key, value) {
      (<Record<string, unknown>> target)[<string> key] = value;
      reflectLinks(target);
      return true;
    },
  });
  return proxy;
}

type Link = {
  fieldA: string;
  modelB: any;
  fieldB: string;
};

M.linkModels = function (
  modelA: any,
  fieldA: string,
  modelB: any,
  fieldB: string,
) {
  //link from A to B
  if (!modelA.modelLinks) modelA.modelLinks = [];
  modelA.modelLinks.push({ fieldA, modelB, fieldB });

  //link from B to A
  if (!modelB.modelLinks) modelB.modelLinks = [];
  modelB.modelLinks.push({ fieldA: fieldB, modelB: modelA, fieldB: fieldA });
};

function reflectLinks(model: any) {
  if (model.modelLinks) {
    for (const link of <Link[]> model.modelLinks) {
      let a = model[link.fieldA];
      let b = link.modelB[link.fieldB];
      if (a != b) link.modelB[link.fieldB] = a;
    }
  }
}
