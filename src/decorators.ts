export const measure = (
    target: Object,
    propertyKey: string,
    descriptor: PropertyDescriptor
) => {
    const originalMethod = descriptor.value;

    descriptor.value = function () {
        const start = performance.now();
        const result = originalMethod.apply(this);
        const finish = performance.now();
        console.log(`Execution time: ${finish - start} milliseconds`);
        return result;
    };

    return descriptor;
};