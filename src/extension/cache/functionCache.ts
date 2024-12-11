import { FunctionInfo, FunctionProps, TestFunction } from "../../common/interfaces/variables";

const FunctionCache = {
    tests: {} as Record<string, {
        example?: string;
        description?: string;
        params?: Record<string, string>;
        fn: TestFunction
    }>,
    generators: {} as Record<string, {
        example?: string;
        description?: string;
        params?: Record<string, string>;
        fn: Function;
    }>,

    TestFunction(fn: TestFunction, props: FunctionProps) {
        this.tests[props.name] = {
            example: props.example,
            description: props.description,
            params: props.params,
            fn: fn,
        };
    },

    GeneratorFunction(fn: Function, props: FunctionProps) {
        this.generators[fn.name] = {
            example: props.example,
            description: props.description,
            params: props.params,
            fn: fn,
        };
    },

    reset() {
        this.tests = {};
        this.generators = {};
    },

    evaluateFromString(rawTest: string) {
        try {
            eval(rawTest);
        } catch (err) {
            console.error("Error evaluating test function:", err);
        }
    },

};

export default FunctionCache;