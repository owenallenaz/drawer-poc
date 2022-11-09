import Form from "./Form";
import Grid from "./Grid";
import { PageConfig, PageCallbacks } from "./types";

interface ConfigableMethod {
  (config: any): JSX.Element;
}

const componentMap: Record<PageConfig["type"], ConfigableMethod> = {
  form: Form,
  grid: Grid
};

function Page({
  config,
  callbacks
}: {
  config: PageConfig;
  callbacks: PageCallbacks;
}) {
  const Component = componentMap[config.type];

  return <Component config={config} callbacks={callbacks} />;
}

export default Page;
