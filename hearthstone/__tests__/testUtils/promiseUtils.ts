export const spyResolves = (returnValue: any) => jest.fn(() => Promise.resolve(returnValue));
export const spyRejects = (error?: any) => jest.fn(() => Promise.reject(error));