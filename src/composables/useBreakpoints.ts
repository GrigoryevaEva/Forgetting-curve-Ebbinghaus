import { breakpointsTailwind, useBreakpoints as useBreakpointsVueCore } from '@vueuse/core';

export const useBreakpoints = () => {
    const breakpoints = useBreakpointsVueCore(breakpointsTailwind);
    const isMobileAndTablet = breakpoints.smallerOrEqual('sm');
    const isDesktop = breakpoints.greater('sm');

    return {
        isMobileAndTablet,
        isDesktop,
    };
};
