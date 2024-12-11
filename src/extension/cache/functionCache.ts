import { FunctionInfo, FunctionProps, TestFunction } from "../../common/interfaces/variables";

const FunctionCache = {
    functionText: "",
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

    reset() {
        this.tests = {};
        this.generators = {};
    },

    extractFuns(text: string) {
        const regex = /funs\s*=\s*\[(.*?)\]/s;
        const match = text.match(regex);

        if (match && match[1]) {
            this.functionText = match[1].trim();
            return this.functionText;  
        } else {
            return null;  // Return null if no match is found
        }
    }


};

export default FunctionCache;