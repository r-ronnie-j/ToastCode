import { TestFunction } from "../../common/interfaces/variables";
import { ToastRendererProvider } from "../renderer/toastRenderer";

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
        const lastSegment = text.split(ToastRendererProvider.documentSeperator).at(-1)?.trim();

        if (!lastSegment) {
            console.warn("No valid segment found in the provided text.");
            return null;
        }

        let processedSegment = lastSegment
            .replace("funs", "")
            .replace("=", "")
            .trim();

        if (processedSegment.startsWith("{") && processedSegment.endsWith("}")) {
            processedSegment = processedSegment.slice(1, -1).trim();
        } else {
            console.warn("The processed segment does not start and end with curly braces.");
        }

        return processedSegment;
    }
};

export default FunctionCache;