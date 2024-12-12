export const RequestCache = {
    apis: [] as string[],

    initialize(data: string[]) {
        this.apis = data;
    }
};