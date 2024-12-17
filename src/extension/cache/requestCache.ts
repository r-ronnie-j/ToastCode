export const RequestCache = {
    apis: [] as string[],

    initialize(data: string[]) {
        if (data.length === 0) {
            this.apis = [];
        } else {
            this.apis = data;
        }
    }
};