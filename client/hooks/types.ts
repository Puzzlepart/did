/**
 * A function that takes in props of type `TProps` and returns a value of type `TReturnType`.
 * This function is typically used to encapsulate logic for a component to separate it from the
 * rendering logic.
 *
 * @template TProps The type of the props object passed to the hook.
 * @template TReturnType The type of the value returned by the hook.
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export type ComponentLogicHook<TProps = {}, TReturnType = any> = (
  props?: TProps
) => TReturnType
