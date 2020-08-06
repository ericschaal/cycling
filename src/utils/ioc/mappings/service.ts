import { singleton } from "tsyringe";
import { constructor } from "tsyringe/dist/typings/types";
import { componentNameKey, componentTypeKey } from "@ioc/constants/metadata";
import { ComponentType } from "@ioc/types/ComponentType";

export default function service<T>(
  name: string
): (target: constructor<T>) => void {
  return function (target: constructor<T>): void {
    Reflect.defineMetadata(componentNameKey, name, target);
    Reflect.defineMetadata(componentTypeKey, ComponentType.Service, target);
    singleton()(target);
  };
}
