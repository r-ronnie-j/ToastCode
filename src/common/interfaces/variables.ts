export interface VariableInfo {
    key: string;
    value: string;
    enabled: boolean;
}

export interface EnvironmentInfo {
    path: string,
    enabled: boolean,
    status: boolean,
}

export type TestFunction = (req: Object, res: Object) => boolean

export interface FunctionProps {
    name: string;
    example?: string;
    description?: string;
    params?: Record<string, string>;
}

export interface FunctionInfo extends FunctionProps {
    fn: Function
}