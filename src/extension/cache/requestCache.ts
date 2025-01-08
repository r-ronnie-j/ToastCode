export const RequestCache = {
    apis: [] as string[],

    initialize(data: string[]) {
        data = data.filter((a) => a.trim().length !== 0);
        if (data.length === 0) {
            this.apis = [];
        } else {
            this.apis = data;
        }
    }
};