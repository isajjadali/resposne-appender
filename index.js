import { pathToFileURL } from 'url';
import {
  createMethodNameWithRespectiveConfig,
  methodCreater,
} from './methods-creator.js';

export default async function ({
  reponsesConfigFilePath = './responses-config.js',
}) {
  const tempPath = pathToFileURL(`${process.cwd()}/${reponsesConfigFilePath}`);
  const responseConfig = await import(tempPath.href);

  const methodsInfo = createMethodNameWithRespectiveConfig(
    responseConfig.default
  );
  const methods = methodCreater(methodsInfo);

  return function (req, res, next) {
    for (const func in methods) {
      res[func] = methods[func];
    }
    next();
  };
}
