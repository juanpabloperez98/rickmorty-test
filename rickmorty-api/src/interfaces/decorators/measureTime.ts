export function MeasureTime() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const start = Date.now();

      const result = await originalMethod.apply(this, args);

      const end = Date.now();
      console.log(`⏱️ Execution time of ${propertyKey}: ${end - start}ms`);

      return result;
    };

    return descriptor;
  };
}
