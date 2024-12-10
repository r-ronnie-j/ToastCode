import { VariableInfo } from "../../common/interfaces/variables";

const VariableCache = {
    vars: [] as VariableInfo[],
    
    initialize(a: VariableInfo[]) {
        this.vars = a;
    },
};

export default VariableCache;